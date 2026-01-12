// Script to fetch album cover URLs from iTunes
// Usage:
//   node fetch-album-covers.js                    # Fetch missing covers only
//   node fetch-album-covers.js --force            # Re-fetch ALL covers
//   node fetch-album-covers.js "American Idiot"  # Re-fetch specific album(s)
//   node fetch-album-covers.js "Green Day" -f    # Force re-fetch artist's albums

const fs = require('fs');
const https = require('https');

// Read current albums data
const albumsContent = fs.readFileSync('albums.js', 'utf8');

// Extract album data using regex (handles optional preview_url)
const albumsMatch = albumsContent.match(/const ALBUMS_DATA = \[([\s\S]*?)\];/);
if (!albumsMatch) {
  console.error('Could not parse albums data');
  process.exit(1);
}

// Parse albums
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

// Words that indicate a tribute/cover album (not the original)
const EXCLUDE_KEYWORDS = [
  'tribute', 'karaoke', 'cover', 'covers', 'made famous',
  'originally performed', 'in the style of', 'as made famous',
  'instrumental', 'string quartet', 'lullaby', 'piano version',
  'orchestral', 'music box', 'kids version', 'baby', 'renditions'
];

// Normalize string for comparison
function normalize(str) {
  return str.toLowerCase()
    .replace(/[''`]/g, "'")
    .replace(/[""]/g, '"')
    .replace(/\s*&\s*/g, ' and ')  // Normalize & to "and"
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check if result is likely a tribute/cover album
function isTributeOrCover(result) {
  const collectionName = (result.collectionName || '').toLowerCase();
  const artistName = (result.artistName || '').toLowerCase();

  for (const keyword of EXCLUDE_KEYWORDS) {
    if (collectionName.includes(keyword) || artistName.includes(keyword)) {
      return true;
    }
  }
  return false;
}

// Check if artist names match (allowing for some variation)
function artistMatches(expected, actual) {
  const normExpected = normalize(expected);
  const normActual = normalize(actual);

  // Exact match
  if (normExpected === normActual) return true;

  // Handle "The" prefix
  const withoutThe = (s) => s.replace(/^the\s+/, '');
  if (withoutThe(normExpected) === withoutThe(normActual)) return true;

  // Handle "X and the Y" patterns - extract main artist name
  const mainArtist = (s) => s.replace(/\s+and\s+the\s+.*$/i, '').replace(/\s+&\s+the\s+.*$/i, '');
  if (mainArtist(normExpected) === normActual || normExpected === mainArtist(normActual)) return true;
  if (mainArtist(normExpected) === mainArtist(normActual)) return true;

  // Handle featuring/collaboration patterns
  const baseArtist = (s) => s.split(/\s+(feat|ft|featuring|with|&|,)\s+/i)[0].trim();
  if (baseArtist(normExpected) === baseArtist(normActual)) return true;
  if (baseArtist(normExpected) === normActual || normExpected === baseArtist(normActual)) return true;

  return false;
}

// Check if album titles match
function albumTitleMatches(expected, actual) {
  const normExpected = normalize(expected);
  const normActual = normalize(actual);

  // Exact match
  if (normExpected === normActual) return true;

  // One contains the other (for subtitles, deluxe editions, etc.)
  if (normActual.includes(normExpected) || normExpected.includes(normActual)) return true;

  return false;
}

// Extract year from date string
function getYear(dateStr) {
  const match = dateStr.match(/\d{4}/);
  return match ? parseInt(match[0]) : null;
}

// Score a result based on how well it matches the expected album
function scoreResult(result, album) {
  let score = 0;
  const expectedYear = getYear(album.release_date);
  const resultYear = result.releaseDate ? new Date(result.releaseDate).getFullYear() : null;

  // Disqualify tribute/cover albums
  if (isTributeOrCover(result)) return -1000;

  // Artist match is CRITICAL - no match means disqualify
  if (artistMatches(album.artist, result.artistName)) {
    score += 100;
  } else {
    return -500; // Disqualify wrong artist entirely
  }

  // Album title match is also critical
  if (albumTitleMatches(album.title, result.collectionName)) {
    score += 80;
  } else {
    score -= 100; // Heavy penalty for wrong album title
  }

  // Year match (allow 1 year tolerance for release date variations)
  if (expectedYear && resultYear) {
    const yearDiff = Math.abs(expectedYear - resultYear);
    if (yearDiff === 0) score += 30;
    else if (yearDiff === 1) score += 20;
    else if (yearDiff <= 3) score += 10;
    else score -= 20; // Penalize if year is way off
  }

  // Prefer non-deluxe, non-remastered versions slightly
  const collectionLower = (result.collectionName || '').toLowerCase();
  if (collectionLower.includes('deluxe') || collectionLower.includes('remaster')) {
    score -= 5;
  }

  return score;
}

// Find artist ID by searching
function findArtistId(artistName) {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(artistName);
    const url = `https://itunes.apple.com/search?term=${query}&entity=musicArtist&limit=10&country=US`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            // Find exact or close artist match
            const match = json.results.find(r =>
              artistMatches(artistName, r.artistName)
            );
            resolve(match ? match.artistId : null);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

// Look up all albums by artist ID
function lookupArtistAlbums(artistId) {
  return new Promise((resolve, reject) => {
    const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=album&limit=200&country=US`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const albums = json.results.filter(r => r.wrapperType === 'collection');
          resolve(albums);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

// Function to search iTunes for album artwork with retry
function searchItunes(album, retries = 3) {
  return new Promise((resolve, reject) => {
    const query = encodeURIComponent(`${album.title} ${album.artist}`);
    const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=album&limit=15&country=US`;

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
              const result = await searchItunes(album, retries - 1);
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
            // Score all results and pick the best one
            const scoredResults = json.results.map(r => ({
              result: r,
              score: scoreResult(r, album)
            })).sort((a, b) => b.score - a.score);

            const best = scoredResults[0];

            // Log what we found for debugging
            const resultYear = best.result.releaseDate ? new Date(best.result.releaseDate).getFullYear() : '?';
            console.log(`  Search result: "${best.result.collectionName}" by ${best.result.artistName} (${resultYear}) [score: ${best.score}]`);

            // Minimum score threshold - must have artist match (100) + some title/year bonus
            const MIN_SCORE = 100;
            if (best.score >= MIN_SCORE) {
              // Good match found via search
              const artworkUrl = best.result.artworkUrl100.replace('100x100', '600x600');
              resolve(artworkUrl);
              return;
            }

            // Search didn't find a good match - try looking up artist's albums directly
            console.log(`  Search score too low, trying artist lookup...`);
            try {
              const artistId = await findArtistId(album.artist);
              if (artistId) {
                await new Promise(r => setTimeout(r, 300)); // Small delay
                const artistAlbums = await lookupArtistAlbums(artistId);

                if (artistAlbums.length > 0) {
                  // Score all albums from this artist
                  const scoredArtistAlbums = artistAlbums.map(r => ({
                    result: r,
                    score: scoreResult(r, album)
                  })).sort((a, b) => b.score - a.score);

                  const bestArtist = scoredArtistAlbums[0];
                  const artistResultYear = bestArtist.result.releaseDate ? new Date(bestArtist.result.releaseDate).getFullYear() : '?';
                  console.log(`  Artist lookup: "${bestArtist.result.collectionName}" (${artistResultYear}) [score: ${bestArtist.score}]`);

                  if (bestArtist.score >= MIN_SCORE) {
                    const artworkUrl = bestArtist.result.artworkUrl100.replace('100x100', '600x600');
                    resolve(artworkUrl);
                    return;
                  }
                }
              }
            } catch (lookupErr) {
              console.log(`  Artist lookup failed: ${lookupErr.message}`);
            }

            console.log(`  No good match found`);
            resolve(null);
          } else {
            // No search results at all - try artist lookup
            console.log(`  No search results, trying artist lookup...`);
            try {
              const artistId = await findArtistId(album.artist);
              if (artistId) {
                await new Promise(r => setTimeout(r, 300));
                const artistAlbums = await lookupArtistAlbums(artistId);

                if (artistAlbums.length > 0) {
                  const scoredArtistAlbums = artistAlbums.map(r => ({
                    result: r,
                    score: scoreResult(r, album)
                  })).sort((a, b) => b.score - a.score);

                  const bestArtist = scoredArtistAlbums[0];
                  const artistResultYear = bestArtist.result.releaseDate ? new Date(bestArtist.result.releaseDate).getFullYear() : '?';
                  console.log(`  Artist lookup: "${bestArtist.result.collectionName}" (${artistResultYear}) [score: ${bestArtist.score}]`);

                  if (bestArtist.score >= 100) {
                    const artworkUrl = bestArtist.result.artworkUrl100.replace('100x100', '600x600');
                    resolve(artworkUrl);
                    return;
                  }
                }
              }
            } catch (lookupErr) {
              console.log(`  Artist lookup failed: ${lookupErr.message}`);
            }
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
const forceRefetch = args.includes('--force') || args.includes('-f');
const specificAlbums = args.filter(a => !a.startsWith('-'));

// Filter albums if specific ones requested
let albumsToProcess = albums;
if (specificAlbums.length > 0) {
  albumsToProcess = albums.filter(album => {
    return specificAlbums.some(search => {
      const searchLower = search.toLowerCase();
      return album.title.toLowerCase().includes(searchLower) ||
             album.artist.toLowerCase().includes(searchLower) ||
             album.id.toString() === search;
    });
  });
  console.log(`Filtering to ${albumsToProcess.length} albums matching: ${specificAlbums.join(', ')}`);
}

// Process albums with rate limiting
async function processAlbums() {
  const results = [];
  const processedIds = new Set();

  for (let i = 0; i < albums.length; i++) {
    const album = albums[i];
    const shouldProcess = albumsToProcess.some(a => a.id === album.id);

    // Skip if not in our process list and we have specific albums
    if (specificAlbums.length > 0 && !shouldProcess) {
      results.push(album);
      continue;
    }

    // Skip if already has a valid iTunes cover URL (unless forcing)
    if (!forceRefetch && album.cover_url && album.cover_url.includes('mzstatic.com')) {
      console.log(`Skipping ${i + 1}/${albums.length}: ${album.title} (already has cover)`);
      results.push(album);
      continue;
    }

    const existingCover = album.cover_url;
    console.log(`Processing ${i + 1}/${albums.length}: ${album.title} by ${album.artist}`);

    try {
      const coverUrl = await searchItunes(album);
      if (coverUrl) {
        album.cover_url = coverUrl;
        console.log(`  Found: ${coverUrl.substring(0, 60)}...`);
      } else {
        // Keep existing mzstatic URL if search fails, otherwise clear
        if (existingCover && existingCover.includes('mzstatic.com')) {
          console.log('  Not found, keeping existing cover');
        } else {
          album.cover_url = '';
          console.log('  Not found, using fallback');
        }
      }
    } catch (err) {
      console.error(`  Error: ${err.message}`);
      // Keep existing cover on error if it was valid
      if (!existingCover || !existingCover.includes('mzstatic.com')) {
        album.cover_url = '';
      }
    }

    results.push(album);

    // Save progress every 10 albums
    if (results.length % 10 === 0) {
      // Merge results with remaining albums for complete save
      const remaining = albums.slice(results.length);
      saveAlbums([...results, ...remaining]);
      console.log(`  [Saved progress: ${results.length}/${albums.length}]`);
    }

    // Rate limiting: wait 1 second between requests
    await new Promise(r => setTimeout(r, 1000));
  }

  return results;
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

processAlbums().then(updatedAlbums => {
  saveAlbums(updatedAlbums);
  console.log('\nUpdated albums.js with new cover URLs');
});
