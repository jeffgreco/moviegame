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
    this.currentMovieCount = 0;
    this.resizeTimeout = null;
    this.gameMode = 'daily'; // 'random', 'daily', or 'challenge'
    this.dailyPuzzle = null; // Current daily puzzle data
    this.puzzleNumber = null; // Daily puzzle number
    this.justTouched = false; // Track touch interactions to prevent click events

    // Challenge mode state
    this.challengeMovieIds = null; // Array of movie IDs for the challenge
    this.challengeScore = null; // Original player's score to beat
    this.challengeBeaten = false; // Whether challenger has beaten the original score
    this.isChallenge = false; // Whether we're playing a challenge

    this.init();
  }

  init() {
    // Load movies from the global MOVIES_DATA
    if (typeof MOVIES_DATA === "undefined") {
      console.error("Movie data not loaded!");
      return;
    }

    // Check for challenge URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('c')) {
      const loaded = this.loadFromChallenge(urlParams.get('c'));
      if (!loaded) {
        // Invalid challenge, clear URL and play random
        window.history.replaceState({}, '', window.location.pathname);
        this.gameMode = 'random';
      }
    }

    this.loadMoviesForMode();
    this.setupGame();
    this.setupEventListeners();
    this.updateModeButtons();
  }

  loadMoviesForMode() {
    const now = new Date();
    const seenIds = new Set();

    if (this.gameMode === 'challenge' && this.challengeMovieIds) {
      // Challenge mode: load specific movies in the challenge order
      this.dailyPuzzle = null;
      this.puzzleNumber = null;
      const movieIdToData = new Map(MOVIES_DATA.map(m => [m.id, m]));
      this.movies = this.challengeMovieIds
        .map(id => movieIdToData.get(id))
        .filter(movie => {
          if (!movie) return false;
          if (seenIds.has(movie.id)) return false;
          seenIds.add(movie.id);
          return true;
        });

      // If challenge movies couldn't be loaded, fall back to random
      if (this.movies.length < 2) {
        this.isChallenge = false;
        this.gameMode = 'random';
        this.loadMoviesForMode();
        return;
      }
    } else if (this.gameMode === 'daily') {
      // Load daily puzzle
      this.dailyPuzzle = getTodaysPuzzle();
      this.puzzleNumber = getPuzzleNumber(new Date());

      if (!this.dailyPuzzle) {
        // No daily puzzle available yet, switch to random mode
        this.gameMode = 'random';
        this.loadMoviesForMode();
        return;
      }

      // Load movies in the exact order specified in dailyPuzzles.js
      // This preserves the curated easy-to-hard difficulty progression
      const movieIdToData = new Map(MOVIES_DATA.map(m => [m.id, m]));
      this.movies = this.dailyPuzzle.movieIds
        .map(id => movieIdToData.get(id))
        .filter(movie => {
          if (!movie) return false;
          const releaseDate = new Date(movie.release_date);
          if (releaseDate > now) return false;
          if (seenIds.has(movie.id)) return false;
          seenIds.add(movie.id);
          return true;
        });
    } else {
      // Random mode: use all movies
      this.dailyPuzzle = null;
      this.puzzleNumber = null;
      this.movies = MOVIES_DATA.filter((movie) => {
        const releaseDate = new Date(movie.release_date);
        if (releaseDate > now) return false;
        if (seenIds.has(movie.id)) return false;
        seenIds.add(movie.id);
        return true;
      });
    }
  }

  setupGame() {
    // Only shuffle for random mode - daily puzzles use pre-defined order
    if (this.gameMode === 'random') {
      this.shuffleArray(this.movies);
    }
    // For daily mode, movies are already in the curated order from dailyPuzzles.js

    // Take first movie for timeline, rest for draw pile
    this.timeline = [this.movies[0]];
    this.drawPile = this.movies.slice(1);

    // Draw first card
    this.currentCard = this.drawPile.shift();

    this.score = 0;
    this.streak = 0;
    this.failedCard = null;
    this.failedCardIndex = null;
    this.currentMovieCount = 0;

    this.render();
    this.updateStats();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Seeded shuffle for daily puzzles - ensures same order for everyone on the same day
  seededShuffleArray(array, seed) {
    // Simple seeded random number generator (mulberry32)
    let state = seed;
    const random = () => {
      state = (state + 0x6D2B79F5) | 0;
      let t = Math.imul(state ^ (state >>> 15), 1 | state);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    // Fisher-Yates shuffle with seeded random
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Encode challenge data to URL-safe string
  encodeChallengeData(movieIds, score) {
    // Format: score,id1,id2,id3,...
    const data = [score, ...movieIds].join(',');
    // Use base64 encoding for URL safety
    return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  // Decode challenge data from URL string
  decodeChallengeData(encoded) {
    try {
      // Restore base64 padding and characters
      let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) base64 += '=';
      const data = atob(base64);
      const parts = data.split(',').map(Number);
      if (parts.length < 2 || parts.some(isNaN)) return null;
      return {
        score: parts[0],
        movieIds: parts.slice(1)
      };
    } catch (e) {
      console.error('Failed to decode challenge:', e);
      return null;
    }
  }

  // Generate a challenge URL from current game state
  generateChallengeUrl() {
    // Get all movie IDs that were played (timeline + current failed card)
    const playedIds = this.timeline.map(m => m.id);
    if (this.failedCard) {
      playedIds.push(this.failedCard.id);
    }

    const encoded = this.encodeChallengeData(playedIds, this.bestStreak);
    const url = new URL(window.location.href);
    url.search = ''; // Clear existing params
    url.searchParams.set('c', encoded);
    return url.toString();
  }

  // Load game from challenge URL parameter
  loadFromChallenge(encoded) {
    const data = this.decodeChallengeData(encoded);
    if (!data || data.movieIds.length < 2) return false;

    this.isChallenge = true;
    this.challengeMovieIds = data.movieIds;
    this.challengeScore = data.score;
    this.challengeBeaten = false;
    this.gameMode = 'challenge';

    return true;
  }

  switchMode(newMode) {
    // Clear challenge state when switching modes
    if (this.isChallenge) {
      this.isChallenge = false;
      this.challengeMovieIds = null;
      this.challengeScore = null;
      this.challengeBeaten = false;
      // Clear the URL parameter
      window.history.replaceState({}, '', window.location.pathname);
    }

    this.gameMode = newMode;
    this.updateModeButtons();

    // Reset game with new mode
    document.getElementById("game-over").classList.add("hidden");
    this.loadMoviesForMode();
    this.setupGame();
  }

  updateModeButtons() {
    const randomBtn = document.getElementById("random-mode-btn");
    const dailyBtn = document.getElementById("daily-mode-btn");
    const challengeIndicator = document.getElementById("challenge-indicator");

    if (this.gameMode === 'challenge') {
      // For challenge mode, show random as active and display challenge indicator
      randomBtn.classList.add('active');
      dailyBtn.classList.remove('active');
      if (challengeIndicator) {
        challengeIndicator.classList.remove('hidden');
        challengeIndicator.textContent = `Beat ${this.challengeScore} to win!`;
      }
    } else if (this.gameMode === 'random') {
      randomBtn.classList.add('active');
      dailyBtn.classList.remove('active');
      if (challengeIndicator) challengeIndicator.classList.add('hidden');
    } else {
      dailyBtn.classList.add('active');
      randomBtn.classList.remove('active');
      if (challengeIndicator) challengeIndicator.classList.add('hidden');
    }
  }

  getDailyCompletionKey() {
    if (!this.puzzleNumber) return null;
    return `filmstrip_daily_${this.puzzleNumber}`;
  }

  isDailyPuzzleCompleted() {
    const key = this.getDailyCompletionKey();
    if (!key) return false;

    try {
      const completion = localStorage.getItem(key);
      return completion !== null;
    } catch (e) {
      return false;
    }
  }

  saveDailyCompletion(score, won) {
    const key = this.getDailyCompletionKey();
    if (!key) return;

    try {
      const completionData = {
        score: score,
        won: won,
        completedAt: new Date().toISOString(),
        theme: this.dailyPuzzle.theme
      };
      localStorage.setItem(key, JSON.stringify(completionData));
    } catch (e) {
      console.error('Failed to save daily completion:', e);
    }
  }

  setupEventListeners() {
    // Mode selector buttons
    document.getElementById("random-mode-btn").addEventListener("click", () => {
      if (this.gameMode !== 'random') {
        this.switchMode('random');
      }
    });

    document.getElementById("daily-mode-btn").addEventListener("click", () => {
      if (this.gameMode !== 'daily') {
        this.switchMode('daily');
      }
    });

    document.getElementById("play-again").addEventListener("click", () => {
      document.getElementById("game-over").classList.add("hidden");
      this.loadMoviesForMode();
      this.setupGame();
    });

    // Share score button handler
    document.getElementById("share-score").addEventListener("click", () => {
      this.shareScore();
    });

    // Challenge button handler
    document.getElementById("copy-challenge").addEventListener("click", () => {
      this.copyChallenge();
    });

    // Deselect button handler
    document.getElementById("deselect-btn").addEventListener("click", () => {
      this.deselectCard();
    });

    // Window resize handler for poster grid
    window.addEventListener("resize", () => {
      // Debounce resize events
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        // Only recalculate if game over modal is visible
        const gameOverModal = document.getElementById("game-over");
        if (
          !gameOverModal.classList.contains("hidden") &&
          this.currentMovieCount > 0
        ) {
          this.setOptimalPosterSize(this.currentMovieCount);
        }
      }, 250);
    });
  }

  async shareScore() {
    const score = this.bestStreak;
    let text;

    if (this.gameMode === 'daily' && this.puzzleNumber) {
      const totalMovies = this.dailyPuzzle.movieIds.length;
      text = `Filmstrip #${this.puzzleNumber} - ${this.dailyPuzzle.theme}\n${score}/${totalMovies} 🎬`;
    } else {
      text = `I scored ${score} on Filmstrip! Can you beat my score?`;
    }

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Movie Timeline Game",
          text: text,
          url: url,
        });
      } catch (err) {
        // User cancelled or error occurred
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        // Show temporary feedback
        const btn = document.getElementById("share-score");
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch (err) {
        console.error("Error copying to clipboard:", err);
      }
    }
  }

  async copyChallenge() {
    const challengeUrl = this.generateChallengeUrl();
    const text = `I scored ${this.bestStreak} on Filmstrip! Think you can beat me?`;

    try {
      await navigator.clipboard.writeText(`${text}\n${challengeUrl}`);
      // Show temporary feedback
      const btn = document.getElementById("copy-challenge");
      const originalText = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  }

  selectCard() {
    this.isCardSelected = true;
    const drawPileCard = document.querySelector(".draw-pile .movie-card");
    if (drawPileCard) {
      drawPileCard.classList.add("selected");
    }
    document.getElementById("deselect-btn").classList.remove("hidden");
    document.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.classList.add("awaiting-placement");
    });
  }

  deselectCard() {
    this.isCardSelected = false;
    const drawPileCard = document.querySelector(".draw-pile .movie-card");
    if (drawPileCard) {
      drawPileCard.classList.remove("selected");
    }
    document.getElementById("deselect-btn").classList.add("hidden");
    document.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.classList.remove("awaiting-placement");
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
    const card = document.createElement("div");
    card.className = "movie-card" + (inPile ? " in-pile" : "");
    card.dataset.id = movie.id;
    card.dataset.releaseDate = movie.release_date;
    card.draggable = inPile; // Only draw pile cards are draggable

    const posterUrl =
      movie.poster_url || movie.poster_path
        ? movie.poster_url ||
          `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        : "https://via.placeholder.com/300x450?text=No+Poster";

    const fallbackUrl = "https://via.placeholder.com/300x450?text=No+Poster";

    const dateInfo = this.formatDate(movie.release_date);
    card.innerHTML = `
            <img class="poster" src="${posterUrl}" alt="${
      movie.title
    }" loading="lazy" onerror="this.onerror=null; this.src='${fallbackUrl}';">
            ${
              showYear
                ? `<span class="year"><span class="month-day">${dateInfo.monthDay}</span>,&nbsp;<span class="year-num">${dateInfo.year}</span></span>`
                : ""
            }
            <div class="title">${movie.title}</div>
        `;

    // Only add drag/touch events for cards in the draw pile
    if (inPile) {
      // Drag events
      card.addEventListener("dragstart", (e) => this.handleDragStart(e, card));
      card.addEventListener("dragend", (e) => this.handleDragEnd(e, card));

      // Touch events for mobile
      card.addEventListener("touchstart", (e) =>
        this.handleTouchStart(e, card)
      );
      card.addEventListener("touchmove", (e) => this.handleTouchMove(e, card));
      card.addEventListener("touchend", (e) => this.handleTouchEnd(e, card));
    }

    return card;
  }

  createDropZone(index) {
    const zone = document.createElement("div");
    zone.className = "drop-zone";
    zone.dataset.index = index;

    zone.addEventListener("dragover", (e) => this.handleDragOver(e, zone));
    zone.addEventListener("dragleave", (e) => this.handleDragLeave(e, zone));
    zone.addEventListener("drop", (e) => this.handleDrop(e, zone));

    // Click to place - alternative to drag and drop
    zone.addEventListener("click", () => this.handleDropZoneClick(index));

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
    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", card.dataset.id);
  }

  handleDragEnd(e, card) {
    card.classList.remove("dragging");
    this.draggedElement = null;
    document.querySelectorAll(".drop-zone").forEach((zone) => {
      zone.classList.remove("drag-over");
    });
  }

  handleDragOver(e, zone) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    zone.classList.add("drag-over");
  }

  handleDragLeave(e, zone) {
    zone.classList.remove("drag-over");
  }

  handleDrop(e, zone) {
    e.preventDefault();
    zone.classList.remove("drag-over");

    const index = parseInt(zone.dataset.index);
    this.placeCard(index);
  }

  // Touch event handlers for mobile
  handleTouchStart(e, card) {
    this.justTouched = true; // Mark that we're using touch
    this.draggedElement = card;
    card.classList.add("dragging");

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

    card.style.position = "fixed";
    card.style.left = `${this.originalPosition.left + deltaX}px`;
    card.style.top = `${this.originalPosition.top + deltaY}px`;
    card.style.zIndex = "1000";

    // Highlight drop zones
    const dropZones = document.querySelectorAll(".drop-zone");
    dropZones.forEach((zone) => {
      const rect = zone.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        zone.classList.add("drag-over");
      } else {
        zone.classList.remove("drag-over");
      }
    });
  }

  handleTouchEnd(e, card) {
    if (!this.draggedElement) return;

    card.style.position = "";
    card.style.left = "";
    card.style.top = "";
    card.style.zIndex = "";
    card.classList.remove("dragging");

    const touch = e.changedTouches[0];
    const dropZones = document.querySelectorAll(".drop-zone");

    let dropped = false;
    dropZones.forEach((zone) => {
      const rect = zone.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        zone.classList.remove("drag-over");
        const index = parseInt(zone.dataset.index);
        this.placeCard(index);
        dropped = true;
      }
    });

    this.draggedElement = null;

    // Reset justTouched after a delay to prevent click events from firing
    setTimeout(() => {
      this.justTouched = false;
    }, 300);
  }

  placeCard(index) {
    if (!this.currentCard) return;

    // Reset selection state before placing
    this.isCardSelected = false;
    document.getElementById("deselect-btn").classList.add("hidden");

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

      // Check if challenger just beat the original score
      if (this.isChallenge && !this.challengeBeaten && this.bestStreak > this.challengeScore) {
        this.challengeBeaten = true;
        this.showChallengeBeatNotification();
      }

      this.render();
      this.updateStats();

      // Animate the newly placed card
      setTimeout(() => {
        const cards = document.querySelectorAll(".timeline .movie-card");
        const newCard = cards[index];
        newCard.classList.add("entrance");
        newCard.classList.add("correct");
        setTimeout(() => {
          newCard.classList.remove("correct");
          newCard.classList.remove("entrance");
        }, 500);
      }, 50);

      // Draw next card
      if (this.drawPile.length > 0) {
        this.currentCard = this.drawPile.shift();
        this.renderDrawPile();
      } else if (this.isChallenge && this.challengeBeaten) {
        // Challenge beaten and out of challenge movies - transition to random mode
        this.transitionToRandomMode();
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
      const drawPileCard = document.querySelector(".draw-pile .movie-card");
      if (drawPileCard) {
        drawPileCard.classList.add("wrong");
        setTimeout(() => drawPileCard.classList.remove("wrong"), 500);
      }

      // End game on wrong placement
      this.endGame(false);
    }
  }

  endGame(won) {
    // Save daily puzzle completion if in daily mode
    if (this.gameMode === 'daily') {
      this.saveDailyCompletion(this.bestStreak, won);
    }

    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("best-streak").textContent = this.bestStreak;

    // Get the stat items
    const correctDateStatItem = document.querySelector(
      ".stat-item:first-child"
    );
    const statDivider = document.querySelector(".stat-divider:first-child");

    // Get challenge UI elements
    const challengeBtn = document.getElementById("copy-challenge");
    const challengeResult = document.getElementById("challenge-result");

    if (won) {
      document.querySelector(".game-over-content h2").textContent =
        "Congratulations!";
      if (correctDateStatItem) correctDateStatItem.style.display = "none";
      if (statDivider) statDivider.style.display = "none";
    } else {
      document.querySelector(".game-over-content h2").textContent =
        "Game Over!";
      const dateInfo = this.formatDate(this.currentCard.release_date);
      document.getElementById(
        "correct-year"
      ).textContent = `${dateInfo.monthDay}, ${dateInfo.year}`;
      if (correctDateStatItem) correctDateStatItem.style.display = "";
      if (statDivider) statDivider.style.display = "";
    }

    // Show challenge button for random mode (not for daily or when already in a challenge)
    if (this.gameMode === 'random' && !this.isChallenge) {
      challengeBtn.classList.remove('hidden');
    } else {
      challengeBtn.classList.add('hidden');
    }

    // Show challenge results if playing a challenge
    if (this.isChallenge) {
      challengeResult.classList.remove('hidden');
      if (this.challengeBeaten) {
        challengeResult.innerHTML = `<span class="challenge-won">You beat the challenge! (${this.challengeScore} → ${this.bestStreak})</span>`;
      } else {
        challengeResult.innerHTML = `<span class="challenge-lost">Challenge failed. Needed ${this.challengeScore + 1}, got ${this.bestStreak}.</span>`;
      }
    } else {
      challengeResult.classList.add('hidden');
    }

    // Populate poster grid with timeline movies
    this.renderPosterGrid();
  }

  showChallengeBeatNotification() {
    // Show a brief notification that they beat the challenge
    const indicator = document.getElementById("challenge-indicator");
    if (indicator) {
      indicator.textContent = "Challenge beaten! Keep going!";
      indicator.classList.add("beaten");
    }
  }

  transitionToRandomMode() {
    // Show victory notification
    this.showChallengeVictoryNotification();

    // Get IDs of movies already in timeline to exclude them
    const usedIds = new Set(this.timeline.map(m => m.id));

    // Load random movies excluding ones already used
    const now = new Date();
    const availableMovies = MOVIES_DATA.filter(movie => {
      if (usedIds.has(movie.id)) return false;
      const releaseDate = new Date(movie.release_date);
      if (releaseDate > now) return false;
      return true;
    });

    // Shuffle and set as new draw pile
    this.shuffleArray(availableMovies);
    this.drawPile = availableMovies;

    // Clear challenge state but keep playing
    this.isChallenge = false;
    this.gameMode = 'random';

    // Clear the URL parameter
    window.history.replaceState({}, '', window.location.pathname);

    // Update mode buttons (will hide challenge indicator)
    this.updateModeButtons();

    // Draw next card and continue
    if (this.drawPile.length > 0) {
      this.currentCard = this.drawPile.shift();
      this.renderDrawPile();
    }
  }

  showChallengeVictoryNotification() {
    // Create and show a temporary victory notification
    const notification = document.createElement('div');
    notification.className = 'challenge-victory-notification';
    notification.innerHTML = `
      <div class="victory-content">
        <span class="victory-text">Challenge Complete! You beat ${this.challengeScore}!</span>
        <span class="victory-subtext">Now playing random mode...</span>
      </div>
    `;
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  renderPosterGrid() {
    const posterGrid = document.getElementById("poster-grid");
    posterGrid.innerHTML = "";

    // Create a combined timeline that includes the failed card if present
    let displayTimeline = [...this.timeline];

    // Find the correct chronological position for the failed card
    if (this.failedCard) {
      const failedDate = new Date(this.failedCard.release_date);
      let correctIndex = displayTimeline.findIndex(
        (movie) => new Date(movie.release_date) > failedDate
      );

      // If no movie is later, add to end
      if (correctIndex === -1) {
        correctIndex = displayTimeline.length;
      }

      // Insert failed card at correct position
      displayTimeline.splice(correctIndex, 0, {
        ...this.failedCard,
        isFailed: true,
      });
    }

    displayTimeline.forEach((movie) => {
      const posterUrl =
        movie.poster_url || movie.poster_path
          ? movie.poster_url ||
            `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Poster";

      const year = this.getYear(movie.release_date);

      const item = document.createElement("div");
      item.className = "poster-grid-item" + (movie.isFailed ? " failed" : "");
      item.title = `${movie.title} (${year})`;
      item.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                <div class="year-label">${year}</div>
                ${
                  movie.isFailed
                    ? '<div class="failed-overlay"><div class="x-mark">✕</div></div>'
                    : ""
                }
            `;

      posterGrid.appendChild(item);
    });

    // Store movie count for resize handler
    this.currentMovieCount = displayTimeline.length;

    // Calculate and set optimal poster size after DOM is ready and layout complete
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setOptimalPosterSize(displayTimeline.length);
      });
    });
  }

  setOptimalPosterSize(movieCount) {
    const posterGrid = document.getElementById("poster-grid");
    const container = posterGrid.parentElement;

    // Get available dimensions
    const containerWidth = container.clientWidth - 32; // padding
    const containerHeight = container.clientHeight - 32;
    const gap = 8;

    // Safety check - if dimensions aren't available yet, try again later
    if (containerWidth <= 0 || containerHeight <= 0) {
      setTimeout(() => this.setOptimalPosterSize(movieCount), 100);
      return;
    }

    // Start with a desired poster width and calculate how many columns fit
    let posterWidth = 60; // default
    let cols;

    // Try different poster sizes to find one that fits well
    for (let testWidth = 120; testWidth >= 40; testWidth -= 5) {
      cols = Math.floor((containerWidth + gap) / (testWidth + gap));
      if (cols < 1) cols = 1; // minimum 1 column
      const rows = Math.ceil(movieCount / cols);
      const posterHeight = testWidth * 1.5; // 2:3 aspect ratio
      const totalHeight = rows * posterHeight + (rows - 1) * gap;

      if (totalHeight <= containerHeight || testWidth === 40) {
        posterWidth = testWidth;
        break;
      }
    }

    // Set dynamic grid template
    posterGrid.style.gridTemplateColumns = `repeat(auto-fit, ${posterWidth}px)`;
    posterGrid.style.gap = `${gap}px`;
  }

  getYear(dateString) {
    return new Date(dateString).getFullYear();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
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
    const timelineEl = document.getElementById("timeline");
    timelineEl.innerHTML = "";

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
    const drawPileEl = document.getElementById("draw-pile");
    drawPileEl.innerHTML = "";

    if (this.currentCard) {
      const card = this.createMovieCard(this.currentCard, false, true);
      drawPileEl.appendChild(card);

      // Trigger entrance animation
      requestAnimationFrame(() => {
        card.classList.add("entrance");
        // Remove entrance class after animation completes
        setTimeout(() => card.classList.remove("entrance"), 600);
      });
    }
  }

  updateStats() {
    document.getElementById("score").textContent = this.streak;
  }
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new MovieTimelineGame();
});
