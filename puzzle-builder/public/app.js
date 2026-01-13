// State
const state = {
    puzzleId: null, // null for new puzzle, number for editing existing
    movies: [],
    existingMovies: {},
    existingPuzzles: [],
    currentSearch: {
        type: null,
        page: 1,
        totalPages: 0,
        params: {}
    },
    genres: [],
    // Schedule state
    schedule: {},
    scheduleMonth: new Date(),
    schedulePuzzles: []
};

// DOM Elements
const elements = {
    apiStatus: document.getElementById('api-status'),
    resultsGrid: document.getElementById('results-grid'),
    resultsCount: document.getElementById('results-count'),
    pagination: document.getElementById('pagination'),
    directorResults: document.getElementById('director-results'),
    genreSelect: document.getElementById('genre-select'),
    puzzleSelect: document.getElementById('puzzle-select'),
    exportSelect: document.getElementById('export-select'),
    puzzleTheme: document.getElementById('puzzle-theme'),
    puzzleDescription: document.getElementById('puzzle-description'),
    totalCount: document.getElementById('total-count'),
    movieCount: document.getElementById('movie-count'),
    puzzleMovieList: document.getElementById('puzzle-movie-list'),
    previewModal: document.getElementById('preview-modal'),
    exportModal: document.getElementById('export-modal'),
    previewJson: document.getElementById('preview-json'),
    exportResult: document.getElementById('export-result')
};

// Initialize
document.addEventListener('DOMContentLoaded', init);

async function init() {
    await checkApiStatus();
    await Promise.all([
        loadGenres(),
        loadExistingMovies(),
        loadExistingPuzzles(),
        loadExportedFiles()
    ]);
    setupEventListeners();
    setupDragAndDrop();
}

async function checkApiStatus() {
    try {
        const response = await fetch('/api/health');
        const data = await response.json();

        if (data.hasApiKey) {
            elements.apiStatus.textContent = 'API Connected';
            elements.apiStatus.className = 'ok';
        } else {
            elements.apiStatus.textContent = 'API Key Missing';
            elements.apiStatus.className = 'error';
        }
    } catch (e) {
        elements.apiStatus.textContent = 'Server Error';
        elements.apiStatus.className = 'error';
    }
}

async function loadGenres() {
    try {
        const response = await fetch('/api/genres');
        const data = await response.json();
        state.genres = data.genres || [];

        elements.genreSelect.innerHTML = '<option value="">All Genres</option>';
        state.genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.id;
            option.textContent = genre.name;
            elements.genreSelect.appendChild(option);
        });
    } catch (e) {
        console.error('Failed to load genres:', e);
    }
}

async function loadExistingMovies() {
    try {
        const response = await fetch('/api/existing-movies');
        const data = await response.json();
        state.existingMovies = data.movies || {};
        console.log(`Loaded ${Object.keys(state.existingMovies).length} existing movies`);
    } catch (e) {
        console.error('Failed to load existing movies:', e);
    }
}

async function loadExistingPuzzles() {
    try {
        const response = await fetch('/api/puzzles');
        const data = await response.json();
        state.existingPuzzles = data.puzzles || [];

        elements.puzzleSelect.innerHTML = '<option value="">Existing puzzles...</option>';
        state.existingPuzzles.forEach(puzzle => {
            const option = document.createElement('option');
            option.value = puzzle.id;
            option.textContent = puzzle.theme;
            elements.puzzleSelect.appendChild(option);
        });
    } catch (e) {
        console.error('Failed to load puzzles:', e);
    }
}

async function loadExportedFiles() {
    try {
        const response = await fetch('/api/exports');
        const data = await response.json();
        state.exportedFiles = data.files || [];

        elements.exportSelect.innerHTML = '<option value="">Exported files...</option>';
        state.exportedFiles.forEach(file => {
            const option = document.createElement('option');
            option.value = file.filename;
            // Format date nicely
            const date = new Date(file.modified);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            option.textContent = `${file.theme} (${dateStr})`;
            option.title = file.filename;
            elements.exportSelect.appendChild(option);
        });
    } catch (e) {
        console.error('Failed to load exported files:', e);
    }
}

