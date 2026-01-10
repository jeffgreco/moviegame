#!/usr/bin/env node

/**
 * Fetch Michael Mann's films and add them to movies.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Michael Mann's TMDB person ID
const MICHAEL_MANN_ID = 638;

async function fetchJSON(url) {
  const headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  };
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

async function getDirectorMovies(personId) {
  const url = `${BASE_URL}/person/${personId}/movie_credits`;
  return fetchJSON(url);
}

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}`;
  return fetchJSON(url);
}

async function getMovieReleaseDates(movieId) {
  const url = `${BASE_URL}/movie/${movieId}/release_dates`;
  return fetchJSON(url);
}

function getUSTheatricalRelease(releaseDatesData) {
  const usRelease = releaseDatesData.results?.find(r => r.iso_3166_1 === 'US');
  if (!usRelease) return null;

  const theatricalTypes = [3, 2, 1, 4, 5, 6];
  for (const type of theatricalTypes) {
    const release = usRelease.release_dates.find(r => r.type === type && r.release_date);
    if (release) {
      return release.release_date.split('T')[0];
    }
  }

  if (usRelease.release_dates.length > 0 && usRelease.release_dates[0].release_date) {
    return usRelease.release_dates[0].release_date.split('T')[0];
  }
  return null;
}

async function main() {
  if (!API_KEY) {
    console.error('Error: TMDB_API_KEY required in .env file');
    process.exit(1);
  }

  console.log('Fetching Michael Mann\'s filmography...\n');

  const credits = await getDirectorMovies(MICHAEL_MANN_ID);
  const directed = credits.crew.filter(c => c.job === 'Director');

  console.log(`Found ${directed.length} films directed by Michael Mann:\n`);

  const newMovies = [];

  for (const movie of directed) {
    console.log(`Processing: ${movie.title} (${movie.release_date?.slice(0,4) || 'N/A'})`);

    try {
      const [details, releaseDates] = await Promise.all([
        getMovieDetails(movie.id),
        getMovieReleaseDates(movie.id)
      ]);

      const usDate = getUSTheatricalRelease(releaseDates) || movie.release_date;

      if (details.poster_path && usDate) {
        newMovies.push({
          id: movie.id,
          title: movie.title,
          poster_url: `${POSTER_BASE_URL}${details.poster_path}`,
          release_date: usDate,
          directors: ['Michael Mann']
        });
        console.log(`  -> Added (ID: ${movie.id}, Date: ${usDate})`);
      } else {
        console.log(`  -> Skipped (missing poster or date)`);
      }
    } catch (err) {
      console.log(`  -> Error: ${err.message}`);
    }

    await new Promise(r => setTimeout(r, 100));
  }

  // Read existing movies.js
  const moviesPath = path.join(__dirname, '..', 'movies.js');
  let moviesContent = fs.readFileSync(moviesPath, 'utf8');

  // Extract existing movie IDs
  const existingIds = new Set();
  const idMatches = moviesContent.matchAll(/id:\s*(\d+)/g);
  for (const match of idMatches) {
    existingIds.add(parseInt(match[1]));
  }

  // Filter to only new movies
  const moviesToAdd = newMovies.filter(m => !existingIds.has(m.id));

  console.log(`\n${moviesToAdd.length} new movies to add (${newMovies.length - moviesToAdd.length} already in database)`);

  if (moviesToAdd.length === 0) {
    console.log('No new movies to add.');
    return;
  }

  // Parse existing MOVIES_DATA array
  const startMarker = 'const MOVIES_DATA = ';
  const startIdx = moviesContent.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('Could not find MOVIES_DATA in movies.js');
    process.exit(1);
  }

  const arrayStart = startIdx + startMarker.length;
  const arrayContent = moviesContent.slice(arrayStart).replace(/;\s*$/, '');

  let moviesData;
  try {
    moviesData = eval(arrayContent);
  } catch (e) {
    console.error('Could not evaluate MOVIES_DATA:', e.message);
    process.exit(1);
  }

  // Add new movies
  moviesData.push(...moviesToAdd);

  // Sort by release date
  moviesData.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  // Regenerate file
  const header = moviesContent.substring(0, startIdx);
  const newContent = header + 'const MOVIES_DATA = ' + JSON.stringify(moviesData, null, 2) + ';\n';

  fs.writeFileSync(moviesPath, newContent);

  console.log(`\nAdded ${moviesToAdd.length} Michael Mann films to movies.js`);
  console.log('\nNew movies added:');
  moviesToAdd.forEach(m => console.log(`  - ${m.title} (${m.release_date}) [ID: ${m.id}]`));
}

main().catch(console.error);
