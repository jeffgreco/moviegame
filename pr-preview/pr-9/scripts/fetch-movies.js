#!/usr/bin/env node

/**
 * TMDB Movie Data Fetcher
 *
 * Fetches English-language movies from TMDB:
 * - 1968-1983: Top 10 movies per year
 * - 1984-present: Top 25 movies per year
 *
 * Filters: English original language, initial release year only, vote_count >= 500
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
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Configuration
const START_YEAR = 1968;
const CURRENT_YEAR = new Date().getFullYear();
const EARLY_ERA_END = 1983; // Years 1968-1983 get fewer movies
const MOVIES_PER_YEAR_EARLY = 10; // Top 10 for 1968-1983
const MOVIES_PER_YEAR_MODERN = 25; // Top 25 for 1984+

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

async function getMoviesByYear(year, page = 1) {
    // Use discover endpoint to get movies by year, sorted by popularity
    // with_original_language=en ensures we only get English-language films
    // primary_release_year ensures we get the initial release year (no re-releases)
    // vote_count.gte=500 filters out obscure movies (only well-known films)
    const url = `${BASE_URL}/discover/movie?language=en-US&sort_by=popularity.desc&primary_release_year=${year}&page=${page}&with_original_language=en&vote_count.gte=500`;
    return fetchJSON(url);
}

async function getMovieReleaseDates(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/release_dates`;
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

function getCompletePosterURL(posterPath) {
    if (!posterPath) return null;
    return `${POSTER_BASE_URL}${posterPath}`;
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

    console.log(`Fetching movies from ${START_YEAR}-${CURRENT_YEAR}:`);
    console.log(`  ${START_YEAR}-${EARLY_ERA_END}: top ${MOVIES_PER_YEAR_EARLY} per year`);
    console.log(`  ${EARLY_ERA_END + 1}-${CURRENT_YEAR}: top ${MOVIES_PER_YEAR_MODERN} per year`);
    console.log('This will take a while due to API rate limiting...\n');

    const allMovies = new Map(); // Use Map to deduplicate by ID
    const yearStats = {};

    // Iterate through each year
    for (let year = START_YEAR; year <= CURRENT_YEAR; year++) {
        // Determine how many movies to fetch for this year
        const targetMoviesForYear = year <= EARLY_ERA_END ? MOVIES_PER_YEAR_EARLY : MOVIES_PER_YEAR_MODERN;

        console.log(`Fetching top ${targetMoviesForYear} movies from ${year}...`);
        let yearMovieCount = 0;
        let page = 1;

        try {
            // Keep fetching pages until we have enough movies for this year
            while (yearMovieCount < targetMoviesForYear) {
                const data = await getMoviesByYear(year, page);

                if (!data.results || data.results.length === 0) {
                    break; // No more results for this year
                }

                for (const movie of data.results) {
                    if (yearMovieCount >= targetMoviesForYear) break;

                    // Only add movies with posters and valid release dates
                    if (!allMovies.has(movie.id) && movie.poster_path && movie.release_date) {
                        allMovies.set(movie.id, movie);
                        yearMovieCount++;
                    }
                }

                // If we've checked all pages, break
                if (page >= data.total_pages) break;
                page++;

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            yearStats[year] = yearMovieCount;
            console.log(`  Found ${yearMovieCount} movies from ${year}`);

        } catch (error) {
            console.error(`  Error fetching movies from ${year}:`, error.message);
            yearStats[year] = 0;
        }
    }

    console.log(`\nTotal unique movies found: ${allMovies.size}`);
    console.log('Fetching US theatrical release dates...\n');

    const moviesWithDates = [];
    let processed = 0;

    for (const movie of allMovies.values()) {
        processed++;
        if (processed % 50 === 0) {
            console.log(`Processing ${processed}/${allMovies.size}...`);
        }

        try {
            const releaseDates = await getMovieReleaseDates(movie.id);
            const usDate = getUSTheatricalRelease(releaseDates);
            const posterURL = getCompletePosterURL(movie.poster_path);

            if (usDate && posterURL) {
                moviesWithDates.push({
                    id: movie.id,
                    title: movie.title,
                    poster_url: posterURL,
                    release_date: usDate
                });
            }
        } catch (error) {
            // Use original release date as fallback
            const posterURL = getCompletePosterURL(movie.poster_path);
            if (movie.release_date && posterURL) {
                moviesWithDates.push({
                    id: movie.id,
                    title: movie.title,
                    poster_url: posterURL,
                    release_date: movie.release_date
                });
            }
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Sort by release date
    moviesWithDates.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

    console.log(`\nSuccessfully processed ${moviesWithDates.length} movies with complete data`);

    // Write to movies.js
    const outputPath = path.join(__dirname, '..', 'movies.js');
    const output = `// Movie data - English-language films only
// ${START_YEAR}-${EARLY_ERA_END}: Top ${MOVIES_PER_YEAR_EARLY} per year | ${EARLY_ERA_END + 1}-${CURRENT_YEAR}: Top ${MOVIES_PER_YEAR_MODERN} per year
// Fetched from TMDB (https://www.themoviedb.org/)
// Generated: ${new Date().toISOString()}
// Total movies: ${moviesWithDates.length}

const MOVIES_DATA = ${JSON.stringify(moviesWithDates, null, 2)};
`;

    fs.writeFileSync(outputPath, output);
    console.log(`\nWritten to ${outputPath}`);

    // Show detailed stats
    const moviesByYear = {};
    moviesWithDates.forEach(movie => {
        const year = new Date(movie.release_date).getFullYear();
        moviesByYear[year] = (moviesByYear[year] || 0) + 1;
    });

    console.log('\nMovies per year:');
    const years = Object.keys(moviesByYear).sort();
    for (const year of years) {
        console.log(`  ${year}: ${moviesByYear[year]} movies`);
    }
}

fetchMovies().catch(console.error);