function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Search buttons
    document.getElementById('btn-search-title').addEventListener('click', searchByTitle);
    document.getElementById('btn-search-director').addEventListener('click', searchDirector);
    document.getElementById('btn-discover').addEventListener('click', discoverMovies);

    // Enter key for search
    document.getElementById('title-query').addEventListener('keypress', e => {
        if (e.key === 'Enter') searchByTitle();
    });
    document.getElementById('director-query').addEventListener('keypress', e => {
        if (e.key === 'Enter') searchDirector();
    });

    // Re-sort filmography when sort changes
    document.getElementById('person-sort').addEventListener('change', () => {
        if (state.currentSearch.type === 'person' && state.currentSearch.params.personId) {
            loadDirectorFilmography(state.currentSearch.params.personId, state.currentSearch.params.personName);
        }
    });

    // Puzzle selectors
    elements.puzzleSelect.addEventListener('change', loadSelectedPuzzle);
    elements.exportSelect.addEventListener('change', loadSelectedExport);

    // Builder actions
    document.getElementById('btn-clear').addEventListener('click', clearPuzzle);
    document.getElementById('btn-preview').addEventListener('click', showPreview);
    document.getElementById('btn-export').addEventListener('click', exportPuzzle);
    document.getElementById('btn-save-puzzle').addEventListener('click', savePuzzle);
    document.getElementById('btn-copy-js').addEventListener('click', copyJsSnippet);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) closeModals();
        });
    });
}

function setupDragAndDrop() {
    new Sortable(elements.puzzleMovieList, {
        animation: 150,
        ghostClass: 'sortable-ghost',
        dragClass: 'sortable-drag',
        onEnd: () => {
            syncStateFromDom();
            updateCounts();
        }
    });
}

