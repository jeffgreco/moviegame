#!/usr/bin/env node

/**
 * Adds director information to existing movies
 * Fetches crew data from TMDB and adds director field to each movie
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

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

async function getMovieCredits(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/credits`;
    return fetchJSON(url);
}

function getDirectors(creditsData) {
    if (!creditsData.crew) return [];
    return creditsData.crew
        .filter(person => person.job === 'Director')
        .map(person => person.name);
}

async function addDirectorsToMovies() {
    if (!API_KEY) {
        console.error('Error: TMDB_API_KEY environment variable is required');
        process.exit(1);
    }

    // Read existing movies
    const moviesPath = path.join(__dirname, '..', 'movies.js');
    const moviesContent = fs.readFileSync(moviesPath, 'utf8');

    // Extract the MOVIES_DATA array
    const match = moviesContent.match(/const MOVIES_DATA = (\[[\s\S]*\]);/);
    if (!match) {
        console.error('Could not parse movies.js');
        process.exit(1);
    }

    const movies = JSON.parse(match[1]);
    console.log(`Processing ${movies.length} movies...\n`);

    const moviesWithDirectors = [];
    let processed = 0;

    for (const movie of movies) {
        processed++;
        if (processed % 50 === 0) {
            console.log(`Processing ${processed}/${movies.length}...`);
        }

        try {
            const credits = await getMovieCredits(movie.id);
            const directors = getDirectors(credits);

            moviesWithDirectors.push({
                ...movie,
                directors: directors
            });

            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 50));
        } catch (error) {
            console.error(`Error fetching credits for ${movie.title}:`, error.message);
            // Keep movie without directors
            moviesWithDirectors.push({
                ...movie,
                directors: []
            });
        }
    }

    console.log(`\nSuccessfully processed ${moviesWithDirectors.length} movies`);

    // Write updated movies.js
    const output = `// Movie data - English-language films only
// Fetched from TMDB (https://www.themoviedb.org/)
// Generated: ${new Date().toISOString()}
// Total movies: ${moviesWithDirectors.length}

const MOVIES_DATA = ${JSON.stringify(moviesWithDirectors, null, 2)};
`;

    fs.writeFileSync(moviesPath, output);
    console.log(`\nWritten to ${moviesPath}`);

    // Find movies by our target directors
    const spielberg = moviesWithDirectors.filter(m =>
        m.directors.includes('Steven Spielberg')
    );
    const scorsese = moviesWithDirectors.filter(m =>
        m.directors.includes('Martin Scorsese')
    );
    const coppola = moviesWithDirectors.filter(m =>
        m.directors.includes('Francis Ford Coppola')
    );

    console.log('\nDirector Statistics:');
    console.log(`  Steven Spielberg: ${spielberg.length} movies`);
    console.log(`  Martin Scorsese: ${scorsese.length} movies`);
    console.log(`  Francis Ford Coppola: ${coppola.length} movies`);
    console.log(`  Total: ${spielberg.length + scorsese.length + coppola.length} movies`);

    // Save list of IDs for daily puzzle
    const directorMovieIds = [
        ...spielberg.map(m => m.id),
        ...scorsese.map(m => m.id),
        ...coppola.map(m => m.id)
    ];

    const puzzleData = {
        theme: 'Spielberg, Scorsese & Coppola',
        movieIds: directorMovieIds,
        breakdown: {
            spielberg: spielberg.map(m => ({ id: m.id, title: m.title, date: m.release_date })),
            scorsese: scorsese.map(m => ({ id: m.id, title: m.title, date: m.release_date })),
            coppola: coppola.map(m => ({ id: m.id, title: m.title, date: m.release_date }))
        }
    };

    const puzzlePath = path.join(__dirname, 'director-movies.json');
    fs.writeFileSync(puzzlePath, JSON.stringify(puzzleData, null, 2));
    console.log(`\nSaved director movie list to ${puzzlePath}`);
}

addDirectorsToMovies().catch(console.error);
