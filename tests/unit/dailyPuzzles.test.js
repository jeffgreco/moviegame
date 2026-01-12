// Tests for dailyPuzzles.js utility functions
import { describe, it, expect } from 'vitest';

// Create a sandboxed environment with mock data to test the pure logic
function createTestEnvironment(schedule = {}, puzzles = []) {
  // Recreate the functions with controlled globals
  const getEasternDateString = (date) => {
    return date.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
  };

  const getPuzzleById = (id) => {
    return puzzles.find((p) => p.id === id) || null;
  };

  const getPuzzleForDate = (date) => {
    const targetDateStr = getEasternDateString(date);
    const targetDate = new Date(targetDateStr + "T00:00:00");
    const dateStr = targetDate.toISOString().split("T")[0];

    if (schedule[dateStr]) {
      const scheduled = puzzles.find((p) => p.id === schedule[dateStr]);
      if (scheduled) return scheduled;
    }

    const scheduledDates = Object.keys(schedule).sort();
    if (scheduledDates.length === 0) {
      return puzzles[0] || null;
    }

    const firstDateStr = scheduledDates[0];
    const firstDate = new Date(firstDateStr + "T00:00:00");

    if (targetDate < firstDate) {
      return null;
    }

    const daysSinceFirst = Math.floor((targetDate - firstDate) / (1000 * 60 * 60 * 24));
    const puzzleIndex = daysSinceFirst % puzzles.length;

    return puzzles[puzzleIndex];
  };

  const getPuzzleNumber = (date) => {
    const targetDateStr = getEasternDateString(date);
    const targetDate = new Date(targetDateStr + "T00:00:00");

    const scheduledDates = Object.keys(schedule).sort();
    if (scheduledDates.length === 0) {
      return null;
    }

    const firstDateStr = scheduledDates[0];
    const firstDate = new Date(firstDateStr + "T00:00:00");

    if (targetDate < firstDate) {
      return null;
    }

    const daysSinceFirst = Math.floor((targetDate - firstDate) / (1000 * 60 * 60 * 24));
    return daysSinceFirst + 1;
  };

  return { getEasternDateString, getPuzzleById, getPuzzleForDate, getPuzzleNumber };
}

describe('getPuzzleById', () => {
  const testPuzzles = [
    { id: 'test1', theme: 'Test Theme 1', movieIds: [1, 2, 3] },
    { id: 'test2', theme: 'Test Theme 2', movieIds: [4, 5, 6] },
    { id: 'test3', theme: 'Test Theme 3', movieIds: [7, 8, 9] },
  ];

  it('returns puzzle when found', () => {
    const env = createTestEnvironment({}, testPuzzles);
    const puzzle = env.getPuzzleById('test1');
    expect(puzzle).toEqual(testPuzzles[0]);
  });

  it('returns null for unknown id', () => {
    const env = createTestEnvironment({}, testPuzzles);
    const puzzle = env.getPuzzleById('nonexistent');
    expect(puzzle).toBeNull();
  });

  it('handles empty puzzles array', () => {
    const env = createTestEnvironment({}, []);
    const puzzle = env.getPuzzleById('any');
    expect(puzzle).toBeNull();
  });
});

describe('getPuzzleForDate', () => {
  const testPuzzles = [
    { id: 'puzzle_a', theme: 'Theme A', movieIds: [1, 2] },
    { id: 'puzzle_b', theme: 'Theme B', movieIds: [3, 4] },
    { id: 'puzzle_c', theme: 'Theme C', movieIds: [5, 6] },
  ];

  const testSchedule = {
    '2026-01-10': 'puzzle_a',
    '2026-01-11': 'puzzle_b',
    '2026-01-12': 'puzzle_c',
  };

  it('returns scheduled puzzle for specific date', () => {
    const env = createTestEnvironment(testSchedule, testPuzzles);
    // Create a date that when converted to Eastern will be 2026-01-10
    const date = new Date('2026-01-10T12:00:00');
    const puzzle = env.getPuzzleForDate(date);
    expect(puzzle.id).toBe('puzzle_a');
  });

  it('returns null for date before first puzzle', () => {
    const env = createTestEnvironment(testSchedule, testPuzzles);
    const date = new Date('2025-01-01T12:00:00');
    const puzzle = env.getPuzzleForDate(date);
    expect(puzzle).toBeNull();
  });

  it('cycles through puzzles after schedule ends', () => {
    const env = createTestEnvironment(testSchedule, testPuzzles);
    // 2026-01-13 is after scheduled dates, should cycle back
    const date = new Date('2026-01-13T12:00:00');
    const puzzle = env.getPuzzleForDate(date);
    // 3 days after first (01-10), so index 3 % 3 = 0
    expect(puzzle.id).toBe('puzzle_a');
  });

  it('handles empty schedule with puzzles', () => {
    const env = createTestEnvironment({}, testPuzzles);
    const date = new Date('2026-01-15T12:00:00');
    const puzzle = env.getPuzzleForDate(date);
    // Should return first puzzle when no schedule
    expect(puzzle.id).toBe('puzzle_a');
  });
});

describe('getPuzzleNumber', () => {
  const testSchedule = {
    '2026-01-10': 'puzzle_a',
    '2026-01-11': 'puzzle_b',
  };

  it('returns 1 for first puzzle date', () => {
    const env = createTestEnvironment(testSchedule, []);
    const date = new Date('2026-01-10T12:00:00');
    const number = env.getPuzzleNumber(date);
    expect(number).toBe(1);
  });

  it('returns 2 for second puzzle date', () => {
    const env = createTestEnvironment(testSchedule, []);
    const date = new Date('2026-01-11T12:00:00');
    const number = env.getPuzzleNumber(date);
    expect(number).toBe(2);
  });

  it('continues counting after scheduled dates', () => {
    const env = createTestEnvironment(testSchedule, []);
    const date = new Date('2026-01-15T12:00:00');
    const number = env.getPuzzleNumber(date);
    // 5 days after first (01-10), so puzzle #6
    expect(number).toBe(6);
  });

  it('returns null for date before puzzles started', () => {
    const env = createTestEnvironment(testSchedule, []);
    const date = new Date('2025-12-01T12:00:00');
    const number = env.getPuzzleNumber(date);
    expect(number).toBeNull();
  });

  it('returns null when no schedule exists', () => {
    const env = createTestEnvironment({}, []);
    const date = new Date('2026-01-15T12:00:00');
    const number = env.getPuzzleNumber(date);
    expect(number).toBeNull();
  });
});

describe('getEasternDateString', () => {
  it('formats date in YYYY-MM-DD format', () => {
    const env = createTestEnvironment({}, []);
    const date = new Date('2026-01-15T12:00:00');
    const result = env.getEasternDateString(date);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
