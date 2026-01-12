#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Missing movie IDs from "Funny People Get Serious" puzzle
const MISSING_IDS = [8051, 10322, 86555, 22318, 1125, 87492, 17450, 25793, 1262, 403, 20829];

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

async function getMovie(id) {
  const url = `${BASE_URL}/movie/${id}?language=en-US`;
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
    console.error('Error: TMDB_API_KEY required. Set in .env file.');
    process.exit(1);
  }

  // Read existing movies.js
  const moviesPath = path.join(__dirname, '..', 'movies.js');
  const moviesContent = fs.readFileSync(moviesPath, 'utf8');

  // Parse existing movies
  const match = moviesContent.match(/const MOVIES_DATA = (\[[\s\S]*?\]);?\s*$/m);
  if (!match) {
    console.error('Could not parse movies.js');
    process.exit(1);
  }

  // Use eval to parse the array (since it's JS, not JSON)
  const existingMovies = eval(match[1]);
  const existingIds = new Set(existingMovies.map(m => m.id));

  console.log(`Existing movies: ${existingMovies.length}`);

  const newMovies = [];

  for (const id of MISSING_IDS) {
    if (existingIds.has(id)) {
      console.log(`${id}: already exists, skipping`);
      continue;
    }

    try {
      console.log(`Fetching movie ${id}...`);
      const movie = await getMovie(id);
      const releaseDates = await getMovieReleaseDates(id);
      const usDate = getUSTheatricalRelease(releaseDates) || movie.release_date;

      newMovies.push({
        id: movie.id,
        title: movie.title,
        poster_url: `${POSTER_BASE_URL}${movie.poster_path}`,
        release_date: usDate
      });

      console.log(`  Added: ${movie.title} (${usDate})`);

      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      console.error(`  Error fetching ${id}:`, err.message);
    }
  }

  if (newMovies.length === 0) {
    console.log('No new movies to add.');
    return;
  }

  // Combine and sort by release date
  const allMovies = [...existingMovies, ...newMovies];
  allMovies.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

  // Write back
  const output = `// Movie data from TMDB
// Last updated: ${new Date().toISOString()}
// Total movies: ${allMovies.length}

const MOVIES_DATA = ${JSON.stringify(allMovies, null, 2).replace(/"(\w+)":/g, '$1:')};
`;

  fs.writeFileSync(moviesPath, output);
  console.log(`\nAdded ${newMovies.length} movies. Total: ${allMovies.length}`);
}

main().catch(console.error);
