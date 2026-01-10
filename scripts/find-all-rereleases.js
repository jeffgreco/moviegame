#!/usr/bin/env node

/**
 * Comprehensive check for re-releases in entire movies.js
 * Looks for patterns that suggest a movie might have a re-release date
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

console.log(`Analyzing ${movies.length} movies for potential re-releases...\n`);

// Patterns that suggest a classic film
const classicPatterns = [
    /godfather/i,
    /apocalypse/i,
    /vertigo/i,
    /rear window/i,
    /psycho(?!\s+pass)/i,  // Psycho but not Psycho Pass
    /casablanca/i,
    /citizen kane/i,
    /gone with the wind/i,
    /wizard of oz/i,
    /star wars/i,
    /empire strikes/i,
    /jaws/i,
    /alien(?!s)/i,  // Alien but not Aliens
    /blade runner/i,
    /2001.*space odyssey/i,
    /clockwork orange/i,
    /shining(?!\s+nikki)/i,
    /exorcist/i,
    /rosemary.*baby/i,
    /taxi driver/i,
    /one flew.*cuckoo/i,
    /chinatown/i,
    /raiders.*lost ark/i,
    /e\.t\./i,
    /breakfast.*tiffany/i,
    /lawrence.*arabia/i,
    /rebel without.*cause/i,
    /seventh seal/i,
    /rashomon/i,
    /seven samurai/i,
    /8.*½/i,  // Fellini's 8½
    /la dolce vita/i,
    /bicycle thief/i,
    /battleship potemkin/i
];

// Classic directors who made films before 1980
const classicDirectors = [
    'Alfred Hitchcock',
    'Stanley Kubrick',
    'Francis Ford Coppola',
    'Martin Scorsese',
    'Steven Spielberg',
    'Akira Kurosawa',
    'Federico Fellini',
    'Ingmar Bergman',
    'Orson Welles',
    'Billy Wilder',
    'John Ford',
    'Howard Hawks',
    'Sergio Leone',
    'Roman Polanski',
    'William Friedkin',
    'Ridley Scott',
    'George Lucas',
    'Brian De Palma'
];

const suspicious = [];

movies.forEach(movie => {
    const year = new Date(movie.release_date).getFullYear();
    const title = movie.title;

    // Check if it's a potentially classic film released in 2000+
    if (year >= 2000) {
        let isClassic = false;
        let reason = '';

        // Check title patterns
        for (const pattern of classicPatterns) {
            if (pattern.test(title)) {
                isClassic = true;
                reason = `Title matches classic pattern: ${pattern}`;
                break;
            }
        }

        // Check directors
        if (!isClassic && movie.directors) {
            for (const director of movie.directors) {
                if (classicDirectors.includes(director)) {
                    // Only flag if the director AND the year seems suspiciously late
                    // (e.g., Kubrick died in 1999, so 2010 release would be suspicious)
                    if (year >= 2010) {
                        isClassic = true;
                        reason = `Classic director "${director}" with suspiciously late date (${year})`;
                        break;
                    }
                }
            }
        }

        if (isClassic) {
            suspicious.push({
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                year: year,
                directors: movie.directors || [],
                reason: reason
            });
        }
    }
});

if (suspicious.length === 0) {
    console.log('✓ No suspicious re-releases found!');
} else {
    console.log(`Found ${suspicious.length} potentially suspicious re-releases:\n`);
    console.log('=' .repeat(80));

    suspicious.forEach(m => {
        console.log(`\nID: ${m.id}`);
        console.log(`Title: ${m.title}`);
        console.log(`Date: ${m.release_date} (Year: ${m.year})`);
        console.log(`Directors: ${m.directors.join(', ') || 'N/A'}`);
        console.log(`Reason: ${m.reason}`);
        console.log('-'.repeat(80));
    });

    console.log(`\n\nREVIEW THESE ${suspicious.length} MOVIES`);
    console.log('These might be re-releases. Check TMDB to verify original release dates.');
}