function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tab}`);
    });
}

// Load existing puzzle
async function loadSelectedPuzzle() {
    const puzzleId = elements.puzzleSelect.value;
    if (!puzzleId) return;

    try {
        const response = await fetch(`/api/puzzles/${puzzleId}`);
        const data = await response.json();

        // Set state
        state.puzzleId = puzzleId;
        state.movies = data.movies;

        // Update UI
        elements.puzzleTheme.value = data.puzzle.theme;
        elements.puzzleDescription.value = data.puzzle.description || '';

        renderPuzzleMovies();
        updateCounts();
        markMoviesInPuzzle();
        // Clear other selector
        elements.exportSelect.value = '';
    } catch (e) {
        console.error('Failed to load puzzle:', e);
        alert('Failed to load puzzle');
    }
}

// Load exported puzzle file
async function loadSelectedExport() {
    const filename = elements.exportSelect.value;
    if (!filename) return;

    try {
        const response = await fetch(`/api/exports/${encodeURIComponent(filename)}`);
        const data = await response.json();

        // Set state (no puzzle ID for exports - they're new)
        state.puzzleId = null;
        state.movies = data.movieDetails || [];

        // Update UI
        elements.puzzleTheme.value = data.puzzle?.theme || '';
        elements.puzzleDescription.value = data.puzzle?.description || '';

        renderPuzzleMovies();
        updateCounts();
        markMoviesInPuzzle();
        // Clear other selector
        elements.puzzleSelect.value = '';
    } catch (e) {
        console.error('Failed to load export:', e);
        alert('Failed to load exported file');
    }
}

// Search Functions
async function searchByTitle() {
    const query = document.getElementById('title-query').value.trim();
    if (!query) return;

    const year = document.getElementById('title-year').value;

    state.currentSearch = {
        type: 'title',
        page: 1,
        totalPages: 0,
        params: { query, year }
    };

    await performTitleSearch();
}

async function performTitleSearch() {
    const { query, year } = state.currentSearch.params;
    const page = state.currentSearch.page;

    try {
        let url = `/api/search/movies?query=${encodeURIComponent(query)}&page=${page}`;
        if (year) url += `&year=${year}`;

        const response = await fetch(url);
        const data = await response.json();

        state.currentSearch.totalPages = data.total_pages;
        displayResults(data.results, data.total_results);
    } catch (e) {
        console.error('Search failed:', e);
        elements.resultsGrid.innerHTML = '<p>Search failed. Please try again.</p>';
    }
}

async function searchDirector() {
    const query = document.getElementById('director-query').value.trim();
    if (!query) return;

    try {
        const response = await fetch(`/api/search/person?query=${encodeURIComponent(query)}`);
        const data = await response.json();

        displayDirectorResults(data.results);
    } catch (e) {
        console.error('Director search failed:', e);
        elements.directorResults.innerHTML = '<p>Search failed. Please try again.</p>';
    }
}

function displayDirectorResults(people) {
    elements.directorResults.innerHTML = '';

    people.slice(0, 10).forEach(person => {
        const div = document.createElement('div');
        div.className = 'director-item';
        div.innerHTML = `
            <div class="name">${person.name}</div>
            <div class="dept">${person.known_for_department || 'Unknown'}</div>
            ${person.known_for ? `<div class="known-for">${person.known_for.join(', ')}</div>` : ''}
        `;
        div.addEventListener('click', () => loadDirectorFilmography(person.id, person.name));
        elements.directorResults.appendChild(div);
    });

    if (people.length === 0) {
        elements.directorResults.innerHTML = '<p>No results found.</p>';
    }
}

async function loadDirectorFilmography(personId, personName) {
    try {
        const sort = document.getElementById('person-sort').value;
        const response = await fetch(`/api/person/${personId}/movies?sort=${sort}`);
        const data = await response.json();

        state.currentSearch = {
            type: 'person',
            page: 1,
            totalPages: 1,
            params: { personId, personName, sort }
        };

        displayResults(data.movies, data.total, `Filmography: ${data.person.name}`);
    } catch (e) {
        console.error('Failed to load filmography:', e);
    }
}

async function discoverMovies() {
    const genre = document.getElementById('genre-select').value;
    const yearFrom = document.getElementById('year-from').value;
    const yearTo = document.getElementById('year-to').value;

    state.currentSearch = {
        type: 'discover',
        page: 1,
        totalPages: 0,
        params: { genre, yearFrom, yearTo }
    };

    await performDiscover();
}

async function performDiscover() {
    const { genre, yearFrom, yearTo } = state.currentSearch.params;
    const page = state.currentSearch.page;

    try {
        let url = `/api/discover?page=${page}`;
        if (genre) url += `&genre=${genre}`;
        if (yearFrom) url += `&yearFrom=${yearFrom}`;
        if (yearTo) url += `&yearTo=${yearTo}`;

        const response = await fetch(url);
        const data = await response.json();

        state.currentSearch.totalPages = data.total_pages;
        displayResults(data.results, data.total_results);
    } catch (e) {
        console.error('Discover failed:', e);
        elements.resultsGrid.innerHTML = '<p>Search failed. Please try again.</p>';
    }
}

// Display Functions
function displayResults(movies, total, customLabel) {
    elements.resultsGrid.innerHTML = '';

    // Show/hide sort dropdown based on search type
    const sortSelect = document.getElementById('person-sort');
    sortSelect.style.display = state.currentSearch.type === 'person' ? '' : 'none';

    if (!movies || movies.length === 0) {
        elements.resultsGrid.innerHTML = '<p>No results found.</p>';
        elements.resultsCount.textContent = '';
        elements.pagination.innerHTML = '';
        return;
    }

    elements.resultsCount.textContent = customLabel || `${total.toLocaleString()} results`;

    movies.forEach(movie => {
        const card = createMovieCard(movie);
        elements.resultsGrid.appendChild(card);
    });

    updatePagination();
    markMoviesInPuzzle();
}

function formatDate(dateStr) {
    if (!dateStr) return '????';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.movieId = movie.id;

    const dateDisplay = formatDate(movie.release_date);
    const inDatabase = state.existingMovies[movie.id];
    const hasShowDirector = inDatabase?.showDirector || false;

    card.innerHTML = `
        ${movie.poster_url
            ? `<img src="${movie.poster_url}" alt="${movie.title}" loading="lazy">`
            : `<div class="no-poster">No Poster</div>`
        }
        <div class="info">
            <div class="title" title="${movie.title}">${movie.title}</div>
            <div class="year">${dateDisplay}${inDatabase ? ' <span class="in-db-badge">in DB</span>' : ''}</div>
        </div>
        <div class="actions">
            <div class="actions-row">
                <button class="btn btn-add" onclick="addToPuzzle(${movie.id})">Add List</button>
                ${!inDatabase ? `<button class="btn btn-add-db" onclick="addToDatabase(${movie.id}, this)">Add DB</button>` : ''}
            </div>
            <div class="actions-row">
                <label class="show-director-toggle" title="Show director in game">
                    <input type="checkbox" class="show-director-cb" data-movie-id="${movie.id}"
                        ${hasShowDirector ? 'checked' : ''}
                        ${inDatabase ? `onchange="updateShowDirector(${movie.id}, this.checked)"` : ''}>
                    <span>Show Director</span>
                </label>
            </div>
        </div>
    `;

    // Store movie data for later use
    card._movieData = movie;

    return card;
}

function updatePagination() {
    const { page, totalPages, type } = state.currentSearch;

    if (totalPages <= 1) {
        elements.pagination.innerHTML = '';
        return;
    }

    elements.pagination.innerHTML = `
        <button onclick="goToPage(${page - 1})" ${page <= 1 ? 'disabled' : ''}>Prev</button>
        <span class="page-info">Page ${page} of ${Math.min(totalPages, 500)}</span>
        <button onclick="goToPage(${page + 1})" ${page >= totalPages || page >= 500 ? 'disabled' : ''}>Next</button>
    `;
}

async function goToPage(page) {
    state.currentSearch.page = page;

    switch (state.currentSearch.type) {
        case 'title':
            await performTitleSearch();
            break;
        case 'discover':
            await performDiscover();
            break;
    }
}

// Puzzle Functions
async function addToPuzzle(movieId) {
    // Check if already in puzzle
    if (state.movies.find(m => m.id === movieId)) {
        return; // Already in puzzle
    }

    // Find movie data from search results
    const card = document.querySelector(`.movie-card[data-movie-id="${movieId}"]`);
    let movieData = card?._movieData;

    // If we don't have full data, try existing movies or fetch it
    if (!movieData) {
        const existing = state.existingMovies[movieId];
        if (existing) {
            movieData = {
                id: movieId,
                title: existing.title,
                poster_url: existing.poster_url,
                release_date: existing.release_date,
                directors: existing.directors || []
            };
        } else {
            try {
                const response = await fetch(`/api/movie/${movieId}`);
                movieData = await response.json();
            } catch (e) {
                console.error('Failed to fetch movie details:', e);
                return;
            }
        }
    }

    // Add to movies array
    state.movies.push(movieData);
    renderPuzzleMovies();
    updateCounts();
    markMoviesInPuzzle();
}

function removeFromPuzzle(movieId) {
    const index = state.movies.findIndex(m => m.id === movieId);
    if (index !== -1) {
        state.movies.splice(index, 1);
        renderPuzzleMovies();
        updateCounts();
        markMoviesInPuzzle();
    }
}

function renderPuzzleMovies() {
    elements.puzzleMovieList.innerHTML = '';

    state.movies.forEach(movie => {
        const chip = createPuzzleChip(movie);
        elements.puzzleMovieList.appendChild(chip);
    });
}

function createPuzzleChip(movie) {
    const chip = document.createElement('div');
    chip.className = 'puzzle-movie';
    chip.dataset.movieId = movie.id;

    const dateDisplay = formatDate(movie.release_date);

    chip.innerHTML = `
        ${movie.poster_url ? `<img src="${movie.poster_url}" alt="">` : ''}
        <span class="movie-title" title="${movie.title}">${movie.title}</span>
        <span class="movie-year">(${dateDisplay})</span>
        <button class="btn-remove" onclick="removeFromPuzzle(${movie.id})">&times;</button>
    `;

    // Store full movie data
    chip._movieData = movie;

    return chip;
}

function syncStateFromDom() {
    const chips = elements.puzzleMovieList.querySelectorAll('.puzzle-movie');
    state.movies = Array.from(chips).map(chip => chip._movieData);
}

function updateCounts() {
    const total = state.movies.length;
    elements.movieCount.textContent = `(${total})`;
    elements.totalCount.textContent = `${total} movie${total !== 1 ? 's' : ''}`;
}

function markMoviesInPuzzle() {
    const allIds = new Set(state.movies.map(m => m.id));

    document.querySelectorAll('.movie-card').forEach(card => {
        const id = parseInt(card.dataset.movieId);
        card.classList.toggle('in-puzzle', allIds.has(id));
    });
}

function clearPuzzle() {
    if (state.movies.length > 0 && !confirm('Clear all movies from the puzzle?')) return;

    state.puzzleId = null;
    state.movies = [];
    elements.puzzleTheme.value = '';
    elements.puzzleDescription.value = '';
    elements.puzzleSelect.value = '';
    renderPuzzleMovies();
    updateCounts();
    markMoviesInPuzzle();
}

// Export Functions
function generateJsSnippet() {
    const theme = elements.puzzleTheme.value.trim() || 'Untitled Puzzle';
    const description = elements.puzzleDescription.value.trim();

    const lines = [
        '// Add this to dailyPuzzles.js',
        '{',
        `  id: ${state.puzzleId ? `"${state.puzzleId}"` : '"/* generate unique ID */"'},`,
        `  theme: "${theme}",`,
        `  description: "${description}",`,
        '  movieIds: ['
    ];

    state.movies.forEach(m => {
        const dateDisplay = formatDate(m.release_date);
        lines.push(`    ${m.id}, // ${m.title} (${dateDisplay})`);
    });

    lines.push('  ],');
    lines.push('},');

    return lines.join('\n');
}

