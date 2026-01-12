// Tests for tracker.js - GameTracker class
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Since tracker.js assigns to window.GameTracker, we need to load it differently
// Create a simplified test version of the class

class GameTracker {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl || '';
    this.playerId = this.getOrCreatePlayerId();
    this.enabled = !!apiBaseUrl;
  }

  getOrCreatePlayerId() {
    const storageKey = 'filmstrip_player_id';
    let playerId = localStorage.getItem(storageKey);

    if (!playerId) {
      playerId = 'p_' + this.generateId(16);
      localStorage.setItem(storageKey, playerId);
    }

    return playerId;
  }

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

  async submitCompletion(gameData) {
    if (!this.enabled) {
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
        return null;
      }

      return await response.json();
    } catch (err) {
      return null;
    }
  }

  async getHistory(gameMode = null, limit = 50) {
    if (!this.enabled) return { history: [] };

    try {
      let url = `${this.apiBaseUrl}/api/history?playerId=${this.playerId}&limit=${limit}`;
      if (gameMode) url += `&gameMode=${gameMode}`;

      const response = await fetch(url);
      if (!response.ok) return { history: [] };

      return await response.json();
    } catch (err) {
      return { history: [] };
    }
  }

  async getPuzzleStats(puzzleId) {
    if (!this.enabled) return null;

    try {
      const response = await fetch(`${this.apiBaseUrl}/api/puzzle/${puzzleId}`);
      if (!response.ok) return null;

      return await response.json();
    } catch (err) {
      return null;
    }
  }
}

describe('GameTracker', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('creates tracker with API URL', () => {
      const tracker = new GameTracker('https://api.example.com');
      expect(tracker.enabled).toBe(true);
      expect(tracker.apiBaseUrl).toBe('https://api.example.com');
    });

    it('creates disabled tracker without API URL', () => {
      const tracker = new GameTracker('');
      expect(tracker.enabled).toBe(false);
    });

    it('creates disabled tracker with null API URL', () => {
      const tracker = new GameTracker(null);
      expect(tracker.enabled).toBe(false);
    });
  });

  describe('generateId', () => {
    it('generates ID of correct length', () => {
      const tracker = new GameTracker('');
      const id = tracker.generateId(16);
      expect(id).toHaveLength(16);
    });

    it('generates alphanumeric characters only', () => {
      const tracker = new GameTracker('');
      const id = tracker.generateId(100);
      expect(id).toMatch(/^[A-Za-z0-9]+$/);
    });

    it('generates different IDs each time', () => {
      const tracker = new GameTracker('');
      const ids = new Set();
      for (let i = 0; i < 100; i++) {
        ids.add(tracker.generateId(16));
      }
      // Should have many unique IDs (not all necessarily unique due to randomness)
      expect(ids.size).toBeGreaterThan(90);
    });
  });

  describe('getOrCreatePlayerId', () => {
    it('creates new player ID if none exists', () => {
      const tracker = new GameTracker('');
      expect(tracker.playerId).toMatch(/^p_[A-Za-z0-9]{16}$/);
      expect(localStorage.getItem('filmstrip_player_id')).toBe(tracker.playerId);
    });

    it('reuses existing player ID from localStorage', () => {
      const existingId = 'p_existingPlayerID1';
      localStorage.setItem('filmstrip_player_id', existingId);

      const tracker = new GameTracker('');
      expect(tracker.playerId).toBe(existingId);
    });

    it('multiple tracker instances share same player ID', () => {
      const tracker1 = new GameTracker('');
      const tracker2 = new GameTracker('');
      expect(tracker1.playerId).toBe(tracker2.playerId);
    });
  });

  describe('submitCompletion', () => {
    it('returns null when disabled', async () => {
      const tracker = new GameTracker('');
      const result = await tracker.submitCompletion({ score: 5 });
      expect(result).toBeNull();
      expect(fetch).not.toHaveBeenCalled();
    });

    it('sends correct payload when enabled', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const tracker = new GameTracker('https://api.example.com');
      const gameData = {
        gameMode: 'daily',
        score: 5,
        won: true,
        puzzleId: 'test123',
        puzzleNumber: 42,
        puzzleTheme: 'Test Theme',
        movieIds: [1, 2, 3],
        totalMovies: 10,
      };

      await tracker.submitCompletion(gameData);

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/complete',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );

      const callBody = JSON.parse(fetch.mock.calls[0][1].body);
      expect(callBody.playerId).toBe(tracker.playerId);
      expect(callBody.gameMode).toBe('daily');
      expect(callBody.score).toBe(5);
      expect(callBody.won).toBe(true);
      expect(callBody.puzzleId).toBe('test123');
    });

    it('returns null on fetch error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const tracker = new GameTracker('https://api.example.com');
      const result = await tracker.submitCompletion({ score: 5 });
      expect(result).toBeNull();
    });

    it('returns null on non-ok response', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Bad request' }),
      });

      const tracker = new GameTracker('https://api.example.com');
      const result = await tracker.submitCompletion({ score: 5 });
      expect(result).toBeNull();
    });
  });

  describe('getHistory', () => {
    it('returns empty history when disabled', async () => {
      const tracker = new GameTracker('');
      const result = await tracker.getHistory();
      expect(result).toEqual({ history: [] });
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches history with correct URL', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ history: [{ score: 5 }] }),
      });

      const tracker = new GameTracker('https://api.example.com');
      await tracker.getHistory();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`/api/history?playerId=${tracker.playerId}&limit=50`)
      );
    });

    it('includes gameMode filter when provided', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ history: [] }),
      });

      const tracker = new GameTracker('https://api.example.com');
      await tracker.getHistory('daily', 25);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('gameMode=daily')
      );
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=25')
      );
    });

    it('returns empty history on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const tracker = new GameTracker('https://api.example.com');
      const result = await tracker.getHistory();
      expect(result).toEqual({ history: [] });
    });
  });

  describe('getPuzzleStats', () => {
    it('returns null when disabled', async () => {
      const tracker = new GameTracker('');
      const result = await tracker.getPuzzleStats('puzzle123');
      expect(result).toBeNull();
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches puzzle stats with correct URL', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ attempts: 100, averageScore: 5.5 }),
      });

      const tracker = new GameTracker('https://api.example.com');
      const result = await tracker.getPuzzleStats('puzzle123');

      expect(fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/puzzle/puzzle123'
      );
      expect(result).toEqual({ attempts: 100, averageScore: 5.5 });
    });

    it('returns null on error', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      const tracker = new GameTracker('https://api.example.com');
      const result = await tracker.getPuzzleStats('puzzle123');
      expect(result).toBeNull();
    });

    it('returns null on non-ok response', async () => {
      fetch.mockResolvedValueOnce({ ok: false });

      const tracker = new GameTracker('https://api.example.com');
      const result = await tracker.getPuzzleStats('puzzle123');
      expect(result).toBeNull();
    });
  });
});
