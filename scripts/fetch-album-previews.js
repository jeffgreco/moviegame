// Script to fetch audio preview URLs from iTunes for each album
const fs = require('fs');
const https = require('https');

// Read current albums data
const albumsContent = fs.readFileSync('albums.js', 'utf8');

// Parse albums - now including preview_url if it exists
const albums = [];
const albumRegex = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist:\s*"([^"]+)",\s*cover_url:\s*"([^"]*)",\s*(?:preview_url:\s*"([^"]*)",\s*)?release_date:\s*"([^"]+)",\s*rank:\s*(\d+)\s*\}/g;

let match;
while ((match = albumRegex.exec(albumsContent)) !== null) {
  albums.push({
    id: parseInt(match[1]),
    title: match[2],
    artist: match[3],
    cover_url: match[4],
    preview_url: match[5] || '',
    release_date: match[6],
    rank: parseInt(match[7])
  });
}

console.log(`Found ${albums.length} albums`);

// Function to search iTunes for a track preview with retry
function searchItunesTrack(album, retries = 3) {
  return new Promise((resolve, reject) => {
    // Search for songs from this album
    const query = encodeURIComponent(`${album.title} ${album.artist}`);
    const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=5`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        // Check for rate limiting
        if (data.includes('Rate limit') || res.statusCode === 403 || res.statusCode === 429) {
          if (retries > 0) {
            console.log(`  Rate limited, waiting 5s and retrying...`);
            await new Promise(r => setTimeout(r, 5000));
            try {
              const result = await searchItunesTrack(album, retries - 1);
              resolve(result);
            } catch (e) {
              reject(e);
            }
          } else {
            resolve(null);
          }
          return;
        }

        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            // Find a track with a preview URL
            const trackWithPreview = json.results.find(t => t.previewUrl);
            if (trackWithPreview) {
              resolve(trackWithPreview.previewUrl);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

function saveAlbums(albumList) {
  const header = `// Rolling Stone Top 500 Albums Data
// Based on Rolling Stone's "500 Greatest Albums of All Time" list
// Last updated: ${new Date().toISOString().split('T')[0]}
// Cover art and audio previews from iTunes

const ALBUMS_DATA = [
`;

  const albumEntries = albumList.map(album => {
    return `  {
    id: ${album.id},
    title: "${album.title}",
    artist: "${album.artist}",
    cover_url: "${album.cover_url}",
    preview_url: "${album.preview_url || ''}",
    release_date: "${album.release_date}",
    rank: ${album.rank}
  }`;
  }).join(',\n');

  const footer = `
];

// Helper function to get album by ID
function getAlbumById(id) {
  return ALBUMS_DATA.find(album => album.id === id);
}

// Helper function to get albums by rank range
function getAlbumsByRankRange(start, end) {
  return ALBUMS_DATA.filter(album => album.rank >= start && album.rank <= end);
}
`;

  const newContent = header + albumEntries + footer;
  fs.writeFileSync('albums.js', newContent);
}

// Process albums with rate limiting
async function processAlbums() {
  const results = [];

  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];

    // Skip if already has a preview URL
    if (album.preview_url && album.preview_url.includes('itunes.apple.com')) {
      console.log(`Skipping ${i + 1}/${albums.length}: ${album.title} (already has preview)`);
      results.push(album);
      continue;
    }

    console.log(`Processing ${i + 1}/${albums.length}: ${album.title} by ${album.artist}`);

    try {
      const previewUrl = await searchItunesTrack(album);
      if (previewUrl) {
        album.preview_url = previewUrl;
        console.log(`  Found preview`);
      } else {
        album.preview_url = '';
        console.log('  No preview found');
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      album.preview_url = '';
    }

    results.push(album);

    // Save progress every 10 albums
    if (results.length % 10 === 0) {
      const remaining = albums.slice(results.length);
      saveAlbums([...results, ...remaining]);
      console.log(`  [Saved progress: ${results.length}/${albums.length}]`);
    }

    // Rate limiting: wait 1 second between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  return results;
}

processAlbums().then(updatedAlbums => {
  saveAlbums(updatedAlbums);
  const withPreviews = updatedAlbums.filter(a => a.preview_url).length;
  console.log(`\nUpdated albums.js with ${withPreviews}/${updatedAlbums.length} preview URLs`);
});
