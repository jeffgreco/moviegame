#!/usr/bin/env node

/**
 * Fix release dates for director puzzle movies
 * Uses the correct dates from director-movies.json
 */

const fs = require('fs');
const path = require('path');

// Read movies.js
const moviesPath = path.join(__dirname, '..', 'movies.js');
const moviesContent = fs.readFileSync(moviesPath, 'utf8');

// Extract the MOVIES_DATA array
const match = moviesContent.match(/const MOVIES_DATA = (\[[\s\S]*\]);/);
if (!match) {
    console.error('Could not parse movies.js');
    process.exit(1);
}

const movies = eval(match[1]);

// Load correct dates from director-movies.json
const directorMoviesPath = path.join(__dirname, 'director-movies.json');
const directorData = JSON.parse(fs.readFileSync(directorMoviesPath, 'utf8'));

// Build a map of correct dates
const correctDates = new Map();
['spielberg', 'scorsese', 'coppola'].forEach(director => {
    directorData.breakdown[director].forEach(movie => {
        correctDates.set(movie.id, movie.date);
    });
});

// Check and display all discrepancies
console.log('Checking all director puzzle movies:\n');
let fixCount = 0;

movies.forEach((movie, index) => {
    if (correctDates.has(movie.id)) {
        const correctDate = correctDates.get(movie.id);
        if (movie.release_date !== correctDate) {
            console.log(`${movie.title}`);
            console.log(`  Current: ${movie.release_date}`);
            console.log(`  Correct: ${correctDate}`);
            console.log(`  Fixing...`);
            movies[index].release_date = correctDate;
            fixCount++;
        }
    }
});

if (fixCount === 0) {
    console.log('No date discrepancies found! All dates are correct.');
    process.exit(0);
}

console.log(`\nFixed ${fixCount} date(s).`);

// Write back to movies.js
const timestamp = new Date().toISOString();
const output = `// Movie data - English-language films only
// Fetched from TMDB (https://www.themoviedb.org/)
// Generated: ${timestamp}
// Total movies: ${movies.length}

const MOVIES_DATA = ${JSON.stringify(movies, null, 2).replace(/"([^"]+)":/g, '$1:')};
`;

fs.writeFileSync(moviesPath, output);
console.log(`\nUpdated ${moviesPath}`);