function showPreview() {
    if (state.movies.length === 0) {
        alert('Add some movies first!');
        return;
    }

    const snippet = generateJsSnippet();
    elements.previewJson.textContent = snippet;
    elements.previewModal.classList.add('open');
}

function copyJsSnippet() {
    const snippet = generateJsSnippet();
    navigator.clipboard.writeText(snippet).then(() => {
        const btn = document.getElementById('btn-copy-js');
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = 'Copy JS Snippet';
        }, 2000);
    });
}

async function exportPuzzle() {
    const theme = elements.puzzleTheme.value.trim();
    if (!theme) {
        alert('Please enter a theme for the puzzle.');
        elements.puzzleTheme.focus();
        return;
    }

    if (state.movies.length === 0) {
        alert('Add some movies first!');
        return;
    }

    const addToDatabase = document.getElementById('add-to-database').checked;

    try {
        const response = await fetch('/api/export', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                theme,
                description: elements.puzzleDescription.value.trim(),
                movies: state.movies,
                addToDatabase
            })
        });

        const result = await response.json();

        if (result.success) {
            let html = `
                <div class="success-icon">&#10003;</div>
                <p>Puzzle exported successfully!</p>
                <p>JSON: <span class="file-name">${result.jsonFile}</span></p>
                <p>JS: <span class="file-name">${result.jsFile}</span></p>
            `;

            if (result.moviesAddedToDatabase > 0) {
                html += `
                    <div class="success-msg">
                        ${result.moviesAddedToDatabase} movie(s) added to movies.js
                    </div>
                `;
                // Reload existing movies cache
                loadExistingMovies();
            } else if (result.newMoviesCount > 0) {
                html += `
                    <div class="warning">
                        ${result.newMoviesCount} movie(s) are not in movies.js and will need to be added.
                    </div>
                `;
            }

            elements.exportResult.innerHTML = html;
            elements.exportModal.classList.add('open');
            // Refresh exported files list
            loadExportedFiles();
        } else {
            alert('Export failed: ' + result.error);
        }
    } catch (e) {
        console.error('Export failed:', e);
        alert('Export failed. Please try again.');
    }
}

