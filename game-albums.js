// Album Timeline Game Logic
// Based on Rolling Stone's 500 Greatest Albums of All Time

class AlbumTimelineGame {
  constructor() {
    this.albums = [];
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
    this.currentAlbumCount = 0;
    this.resizeTimeout = null;
    this.gameMode = "daily"; // 'random', 'daily', or 'challenge'
    this.dailyPuzzle = null; // Current daily puzzle data
    this.puzzleNumber = null; // Daily puzzle number
    this.justTouched = false; // Track touch interactions to prevent click events

    // Challenge mode state
    this.challengeAlbumIds = null; // Array of album IDs for the challenge
    this.challengeScore = null; // Original player's score to beat
    this.challengeBeaten = false; // Whether challenger has beaten the original score
    this.isChallenge = false; // Whether we're playing a challenge
    this.playOrder = []; // Track order albums were drawn (for challenge URLs)

    // Archive mode state
    this.archivePuzzle = null; // Puzzle data when playing from archive
    this.archivePuzzleNumber = null; // Puzzle number when playing from archive

    // Audio state
    this.audioEnabled = false;
    this.currentAudio = null;
    this.fadingOutAudio = null;
    this.fadeInterval = null;

    this.init();
  }

  init() {
    // Load albums from the global ALBUMS_DATA
    if (typeof ALBUMS_DATA === "undefined") {
      console.error("Album data not loaded!");
      return;
    }

    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Check for puzzle ID parameter
    if (urlParams.has("puzzle")) {
      const puzzleId = urlParams.get("puzzle");
      const puzzle = getAlbumPuzzleById(puzzleId);
      if (puzzle) {
        this.archivePuzzle = puzzle;
        this.archivePuzzleNumber = null;
        this.gameMode = "archive";
      } else {
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
    // Check for challenge URL parameter
    else if (urlParams.has("c")) {
      const loaded = this.loadFromChallenge(urlParams.get("c"));
      if (!loaded) {
        window.history.replaceState({}, "", window.location.pathname);
        this.gameMode = "random";
      }
    }

    this.loadAlbumsForMode();
    this.setupGame();
    this.setupEventListeners();
    this.updateModeButtons();
  }

  loadAlbumsForMode() {
    const now = new Date();
    const seenIds = new Set();

    if (this.gameMode === "challenge" && this.challengeAlbumIds) {
      this.dailyPuzzle = null;
      this.puzzleNumber = null;
      const albumIdToData = new Map(ALBUMS_DATA.map((a) => [a.id, a]));
      this.albums = this.challengeAlbumIds
        .map((id) => albumIdToData.get(id))
        .filter((album) => {
          if (!album) return false;
          if (seenIds.has(album.id)) return false;
          seenIds.add(album.id);
          return true;
        });

      if (this.albums.length < 2) {
        this.isChallenge = false;
        this.gameMode = "random";
        this.loadAlbumsForMode();
        return;
      }
    } else if (this.gameMode === "archive" && this.archivePuzzle) {
      this.dailyPuzzle = this.archivePuzzle;
      this.puzzleNumber = this.archivePuzzleNumber;

      const albumIdToData = new Map(ALBUMS_DATA.map((a) => [a.id, a]));
      this.albums = this.archivePuzzle.albumIds
        .map((id) => albumIdToData.get(id))
        .filter((album) => {
          if (!album) return false;
          const releaseDate = new Date(album.release_date);
          if (releaseDate > now) return false;
          if (seenIds.has(album.id)) return false;
          seenIds.add(album.id);
          return true;
        });
    } else if (this.gameMode === "daily") {
      this.dailyPuzzle = getTodaysAlbumPuzzle();
      this.puzzleNumber = getAlbumPuzzleNumber(new Date());

      if (!this.dailyPuzzle) {
        this.gameMode = "random";
        this.loadAlbumsForMode();
        return;
      }

      const albumIdToData = new Map(ALBUMS_DATA.map((a) => [a.id, a]));
      this.albums = this.dailyPuzzle.albumIds
        .map((id) => albumIdToData.get(id))
        .filter((album) => {
          if (!album) return false;
          const releaseDate = new Date(album.release_date);
          if (releaseDate > now) return false;
          if (seenIds.has(album.id)) return false;
          seenIds.add(album.id);
          return true;
        });
    } else {
      // Random mode: use all albums
      this.dailyPuzzle = null;
      this.puzzleNumber = null;
      this.albums = ALBUMS_DATA.filter((album) => {
        const releaseDate = new Date(album.release_date);
        if (releaseDate > now) return false;
        if (seenIds.has(album.id)) return false;
        seenIds.add(album.id);
        return true;
      });
    }
  }

  setupGame() {
    if (this.gameMode === "random") {
      this.shuffleArray(this.albums);
    }

    this.timeline = [this.albums[0]];
    this.drawPile = this.albums.slice(1);
    this.currentCard = this.drawPile.shift();

    this.score = 0;
    this.streak = 0;
    this.failedCard = null;
    this.failedCardIndex = null;
    this.currentAlbumCount = 0;

    this.playOrder = [this.albums[0].id, this.currentCard.id];

    this.render();
    this.updateStats();
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  encodeChallengeData(albumIds, score) {
    const data = [score, ...albumIds].join(",");
    return btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }

  decodeChallengeData(encoded) {
    try {
      let base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) base64 += "=";
      const data = atob(base64);
      const parts = data.split(",").map(Number);
      if (parts.length < 2 || parts.some(isNaN)) return null;
      return {
        score: parts[0],
        albumIds: parts.slice(1),
      };
    } catch (e) {
      console.error("Failed to decode challenge:", e);
      return null;
    }
  }

  generateChallengeUrl() {
    const encoded = this.encodeChallengeData(this.playOrder, this.bestStreak);
    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("c", encoded);
    return url.toString();
  }

  loadFromChallenge(encoded) {
    const data = this.decodeChallengeData(encoded);
    if (!data || data.albumIds.length < 2) return false;

    this.isChallenge = true;
    this.challengeAlbumIds = data.albumIds;
    this.challengeScore = data.score;
    this.challengeBeaten = false;
    this.gameMode = "challenge";

    return true;
  }

  switchMode(newMode) {
    // Stop any playing audio
    this.stopAudio();

    const wasChallenge = this.isChallenge;
    const wasArchive = this.gameMode === "archive";

    if (this.isChallenge) {
      this.isChallenge = false;
      this.challengeAlbumIds = null;
      this.challengeScore = null;
      this.challengeBeaten = false;
    }

    if (wasArchive) {
      this.archivePuzzle = null;
      this.archivePuzzleNumber = null;
    }

    if (wasArchive || wasChallenge) {
      window.history.replaceState({}, "", window.location.pathname);
    }

    this.gameMode = newMode;
    this.updateModeButtons();

    document.getElementById("game-over").classList.add("hidden");
    this.loadAlbumsForMode();
    this.setupGame();
  }

  updateModeButtons() {
    const randomBtn = document.getElementById("random-mode-btn");
    const dailyBtn = document.getElementById("daily-mode-btn");
    const challengeIndicator = document.getElementById("challenge-indicator");

    if (this.gameMode === "challenge") {
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
    return `vinylstack_daily_${this.puzzleNumber}`;
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

  openArchive() {
    document.getElementById("archive-modal").classList.remove("hidden");
    this.renderArchiveList();
  }

  closeArchive() {
    document.getElementById("archive-modal").classList.add("hidden");
  }

  renderArchiveList() {
    const archiveList = document.getElementById("archive-list");
    const archivePuzzles = getAlbumPastPuzzles();

    if (archivePuzzles.length === 0) {
      archiveList.innerHTML =
        '<div class="archive-empty">No puzzles available yet. Check back soon!</div>';
      return;
    }

    archiveList.innerHTML = archivePuzzles
      .map((item) => {
        const completionKey = `vinylstack_daily_${item.puzzleNumber}`;
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
          <span class="archive-item-score">${completionData.score}/${item.puzzle.albumIds.length}</span>
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

    archiveList.querySelectorAll(".archive-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const puzzleNumber = parseInt(item.dataset.puzzleNumber);
        const date = item.dataset.date;
        this.playArchivePuzzle(puzzleNumber, date);
      });
    });
  }

  playArchivePuzzle(puzzleNumber, dateStr) {
    const puzzle = getAlbumPuzzleForDate(new Date(dateStr + "T00:00:00"));
    if (!puzzle) return;

    this.closeArchive();

    if (this.isChallenge) {
      this.isChallenge = false;
      this.challengeAlbumIds = null;
      this.challengeScore = null;
      this.challengeBeaten = false;
    }

    const url = new URL(window.location.href);
    url.search = "";
    url.searchParams.set("puzzle", puzzle.id);
    window.history.replaceState({}, "", url.toString());

    this.archivePuzzle = puzzle;
    this.archivePuzzleNumber = puzzleNumber;
    this.gameMode = "archive";

    document.getElementById("game-over").classList.add("hidden");

    this.updateModeButtons();
    this.loadAlbumsForMode();
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

    document.addEventListener("click", (e) => {
      if (!logoDropdown.contains(e.target)) {
        logoDropdown.classList.remove("open");
        dropdownMenu.classList.add("hidden");
      }
    });

    document.getElementById("menu-archive").addEventListener("click", (e) => {
      e.preventDefault();
      logoDropdown.classList.remove("open");
      dropdownMenu.classList.add("hidden");
      this.openArchive();
    });

    document.getElementById("archive-close").addEventListener("click", () => {
      this.closeArchive();
    });

    document.getElementById("archive-modal").addEventListener("click", (e) => {
      if (e.target.id === "archive-modal") {
        this.closeArchive();
      }
    });

    document.getElementById("menu-help").addEventListener("click", (e) => {
      e.preventDefault();
      logoDropdown.classList.remove("open");
      dropdownMenu.classList.add("hidden");
      document.getElementById("help-modal").classList.remove("hidden");
    });

    document.getElementById("help-close").addEventListener("click", () => {
      document.getElementById("help-modal").classList.add("hidden");
    });

    document.getElementById("help-modal").addEventListener("click", (e) => {
      if (e.target.id === "help-modal") {
        document.getElementById("help-modal").classList.add("hidden");
      }
    });

    // Audio toggle
    document.getElementById("audio-toggle").addEventListener("click", () => {
      this.toggleAudio();
    });

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
      this.loadAlbumsForMode();
      this.setupGame();
    });

    document.getElementById("share-score").addEventListener("click", () => {
      this.shareScore();
    });

    document.getElementById("copy-challenge").addEventListener("click", () => {
      this.copyChallenge();
    });

    document.getElementById("deselect-btn").addEventListener("click", () => {
      this.deselectCard();
    });

    window.addEventListener("resize", () => {
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout(() => {
        const gameOverModal = document.getElementById("game-over");
        if (
          !gameOverModal.classList.contains("hidden") &&
          this.currentAlbumCount > 0
        ) {
          this.setOptimalPosterSize(this.currentAlbumCount);
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
      const totalAlbums = this.dailyPuzzle.albumIds.length;
      text = `Vinyl Stack #${this.puzzleNumber} - ${this.dailyPuzzle.theme}\n${score}/${totalAlbums}`;
    } else {
      text = `I scored ${score} on Vinyl Stack! Can you beat my score?`;
    }

    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vinyl Stack - Album Timeline Game",
          text: text,
          url: url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
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
    const text = `I scored ${this.bestStreak} on Vinyl Stack! Think you can beat me?`;

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
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn("Clipboard API failed, trying fallback:", err);
      }
    }

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
    const drawPileCard = document.querySelector(".draw-pile .album-card");
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
    const drawPileCard = document.querySelector(".draw-pile .album-card");
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

  createAlbumCard(album, showYear = true, inPile = false) {
    const card = document.createElement("div");
    card.className = "album-card" + (inPile ? " in-pile" : "");
    card.dataset.id = album.id;
    card.dataset.releaseDate = album.release_date;
    card.draggable = inPile;

    const coverUrl = album.cover_url || "";

    const dateInfo = this.formatDate(album.release_date);
    const artistCredit = inPile ? `<div class="artist">${album.artist}</div>` : "";

    // Create a fallback placeholder with album info
    const fallbackHtml = `<div class="cover-fallback"><span class="fallback-title">${album.title}</span><span class="fallback-artist">${album.artist}</span></div>`;

    card.innerHTML = `
      ${coverUrl ? `<img class="cover" src="${coverUrl}" alt="${album.title}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">` : ''}
      <div class="cover-fallback" style="display: ${coverUrl ? 'none' : 'flex'}"><span class="fallback-title">${album.title}</span><span class="fallback-artist">${album.artist}</span></div>
      ${
        showYear
          ? `<span class="year"><span class="month-day">${dateInfo.monthDay}</span>,&nbsp;<span class="year-num">${dateInfo.year}</span></span>`
          : ""
      }
      <div class="title">${album.title}</div>
      ${artistCredit}
    `;

    if (inPile) {
      card.addEventListener("dragstart", (e) => this.handleDragStart(e, card));
      card.addEventListener("dragend", (e) => this.handleDragEnd(e, card));
      card.addEventListener("touchstart", (e) => this.handleTouchStart(e, card));
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
    zone.addEventListener("click", () => this.handleDropZoneClick(index));

    return zone;
  }

  handleDropZoneClick(index) {
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

  handleTouchStart(e, card) {
    this.justTouched = true;
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

    setTimeout(() => {
      this.justTouched = false;
    }, 300);
  }

  placeCard(index) {
    if (!this.currentCard) return;

    this.isCardSelected = false;
    document.getElementById("deselect-btn").classList.add("hidden");

    const newDate = new Date(this.currentCard.release_date);

    let isCorrect = true;

    if (index > 0) {
      const beforeDate = new Date(this.timeline[index - 1].release_date);
      if (newDate < beforeDate) {
        isCorrect = false;
      }
    }

    if (index < this.timeline.length) {
      const afterDate = new Date(this.timeline[index].release_date);
      if (newDate > afterDate) {
        isCorrect = false;
      }
    }

    if (isCorrect) {
      this.timeline.splice(index, 0, this.currentCard);
      this.score += 10 + this.streak * 5;
      this.streak++;
      if (this.streak > this.bestStreak) {
        this.bestStreak = this.streak;
      }

      const sameDateResult = this.checkForSameDateNeighbor(newDate, index);
      const closeNeighborResult = !sameDateResult.matched
        ? this.checkForCloseNeighbor(newDate, index)
        : { matched: false };

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

      setTimeout(() => {
        const cards = document.querySelectorAll(".timeline .album-card");
        const newCard = cards[index];
        newCard.classList.add("entrance");
        newCard.classList.add("correct");
        setTimeout(() => {
          newCard.classList.remove("correct");
          newCard.classList.remove("entrance");
        }, 500);

        setTimeout(() => {
          if (sameDateResult.matched) {
            this.showSameDateNotification(index, sameDateResult.neighborIndex);
          } else if (closeNeighborResult.matched) {
            this.showWowNotification(index, closeNeighborResult.neighborIndex);
          }
        }, 100);
      }, 50);

      if (this.drawPile.length > 0) {
        this.currentCard = this.drawPile.shift();
        this.playOrder.push(this.currentCard.id);
        this.renderDrawPile();
      } else if (this.isChallenge && this.challengeBeaten) {
        this.transitionToRandomMode();
      } else {
        this.endGame(true);
      }
    } else {
      this.streak = 0;
      this.updateStats();

      this.failedCard = this.currentCard;
      this.failedCardIndex = index;

      const drawPileCard = document.querySelector(".draw-pile .album-card");
      if (drawPileCard) {
        drawPileCard.classList.add("wrong");
        setTimeout(() => drawPileCard.classList.remove("wrong"), 500);
      }

      this.endGame(false);
    }
  }

  endGame(won) {
    // Stop audio when game ends
    this.stopAudio();

    if (this.gameMode === "daily" || this.gameMode === "archive") {
      this.saveDailyCompletion(this.bestStreak, won);
    }

    document.getElementById("game-over").classList.remove("hidden");
    document.getElementById("best-streak").textContent = this.bestStreak;

    const correctDateStatItem = document.querySelector(
      ".stat-item:first-child"
    );
    const statDivider = document.querySelector(".stat-divider:first-child");

    const challengeBtn = document.getElementById("copy-challenge");
    const challengeResult = document.getElementById("challenge-result");

    const showCongrats = won && (!this.isChallenge || this.challengeBeaten);
    const isPerfectDaily =
      won && (this.gameMode === "daily" || this.gameMode === "archive");

    const gameOverContent = document.querySelector(".game-over-content");

    if (isPerfectDaily) {
      document.querySelector(".game-over-content h2").textContent =
        "Perfect Score!";
      gameOverContent.classList.add("perfect-score");
      if (correctDateStatItem) correctDateStatItem.style.display = "none";
      if (statDivider) statDivider.style.display = "none";
    } else if (showCongrats) {
      document.querySelector(".game-over-content h2").textContent =
        "Congratulations!";
      gameOverContent.classList.remove("perfect-score");
      if (correctDateStatItem) correctDateStatItem.style.display = "none";
      if (statDivider) statDivider.style.display = "none";
    } else {
      document.querySelector(".game-over-content h2").textContent =
        "Game Over!";
      gameOverContent.classList.remove("perfect-score");
      if (this.currentCard) {
        const dateInfo = this.formatDate(this.currentCard.release_date);
        document.getElementById(
          "correct-year"
        ).textContent = `${dateInfo.monthDay}, ${dateInfo.year}`;
        if (correctDateStatItem) correctDateStatItem.style.display = "";
        if (statDivider) statDivider.style.display = "";
      } else {
        if (correctDateStatItem) correctDateStatItem.style.display = "none";
        if (statDivider) statDivider.style.display = "none";
      }
    }

    if (this.gameMode === "random" && !this.isChallenge) {
      challengeBtn.classList.remove("hidden");
    } else {
      challengeBtn.classList.add("hidden");
    }

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

    this.renderPosterGrid();
  }

  showChallengeBeatNotification() {
    const indicator = document.getElementById("challenge-indicator");
    if (indicator) {
      indicator.textContent = "Challenge beaten! Keep going!";
      indicator.classList.add("beaten");
    }
  }

  transitionToRandomMode() {
    this.showChallengeVictoryNotification();

    const usedIds = new Set(this.timeline.map((a) => a.id));

    const now = new Date();
    const availableAlbums = ALBUMS_DATA.filter((album) => {
      if (usedIds.has(album.id)) return false;
      const releaseDate = new Date(album.release_date);
      if (releaseDate > now) return false;
      return true;
    });

    this.shuffleArray(availableAlbums);
    this.drawPile = availableAlbums;

    this.isChallenge = false;
    this.gameMode = "random";

    window.history.replaceState({}, "", window.location.pathname);
    this.updateModeButtons();

    if (this.drawPile.length > 0) {
      this.currentCard = this.drawPile.shift();
      this.renderDrawPile();
    }
  }

  showChallengeVictoryNotification() {
    const notification = document.createElement("div");
    notification.className = "challenge-victory-notification";
    notification.innerHTML = `
      <div class="victory-content">
        <span class="victory-text">Challenge Complete! You beat ${this.challengeScore}!</span>
        <span class="victory-subtext">Now playing random mode...</span>
      </div>
    `;
    document.body.appendChild(notification);

    requestAnimationFrame(() => {
      notification.classList.add("show");
    });

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  checkForSameDateNeighbor(newDate, index) {
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
    const MS_PER_DAY = 24 * 60 * 60 * 1000;
    const THRESHOLD_DAYS = 30;

    if (index > 0) {
      const beforeDate = new Date(this.timeline[index - 1].release_date);
      const daysDiff = Math.abs((newDate - beforeDate) / MS_PER_DAY);
      if (daysDiff <= THRESHOLD_DAYS && daysDiff > 0) {
        return { matched: true, neighborIndex: index - 1 };
      }
    }

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
    const cards = document.querySelectorAll("#timeline .album-card");
    const card1 = cards[Math.min(cardIndex, neighborIndex)];
    const card2 = cards[Math.max(cardIndex, neighborIndex)];

    if (!card1 || !card2) return null;

    const rect1 = card1.getBoundingClientRect();
    const rect2 = card2.getBoundingClientRect();

    let centerX = (rect1.right + rect2.left) / 2;
    let centerY = (rect1.top + rect1.bottom) / 2;

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

    const pos = this.getPositionBetweenCards(cardIndex, neighborIndex);
    if (pos) {
      notification.style.left = `${pos.x}px`;
      notification.style.top = `${pos.y}px`;
      this.createSparkles(pos.x, pos.y, "#ff6b35", "#f7931e");
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notification.classList.add("show");
      });
    });

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

    const pos = this.getPositionBetweenCards(cardIndex, neighborIndex);
    if (pos) {
      notification.style.left = `${pos.x}px`;
      notification.style.top = `${pos.y}px`;
      this.createSparkles(pos.x, pos.y, "#9b59b6", "#e74c3c");
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        notification.classList.add("show");
      });
    });

    setTimeout(() => {
      notification.classList.add("hide");
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 1400);
  }

  renderPosterGrid() {
    const posterGrid = document.getElementById("poster-grid");
    posterGrid.innerHTML = "";

    let displayTimeline = [...this.timeline];

    if (this.failedCard) {
      const failedDate = new Date(this.failedCard.release_date);
      let correctIndex = displayTimeline.findIndex(
        (album) => new Date(album.release_date) > failedDate
      );

      if (correctIndex === -1) {
        correctIndex = displayTimeline.length;
      }

      displayTimeline.splice(correctIndex, 0, {
        ...this.failedCard,
        isFailed: true,
      });
    }

    displayTimeline.forEach((album) => {
      const coverUrl = album.cover_url || "https://via.placeholder.com/300x300?text=No+Cover";

      const dateInfo = this.formatDate(album.release_date);
      const fullDate = `${dateInfo.monthDay}, ${dateInfo.year}`;

      const item = document.createElement("div");
      item.className = "poster-grid-item" + (album.isFailed ? " failed" : "");
      item.title = `${album.title} by ${album.artist} (${fullDate})`;
      item.innerHTML = `
        <img src="${coverUrl}" alt="${album.title}" loading="lazy">
        <div class="year-label">${fullDate}</div>
        ${
          album.isFailed
            ? '<div class="failed-overlay"><div class="x-mark">✕</div></div>'
            : ""
        }
      `;

      posterGrid.appendChild(item);
    });

    this.currentAlbumCount = displayTimeline.length;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setOptimalPosterSize(displayTimeline.length);
      });
    });
  }

  setOptimalPosterSize(albumCount) {
    const posterGrid = document.getElementById("poster-grid");
    const container = posterGrid.parentElement;

    const containerWidth = container.clientWidth - 32;
    const containerHeight = container.clientHeight - 32;
    const gap = 8;

    if (containerWidth <= 0 || containerHeight <= 0) {
      setTimeout(() => this.setOptimalPosterSize(albumCount), 100);
      return;
    }

    let posterWidth = 60;
    let cols;

    for (let testWidth = 120; testWidth >= 40; testWidth -= 5) {
      cols = Math.floor((containerWidth + gap) / (testWidth + gap));
      if (cols < 1) cols = 1;
      const rows = Math.ceil(albumCount / cols);
      const posterHeight = testWidth; // 1:1 aspect ratio for album covers
      const totalHeight = rows * posterHeight + (rows - 1) * gap;

      if (totalHeight <= containerHeight || testWidth === 40) {
        posterWidth = testWidth;
        break;
      }
    }

    posterGrid.style.gridTemplateColumns = `repeat(auto-fit, ${posterWidth}px)`;
    posterGrid.style.gap = `${gap}px`;
  }

  getYear(dateString) {
    return new Date(dateString).getFullYear();
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
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

    timelineEl.appendChild(this.createDropZone(0));

    this.timeline.forEach((album, index) => {
      const card = this.createAlbumCard(album, true, false);
      timelineEl.appendChild(card);
      timelineEl.appendChild(this.createDropZone(index + 1));
    });
  }

  renderDrawPile() {
    const drawPileEl = document.getElementById("draw-pile");
    drawPileEl.innerHTML = "";

    if (this.currentCard) {
      const card = this.createAlbumCard(this.currentCard, false, true);
      drawPileEl.appendChild(card);

      requestAnimationFrame(() => {
        card.classList.add("entrance");
        setTimeout(() => card.classList.remove("entrance"), 600);
      });

      // Play audio preview if enabled
      if (this.audioEnabled && this.currentCard.preview_url) {
        this.playPreview(this.currentCard.preview_url);
      }
    }
  }

  updateStats() {
    document.getElementById("score").textContent = this.streak;
  }

  // Audio control methods
  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    const toggle = document.getElementById("audio-toggle");
    const iconOff = document.getElementById("audio-icon-off");
    const iconOn = document.getElementById("audio-icon-on");

    if (this.audioEnabled) {
      toggle.classList.add("active");
      iconOff.classList.add("hidden");
      iconOn.classList.remove("hidden");
      // Start playing current album if there is one
      if (this.currentCard && this.currentCard.preview_url) {
        this.playPreview(this.currentCard.preview_url);
      }
    } else {
      toggle.classList.remove("active");
      iconOff.classList.remove("hidden");
      iconOn.classList.add("hidden");
      this.stopAudio();
    }
  }

  playPreview(previewUrl) {
    if (!this.audioEnabled || !previewUrl) return;

    // Don't restart if already playing this URL
    if (this.currentAudio && this.currentAudioUrl === previewUrl) {
      return;
    }

    // Clean up any audio that was being faded out (prevents orphaned audio)
    if (this.fadingOutAudio) {
      this.fadingOutAudio.pause();
      this.fadingOutAudio.src = "";
      this.fadingOutAudio = null;
    }

    // Cancel any in-progress crossfade
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }

    // Track which URL we're playing
    this.currentAudioUrl = previewUrl;

    // Create new audio element
    const audio = new Audio(previewUrl);
    audio.volume = 0;

    // If there's current audio, crossfade
    if (this.currentAudio) {
      this.crossfade(this.currentAudio, audio);
    } else {
      // Fade in from silence
      this.currentAudio = audio;
      audio.play().catch(() => {}); // Ignore autoplay errors
      this.fadeIn(audio);
    }
  }

  crossfade(oldAudio, newAudio) {
    const fadeTime = 1000; // 1 second crossfade
    const steps = 20;
    const stepTime = fadeTime / steps;
    let step = 0;

    // Capture the actual current volume (may be mid-fade)
    const oldStartVolume = oldAudio ? oldAudio.volume : 0;

    // Track the old audio and immediately update currentAudio
    // This prevents race conditions if playPreview is called mid-crossfade
    this.fadingOutAudio = oldAudio;
    this.currentAudio = newAudio;

    newAudio.play().catch(() => {});

    this.fadeInterval = setInterval(() => {
      step++;
      const progress = step / steps;

      // Fade out old from its current volume (not assumed 0.7)
      if (this.fadingOutAudio) {
        this.fadingOutAudio.volume = Math.max(0, oldStartVolume * (1 - progress));
      }

      // Fade in new
      newAudio.volume = Math.min(0.7, 0.7 * progress);

      if (step >= steps) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (this.fadingOutAudio) {
          this.fadingOutAudio.pause();
          this.fadingOutAudio.src = "";
          this.fadingOutAudio = null;
        }
      }
    }, stepTime);
  }

  fadeIn(audio) {
    const fadeTime = 500;
    const steps = 10;
    const stepTime = fadeTime / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      audio.volume = Math.min(0.7, 0.7 * (step / steps));
      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepTime);
  }

  fadeOut(audio, callback) {
    if (!audio) {
      if (callback) callback();
      return;
    }

    const fadeTime = 500;
    const steps = 10;
    const stepTime = fadeTime / steps;
    let step = 0;
    const startVolume = audio.volume;

    const interval = setInterval(() => {
      step++;
      audio.volume = Math.max(0, startVolume * (1 - step / steps));
      if (step >= steps) {
        clearInterval(interval);
        audio.pause();
        audio.src = "";
        if (callback) callback();
      }
    }, stepTime);
  }

  stopAudio() {
    if (this.fadeInterval) {
      clearInterval(this.fadeInterval);
      this.fadeInterval = null;
    }
    if (this.fadingOutAudio) {
      this.fadingOutAudio.pause();
      this.fadingOutAudio.src = "";
      this.fadingOutAudio = null;
    }
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = "";
      this.currentAudio = null;
    }
    this.currentAudioUrl = null;
  }
}

// Start the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new AlbumTimelineGame();
});
