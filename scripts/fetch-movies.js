#!/usr/bin/env node

/**
 * TMDB Movie Data Fetcher
 *
 * Fetches popular movies from TMDB and outputs them to movies.js
 *
 * Usage:
 *   TMDB_API_KEY=your_api_key node scripts/fetch-movies.js
 *
 * Or create a .env file with TMDB_API_KEY=your_key
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// How many movies to fetch (will fetch from multiple pages)
const TARGET_MOVIE_COUNT = 200;
const MOVIES_PER_PAGE = 20;

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

async function getPopularMovies(page = 1) {
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchJSON(url);
}

async function getTopRatedMovies(page = 1) {
    const url = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
    return fetchJSON(url);
}

async function getMovieReleaseDates(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/release_dates?api_key=${API_KEY}`;
    return fetchJSON(url);
}

function getUSTheatricalRelease(releaseDatesData) {
    // Find US release dates
    const usRelease = releaseDatesData.results?.find(r => r.iso_3166_1 === 'US');
    if (!usRelease) return null;

    // Type 3 = Theatrical release, Type 2 = Theatrical (limited)
    // Prefer type 3, fall back to type 2, then any
    const theatricalTypes = [3, 2, 1, 4, 5, 6];

    for (const type of theatricalTypes) {
        const release = usRelease.release_dates.find(r => r.type === type && r.release_date);
        if (release) {
            return release.release_date.split('T')[0]; // Return just the date part
        }
    }

    // Fall back to first available date
    if (usRelease.release_dates.length > 0 && usRelease.release_dates[0].release_date) {
        return usRelease.release_dates[0].release_date.split('T')[0];
    }

    return null;
}

async function fetchMovies() {
    if (!API_KEY) {
        console.error('Error: TMDB_API_KEY environment variable is required');
        console.error('');
        console.error('Get your free API key at: https://www.themoviedb.org/settings/api');
        console.error('');
        console.error('Usage:');
        console.error('  TMDB_API_KEY=your_api_key npm run fetch-movies');
        process.exit(1);
    }

    console.log('Fetching movies from TMDB...');

    const allMovies = new Map(); // Use Map to deduplicate by ID

    // Fetch from both popular and top_rated for variety
    const sources = [
        { name: 'popular', fetcher: getPopularMovies },
        { name: 'top_rated', fetcher: getTopRatedMovies }
    ];

    for (const source of sources) {
        const pagesNeeded = Math.ceil(TARGET_MOVIE_COUNT / MOVIES_PER_PAGE / sources.length);

        for (let page = 1; page <= pagesNeeded; page++) {
            console.log(`Fetching ${source.name} page ${page}...`);
            try {
                const data = await source.fetcher(page);
                for (const movie of data.results) {
                    if (!allMovies.has(movie.id) && movie.poster_path) {
                        allMovies.set(movie.id, movie);
                    }
                }
            } catch (error) {
                console.error(`Error fetching ${source.name} page ${page}:`, error.message);
            }

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    console.log(`Found ${allMovies.size} unique movies with posters`);
    console.log('Fetching US release dates...');

    const moviesWithDates = [];
    let processed = 0;

    for (const movie of allMovies.values()) {
        processed++;
        if (processed % 20 === 0) {
            console.log(`Processing ${processed}/${allMovies.size}...`);
        }

        try {
            const releaseDates = await getMovieReleaseDates(movie.id);
            const usDate = getUSTheatricalRelease(releaseDates);

            if (usDate) {
                moviesWithDates.push({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: usDate,
                    overview: movie.overview?.substring(0, 200) || ''
                });
            }
        } catch (error) {
            // Use original release date as fallback
            if (movie.release_date) {
                moviesWithDates.push({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    release_date: movie.release_date,
                    overview: movie.overview?.substring(0, 200) || ''
                });
            }
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Sort by release date
    moviesWithDates.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    console.log(`Successfully processed ${moviesWithDates.length} movies with US release dates`);

    // Write to movies.js
    const outputPath = path.join(__dirname, '..', 'movies.js');
    const output = `// Movie data fetched from TMDB
// Generated: ${new Date().toISOString()}
// Total movies: ${moviesWithDates.length}

const MOVIES_DATA = ${JSON.stringify(moviesWithDates, null, 2)};
`;

    fs.writeFileSync(outputPath, output);
    console.log(`Written to ${outputPath}`);

    // Show some stats
    const years = moviesWithDates.map(m => new Date(m.release_date).getFullYear());
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    console.log(`Year range: ${minYear} - ${maxYear}`);
}

fetchMovies().catch(console.error);