async function savePuzzle() {
    const theme = elements.puzzleTheme.value.trim();
    if (!theme) {
        alert('Please enter a theme for the puzzle.');
        elements.puzzleTheme.focus();
        return;
    }

    if (state.movies.length === 0) {
        alert('Add some movies first!');
        return;
    }

    const addToDatabase = document.getElementById('add-to-database').checked;

    try {
        const response = await fetch('/api/puzzles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                theme,
                description: elements.puzzleDescription.value.trim(),
                movies: state.movies,
                addToDatabase
            })
        });

        const result = await response.json();

        if (result.success) {
            let msg = `Puzzle saved as #${result.puzzleId}!`;
            if (result.moviesAddedToDatabase > 0) {
                msg += `\n${result.moviesAddedToDatabase} movie(s) added to movies.js`;
            }
            alert(msg);

            // Refresh puzzle lists
            await loadExistingPuzzles();
            if (state.existingMovies) {
                await loadExistingMovies();
            }

            // Update state to reflect saved puzzle
            state.puzzleId = result.puzzleId;
        } else {
            alert('Save failed: ' + result.error);
        }
    } catch (e) {
        console.error('Save failed:', e);
        alert('Save failed. Please try again.');
    }
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
}

// ============ Schedule Management ============

function setupScheduleListeners() {
    // Main nav view switching
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Schedule controls
    document.getElementById('btn-prev-month')?.addEventListener('click', () => changeMonth(-1));
    document.getElementById('btn-next-month')?.addEventListener('click', () => changeMonth(1));
    document.getElementById('btn-save-schedule')?.addEventListener('click', saveSchedule);

    // Live update asterisks when schedule dropdowns change
    document.getElementById('schedule-list')?.addEventListener('change', (e) => {
        if (e.target.tagName === 'SELECT') {
            const date = e.target.dataset.date;
            const puzzleId = e.target.value;
            if (puzzleId) {
                state.schedule[date] = puzzleId;
            } else {
                delete state.schedule[date];
            }
            updateScheduleAsterisks();
        }
    });
}

