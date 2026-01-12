// Movie Timeline Game Logic

// Tracker API URL - set this to your Cloudflare Worker URL after deployment
// Leave empty to disable tracking
const TRACKER_API_URL = 'https://filmstrip-tracker.jeffgreco.workers.dev';

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
    this.gameMode = "daily"; // 'random', 'daily', or 'challenge'
    this.dailyPuzzle = null; // Current daily puzzle data
    this.puzzleNumber = null; // Daily puzzle number
    this.justTouched = false; // Track touch interactions to prevent click events

    // Challenge mode state
    this.challengeMovieIds = null; // Array of movie IDs for the challenge
    this.challengeScore = null; // Original player's score to beat
    this.challengeBeaten = false; // Whether challenger has beaten the original score
    this.isChallenge = false; // Whether we're playing a challenge
    this.playOrder = []; // Track order movies were drawn (for challenge URLs)

    // Archive mode state
    this.archivePuzzle = null; // Puzzle data when playing from archive
    this.archivePuzzleNumber = null; // Puzzle number when playing from archive

    // Game tracking
    this.tracker = typeof GameTracker !== 'undefined' ? new GameTracker(TRACKER_API_URL) : null;
    this.scoreChart = typeof ScoreHistoryChart !== 'undefined' ? new ScoreHistoryChart('score-chart') : null;

    this.init();
  }

  init() {
    // Load movies from the global MOVIES_DATA
    if (typeof MOVIES_DATA === "undefined") {
      console.error("Movie data not loaded!");
      return;
    }

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Check for puzzle ID parameter
    if (urlParams.has("puzzle")) {
      const puzzleId = urlParams.get("puzzle");
      const puzzle = getPuzzleById(puzzleId);
      if (puzzle) {
        this.archivePuzzle = puzzle;
        this.archivePuzzleNumber = null; // We don't know the puzzle number from ID alone
        this.gameMode = "archive";
      } else {
        // Invalid puzzle ID, clear URL and play daily
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
    // Check for challenge URL parameter
    else if (urlParams.has("c")) {
      const loaded = this.loadFromChallenge(urlParams.get("c"));
      if (!loaded) {
        // Invalid challenge, clear URL and play random
        window.history.replaceState({}, "", window.location.pathname);
        this.gameMode = "random";
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

    if (this.gameMode === "challenge" && this.challengeMovieIds) {
      // Challenge mode: load specific movies in the challenge order
      this.dailyPuzzle = null;
      this.puzzleNumber = null;
      const movieIdToData = new Map(MOVIES_DATA.map((m) => [m.id, m]));
      this.movies = this.challengeMovieIds
        .map((id) => movieIdToData.get(id))
        .filter((movie) => {
          if (!movie) return false;
          if (seenIds.has(movie.id)) return false;
          seenIds.add(movie.id);
          return true;
        });

      // If challenge movies couldn't be loaded, fall back to random
      if (this.movies.length < 2) {
        this.isChallenge = false;
        this.gameMode = "random";
        this.loadMoviesForMode();
        return;
      }
    } else if (this.gameMode === "archive" && this.archivePuzzle) {
      // Archive mode: load specific puzzle from archive
      this.dailyPuzzle = this.archivePuzzle;
      this.puzzleNumber = this.archivePuzzleNumber;

      const movieIdToData = new Map(MOVIES_DATA.map((m) => [m.id, m]));
      this.movies = this.archivePuzzle.movieIds
        .map((id) => movieIdToData.get(id))
        .filter((movie) => {
          if (!movie) return false;
          const releaseDate = new Date(movie.release_date);
          if (releaseDate > now) return false;
          if (seenIds.has(movie.id)) return false;
          seenIds.add(movie.id);
          return true;
        });

      // If archive puzzle movies couldn't be loaded, fall back to random
      if (this.movies.length < 2) {
        this.archivePuzzle = null;
        this.gameMode = "random";
        this.loadMoviesForMode();
        return;
      }
    } else if (this.gameMode === "daily") {
      // Load daily puzzle
      this.dailyPuzzle = getTodaysPuzzle();
      this.puzzleNumber = getPuzzleNumber(new Date());

      if (!this.dailyPuzzle) {
        // No daily puzzle available yet, switch to random mode
        this.gameMode = "random";
        this.loadMoviesForMode();
        return;
      }

      // Load movies in the exact order specified in dailyPuzzles.js
      // This preserves the curated easy-to-hard difficulty progression
      const movieIdToData = new Map(MOVIES_DATA.map((m) => [m.id, m]));
      this.movies = this.dailyPuzzle.movieIds
        .map((id) => movieIdToData.get(id))
        .filter((movie) => {
          if (!movie) return false;
          const releaseDate = new Date(movie.release_date);
          if (releaseDate > now) return false;
          if (seenIds.has(movie.id)) return false;
          seenIds.add(movie.id);
          return true;
        });

      // If daily puzzle movies couldn't be loaded, fall back to random
      if (this.movies.length < 2) {
        this.gameMode = "random";
        this.loadMoviesForMode();
        return;
      }
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
    // Only shuffle for random mode - daily and archive puzzles use pre-defined order
    if (this.gameMode === "random") {
      this.shuffleArray(this.movies);
    }
    // For daily and archive modes, movies are already in the curated order from dailyPuzzles.js

    // Take first movie for timeline, rest for draw pile
    this.timeline = [this.movies[0]];
    this.drawPile = this.movies.slice(1);

    // Draw first card
    this.currentCard = this.drawPile.shift();

    this.score = 0;
    this.streak = 0;
    this.bestStreak = 0;
    this.failedCard = null;
    this.failedCardIndex = null;
    this.currentMovieCount = 0;

    // Track play order: starting card, then first drawn card
    this.playOrder = [this.movies[0].id, this.currentCard.id];

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
      state = (state + 0x6d2b79f5) | 0;
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
    const data = [score, ...movieIds].join(",");
    // Use base64 encoding for URL safety
    return btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }

  // Decode challenge data from URL string
  decodeChallengeData(encoded) {
    try {
      // Restore base64 padding and characters
      let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) base64 += "=";
      const data = atob(base64);
      const parts = data.split(",").map(Number);
      if (parts.length < 2 || parts.some(isNaN)) return null;
      return {
        score: parts[0],
        movieIds: parts.slice(1),
      };
    } catch (e) {
      console.error("Failed to decode challenge:", e);
      return null;
    }
  }

  // Generate a challenge URL from current game state
  generateChallengeUrl() {
    // Use playOrder which tracks the order movies were drawn (not timeline order)
    const encoded = this.encodeChallengeData(this.playOrder, this.bestStreak);
    const url = new URL(window.location.href);
    url.search = ""; // Clear existing params
    url.searchParams.set("c", encoded);
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
    this.gameMode = "challenge";

    return true;
  }

  switchMode(newMode) {
    const wasChallenge = this.isChallenge;
    const wasArchive = this.gameMode === "archive";

    // Clear challenge state when switching modes
    if (this.isChallenge) {
      this.isChallenge = false;
      this.challengeMovieIds = null;
      this.challengeScore = null;
      this.challengeBeaten = false;
    }

    // Clear archive state when switching modes
    if (wasArchive) {
      this.archivePuzzle = null;
      this.archivePuzzleNumber = null;
    }

    // Clear URL parameters when switching modes
    if (wasArchive || wasChallenge) {
      window.history.replaceState({}, "", window.location.pathname);
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

    if (this.gameMode === "challenge") {
      // For challenge mode, show random as active and display challenge indicator
      randomBtn.classList.add("active");
      dailyBtn.classList.remove("active");
      if (challengeIndicator) {
        challengeIndicator.classList.remove("hidden");
        challengeIndicator.textContent = `Beat ${this.challengeScore} to win!`;
      }
    } else if (this.gameMode === "random") {
      randomBtn.classList.add("active");
      dailyBtn.classList.remove("active");
      if (challengeIndicator) challengeIndicator.classList.add("hidden");
    } else if (this.gameMode === "archive") {
      // For archive mode, show neither button as active
      randomBtn.classList.remove("active");
      dailyBtn.classList.remove("active");
      if (challengeIndicator) challengeIndicator.classList.add("hidden");
    } else {
      dailyBtn.classList.add("active");
      randomBtn.classList.remove("active");
      if (challengeIndicator) challengeIndicator.classList.add("hidden");
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
        theme: this.dailyPuzzle.theme,
      };
      localStorage.setItem(key, JSON.stringify(completionData));
    } catch (e) {
      console.error("Failed to save daily completion:", e);
    }
  }

  async submitToTracker(won) {
    if (!this.tracker) return;

    const gameData = {
      gameMode: this.gameMode,
      score: this.bestStreak,
      won: won,
      movieIds: this.timeline.map(m => m.id)
    };

    // Add puzzle-specific data for daily/archive modes
    if (this.gameMode === 'daily' || this.gameMode === 'archive') {
      gameData.puzzleId = this.dailyPuzzle?.id || null;
      gameData.puzzleNumber = this.puzzleNumber || this.archivePuzzleNumber || null;
      gameData.puzzleTheme = this.dailyPuzzle?.theme || null;
      gameData.totalMovies = this.dailyPuzzle?.movieIds?.length || null;
    }

    try {
      await this.tracker.submitCompletion(gameData);
    } catch (e) {
      console.warn('Failed to submit to tracker:', e);
    }
  }

  openArchive() {
    document.getElementById("archive-modal").classList.remove("hidden");
    this.renderArchiveList();
  }

  closeArchive() {
    document.getElementById("archive-modal").classList.add("hidden");
  }

  async openStats() {
    document.getElementById("stats-modal").classList.remove("hidden");
    await this.loadStatsData();
  }

  closeStats() {
    document.getElementById("stats-modal").classList.add("hidden");
  }

  async loadStatsData() {
    if (!this.tracker) {
      const chartContainer = document.getElementById('score-chart');
      if (chartContainer) {
        chartContainer.innerHTML = '<div class="chart-empty">Stats tracking not configured</div>';
      }
      return;
    }

    try {
      const historyData = await this.tracker.getHistory();
      if (this.scoreChart) {
        this.scoreChart.render(historyData.history);
      }
    } catch (e) {
      console.warn('Failed to load score history:', e);
    }
  }

  renderArchiveList() {
    const archiveList = document.getElementById("archive-list");
    const archivePuzzles = getArchivePuzzles();

    if (archivePuzzles.length === 0) {
      archiveList.innerHTML =
        '<div class="archive-empty">No puzzles available yet. Check back soon!</div>';
      return;
    }

    archiveList.innerHTML = archivePuzzles
      .map((item) => {
        const completionKey = `filmstrip_daily_${item.puzzleNumber}`;
        let completionData = null;
        try {
          const saved = localStorage.getItem(completionKey);
          if (saved) completionData = JSON.parse(saved);
        } catch (e) {}

        const dateObj = new Date(item.date + "T00:00:00");
        const formattedDate = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });

        let statusHtml = "";
        if (item.isToday) {
          statusHtml = '<span class="archive-item-badge today">Today</span>';
        }
        if (completionData) {
          statusHtml = `
          <span class="archive-item-score">${completionData.score}/${item.puzzle.movieIds.length}</span>
          <span class="archive-item-badge completed">Played</span>
        `;
        }

        return `
        <div class="archive-item" data-puzzle-number="${
          item.puzzleNumber
        }" data-date="${item.date}">
          <div class="archive-item-info">
            <div class="archive-item-number">Puzzle #${item.puzzleNumber}</div>
            <div class="archive-item-theme">${item.puzzle.theme}</div>
            <div class="archive-item-date">${formattedDate}</div>
          </div>
          <div class="archive-item-status">
            ${statusHtml}
            <button class="archive-play-btn">${
              completionData ? "Replay" : "Play"
            }</button>
          </div>
        </div>
      `;
      })
      .join("");

    // Add click handlers to archive items
    archiveList.querySelectorAll(".archive-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const puzzleNumber = parseInt(item.dataset.puzzleNumber);
        const date = item.dataset.date;
        this.playArchivePuzzle(puzzleNumber, date);
      });
    });
  }

  playArchivePuzzle(puzzleNumber, dateStr) {
    // Get the puzzle for this date
    const puzzle = getPuzzleForDate(new Date(dateStr + "T00:00:00"));
    if (!puzzle) return;

    // Close archive modal
    this.closeArchive();

    // Clear any existing challenge state
    if (this.isChallenge) {
      this.isChallenge = false;
      this.challengeMovieIds = null;
      this.challengeScore = null;
      this.challengeBeaten = false;
    }

    // Set the puzzle URL
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("puzzle", puzzle.id);
    window.history.replaceState({}, "", url.toString());

    // Set archive mode
    this.archivePuzzle = puzzle;
    this.archivePuzzleNumber = puzzleNumber;
    this.gameMode = "archive";

    // Hide game over modal if visible
    document.getElementById("game-over").classList.add("hidden");

    // Update UI and start game
    this.updateModeButtons();
    this.loadMoviesForMode();
    this.setupGame();
  }

  setupEventListeners() {
    // Logo dropdown menu
    const logoDropdown = document.querySelector(".logo-dropdown");
    const logoTrigger = document.querySelector(".logo-trigger");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    logoTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      logoDropdown.classList.toggle("open");
      dropdownMenu.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!logoDropdown.contains(e.target)) {
        logoDropdown.classList.remove("open");
        dropdownMenu.classList.add("hidden");
      }
    });

    // Archive menu item
    document.getElementById("menu-archive").addEventListener("click", (e) => {
      e.preventDefault();
      logoDropdown.classList.remove("open");
      dropdownMenu.classList.add("hidden");
      this.openArchive();
    });

    // Archive modal close button
    document.getElementById("archive-close").addEventListener("click", () => {
      this.closeArchive();
    });

    // Close archive when clicking outside content
    document.getElementById("archive-modal").addEventListener("click", (e) => {
      if (e.target.id === "archive-modal") {
        this.closeArchive();
      }
    });

    // Stats menu item
    document.getElementById("menu-stats").addEventListener("click", (e) => {
      e.preventDefault();
      logoDropdown.classList.remove("open");
      dropdownMenu.classList.add("hidden");
      this.openStats();
    });

    // Stats modal close button
    document.getElementById("stats-close").addEventListener("click", () => {
      this.closeStats();
    });

    // Close stats when clicking outside content
    document.getElementById("stats-modal").addEventListener("click", (e) => {
      if (e.target.id === "stats-modal") {
        this.closeStats();
      }
    });

    // Help menu item
    document.getElementById("menu-help").addEventListener("click", (e) => {
      e.preventDefault();
      logoDropdown.classList.remove("open");
      dropdownMenu.classList.add("hidden");
      document.getElementById("help-modal").classList.remove("hidden");
    });

    // Help modal close button
    document.getElementById("help-close").addEventListener("click", () => {
      document.getElementById("help-modal").classList.add("hidden");
    });

    // Close help when clicking outside content
    document.getElementById("help-modal").addEventListener("click", (e) => {
      if (e.target.id === "help-modal") {
        document.getElementById("help-modal").classList.add("hidden");
      }
    });

    // Mode selector buttons
    document.getElementById("random-mode-btn").addEventListener("click", () => {
      if (this.gameMode !== "random") {
        this.switchMode("random");
      }
    });

    document.getElementById("daily-mode-btn").addEventListener("click", () => {
      if (this.gameMode !== "daily") {
        this.switchMode("daily");
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

    if (
      (this.gameMode === "daily" || this.gameMode === "archive") &&
      this.puzzleNumber
    ) {
      const maxScore = this.dailyPuzzle.movieIds.length - 1; // First movie doesn't count
      text = `Filmstrip #${this.puzzleNumber} - ${this.dailyPuzzle.theme}\n${score}/${maxScore} 🎬`;
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
      const copied = await this.copyToClipboard(`${text}\n${url}`);
      if (copied) {
        const btn = document.getElementById("share-score");
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }
    }
  }

  async copyChallenge() {
    const challengeUrl = this.generateChallengeUrl();
    const text = `I scored ${this.bestStreak} on Filmstrip! Think you can beat me?`;

    const copied = await this.copyToClipboard(`${text}\n${challengeUrl}`);
    if (copied) {
      const btn = document.getElementById("copy-challenge");
      const originalText = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  }

  async copyToClipboard(text) {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn("Clipboard API failed, trying fallback:", err);
      }
    }

    // Fallback using execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      return false;
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
    const directorCredit =
      inPile && movie.showDirector && movie.directors?.length
        ? `<div class="director">(dir. ${movie.directors[0]})</div>`
        : "";

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
            ${directorCredit}
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

      // Check if placement has same date as a neighbor (takes precedence)
      const sameDateResult = this.checkForSameDateNeighbor(newDate, index);
      // Check if placement is within a month of a neighbor (only if not same date)
      const closeNeighborResult = !sameDateResult.matched
        ? this.checkForCloseNeighbor(newDate, index)
        : { matched: false };

      // Check if challenger just beat the original score
      if (
        this.isChallenge &&
        !this.challengeBeaten &&
        this.bestStreak > this.challengeScore
      ) {
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

        // Show notification for special placements (positioned between the two cards)
        // Use additional delay to ensure layout is complete
        setTimeout(() => {
          if (sameDateResult.matched) {
            // Check for Barbenheimer (Barbie + Oppenheimer)
            const movie1 = this.timeline[index];
            const movie2 = this.timeline[sameDateResult.neighborIndex];
            const titles = [
              movie1.title.toLowerCase(),
              movie2.title.toLowerCase(),
            ];
            const isBarbenheimer =
              titles.includes("barbie") && titles.includes("oppenheimer");

            if (isBarbenheimer) {
              this.showBarbenheimerNotification(
                index,
                sameDateResult.neighborIndex
              );
            } else {
              this.showSameDateNotification(
                index,
                sameDateResult.neighborIndex
              );
            }
          } else if (closeNeighborResult.matched) {
            this.showWowNotification(index, closeNeighborResult.neighborIndex);
          }
        }, 100);
      }, 50);

      // Draw next card
      if (this.drawPile.length > 0) {
        this.currentCard = this.drawPile.shift();
        this.playOrder.push(this.currentCard.id);
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
    // Save puzzle completion for daily and archive modes
    if (this.gameMode === "daily" || this.gameMode === "archive") {
      this.saveDailyCompletion(this.bestStreak, won);
    }

    // Submit to tracker (async, non-blocking)
    this.submitToTracker(won);

    document.getElementById("game-over").classList.remove("hidden");

    const isPuzzleMode = this.gameMode === "daily" || this.gameMode === "archive";
    const isPerfectDaily = won && isPuzzleMode;
    const showCongrats = won && (!this.isChallenge || this.challengeBeaten);

    const gameOverContent = document.querySelector(".game-over-content");
    const puzzleStatsEl = document.getElementById("puzzle-stats");
    const challengeBtn = document.getElementById("copy-challenge");
    const challengeResult = document.getElementById("challenge-result");

    // Set title
    if (isPerfectDaily) {
      document.querySelector(".game-over-content h2").textContent = "Perfect Score!";
      gameOverContent.classList.add("perfect-score");
    } else if (showCongrats) {
      document.querySelector(".game-over-content h2").textContent = "Congratulations!";
      gameOverContent.classList.remove("perfect-score");
    } else {
      document.querySelector(".game-over-content h2").textContent = "Game Over!";
      gameOverContent.classList.remove("perfect-score");
    }

    // Show puzzle stats for daily/archive modes
    if (isPuzzleMode && this.dailyPuzzle?.id) {
      puzzleStatsEl.classList.remove("hidden");
      this.loadPuzzleStats(this.dailyPuzzle.id);
    } else {
      puzzleStatsEl.classList.add("hidden");
    }

    // Show challenge button for random mode (not for daily or when already in a challenge)
    if (this.gameMode === "random" && !this.isChallenge) {
      challengeBtn.classList.remove("hidden");
    } else {
      challengeBtn.classList.add("hidden");
    }

    // Show challenge results if playing a challenge
    if (this.isChallenge) {
      challengeResult.classList.remove("hidden");
      if (this.challengeBeaten) {
        challengeResult.innerHTML = `<span class="challenge-won">You beat the challenge! (${this.challengeScore} → ${this.bestStreak})</span>`;
      } else {
        challengeResult.innerHTML = `<span class="challenge-lost">Challenge failed. Needed ${
          this.challengeScore + 1
        }, got ${this.bestStreak}.</span>`;
      }
    } else {
      challengeResult.classList.add("hidden");
    }

    // Populate poster grid with timeline movies
    this.renderPosterGrid();
  }

  async loadPuzzleStats(puzzleId) {
    let stats = null;

    if (this.tracker) {
      try {
        stats = await this.tracker.getPuzzleStats(puzzleId);
      } catch (e) {
        console.warn('Failed to load puzzle stats:', e);
      }
    }

    // Use dummy data if no stats available (for testing/preview)
    if (!stats || !stats.scoreDistribution || stats.scoreDistribution.length === 0) {
      const totalMovies = this.dailyPuzzle?.movieIds?.length || 10;
      stats = {
        attempts: 847,
        total_movies: totalMovies,
        scoreDistribution: [
          { score: 0, count: 12 },
          { score: 1, count: 34 },
          { score: 2, count: 67 },
          { score: 3, count: 89 },
          { score: 4, count: 124 },
          { score: 5, count: 156 },
          { score: 6, count: 132 },
          { score: 7, count: 98 },
          { score: 8, count: 72 },
          { score: 9, count: 41 },
          { score: totalMovies, count: 22 }
        ].filter(d => d.score <= totalMovies)
      };
    }

    this.renderPuzzleStatsChart(stats, this.bestStreak);
  }

  renderPuzzleStatsChart(stats, playerScore) {
    const distribution = stats.scoreDistribution || [];
    const totalPlayers = stats.attempts || 0;
    const maxScore = stats.total_movies || Math.max(...distribution.map(d => d.score), playerScore);

    // Calculate percentile
    let playersBelow = 0;
    distribution.forEach(d => {
      if (d.score < playerScore) playersBelow += d.count;
    });
    const percentile = totalPlayers > 0 ? Math.round((playersBelow / totalPlayers) * 100) : 0;

    // Update header
    const headerEl = document.getElementById("puzzle-stats-percentile");
    if (totalPlayers > 1) {
      headerEl.innerHTML = `You scored <span class="score-value">${playerScore}</span> — better than ${percentile}% of players`;
    } else {
      headerEl.innerHTML = `You scored <span class="score-value">${playerScore}</span>`;
    }

    // Build score map (fill in zeros for missing scores)
    const scoreMap = new Map();
    for (let i = 0; i <= maxScore; i++) {
      scoreMap.set(i, 0);
    }
    distribution.forEach(d => scoreMap.set(d.score, d.count));

    // Find max count for scaling
    const maxCount = Math.max(...scoreMap.values(), 1);

    // Render bar chart
    const chartEl = document.getElementById("puzzle-stats-chart");
    let html = '<div class="score-distribution">';

    for (let score = 0; score <= maxScore; score++) {
      const count = scoreMap.get(score) || 0;
      const heightPercent = (count / maxCount) * 100;
      const isPlayerScore = score === playerScore;

      html += `
        <div class="score-bar-container${isPlayerScore ? ' player-score' : ''}">
          <div class="score-bar" style="height: ${heightPercent}%"></div>
          <div class="score-label">${score}</div>
        </div>
      `;
    }

    html += '</div>';
    chartEl.innerHTML = html;
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
    const usedIds = new Set(this.timeline.map((m) => m.id));

    // Load random movies excluding ones already used
    const now = new Date();
    const availableMovies = MOVIES_DATA.filter((movie) => {
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
    this.gameMode = "random";

    // Clear the URL parameter
    window.history.replaceState({}, "", window.location.pathname);

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
    const notification = document.createElement("div");
    notification.className = "challenge-victory-notification";
    notification.innerHTML = `
      <div class="victory-content">
        <span class="victory-text">Challenge Complete! You beat ${this.challengeScore}!</span>
        <span class="victory-subtext">Now playing random mode...</span>
      </div>
    `;
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  checkForSameDateNeighbor(newDate, index) {
    // Check if the placed movie has the exact same release date as a neighbor
    // Returns { matched: true, neighborIndex } or { matched: false }
    // (now at index - 1 or index + 1 since we already inserted)
    if (index > 0) {
      const beforeDate = new Date(this.timeline[index - 1].release_date);
      if (newDate.getTime() === beforeDate.getTime()) {
        return { matched: true, neighborIndex: index - 1 };
      }
    }

    if (index < this.timeline.length - 1) {
      const afterDate = new Date(this.timeline[index + 1].release_date);
      if (newDate.getTime() === afterDate.getTime()) {
        return { matched: true, neighborIndex: index + 1 };
      }
    }

    return { matched: false };
  }

  checkForCloseNeighbor(newDate, index) {
    // Check if the placed movie is within 30 days of either neighbor
    // Returns { matched: true, neighborIndex } or { matched: false }
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const THRESHOLD_DAYS = 30;

    // Check movie before (now at index - 1 since we already inserted)
    if (index > 0) {
      const beforeDate = new Date(this.timeline[index - 1].release_date);
      const daysDiff = Math.abs((newDate - beforeDate) / MS_PER_DAY);
      if (daysDiff <= THRESHOLD_DAYS && daysDiff > 0) {
        return { matched: true, neighborIndex: index - 1 };
      }
    }

    // Check movie after (now at index + 1 since we already inserted)
    if (index < this.timeline.length - 1) {
      const afterDate = new Date(this.timeline[index + 1].release_date);
      const daysDiff = Math.abs((newDate - afterDate) / MS_PER_DAY);
      if (daysDiff <= THRESHOLD_DAYS && daysDiff > 0) {
        return { matched: true, neighborIndex: index + 1 };
      }
    }

    return { matched: false };
  }

  getPositionBetweenCards(cardIndex, neighborIndex) {
    const cards = document.querySelectorAll("#timeline .movie-card");
    const card1 = cards[Math.min(cardIndex, neighborIndex)];
    const card2 = cards[Math.max(cardIndex, neighborIndex)];

    if (!card1 || !card2) return null;

    const rect1 = card1.getBoundingClientRect();
    const rect2 = card2.getBoundingClientRect();

    // Calculate center point between the two cards
    let centerX = (rect1.right + rect2.left) / 2;
    let centerY = (rect1.top + rect1.bottom) / 2;

    // Clamp position to keep notification on screen
    // Account for notification size (approx 180px wide, 60px tall)
    const margin = 20;
    const notifHalfWidth = 90;
    const notifHalfHeight = 30;

    const minX = margin + notifHalfWidth;
    const maxX = window.innerWidth - margin - notifHalfWidth;
    const minY = margin + notifHalfHeight;
    const maxY = window.innerHeight - margin - notifHalfHeight;

    centerX = Math.max(minX, Math.min(maxX, centerX));
    centerY = Math.max(minY, Math.min(maxY, centerY));

    return { x: centerX, y: centerY };
  }

  createSparkles(x, y, color1, color2) {
    const sparkleCount = 8;
    const distance = 50;
    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "notification-sparkle";

      // Calculate angle and end position
      const angle = ((2 * Math.PI) / sparkleCount) * i;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      sparkle.style.left = `${x}px`;
      sparkle.style.top = `${y}px`;
      sparkle.style.setProperty("--end-x", `${endX}px`);
      sparkle.style.setProperty("--end-y", `${endY}px`);
      sparkle.style.background = i % 2 === 0 ? color1 : color2;
      sparkle.style.boxShadow = `0 0 6px ${i % 2 === 0 ? color1 : color2}`;
      document.body.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), 600);
    }
  }

  showWowNotification(cardIndex, neighborIndex) {
    const notification = document.createElement("div");
    notification.className = "wow-notification";
    notification.innerHTML = `
      <div class="wow-content">
        <div class="wow-text">Close one!</div>
      </div>
    `;
    document.body.appendChild(notification);

    // Position between the two cards
    const pos = this.getPositionBetweenCards(cardIndex, neighborIndex);
    if (pos) {
      notification.style.left = `${pos.x}px`;
      notification.style.top = `${pos.y}px`;
      this.createSparkles(pos.x, pos.y, "#ff6b35", "#f7931e");
    }

    // Animate in (use double rAF to ensure styles are applied)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notification.classList.add("show");
      });
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.add("hide");
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 1400);
  }

  showSameDateNotification(cardIndex, neighborIndex) {
    const notification = document.createElement("div");
    notification.className = "same-date-notification";
    notification.innerHTML = `
      <div class="same-date-content">
        <div class="same-date-text">Same day!</div>
      </div>
    `;
    document.body.appendChild(notification);

    // Position between the two cards
    const pos = this.getPositionBetweenCards(cardIndex, neighborIndex);
    if (pos) {
      notification.style.left = `${pos.x}px`;
      notification.style.top = `${pos.y}px`;
      this.createSparkles(pos.x, pos.y, "#9b59b6", "#e74c3c");
    }

    // Animate in (use double rAF to ensure styles are applied)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notification.classList.add("show");
      });
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.add("hide");
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 1400);
  }

  showBarbenheimerNotification(cardIndex, neighborIndex) {
    const notification = document.createElement("div");
    notification.className = "barbenheimer-notification";
    notification.innerHTML = `
      <div class="barbenheimer-content">
        <div class="barbenheimer-text">Barbenheimer!</div>
      </div>
    `;
    document.body.appendChild(notification);

    // Position between the two cards
    const pos = this.getPositionBetweenCards(cardIndex, neighborIndex);
    if (pos) {
      notification.style.left = `${pos.x}px`;
      notification.style.top = `${pos.y}px`;
      // Pink and orange/fire colors for Barbie + Oppenheimer
      this.createSparkles(pos.x, pos.y, "#ff69b4", "#ff4500");
    }

    // Animate in (use double rAF to ensure styles are applied)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notification.classList.add("show");
      });
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.add("hide");
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 1800);
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

      const dateInfo = this.formatDate(movie.release_date);
      const fullDate = `${dateInfo.monthDay}, ${dateInfo.year}`;

      const item = document.createElement("div");
      item.className = "poster-grid-item" + (movie.isFailed ? " failed" : "");
      item.title = `${movie.title} (${fullDate})`;
      item.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                <div class="year-label">${fullDate}</div>
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
