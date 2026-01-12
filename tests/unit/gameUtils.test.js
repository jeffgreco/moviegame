// Tests for gameUtils.js - Pure utility functions
import { describe, it, expect } from 'vitest';

// Import the module (using CommonJS exports)
const gameUtils = require('../../gameUtils.js');
const {
  getYear,
  formatDate,
  getPosterUrl,
  shuffleArray,
  seededShuffleArray,
  encodeChallengeData,
  decodeChallengeData,
  checkForSameDateNeighbor,
  checkForCloseNeighbor,
  calculateScore,
} = gameUtils;

describe('getYear', () => {
  it('extracts year from ISO date string with time', () => {
    // Use dates with time to avoid UTC/local timezone issues
    expect(getYear('2023-07-21T12:00:00')).toBe(2023);
    expect(getYear('1995-01-15T12:00:00')).toBe(1995);
    expect(getYear('2000-12-15T12:00:00')).toBe(2000);
  });

  it('handles full ISO timestamps', () => {
    expect(getYear('2023-07-21T12:00:00Z')).toBe(2023);
  });
});

describe('formatDate', () => {
  // Note: Using dates with time (T12:00:00) to avoid UTC/local timezone issues
  // When a date string like '2023-07-21' is parsed, JS treats it as UTC midnight,
  // which can be the previous day in certain timezones.

  it('formats a standard date correctly', () => {
    const result = formatDate('2023-07-21T12:00:00');
    expect(result.monthDay).toBe('Jul 21');
    expect(result.year).toBe('2023');
  });

  it('handles January dates', () => {
    const result = formatDate('2020-01-15T12:00:00');
    expect(result.monthDay).toBe('Jan 15');
    expect(result.year).toBe('2020');
  });

  it('handles December dates', () => {
    const result = formatDate('1999-12-15T12:00:00');
    expect(result.monthDay).toBe('Dec 15');
    expect(result.year).toBe('1999');
  });

  it('handles all months correctly', () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    months.forEach((month, i) => {
      const monthNum = String(i + 1).padStart(2, '0');
      const result = formatDate(`2023-${monthNum}-15T12:00:00`);
      expect(result.monthDay).toBe(`${month} 15`);
    });
  });
});

describe('getPosterUrl', () => {
  it('returns poster_url if available', () => {
    const movie = { poster_url: 'https://example.com/poster.jpg', poster_path: '/abc.jpg' };
    expect(getPosterUrl(movie)).toBe('https://example.com/poster.jpg');
  });

  it('builds TMDB URL from poster_path when poster_url is missing', () => {
    const movie = { poster_path: '/abc123.jpg' };
    expect(getPosterUrl(movie)).toBe('https://image.tmdb.org/t/p/w300/abc123.jpg');
  });

  it('returns null when no poster available', () => {
    const movie = { title: 'No Poster Movie' };
    expect(getPosterUrl(movie)).toBeNull();
  });

  it('prefers poster_url over poster_path', () => {
    const movie = { poster_url: 'https://custom.com/poster.jpg', poster_path: '/tmdb.jpg' };
    expect(getPosterUrl(movie)).toBe('https://custom.com/poster.jpg');
  });
});

describe('shuffleArray', () => {
  it('preserves all elements', () => {
    const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arr = [...original];
    shuffleArray(arr);

    expect(arr).toHaveLength(original.length);
    expect(arr.sort((a, b) => a - b)).toEqual(original);
  });

  it('mutates the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const ref = arr;
    shuffleArray(arr);
    expect(ref).toBe(arr);
  });

  it('handles empty array', () => {
    const arr = [];
    shuffleArray(arr);
    expect(arr).toEqual([]);
  });

  it('handles single element array', () => {
    const arr = [42];
    shuffleArray(arr);
    expect(arr).toEqual([42]);
  });
});