function switchView(view) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === view);
    });

    // Toggle views
    document.getElementById('builder-view').style.display = view === 'builder' ? '' : 'none';
    document.getElementById('schedule-view').style.display = view === 'schedule' ? '' : 'none';

    // Load schedule data when switching to schedule view
    if (view === 'schedule') {
        loadSchedule();
    }
}

async function loadSchedule() {
    try {
        const response = await fetch('/api/schedule');
        const data = await response.json();
        state.schedule = data.schedule || {};
        state.schedulePuzzles = data.puzzles || [];
        renderSchedule();
    } catch (e) {
        console.error('Failed to load schedule:', e);
    }
}

function changeMonth(delta) {
    state.scheduleMonth.setMonth(state.scheduleMonth.getMonth() + delta);
    renderSchedule();
}

function renderSchedule() {
    const container = document.getElementById('schedule-list');
    const monthLabel = document.getElementById('schedule-month');

    // Update month label
    const monthName = state.scheduleMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    monthLabel.textContent = monthName;

    // Get days in month
    const year = state.scheduleMonth.getFullYear();
    const month = state.scheduleMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    container.innerHTML = '';

    // Collect all scheduled puzzle IDs
    const scheduledIds = new Set(Object.values(state.schedule).map(String));

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const isToday = date.getTime() === today.getTime();

        const row = document.createElement('div');
        row.className = 'schedule-row' + (isToday ? ' today' : '');

        // Calculate default rotation puzzle
        const defaultPuzzle = getRotationPuzzle(date);

        const selectedId = state.schedule[dateStr];
        row.innerHTML = `
            <span class="day-name">${dayName}</span>
            <span class="date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <select data-date="${dateStr}">
                <option value="">Default rotation</option>
                ${state.schedulePuzzles.map(p => {
                    const isScheduled = scheduledIds.has(String(p.id));
                    const prefix = isScheduled ? '* ' : '';
                    return `
                    <option value="${p.id}" ${String(selectedId) === String(p.id) ? 'selected' : ''}>
                        ${prefix}${p.theme}
                    </option>
                `}).join('')}
            </select>
            <span class="puzzle-id">${selectedId || defaultPuzzle?.id || ''}</span>
        `;

        container.appendChild(row);
    }
}

function updateScheduleAsterisks() {
    const scheduledIds = new Set(Object.values(state.schedule).map(String));

    document.querySelectorAll('#schedule-list select').forEach(select => {
        Array.from(select.options).forEach(option => {
            if (!option.value) return; // Skip "Default rotation"
            const puzzle = state.schedulePuzzles.find(p => String(p.id) === option.value);
            if (puzzle) {
                const isScheduled = scheduledIds.has(String(puzzle.id));
                const prefix = isScheduled ? '* ' : '';
                option.textContent = prefix + puzzle.theme;
            }
        });
    });
}

