/**
 * Filmstrip Game Tracker
 * Handles game completion tracking and statistics display
 */

class GameTracker {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl || '';
    this.playerId = this.getOrCreatePlayerId();
    this.enabled = !!apiBaseUrl; // Only enabled if API URL is configured
  }

  /**
   * Get or create an anonymous player ID
   */
  getOrCreatePlayerId() {
    const storageKey = 'filmstrip_player_id';
    let playerId = localStorage.getItem(storageKey);

    if (!playerId) {
      // Generate a random ID
      playerId = 'p_' + this.generateId(16);
      localStorage.setItem(storageKey, playerId);
    }

    return playerId;
  }

  /**
   * Generate a random alphanumeric ID
   */
  generateId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    return result;
  }

  /**
   * Submit a game completion to the server
   */
  async submitCompletion(gameData) {
    if (!this.enabled) {
      console.log('Tracker: API not configured, skipping submission');
      return null;
    }

    const payload = {
      playerId: this.playerId,
      gameMode: gameData.gameMode,
      score: gameData.score,
      won: gameData.won,
      totalMovies: gameData.totalMovies || null,
      puzzleId: gameData.puzzleId || null,
      puzzleNumber: gameData.puzzleNumber || null,
      puzzleTheme: gameData.puzzleTheme || null,
      movieIds: gameData.movieIds || null,
      completedAt: new Date().toISOString()
    };

    try {
      const response = await fetch(`${this.apiBaseUrl}/api/complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const error = await response.json();
        console.warn('Tracker: Submission error', error);
        return null;
      }

      return await response.json();
    } catch (err) {
      console.warn('Tracker: Failed to submit completion', err);
      return null;
    }
  }

  /**
   * Fetch player's score history
   */
  async getHistory(gameMode = null, limit = 50) {
    if (!this.enabled) return { history: [] };

    try {
      let url = `${this.apiBaseUrl}/api/history?playerId=${this.playerId}&limit=${limit}`;
      if (gameMode) url += `&gameMode=${gameMode}`;

      const response = await fetch(url);
      if (!response.ok) return { history: [] };

      return await response.json();
    } catch (err) {
      console.warn('Tracker: Failed to fetch history', err);
      return { history: [] };
    }
  }

  /**
   * Fetch stats for a specific puzzle
   */
  async getPuzzleStats(puzzleId) {
    if (!this.enabled) return null;

    try {
      const response = await fetch(`${this.apiBaseUrl}/api/puzzle/${puzzleId}`);
      if (!response.ok) return null;

      return await response.json();
    } catch (err) {
      console.warn('Tracker: Failed to fetch puzzle stats', err);
      return null;
    }
  }

  /**
   * Fetch overall statistics
   */
  async getStats() {
    if (!this.enabled) return null;

    try {
      const response = await fetch(`${this.apiBaseUrl}/api/stats`);
      if (!response.ok) return null;

      return await response.json();
    } catch (err) {
      console.warn('Tracker: Failed to fetch stats', err);
      return null;
    }
  }
}

/**
 * Score History Chart
 * Renders a simple SVG line chart of score history
 */
class ScoreHistoryChart {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.width = 300;
    this.height = 150;
    this.padding = { top: 20, right: 20, bottom: 30, left: 40 };
  }

  /**
   * Render score history as a line chart
   */
  render(history) {
    if (!this.container || !history || history.length === 0) {
      if (this.container) {
        this.container.innerHTML = '<div class="chart-empty">No games recorded yet</div>';
      }
      return;
    }

    // Filter to daily/archive games and sort by date
    const puzzleGames = history
      .filter(g => g.game_mode === 'daily' || g.game_mode === 'archive')
      .sort((a, b) => new Date(a.completed_at) - new Date(b.completed_at));

    if (puzzleGames.length === 0) {
      this.container.innerHTML = '<div class="chart-empty">No puzzle games recorded</div>';
      return;
    }

    // Calculate chart dimensions
    const chartWidth = this.width - this.padding.left - this.padding.right;
    const chartHeight = this.height - this.padding.top - this.padding.bottom;

    // Calculate scales
    const maxScore = Math.max(...puzzleGames.map(g => g.score), 10);
    const maxTotal = Math.max(...puzzleGames.map(g => g.total_movies || g.score), maxScore);

    // Build SVG
    let svg = `<svg viewBox="0 0 ${this.width} ${this.height}" class="score-chart">`;

    // Y-axis labels
    const yTicks = [0, Math.round(maxTotal / 2), maxTotal];
    yTicks.forEach(tick => {
      const y = this.padding.top + chartHeight - (tick / maxTotal) * chartHeight;
      svg += `<text x="${this.padding.left - 5}" y="${y + 4}" class="chart-label" text-anchor="end">${tick}</text>`;
      svg += `<line x1="${this.padding.left}" y1="${y}" x2="${this.width - this.padding.right}" y2="${y}" class="chart-grid" />`;
    });

    // Build line path and points
    const points = puzzleGames.map((game, i) => {
      const x = this.padding.left + (i / Math.max(puzzleGames.length - 1, 1)) * chartWidth;
      const y = this.padding.top + chartHeight - (game.score / maxTotal) * chartHeight;
      return { x, y, game };
    });

    // Draw line
    if (points.length > 1) {
      const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
      svg += `<path d="${pathData}" class="chart-line" fill="none" />`;
    }

    // Draw points
    points.forEach(p => {
      const color = p.game.won ? '#4CAF50' : '#ff6b6b';
      svg += `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${color}" class="chart-point">
        <title>${p.game.puzzle_theme || 'Puzzle'}: ${p.game.score}/${p.game.total_movies || '?'}</title>
      </circle>`;
    });

    // X-axis label
    svg += `<text x="${this.width / 2}" y="${this.height - 5}" class="chart-label" text-anchor="middle">Games Played</text>`;

    svg += '</svg>';
    this.container.innerHTML = svg;
  }
}

// Export for use in game.js
window.GameTracker = GameTracker;
window.ScoreHistoryChart = ScoreHistoryChart;
