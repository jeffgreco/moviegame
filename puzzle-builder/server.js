#!/usr/bin/env node

/**
 * Puzzle Builder Server
 *
 * Local Express server that provides:
 * - Static file serving for the GUI
 * - TMDB API proxy (handles CORS and keeps API key secure)
 * - Puzzle export functionality
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PUZZLE_BUILDER_PORT || 3008;

const API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Load existing movies database for checking duplicates
function loadExistingMovies() {
    try {
        const moviesPath = path.join(__dirname, '..', 'movies.js');
        let content = fs.readFileSync(moviesPath, 'utf-8');

        // Replace const/let with var so vm.runInContext captures it
        content = content.replace(/^const MOVIES_DATA/m, 'var MOVIES_DATA');
        content = content.replace(/^let MOVIES_DATA/m, 'var MOVIES_DATA');

        // Use vm module to safely evaluate JavaScript (handles unquoted keys)
        const vm = require('vm');
        const context = {};
        vm.createContext(context);
        vm.runInContext(content, context);

        if (context.MOVIES_DATA && Array.isArray(context.MOVIES_DATA)) {
            return context.MOVIES_DATA;
        }
    } catch (e) {
        console.warn('Could not load movies.js:', e.message);
    }
    return [];
}

// TMDB API helper
async function tmdbFetch(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
            url.searchParams.append(key, value);
        }
    });

    const response = await fetch(url.toString(), {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

// Get US theatrical release date for a movie
async function getUSReleaseDate(movieId) {
    try {
        const data = await tmdbFetch(`/movie/${movieId}/release_dates`);
        const usRelease = data.results?.find(r => r.iso_3166_1 === 'US');
        if (!usRelease) return null;

        // Type 3 = Theatrical, Type 2 = Theatrical (limited)
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
    } catch (e) {
        console.warn(`Could not get release date for movie ${movieId}:`, e.message);
    }
    return null;
}

// Get director(s) for a movie
async function getDirectors(movieId) {
    try {
        const data = await tmdbFetch(`/movie/${movieId}/credits`);
        const directors = data.crew?.filter(c => c.job === 'Director').map(d => d.name) || [];
        return directors;
    } catch (e) {
        console.warn(`Could not get directors for movie ${movieId}:`, e.message);
    }
    return [];
}

// Enrich movie data with poster URL, release date, and directors
async function enrichMovie(movie, includeDirectors = true) {
    const enriched = {
        id: movie.id,
        title: movie.title,
        poster_url: movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : null,
        release_date: movie.release_date || null,
        overview: movie.overview,
        popularity: movie.popularity
    };

    // Get US theatrical release date if we have a generic release date
    if (enriched.release_date) {
        const usDate = await getUSReleaseDate(movie.id);
        if (usDate) {
            enriched.release_date = usDate;
        }
    }

    if (includeDirectors) {
        enriched.directors = await getDirectors(movie.id);
    }

    return enriched;
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        hasApiKey: !!API_KEY,
        timestamp: new Date().toISOString()
    });
});

// Search movies by title
app.get('/api/search/movies', async (req, res) => {
    try {
        const { query, year, page = 1 } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter required' });
        }

        const params = {
            query,
            language: 'en-US',
            page,
            include_adult: false
        };
        if (year) params.year = year;

        const data = await tmdbFetch('/search/movie', params);

        // Enrich first page results with details (limit to avoid rate limiting)
        const enrichedResults = await Promise.all(
            data.results.slice(0, 20).map(m => enrichMovie(m, false))
        );

        res.json({
            ...data,
            results: enrichedResults
        });
    } catch (e) {
        console.error('Search error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Search people (directors, actors)
app.get('/api/search/person', async (req, res) => {
    try {
        const { query, page = 1 } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Query parameter required' });
        }

        const data = await tmdbFetch('/search/person', {
            query,
            language: 'en-US',
            page,
            include_adult: false
        });

        // Only show actors and directors
        const results = data.results
            .filter(person => person.known_for_department === 'Acting' || person.known_for_department === 'Directing')
            .map(person => ({
                id: person.id,
                name: person.name,
                known_for_department: person.known_for_department,
                profile_path: person.profile_path ? `${POSTER_BASE_URL}${person.profile_path}` : null,
                known_for: person.known_for?.slice(0, 3).map(m => m.title || m.name)
            }));

        res.json({ ...data, results });
    } catch (e) {
        console.error('Person search error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Get movies by person (acting and directing credits)
app.get('/api/person/:id/movies', async (req, res) => {
    try {
        const { id } = req.params;
        const { sort = 'date_desc' } = req.query;
        const data = await tmdbFetch(`/person/${id}/movie_credits`);

        // Combine cast (acting) and crew credits, deduped by movie ID
        const movieMap = new Map();

        // Add acting credits
        (data.cast || []).forEach(m => {
            if (!movieMap.has(m.id)) {
                movieMap.set(m.id, {
                    id: m.id,
                    title: m.title,
                    poster_url: m.poster_path ? `${POSTER_BASE_URL}${m.poster_path}` : null,
                    release_date: m.release_date,
                    popularity: m.popularity,
                    roles: []
                });
            }
            if (m.character) {
                movieMap.get(m.id).roles.push(m.character);
            }
        });

        // Add director credits only (not writer, producer, etc.)
        (data.crew || []).filter(m => m.job === 'Director').forEach(m => {
            if (!movieMap.has(m.id)) {
                movieMap.set(m.id, {
                    id: m.id,
                    title: m.title,
                    poster_url: m.poster_path ? `${POSTER_BASE_URL}${m.poster_path}` : null,
                    release_date: m.release_date,
                    popularity: m.popularity,
                    roles: []
                });
            }
            movieMap.get(m.id).roles.push('Director');
        });

        // Convert to array and sort
        const movies = Array.from(movieMap.values());
        switch (sort) {
            case 'date_asc':
                movies.sort((a, b) => (a.release_date || '0000').localeCompare(b.release_date || '0000'));
                break;
            case 'popularity':
                movies.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            case 'date_desc':
            default:
                movies.sort((a, b) => (b.release_date || '0000').localeCompare(a.release_date || '0000'));
                break;
        }

        // Also get person details for the name
        const personData = await tmdbFetch(`/person/${id}`);

        res.json({
            person: {
                id: personData.id,
                name: personData.name
            },
            movies,
            total: movies.length
        });
    } catch (e) {
        console.error('Person movies error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Discover movies with filters
app.get('/api/discover', async (req, res) => {
    try {
        const { genre, yearFrom, yearTo, page = 1, sortBy = 'popularity.desc' } = req.query;

        const params = {
            language: 'en-US',
            sort_by: sortBy,
            page,
            include_adult: false,
            with_original_language: 'en',
            'vote_count.gte': 100
        };

        if (genre) params.with_genres = genre;
        if (yearFrom) params['primary_release_date.gte'] = `${yearFrom}-01-01`;
        if (yearTo) params['primary_release_date.lte'] = `${yearTo}-12-31`;

        const data = await tmdbFetch('/discover/movie', params);

        // Enrich results
        const enrichedResults = await Promise.all(
            data.results.slice(0, 20).map(m => enrichMovie(m, false))
        );

        res.json({
            ...data,
            results: enrichedResults
        });
    } catch (e) {
        console.error('Discover error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Get movie details (full info including directors)
app.get('/api/movie/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await tmdbFetch(`/movie/${id}`);
        const enriched = await enrichMovie(movie, true);
        res.json(enriched);
    } catch (e) {
        console.error('Movie details error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Get genre list
app.get('/api/genres', async (req, res) => {
    try {
        const data = await tmdbFetch('/genre/movie/list', { language: 'en-US' });
        res.json(data);
    } catch (e) {
        console.error('Genres error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Get existing movies (for checking what's in database)
app.get('/api/existing-movies', (req, res) => {
    const movies = loadExistingMovies();
    const movieMap = {};
    movies.forEach(m => {
        movieMap[m.id] = {
            title: m.title,
            release_date: m.release_date,
            poster_url: m.poster_url,
            directors: m.directors,
            showDirector: m.showDirector || false
        };
    });
    res.json({ movies: movieMap, count: movies.length });
});

// Add a single movie to movies.js
app.post('/api/add-movie', async (req, res) => {
    try {
        const { movieId, showDirector } = req.body;
        if (!movieId) {
            return res.status(400).json({ error: 'movieId is required' });
        }

        // Check if already in database
        const existingMovies = loadExistingMovies();
        if (existingMovies.find(m => m.id === movieId)) {
            return res.json({ success: true, alreadyExists: true });
        }

        // Fetch full movie details from TMDB
        const movie = await tmdbFetch(`/movie/${movieId}`);
        const enriched = await enrichMovie(movie, true);

        // Build movie object
        const movieData = {
            id: enriched.id,
            title: enriched.title,
            poster_url: enriched.poster_url,
            release_date: enriched.release_date,
            directors: enriched.directors || []
        };
        if (showDirector) {
            movieData.showDirector = true;
        }

        // Add to database
        const added = mergeMoviesIntoDatabase(existingMovies, [movieData]);

        res.json({
            success: true,
            added: added,
            movie: {
                id: enriched.id,
                title: enriched.title,
                release_date: enriched.release_date,
                directors: enriched.directors,
                showDirector: showDirector || false
            }
        });
    } catch (e) {
        console.error('Failed to add movie:', e);
        res.status(500).json({ error: e.message });
    }
});

// Update a movie's properties in movies.js
app.post('/api/update-movie', (req, res) => {
    try {
        const { movieId, showDirector } = req.body;
        if (!movieId) {
            return res.status(400).json({ error: 'movieId is required' });
        }

        const existingMovies = loadExistingMovies();
        const movieIndex = existingMovies.findIndex(m => m.id === movieId);

        if (movieIndex === -1) {
            return res.status(404).json({ error: 'Movie not found in database' });
        }

        // Update the movie
        if (showDirector) {
            existingMovies[movieIndex].showDirector = true;
        } else {
            delete existingMovies[movieIndex].showDirector;
        }

        // Write back to file
        const moviesPath = path.join(__dirname, '..', 'movies.js');
        const content = `// Movie data from TMDB
// Last updated: ${new Date().toISOString()}
// Total movies: ${existingMovies.length}

var MOVIES_DATA = ${JSON.stringify(existingMovies, null, 2)};
`;
        fs.writeFileSync(moviesPath, content);

        res.json({ success: true });
    } catch (e) {
        console.error('Failed to update movie:', e);
        res.status(500).json({ error: e.message });
    }
});

// Load existing puzzles from dailyPuzzles.js
function loadExistingPuzzles() {
    try {
        const puzzlesPath = path.join(__dirname, '..', 'dailyPuzzles.js');
        const content = fs.readFileSync(puzzlesPath, 'utf-8');
        const match = content.match(/const DAILY_PUZZLES = (\[[\s\S]*?\]);/);
        if (match) {
            // Use eval carefully here since the file contains JS, not JSON
            const puzzles = eval(match[1]);
            return puzzles;
        }
    } catch (e) {
        console.warn('Could not load dailyPuzzles.js:', e.message);
    }
    return [];
}

// Get existing puzzles
app.get('/api/puzzles', (req, res) => {
    const puzzles = loadExistingPuzzles();
    res.json({ puzzles });
});

// Get a specific puzzle with full movie details
app.get('/api/puzzles/:id', (req, res) => {
    const puzzles = loadExistingPuzzles();
    const puzzle = puzzles.find(p => String(p.id) === req.params.id);

    if (!puzzle) {
        return res.status(404).json({ error: 'Puzzle not found' });
    }

    // Load movie database to get full details
    const allMovies = loadExistingMovies();
    const movieMap = new Map(allMovies.map(m => [m.id, m]));

    // Build full movie details for each movie ID in the puzzle
    const movies = puzzle.movieIds.map(id => {
        const movie = movieMap.get(id);
        if (movie) {
            return {
                id: movie.id,
                title: movie.title,
                poster_url: movie.poster_url,
                release_date: movie.release_date,
                directors: movie.directors || []
            };
        }
        return { id, title: `Unknown (${id})`, poster_url: null, release_date: null, directors: [] };
    });

    res.json({
        puzzle: {
            id: puzzle.id,
            theme: puzzle.theme,
            description: puzzle.description || '',
            startDate: puzzle.startDate
        },
        movies
    });
});

// List exported puzzle files
app.get('/api/exports', (req, res) => {
    const outputDir = path.join(__dirname, 'output');
    try {
        const files = fs.readdirSync(outputDir)
            .filter(f => f.endsWith('.json'))
            .map(f => {
                const filePath = path.join(outputDir, f);
                const stat = fs.statSync(filePath);
                // Try to read the theme from the file
                let theme = 'Unknown';
                try {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                    theme = content.puzzle?.theme || 'Unknown';
                } catch (e) {}
                return {
                    filename: f,
                    theme,
                    modified: stat.mtime
                };
            })
            .sort((a, b) => new Date(b.modified) - new Date(a.modified)); // newest first
        res.json({ files });
    } catch (e) {
        res.json({ files: [] });
    }
});

// Load an exported puzzle file
app.get('/api/exports/:filename', (req, res) => {
    const { filename } = req.params;
    // Sanitize filename to prevent path traversal
    if (filename.includes('..') || filename.includes('/')) {
        return res.status(400).json({ error: 'Invalid filename' });
    }

    const filePath = path.join(__dirname, 'output', filename);
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        res.json(content);
    } catch (e) {
        res.status(404).json({ error: 'File not found' });
    }
});

// Schedule management
const SCHEDULE_FILE = path.join(__dirname, 'schedule.json');

function loadSchedule() {
    // Load schedule from dailyPuzzles.js (the source of truth)
    try {
        const puzzlesPath = path.join(__dirname, '..', 'dailyPuzzles.js');
        const content = fs.readFileSync(puzzlesPath, 'utf-8');
        const match = content.match(/const PUZZLE_SCHEDULE = \{([\s\S]*?)\};/);
        if (match) {
            // Parse the schedule object from JS
            const scheduleStr = '{' + match[1] + '}';
            // Use Function to safely evaluate the JS object
            const schedule = Function('"use strict"; return (' + scheduleStr + ')')();
            return schedule;
        }
    } catch (e) {
        console.warn('Could not load schedule from dailyPuzzles.js:', e.message);
    }
    return {};
}

function saveSchedule(schedule) {
    // Save to local JSON for the builder
    fs.writeFileSync(SCHEDULE_FILE, JSON.stringify(schedule, null, 2));

    // Also update dailyPuzzles.js to include the schedule
    updateDailyPuzzlesWithSchedule(schedule);
}

function updateDailyPuzzlesWithSchedule(schedule) {
    const puzzlesPath = path.join(__dirname, '..', 'dailyPuzzles.js');
    let content = fs.readFileSync(puzzlesPath, 'utf-8');

    // Generate the schedule constant (puzzle IDs are strings)
    const scheduleEntries = Object.entries(schedule)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, puzzleId]) => `  "${date}": "${puzzleId}"`)
        .join(',\n');

    const scheduleBlock = `// Puzzle schedule - maps specific dates to puzzle IDs\n// Generated by puzzle-builder\nconst PUZZLE_SCHEDULE = {\n${scheduleEntries}\n};`;

    // Check if PUZZLE_SCHEDULE already exists
    if (content.includes('const PUZZLE_SCHEDULE')) {
        // Replace existing schedule
        content = content.replace(
            /\/\/ Puzzle schedule[\s\S]*?const PUZZLE_SCHEDULE = \{[\s\S]*?\};/,
            scheduleBlock
        );
    } else {
        // Insert before DAILY_PUZZLES
        content = content.replace(
            /const DAILY_PUZZLES = \[/,
            `${scheduleBlock}\n\nconst DAILY_PUZZLES = [`
        );
    }

    // Update getPuzzleForDate to check schedule first (if not already updated)
    if (!content.includes('PUZZLE_SCHEDULE[dateStr]')) {
        content = content.replace(
            /function getPuzzleForDate\(date\) \{[\s\S]*?return DAILY_PUZZLES\[puzzleIndex\];\s*\}/,
            `function getPuzzleForDate(date) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0); // Normalize to start of day

  // Check if there's a scheduled puzzle for this date
  const dateStr = targetDate.toISOString().split('T')[0];
  if (PUZZLE_SCHEDULE[dateStr]) {
    const scheduled = DAILY_PUZZLES.find(p => p.id === PUZZLE_SCHEDULE[dateStr]);
    if (scheduled) return scheduled;
  }

  // Fall back to rotation
  const firstPuzzle = DAILY_PUZZLES[0];
  const firstDate = new Date(firstPuzzle.startDate);
  firstDate.setHours(0, 0, 0, 0);

  // If before first puzzle, return null
  if (targetDate < firstDate) {
    return null;
  }

  // Calculate which puzzle to show (cycles through available puzzles)
  const daysSinceFirst = Math.floor(
    (targetDate - firstDate) / (1000 * 60 * 60 * 24)
  );
  const puzzleIndex = daysSinceFirst % DAILY_PUZZLES.length;

  return DAILY_PUZZLES[puzzleIndex];
}`
        );
    }

    fs.writeFileSync(puzzlesPath, content);
    console.log('Updated dailyPuzzles.js with schedule');
}

// Get schedule
app.get('/api/schedule', (req, res) => {
    const schedule = loadSchedule();
    const puzzles = loadExistingPuzzles();
    res.json({
        schedule,
        puzzles: puzzles.map(p => ({ id: p.id, theme: p.theme }))
    });
});

// Update schedule
app.post('/api/schedule', (req, res) => {
    try {
        const { schedule } = req.body;
        if (!schedule || typeof schedule !== 'object') {
            return res.status(400).json({ error: 'Invalid schedule data' });
        }
        saveSchedule(schedule);
        res.json({ success: true });
    } catch (e) {
        console.error('Failed to save schedule:', e);
        res.status(500).json({ error: e.message });
    }
});

// Generate a random 5-character alphanumeric ID
function generatePuzzleId() {
    const chars = 'abcdefghjkmnpqrstvwxyz23456789'; // avoid confusing chars like 0/o, 1/l, i
    let id = '';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// Save puzzle directly to dailyPuzzles.js
app.post('/api/puzzles', async (req, res) => {
    try {
        const { theme, description, movies, addToDatabase } = req.body;

        if (!theme || !movies || movies.length === 0) {
            return res.status(400).json({ error: 'Theme and movies are required' });
        }

        // Load existing puzzles and generate a unique ID
        const existingPuzzles = loadExistingPuzzles();
        const existingIds = new Set(existingPuzzles.map(p => String(p.id)));
        let newId = generatePuzzleId();
        while (existingIds.has(newId)) {
            newId = generatePuzzleId();
        }

        // Handle adding new movies to database
        let moviesAdded = 0;
        if (addToDatabase) {
            const existingMovies = loadExistingMovies();
            const existingIds = new Set(existingMovies.map(m => m.id));
            const newMovies = movies.filter(m => !existingIds.has(m.id));
            if (newMovies.length > 0) {
                moviesAdded = mergeMoviesIntoDatabase(existingMovies, newMovies);
            }
        }

        // Create the puzzle entry
        const movieIds = movies.map(m => m.id);
        const puzzleEntry = generatePuzzleEntry(newId, theme, description, movies);

        // Read and update dailyPuzzles.js
        const puzzlesPath = path.join(__dirname, '..', 'dailyPuzzles.js');
        let content = fs.readFileSync(puzzlesPath, 'utf-8');

        // Find the end of DAILY_PUZZLES array and insert before the closing bracket
        // Look for the comment about future puzzles or the closing ];
        const insertPoint = content.lastIndexOf('// Future puzzles will be added here');
        if (insertPoint !== -1) {
            content = content.slice(0, insertPoint) + puzzleEntry + '\n  ' + content.slice(insertPoint);
        } else {
            // Fallback: insert before the last ];
            const lastBracket = content.lastIndexOf('];');
            if (lastBracket !== -1) {
                content = content.slice(0, lastBracket) + puzzleEntry + '\n' + content.slice(lastBracket);
            }
        }

        fs.writeFileSync(puzzlesPath, content);

        res.json({
            success: true,
            puzzleId: newId,
            moviesAddedToDatabase: moviesAdded
        });
    } catch (e) {
        console.error('Failed to save puzzle:', e);
        res.status(500).json({ error: e.message });
    }
});

function formatDate(dateStr) {
    if (!dateStr) return '????';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function generatePuzzleEntry(id, theme, description, movies) {
    const lines = [
        '  {',
        `    id: "${id}",`,
        `    theme: "${theme}",`,
        `    description: "${description || ''}",`,
        '    movieIds: ['
    ];

    movies.forEach(m => {
        const dateDisplay = formatDate(m.release_date);
        lines.push(`      ${m.id}, // ${m.title} (${dateDisplay})`);
    });

    lines.push('    ],');
    lines.push('  },');

    return lines.join('\n');
}

// Export puzzle
app.post('/api/export', async (req, res) => {
    try {
        const { theme, description, movies, addToDatabase } = req.body;

        if (!theme || !movies || movies.length === 0) {
            return res.status(400).json({ error: 'Theme and movies are required' });
        }

        // Load existing movies to check for new ones
        const existingMovies = loadExistingMovies();
        const existingIds = new Set(existingMovies.map(m => m.id));

        // Separate movies into existing and new
        const movieIds = movies.map(m => m.id);
        const newMovies = movies.filter(m => !existingIds.has(m.id));

        // If addToDatabase is true and there are new movies, merge them into movies.js
        let moviesAdded = 0;
        if (addToDatabase && newMovies.length > 0) {
            moviesAdded = mergeMoviesIntoDatabase(existingMovies, newMovies);
        }

        // Create puzzle object
        const puzzle = {
            id: null, // To be assigned manually
            theme,
            description: description || '',
            movieIds
        };

        // Create output object
        const output = {
            generated: new Date().toISOString(),
            puzzle,
            movieDetails: movies.map(m => ({
                id: m.id,
                title: m.title,
                release_date: m.release_date,
                directors: m.directors || [],
                poster_url: m.poster_url
            })),
            newMoviesForDatabase: addToDatabase ? [] : newMovies.map(m => ({
                id: m.id,
                title: m.title,
                poster_url: m.poster_url,
                release_date: m.release_date,
                directors: m.directors || []
            }))
        };

        // Generate JS snippet for dailyPuzzles.js
        const jsSnippet = generateJSSnippet(puzzle, movies);

        // Save to output directory
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputDir = path.join(__dirname, 'output');

        const jsonPath = path.join(outputDir, `puzzle-${timestamp}.json`);
        const jsPath = path.join(outputDir, `puzzle-${timestamp}.js`);

        fs.writeFileSync(jsonPath, JSON.stringify(output, null, 2));
        fs.writeFileSync(jsPath, jsSnippet);

        res.json({
            success: true,
            jsonFile: `puzzle-${timestamp}.json`,
            jsFile: `puzzle-${timestamp}.js`,
            newMoviesCount: newMovies.length,
            moviesAddedToDatabase: moviesAdded,
            totalMovies: movies.length
        });
    } catch (e) {
        console.error('Export error:', e);
        res.status(500).json({ error: e.message });
    }
});

// Merge new movies into movies.js
function mergeMoviesIntoDatabase(existingMovies, newMovies) {
    const moviesPath = path.join(__dirname, '..', 'movies.js');

    // Format new movies for the database
    const formattedNewMovies = newMovies.map(m => ({
        id: m.id,
        title: m.title,
        poster_url: m.poster_url,
        release_date: m.release_date,
        ...(m.directors && m.directors.length > 0 ? { directors: m.directors } : {})
    }));

    // Combine and sort by release date
    const allMovies = [...existingMovies, ...formattedNewMovies];
    allMovies.sort((a, b) => {
        const dateA = a.release_date || '0000-00-00';
        const dateB = b.release_date || '0000-00-00';
        return dateA.localeCompare(dateB);
    });

    // Generate the new movies.js content
    // Use var instead of const so vm.runInContext can capture the variable
    const content = `// Movie data from TMDB
// Last updated: ${new Date().toISOString()}
// Total movies: ${allMovies.length}

var MOVIES_DATA = ${JSON.stringify(allMovies, null, 2)};
`;

    fs.writeFileSync(moviesPath, content);
    console.log(`Added ${formattedNewMovies.length} new movies to movies.js`);

    return formattedNewMovies.length;
}

function generateJSSnippet(puzzle, movies) {
    const lines = [
        '// Add this to dailyPuzzles.js',
        '{',
        `  id: /* assign next available ID */,`,
        `  theme: "${puzzle.theme}",`,
        `  description: "${puzzle.description}",`,
        `  movieIds: [`
    ];

    // Group by difficulty sections based on order
    const totalMovies = movies.length;
    const easyCount = Math.ceil(totalMovies * 0.25);
    const mediumCount = Math.ceil(totalMovies * 0.5);

    movies.forEach((movie, index) => {
        let section = '';
        if (index === 0) section = '    // EASY';
        else if (index === easyCount) section = '\n    // MEDIUM';
        else if (index === mediumCount) section = '\n    // HARD';

        if (section) lines.push(section);

        const dateDisplay = formatDate(movie.release_date);
        lines.push(`    ${movie.id}, // ${movie.title} (${dateDisplay})`);
    });

    lines.push('  ],');
    lines.push('},');

    return lines.join('\n');
}

// Start server
app.listen(PORT, () => {
    console.log('');
    console.log('=================================');
    console.log('   Puzzle Builder Server');
    console.log('=================================');
    console.log('');

    if (!API_KEY) {
        console.error('WARNING: TMDB_API_KEY not set!');
        console.error('');
        console.error('Set it in your .env file:');
        console.error('  TMDB_API_KEY=your_api_key');
        console.error('');
        console.error('Get a free key at: https://www.themoviedb.org/settings/api');
        console.error('');
    } else {
        console.log('TMDB API key loaded');
    }

    console.log(`Server running at: http://localhost:${PORT}`);
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
});
