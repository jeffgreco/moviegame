import { describe, it, expect } from 'vitest';
import {
  isValidPlacement,
  calculateScore,
  isWithinDays,
  isSameDate,
  seededShuffleArray,
  encodeChallengeData,
  decodeChallengeData,
  formatDate,
  getYear,
} from '../../gameLogic.js';

describe('isValidPlacement', () => {
  const movie1990 = { id: 1, title: 'Movie 1990', release_date: '1990-06-15' };
  const movie2000 = { id: 2, title: 'Movie 2000', release_date: '2000-06-15' };
  const movie2010 = { id: 3, title: 'Movie 2010', release_date: '2010-06-15' };
  const movie2005 = { id: 4, title: 'Movie 2005', release_date: '2005-06-15' };

  it('should return true for valid placement at beginning', () => {
    const timeline = [movie2000];
    expect(isValidPlacement(timeline, movie1990, 0)).toBe(true);
  });

  it('should return true for valid placement at end', () => {
    const timeline = [movie2000];
    expect(isValidPlacement(timeline, movie2010, 1)).toBe(true);
  });

  it('should return true for valid placement in middle', () => {
    const timeline = [movie1990, movie2010];
    expect(isValidPlacement(timeline, movie2000, 1)).toBe(true);
  });

  it('should return false when placing earlier movie after later one', () => {
    const timeline = [movie2000];
    expect(isValidPlacement(timeline, movie1990, 1)).toBe(false);
  });

  it('should return false when placing later movie before earlier one', () => {
    const timeline = [movie2000];
    expect(isValidPlacement(timeline, movie2010, 0)).toBe(false);
  });

  it('should return true for same date placement', () => {
    const timeline = [movie2000];
    const sameDate = { id: 5, title: 'Same Date', release_date: '2000-06-15' };
    expect(isValidPlacement(timeline, sameDate, 0)).toBe(true);
    expect(isValidPlacement(timeline, sameDate, 1)).toBe(true);
  });

  it('should return true for empty timeline', () => {
    expect(isValidPlacement([], movie2000, 0)).toBe(true);
  });

  it('should handle placement between three movies', () => {
    const timeline = [movie1990, movie2000, movie2010];
    // Place 2005 between 2000 and 2010
    expect(isValidPlacement(timeline, movie2005, 2)).toBe(true);
    // Invalid: place 2005 before 1990
    expect(isValidPlacement(timeline, movie2005, 0)).toBe(false);
    // Invalid: place 2005 after 2010
    expect(isValidPlacement(timeline, movie2005, 3)).toBe(false);
  });
});

describe('calculateScore', () => {
  it('should return 10 for streak 0', () => {
    expect(calculateScore(0)).toBe(10);
  });

  it('should return 15 for streak 1', () => {
    expect(calculateScore(1)).toBe(15);
  });

  it('should return 20 for streak 2', () => {
    expect(calculateScore(2)).toBe(20);
  });

  it('should follow formula: 10 + streak * 5', () => {
    expect(calculateScore(10)).toBe(60);
    expect(calculateScore(20)).toBe(110);
  });
});

describe('isWithinDays', () => {
  it('should return true for dates within threshold', () => {
    expect(isWithinDays('2023-06-01', '2023-06-15', 30)).toBe(true);
  });

  it('should return false for dates outside threshold', () => {
    expect(isWithinDays('2023-01-01', '2023-06-01', 30)).toBe(false);
  });

  it('should return true for exactly threshold days', () => {
    expect(isWithinDays('2023-06-01', '2023-07-01', 30)).toBe(true);
  });

  it('should return false for same date (0 days)', () => {
    expect(isWithinDays('2023-06-01', '2023-06-01', 30)).toBe(false);
  });

  it('should handle Date objects', () => {
    const date1 = new Date('2023-06-01');
    const date2 = new Date('2023-06-15');
    expect(isWithinDays(date1, date2, 30)).toBe(true);
  });
});

describe('isSameDate', () => {
  it('should return true for same date', () => {
    expect(isSameDate('2023-06-15', '2023-06-15')).toBe(true);
  });

  it('should return false for different dates', () => {
    expect(isSameDate('2023-06-15', '2023-06-16')).toBe(false);
  });

  it('should handle Date objects', () => {
    const date1 = new Date('2023-06-15');
    const date2 = new Date('2023-06-15');
    expect(isSameDate(date1, date2)).toBe(true);
  });
});

describe('seededShuffleArray', () => {
  it('should produce consistent results with same seed', () => {
    const arr1 = [1, 2, 3, 4, 5];
    const arr2 = [1, 2, 3, 4, 5];

    seededShuffleArray(arr1, 12345);
    seededShuffleArray(arr2, 12345);

    expect(arr1).toEqual(arr2);
  });

  it('should produce different results with different seeds', () => {
    const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    seededShuffleArray(arr1, 12345);
    seededShuffleArray(arr2, 54321);

    expect(arr1).not.toEqual(arr2);
  });

  it('should preserve array length', () => {
    const arr = [1, 2, 3, 4, 5];
    seededShuffleArray(arr, 12345);
    expect(arr.length).toBe(5);
  });

  it('should preserve array elements', () => {
    const arr = [1, 2, 3, 4, 5];
    seededShuffleArray(arr, 12345);
    expect(arr.sort()).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('encodeChallengeData / decodeChallengeData', () => {
  it('should encode and decode correctly (round-trip)', () => {
    const movieIds = [123, 456, 789];
    const score = 5;

    const encoded = encodeChallengeData(movieIds, score);
    const decoded = decodeChallengeData(encoded);

    expect(decoded).toEqual({ score: 5, movieIds: [123, 456, 789] });
  });

  it('should produce URL-safe output', () => {
    const movieIds = [123, 456, 789];
    const encoded = encodeChallengeData(movieIds, 5);

    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('should return null for invalid encoded data', () => {
    expect(decodeChallengeData('invalid')).toBe(null);
    expect(decodeChallengeData('')).toBe(null);
  });

  it('should handle single movie', () => {
    const encoded = encodeChallengeData([100], 1);
    const decoded = decodeChallengeData(encoded);
    expect(decoded).toEqual({ score: 1, movieIds: [100] });
  });

  it('should handle large movie IDs', () => {
    const movieIds = [999999, 888888, 777777];
    const encoded = encodeChallengeData(movieIds, 10);
    const decoded = decodeChallengeData(encoded);
    expect(decoded).toEqual({ score: 10, movieIds: [999999, 888888, 777777] });
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const result = formatDate('2023-06-15');
    expect(result.monthDay).toBe('Jun 15');
    expect(result.year).toBe('2023');
  });

  it('should handle January', () => {
    const result = formatDate('2020-01-01');
    expect(result.monthDay).toBe('Jan 1');
    expect(result.year).toBe('2020');
  });

  it('should handle December', () => {
    const result = formatDate('1999-12-31');
    expect(result.monthDay).toBe('Dec 31');
    expect(result.year).toBe('1999');
  });
});

describe('getYear', () => {
  it('should extract year from date string', () => {
    expect(getYear('2023-06-15')).toBe(2023);
    expect(getYear('1990-01-01')).toBe(1990);
    expect(getYear('2025-12-31')).toBe(2025);
  });
});
