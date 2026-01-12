// Script to fetch album cover URLs from iTunes
const fs = require('fs');
const https = require('https');

// Read current albums data
const albumsContent = fs.readFileSync('albums.js', 'utf8');

// Extract album data using regex
const albumsMatch = albumsContent.match(/const ALBUMS_DATA = \[([\s\S]*?)\];/);
if (!albumsMatch) {
  console.error('Could not parse albums data');
  process.exit(1);
}

// Parse albums
const albums = [];
const albumRegex = /\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist:\s*"([^"]+)",\s*cover_url:\s*"([^"]*)",\s*release_date:\s*"([^"]+)",\s*rank:\s*(\d+)\s*\}/g;

let match;
while ((match = albumRegex.exec(albumsContent)) !== null) {
  albums.push({
    id: parseInt(match[1]),
    title: match[2],
    artist: match[3],
    cover_url: match[4],
    release_date: match[5],
    rank: parseInt(match[6])
  });
}

console.log(`Found ${albums.length} albums`);

// Function to search iTunes for album artwork
function searchItunes(album) {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(`${album.title} ${album.artist}`);
    const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=album&limit=1`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            // Get high-res artwork (600x600)
            const artworkUrl = json.results[0].artworkUrl100.replace('100x100', '600x600');
            resolve(artworkUrl);
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

// Process albums with rate limiting
async function processAlbums() {
  const results = [];

  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];
    console.log(`Processing ${i + 1}/${albums.length}: ${album.title} by ${album.artist}`);

    try {
      const coverUrl = await searchItunes(album);
      if (coverUrl) {
        album.cover_url = coverUrl;
        console.log(`  Found: ${coverUrl.substring(0, 60)}...`);
      } else {
        album.cover_url = ''; // Clear fake URL
        console.log('  Not found, using fallback');
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      album.cover_url = ''; // Clear fake URL
    }

    results.push(album);

    // Rate limiting: wait 200ms between requests
    await new Promise(r => setTimeout(r, 200));
  }

  return results;
}

processAlbums().then(updatedAlbums => {
  // Generate new albums.js content
  const header = `// Rolling Stone Top 500 Albums Data
// Based on Rolling Stone's "500 Greatest Albums of All Time" list
// Last updated: ${new Date().toISOString().split('T')[0]}
// Cover art from iTunes

const ALBUMS_DATA = [
`;

  const albumEntries = updatedAlbums.map(album => {
    return `  {
    id: ${album.id},
    title: "${album.title}",
    artist: "${album.artist}",
    cover_url: "${album.cover_url}",
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
  console.log('\nUpdated albums.js with new cover URLs');
});