describe('seededShuffleArray', () => {
  it('produces deterministic results with same seed', () => {
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    seededShuffleArray(arr1, 12345);
    seededShuffleArray(arr2, 12345);

    expect(arr1).toEqual(arr2);
  });

  it('produces different results with different seeds', () => {
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    seededShuffleArray(arr1, 12345);
    seededShuffleArray(arr2, 54321);

    expect(arr1).not.toEqual(arr2);
  });

  it('preserves all elements', () => {
    const original = [1, 2, 3, 4, 5];
    const arr = [...original];
    seededShuffleArray(arr, 999);

    expect(arr).toHaveLength(original.length);
    expect(arr.sort((a, b) => a - b)).toEqual(original);
  });

  it('mutates the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const ref = arr;
    seededShuffleArray(arr, 42);
    expect(ref).toBe(arr);
  });
});

describe('encodeChallengeData / decodeChallengeData', () => {
  it('roundtrips challenge data correctly', () => {
    const movieIds = [123, 456, 789];
    const score = 5;
    const encoded = encodeChallengeData(movieIds, score);
    const decoded = decodeChallengeData(encoded);

    expect(decoded).toEqual({ score: 5, movieIds: [123, 456, 789] });
  });

  it('produces URL-safe encoding (no +, /, or =)', () => {
    const encoded = encodeChallengeData([1, 2, 3], 10);
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('handles large movie IDs', () => {
    const movieIds = [999999, 888888, 777777];
    const encoded = encodeChallengeData(movieIds, 100);
    const decoded = decodeChallengeData(encoded);

    expect(decoded).toEqual({ score: 100, movieIds: [999999, 888888, 777777] });
  });

  it('handles many movies', () => {
    const movieIds = Array.from({ length: 50 }, (_, i) => i + 1);
    const encoded = encodeChallengeData(movieIds, 25);
    const decoded = decodeChallengeData(encoded);

    expect(decoded.score).toBe(25);
    expect(decoded.movieIds).toEqual(movieIds);
  });

  it('returns null for invalid encoded data', () => {
    expect(decodeChallengeData('invalid!')).toBeNull();
    expect(decodeChallengeData('')).toBeNull();
    expect(decodeChallengeData('!!!')).toBeNull();
  });

  it('returns null for malformed but valid base64', () => {
    // Valid base64 but not valid challenge format
    const badData = btoa('not,a,number').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    expect(decodeChallengeData(badData)).toBeNull();
  });

  it('returns null for single value (needs score + at least one movie)', () => {
    const badData = btoa('5').replace(/=/g, '');
    expect(decodeChallengeData(badData)).toBeNull();
  });
});

describe('checkForSameDateNeighbor', () => {
  it('detects same date with previous movie (index-1)', () => {
    const timeline = [
      { release_date: '2023-07-21' },
      { release_date: '2023-07-21' },
    ];
    const newDate = new Date('2023-07-21');

    const result = checkForSameDateNeighbor(timeline, newDate, 1);
    expect(result).toEqual({ matched: true, neighborIndex: 0 });
  });

  it('detects same date with next movie (index+1)', () => {
    const timeline = [
      { release_date: '2023-07-20' },
      { release_date: '2023-07-21' },
      { release_date: '2023-07-21' },
    ];
    const newDate = new Date('2023-07-21');

    const result = checkForSameDateNeighbor(timeline, newDate, 1);
    expect(result).toEqual({ matched: true, neighborIndex: 2 });
  });

  it('returns matched:false when no same-day neighbor', () => {
    const timeline = [
      { release_date: '2023-07-20' },
      { release_date: '2023-07-22' },
    ];
    const newDate = new Date('2023-07-21');

    const result = checkForSameDateNeighbor(timeline, newDate, 1);
    expect(result).toEqual({ matched: false });
  });

  it('handles first position (no previous neighbor)', () => {
    const timeline = [
      { release_date: '2023-07-21' },
      { release_date: '2023-07-22' },
    ];
    const newDate = new Date('2023-07-22');

    const result = checkForSameDateNeighbor(timeline, newDate, 0);
    expect(result).toEqual({ matched: true, neighborIndex: 1 });
  });

  it('handles last position (no next neighbor)', () => {
    const timeline = [
      { release_date: '2023-07-21' },
      { release_date: '2023-07-22' },
    ];
    const newDate = new Date('2023-07-21');

    const result = checkForSameDateNeighbor(timeline, newDate, 1);
    expect(result).toEqual({ matched: true, neighborIndex: 0 });
  });
});

describe('checkForCloseNeighbor', () => {
  it('detects movies within 30 days of previous neighbor', () => {
    const timeline = [
      { release_date: '2023-07-01' },
      { release_date: '2023-07-25' },
    ];
    const newDate = new Date('2023-07-25');

    const result = checkForCloseNeighbor(timeline, newDate, 1);
    expect(result.matched).toBe(true);
    expect(result.neighborIndex).toBe(0);
  });

  it('detects movies within 30 days of next neighbor', () => {
    const timeline = [
      { release_date: '2023-07-01' },
      { release_date: '2023-07-25' },
    ];
    const newDate = new Date('2023-07-01');

    const result = checkForCloseNeighbor(timeline, newDate, 0);
    expect(result.matched).toBe(true);
    expect(result.neighborIndex).toBe(1);
  });

  it('does not match for same-day (daysDiff = 0)', () => {
    const timeline = [
      { release_date: '2023-07-21' },
      { release_date: '2023-07-21' },
    ];
    const newDate = new Date('2023-07-21');

    const result = checkForCloseNeighbor(timeline, newDate, 1);
    expect(result.matched).toBe(false);
  });

  it('does not match beyond 30 days', () => {
    const timeline = [
      { release_date: '2023-01-01' },
      { release_date: '2023-06-01' },
    ];
    const newDate = new Date('2023-06-01');

    const result = checkForCloseNeighbor(timeline, newDate, 1);
    expect(result.matched).toBe(false);
  });

  it('detects exactly 30 days as close', () => {
    const timeline = [
      { release_date: '2023-07-01' },
      { release_date: '2023-07-31' }, // Exactly 30 days later
    ];
    const newDate = new Date('2023-07-31');

    const result = checkForCloseNeighbor(timeline, newDate, 1);
    expect(result.matched).toBe(true);
  });

  it('does not match 31 days', () => {
    const timeline = [
      { release_date: '2023-07-01' },
      { release_date: '2023-08-01' }, // 31 days later
    ];
    const newDate = new Date('2023-08-01');

    const result = checkForCloseNeighbor(timeline, newDate, 1);
    expect(result.matched).toBe(false);
  });

  it('supports custom threshold', () => {
    const timeline = [
      { release_date: '2023-07-01' },
      { release_date: '2023-07-10' },
    ];
    const newDate = new Date('2023-07-10');

    // Within 15 days
    const result = checkForCloseNeighbor(timeline, newDate, 1, 15);
    expect(result.matched).toBe(true);

    // But not within 5 days
    const result2 = checkForCloseNeighbor(timeline, newDate, 1, 5);
    expect(result2.matched).toBe(false);
  });
});

describe('calculateScore', () => {
  it('returns base score with no streak', () => {
    expect(calculateScore(10, 0)).toBe(10);
  });

  it('adds streak bonus correctly', () => {
    expect(calculateScore(10, 1)).toBe(15);  // 10 + 1*5
    expect(calculateScore(10, 2)).toBe(20);  // 10 + 2*5
    expect(calculateScore(10, 5)).toBe(35);  // 10 + 5*5
    expect(calculateScore(10, 10)).toBe(60); // 10 + 10*5
  });

  it('works with different base points', () => {
    expect(calculateScore(20, 3)).toBe(35);  // 20 + 3*5
    expect(calculateScore(0, 5)).toBe(25);   // 0 + 5*5
  });
});
