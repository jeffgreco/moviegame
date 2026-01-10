#!/usr/bin/env node

/**
 * Check for re-release dates in movies.js
 * Looks for classic films that might have re-release dates instead of original dates
 */

const fs = require('fs');
const path = require('path');

// Read movies.js
const moviesPath = path.join(__dirname, '..', 'movies.js');
const moviesContent = fs.readFileSync(moviesPath, 'utf8');

// Extract the MOVIES_DATA array using eval (safe since it's our own file)
const match = moviesContent.match(/const MOVIES_DATA = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not parse movies.js');
    process.exit(1);
}

const movies = eval(match[1]);

// Check for suspicious re-releases
// Look for movies with recent dates (2010+) that might be older films
const suspicious = [];

movies.forEach(movie => {
    const year = new Date(movie.release_date).getFullYear();

    // Flag movies from 2010+ that might be re-releases based on title patterns
    if (year >= 2010) {
        const title = movie.title.toLowerCase();

        // Common indicators of older films:
        // - Roman numerals (Part II, III, etc.)
        // - Classic film titles
        // - Certain directors known for older films
        const hasClassicIndicators =
            title.includes('godfather') ||
            title.includes('apocalypse') ||
            title.includes('coppola') ||
            title.includes('vertigo') ||
            title.includes('rear window') ||
            title.includes('psycho') ||
            title.includes('casablanca') ||
            title.includes('citizen kane') ||
            title.includes('gone with the wind') ||
            (movie.directors && movie.directors.some(d =>
                d.includes('Hitchcock') ||
                d.includes('Kubrick') ||
                d.includes('Kurosawa') ||
                d.includes('Fellini') ||
                d.includes('Bergman')
            ));

        if (hasClassicIndicators) {
            suspicious.push({
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                directors: movie.directors
            });
        }
    }
});

console.log(`Found ${suspicious.length} potentially suspicious re-releases:\n`);
suspicious.forEach(m => {
    console.log(`ID: ${m.id}`);
    console.log(`Title: ${m.title}`);
    console.log(`Date: ${m.release_date}`);
    console.log(`Directors: ${m.directors ? m.directors.join(', ') : 'N/A'}`);
    console.log('---');
});

// Also check our specific director puzzle movies
console.log('\n\nChecking director puzzle movies specifically:\n');

const directorMoviesPath = path.join(__dirname, 'director-movies.json');
const directorData = JSON.parse(fs.readFileSync(directorMoviesPath, 'utf8'));

const movieIdToData = new Map(movies.map(m => [m.id, m]));

const discrepancies = [];

['spielberg', 'scorsese', 'coppola'].forEach(director => {
    directorData.breakdown[director].forEach(puzzleMovie => {
        const actualMovie = movieIdToData.get(puzzleMovie.id);
        if (actualMovie) {
            if (actualMovie.release_date !== puzzleMovie.date) {
                discrepancies.push({
                    id: puzzleMovie.id,
                    title: puzzleMovie.title,
                    expectedDate: puzzleMovie.date,
                    actualDate: actualMovie.release_date,
                    director
                });
            }
        }
    });
});

if (discrepancies.length > 0) {
    console.log(`Found ${discrepancies.length} date discrepancies in director puzzle movies:\n`);
    discrepancies.forEach(d => {
        console.log(`${d.title} (${d.director})`);
        console.log(`  Expected: ${d.expectedDate}`);
        console.log(`  Actual:   ${d.actualDate}`);
        console.log(`  ID: ${d.id}`);
        console.log('---');
    });
} else {
    console.log('All director puzzle movies have correct dates!');
}
