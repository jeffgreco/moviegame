// Movie Timeline Game Logic

class MovieTimelineGame {
    constructor() {
        this.movies = [];
        this.timeline = [];
        this.drawPile = [];
        this.currentCard = null;
        this.score = 0;
        this.streak = 0;
        this.bestStreak = 0;
        this.draggedElement = null;
        this.isCardSelected = false;
        this.failedCard = null;
        this.failedCardIndex = null;

        this.init();
    }

    init() {
        // Load movies from the global MOVIES_DATA
        if (typeof MOVIES_DATA === 'undefined') {
            console.error('Movie data not loaded!');
            return;
        }

        // Filter out future releases
        const now = new Date();
        this.movies = MOVIES_DATA.filter(movie => {
            const releaseDate = new Date(movie.release_date);
            return releaseDate <= now;
        });

        this.setupGame();
        this.setupEventListeners();
    }

    setupGame() {
        // Shuffle movies
        this.shuffleArray(this.movies);

        // Take first movie for timeline, rest for draw pile
        this.timeline = [this.movies[0]];
        this.drawPile = this.movies.slice(1);

        // Draw first card
        this.currentCard = this.drawPile.shift();

        this.score = 0;
        this.streak = 0;
        this.failedCard = null;
        this.failedCardIndex = null;

        this.render();
        this.updateStats();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    setupEventListeners() {
        document.getElementById('play-again').addEventListener('click', () => {
            document.getElementById('game-over').classList.add('hidden');
            // Filter out future releases
            const now = new Date();
            this.movies = MOVIES_DATA.filter(movie => {
                const releaseDate = new Date(movie.release_date);
                return releaseDate <= now;
            });
            this.setupGame();
        });

        // Deselect button handler
        document.getElementById('deselect-btn').addEventListener('click', () => {
            this.deselectCard();
        });
    }

    selectCard() {
        this.isCardSelected = true;
        const drawPileCard = document.querySelector('.draw-pile .movie-card');
        if (drawPileCard) {
            drawPileCard.classList.add('selected');
        }
        document.getElementById('deselect-btn').classList.remove('hidden');
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.add('awaiting-placement');
        });
    }

    deselectCard() {
        this.isCardSelected = false;
        const drawPileCard = document.querySelector('.draw-pile .movie-card');
        if (drawPileCard) {
            drawPileCard.classList.remove('selected');
        }
        document.getElementById('deselect-btn').classList.add('hidden');
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('awaiting-placement');
        });
    }

    toggleCardSelection() {
        if (this.isCardSelected) {
            this.deselectCard();
        } else {
            this.selectCard();
        }
    }

    createMovieCard(movie, showYear = true, inPile = false) {
        const card = document.createElement('div');
        card.className = 'movie-card' + (inPile ? ' in-pile' : '');
        card.dataset.id = movie.id;
        card.dataset.releaseDate = movie.release_date;
        card.draggable = inPile; // Only draw pile cards are draggable

        const posterUrl = movie.poster_url || movie.poster_path
            ? movie.poster_url || `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Poster';

        const fallbackUrl = 'https://via.placeholder.com/300x450?text=No+Poster';

        const dateInfo = this.formatDate(movie.release_date);
        card.innerHTML = `
            <img class="poster" src="${posterUrl}" alt="${movie.title}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackUrl}';">
            ${showYear ? `<span class="year"><span class="month-day">${dateInfo.monthDay}</span><span class="year-num">${dateInfo.year}</span></span>` : ''}
            <div class="title">${movie.title}</div>
        `;

        // Only add drag/touch events for cards in the draw pile
        if (inPile) {
            // Drag events
            card.addEventListener('dragstart', (e) => this.handleDragStart(e, card));
            card.addEventListener('dragend', (e) => this.handleDragEnd(e, card));

            // Touch events for mobile
            card.addEventListener('touchstart', (e) => this.handleTouchStart(e, card));
            card.addEventListener('touchmove', (e) => this.handleTouchMove(e, card));
            card.addEventListener('touchend', (e) => this.handleTouchEnd(e, card));

            // Click to select/deselect for pile cards
            card.addEventListener('click', (e) => {
                // Prevent toggle if we just finished a drag
                if (!this.draggedElement) {
                    this.toggleCardSelection();
                }
            });
        }

        return card;
    }

    createDropZone(index) {
        const zone = document.createElement('div');
        zone.className = 'drop-zone';
        zone.dataset.index = index;

        zone.addEventListener('dragover', (e) => this.handleDragOver(e, zone));
        zone.addEventListener('dragleave', (e) => this.handleDragLeave(e, zone));
        zone.addEventListener('drop', (e) => this.handleDrop(e, zone));

        // Click to place - alternative to drag and drop
        zone.addEventListener('click', () => this.handleDropZoneClick(index));

        return zone;
    }

    handleDropZoneClick(index) {
        // Only allow click placement if card is selected (or always allow as alternative to drag)
        if (this.currentCard) {
            this.placeCard(index);
        }
    }

    handleDragStart(e, card) {
        this.draggedElement = card;
        card.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', card.dataset.id);
    }

    handleDragEnd(e, card) {
        card.classList.remove('dragging');
        this.draggedElement = null;
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.classList.remove('drag-over');
        });
    }

    handleDragOver(e, zone) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        zone.classList.add('drag-over');
    }

    handleDragLeave(e, zone) {
        zone.classList.remove('drag-over');
    }

    handleDrop(e, zone) {
        e.preventDefault();
        zone.classList.remove('drag-over');

        const index = parseInt(zone.dataset.index);
        this.placeCard(index);
    }

    // Touch event handlers for mobile
    handleTouchStart(e, card) {
        this.draggedElement = card;
        card.classList.add('dragging');

        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.originalPosition = card.getBoundingClientRect();
    }

    handleTouchMove(e, card) {
        if (!this.draggedElement) return;
        e.preventDefault();

        const touch = e.touches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;

        card.style.position = 'fixed';
        card.style.left = `${this.originalPosition.left + deltaX}px`;
        card.style.top = `${this.originalPosition.top + deltaY}px`;
        card.style.zIndex = '1000';

        // Highlight drop zones
        const dropZones = document.querySelectorAll('.drop-zone');
        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                zone.classList.add('drag-over');
            } else {
                zone.classList.remove('drag-over');
            }
        });
    }

    handleTouchEnd(e, card) {
        if (!this.draggedElement) return;

        card.style.position = '';
        card.style.left = '';
        card.style.top = '';
        card.style.zIndex = '';
        card.classList.remove('dragging');

        const touch = e.changedTouches[0];
        const dropZones = document.querySelectorAll('.drop-zone');

        let dropped = false;
        dropZones.forEach(zone => {
            const rect = zone.getBoundingClientRect();
            if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                zone.classList.remove('drag-over');
                const index = parseInt(zone.dataset.index);
                this.placeCard(index);
                dropped = true;
            }
        });

        this.draggedElement = null;
    }

    placeCard(index) {
        if (!this.currentCard) return;

        // Reset selection state before placing
        this.isCardSelected = false;
        document.getElementById('deselect-btn').classList.add('hidden');

        const newDate = new Date(this.currentCard.release_date);

        // Check if placement is correct
        let isCorrect = true;

        // Check movie before this position (should be earlier or same)
        if (index > 0) {
            const beforeDate = new Date(this.timeline[index - 1].release_date);
            if (newDate < beforeDate) {
                isCorrect = false;
            }
        }

        // Check movie after this position (should be later or same)
        if (index < this.timeline.length) {
            const afterDate = new Date(this.timeline[index].release_date);
            if (newDate > afterDate) {
                isCorrect = false;
            }
        }

        if (isCorrect) {
            // Insert at correct position
            this.timeline.splice(index, 0, this.currentCard);
            this.score += 10 + this.streak * 5;
            this.streak++;
            if (this.streak > this.bestStreak) {
                this.bestStreak = this.streak;
            }

            this.render();
            this.updateStats();

            // Animate the newly placed card
            setTimeout(() => {
                const cards = document.querySelectorAll('.timeline .movie-card');
                cards[index].classList.add('correct');
                setTimeout(() => cards[index].classList.remove('correct'), 500);
            }, 50);

            // Draw next card
            if (this.drawPile.length > 0) {
                this.currentCard = this.drawPile.shift();
                this.renderDrawPile();
            } else {
                // Game won!
                this.endGame(true);
            }
        } else {
            // Wrong placement
            this.streak = 0;
            this.updateStats();

            // Store the failed card and where it should go
            this.failedCard = this.currentCard;
            this.failedCardIndex = index;

            // Show the card shaking in the draw pile
            const drawPileCard = document.querySelector('.draw-pile .movie-card');
            if (drawPileCard) {
                drawPileCard.classList.add('wrong');
                setTimeout(() => drawPileCard.classList.remove('wrong'), 500);
            }

            // End game on wrong placement
            this.endGame(false);
        }
    }

    endGame(won) {
        document.getElementById('game-over').classList.remove('hidden');
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('best-streak').textContent = this.bestStreak;

        if (won) {
            document.querySelector('.game-over-content h2').textContent = 'Congratulations!';
            document.getElementById('correct-year').parentElement.style.display = 'none';
        } else {
            document.querySelector('.game-over-content h2').textContent = 'Game Over!';
            const dateInfo = this.formatDate(this.currentCard.release_date);
            document.getElementById('correct-year').textContent = `${dateInfo.monthDay}, ${dateInfo.year}`;
            document.getElementById('correct-year').parentElement.style.display = '';
        }

        // Populate poster grid with timeline movies
        this.renderPosterGrid();
    }

    renderPosterGrid() {
        const posterGrid = document.getElementById('poster-grid');
        posterGrid.innerHTML = '';

        // Create a combined timeline that includes the failed card if present
        let displayTimeline = [...this.timeline];

        // Find the correct chronological position for the failed card
        if (this.failedCard) {
            const failedDate = new Date(this.failedCard.release_date);
            let correctIndex = displayTimeline.findIndex(movie =>
                new Date(movie.release_date) > failedDate
            );

            // If no movie is later, add to end
            if (correctIndex === -1) {
                correctIndex = displayTimeline.length;
            }

            // Insert failed card at correct position
            displayTimeline.splice(correctIndex, 0, { ...this.failedCard, isFailed: true });
        }

        displayTimeline.forEach(movie => {
            const posterUrl = movie.poster_url || movie.poster_path
                ? movie.poster_url || `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/300x450?text=No+Poster';

            const year = this.getYear(movie.release_date);

            const item = document.createElement('div');
            item.className = 'poster-grid-item' + (movie.isFailed ? ' failed' : '');
            item.title = `${movie.title} (${year})`;
            item.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                <div class="year-label">${year}</div>
                ${movie.isFailed ? '<div class="failed-overlay"><div class="x-mark">✕</div></div>' : ''}
            `;

            posterGrid.appendChild(item);
        });
    }

    getYear(dateString) {
        return new Date(dateString).getFullYear();
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return { monthDay: `${month} ${day}`, year: year.toString() };
    }

    render() {
        this.renderTimeline();
        this.renderDrawPile();
    }

    renderTimeline() {
        const timelineEl = document.getElementById('timeline');
        timelineEl.innerHTML = '';

        // Add drop zone at the beginning
        timelineEl.appendChild(this.createDropZone(0));

        // Add movie cards with drop zones between them
        this.timeline.forEach((movie, index) => {
            const card = this.createMovieCard(movie, true, false);
            timelineEl.appendChild(card);
            timelineEl.appendChild(this.createDropZone(index + 1));
        });
    }

    renderDrawPile() {
        const drawPileEl = document.getElementById('draw-pile');
        drawPileEl.innerHTML = '';

        if (this.currentCard) {
            const card = this.createMovieCard(this.currentCard, false, true);
            drawPileEl.appendChild(card);
        }
    }

    updateStats() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
    }
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MovieTimelineGame();
});