function getRotationPuzzle(date) {
    // Match the logic from dailyPuzzles.js
    const firstPuzzleDate = new Date('2026-01-08'); // From dailyPuzzles.js
    const daysSinceFirst = Math.floor((date - firstPuzzleDate) / (1000 * 60 * 60 * 24));

    if (daysSinceFirst < 0 || state.schedulePuzzles.length === 0) {
        return state.schedulePuzzles[0];
    }

    const puzzleIndex = daysSinceFirst % state.schedulePuzzles.length;
    return state.schedulePuzzles[puzzleIndex];
}

async function saveSchedule() {
    const status = document.getElementById('schedule-status');
    status.textContent = 'Saving...';
    status.className = '';

    // Gather schedule from form
    const schedule = {};
    document.querySelectorAll('#schedule-list select').forEach(select => {
        const date = select.dataset.date;
        const puzzleId = select.value;
        if (puzzleId) {
            schedule[date] = puzzleId; // Keep as string
        }
    });

    try {
        const response = await fetch('/api/schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ schedule })
        });

        const result = await response.json();
        if (result.success) {
            state.schedule = schedule;
            status.textContent = 'Saved!';
            status.className = 'saved';
            renderSchedule(); // Re-render to update rotation indicators
            setTimeout(() => {
                status.textContent = '';
            }, 2000);
        } else {
            status.textContent = 'Error: ' + result.error;
        }
    } catch (e) {
        console.error('Failed to save schedule:', e);
        status.textContent = 'Failed to save';
    }
}

// Initialize schedule listeners after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupScheduleListeners();
});

// Add movie to database (movies.js)
async function addToDatabase(movieId, buttonEl) {
    const originalText = buttonEl.textContent;
    buttonEl.textContent = '...';
    buttonEl.disabled = true;

    // Check if showDirector checkbox is checked
    const card = document.querySelector(`.movie-card[data-movie-id="${movieId}"]`);
    const showDirectorCb = card?.querySelector('.show-director-cb');
    const showDirector = showDirectorCb?.checked || false;

    try {
        const response = await fetch('/api/add-movie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId, showDirector })
        });

        const result = await response.json();

        if (result.success) {
            // Update local state
            state.existingMovies[movieId] = result.movie || { id: movieId };

            // Update the card UI
            if (card) {
                const yearEl = card.querySelector('.year');
                if (yearEl && !yearEl.innerHTML.includes('in-db-badge')) {
                    yearEl.innerHTML += ' <span class="in-db-badge">in DB</span>';
                }
                // Remove the "+ DB" button and showDirector toggle
                buttonEl.remove();
                card.querySelector('.show-director-toggle')?.remove();
            }
        } else {
            buttonEl.textContent = 'Error';
            setTimeout(() => {
                buttonEl.textContent = originalText;
                buttonEl.disabled = false;
            }, 2000);
        }
    } catch (e) {
        console.error('Failed to add to database:', e);
        buttonEl.textContent = 'Error';
        setTimeout(() => {
            buttonEl.textContent = originalText;
            buttonEl.disabled = false;
        }, 2000);
    }
}

// Update showDirector for a movie already in database
async function updateShowDirector(movieId, showDirector) {
    try {
        const response = await fetch('/api/update-movie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId, showDirector })
        });

        const result = await response.json();

        if (result.success) {
            // Update local state
            if (state.existingMovies[movieId]) {
                state.existingMovies[movieId].showDirector = showDirector;
            }
        } else {
            console.error('Failed to update showDirector:', result.error);
        }
    } catch (e) {
        console.error('Failed to update showDirector:', e);
    }
}

// Make functions available globally for onclick handlers
window.addToPuzzle = addToPuzzle;
window.removeFromPuzzle = removeFromPuzzle;
window.goToPage = goToPage;
window.addToDatabase = addToDatabase;
window.updateShowDirector = updateShowDirector;
