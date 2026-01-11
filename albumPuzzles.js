// Album Daily Puzzle Data
// Each puzzle is a curated set of albums for a specific day

// Puzzle schedule - maps specific dates to puzzle IDs
const ALBUM_PUZZLE_SCHEDULE = {
  "2026-01-11": "rs001",
  "2026-01-12": "rs002",
  "2026-01-13": "rs003",
  "2026-01-14": "rs004",
  "2026-01-15": "rs005",
  "2026-01-16": "rs006",
  "2026-01-17": "rs007",
};

const ALBUM_DAILY_PUZZLES = [
  {
    id: "rs001",
    theme: "The Top 10",
    description: "The greatest albums of all time according to Rolling Stone",
    albumIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    id: "rs002",
    theme: "British Invasion",
    description: "Albums from across the pond that changed music forever",
    albumIds: [5, 16, 22, 48, 34, 17, 101, 104, 155, 75, 121, 36],
  },
  {
    id: "rs003",
    theme: "Hip-Hop Essentials",
    description: "The albums that defined hip-hop",
    albumIds: [25, 29, 42, 45, 63, 73, 84, 89, 95, 105, 108, 138],
  },
  {
    id: "rs004",
    theme: "The Beatles vs. The Stones",
    description: "Two legendary rivalries, one timeline",
    albumIds: [5, 16, 22, 34, 48, 219, 26, 43, 49, 94],
  },
  {
    id: "rs005",
    theme: "Soul & Motown",
    description: "The heart and soul of American music",
    albumIds: [1, 31, 55, 76, 90, 103, 116, 136, 79, 70],
  },
  {
    id: "rs006",
    theme: "Classic Rock Legends",
    description: "Guitar heroes and rock gods",
    albumIds: [18, 30, 36, 64, 67, 69, 72, 75, 81, 121, 202, 185],
  },
  {
    id: "rs007",
    theme: "The 90s Alternative Explosion",
    description: "Grunge, Britpop, and everything in between",
    albumIds: [6, 15, 50, 51, 74, 87, 89, 99, 113, 115, 124, 133, 142, 149],
  },
  {
    id: "rs008",
    theme: "Women in Rock",
    description: "Groundbreaking albums by female artists",
    albumIds: [3, 10, 27, 31, 54, 66, 77, 83, 87, 102, 116, 143, 160, 169, 250],
  },
  {
    id: "rs009",
    theme: "The Bowie Timeline",
    description: "David Bowie's shapeshifting career",
    albumIds: [24, 47, 88, 98, 199, 201],
  },
  {
    id: "rs010",
    theme: "Punk & New Wave",
    description: "Three chords and the truth",
    albumIds: [17, 27, 40, 92, 106, 111, 112, 141, 197, 225],
  },
  {
    id: "rs011",
    theme: "Prince's Purple Reign",
    description: "The Purple One's essential albums",
    albumIds: [8, 33, 60, 221],
  },
  {
    id: "rs012",
    theme: "Radiohead's Evolution",
    description: "From The Bends to In Rainbows",
    albumIds: [15, 71, 99, 198],
  },
  {
    id: "rs013",
    theme: "Electronic Pioneers",
    description: "The synthesizers that changed everything",
    albumIds: [40, 110, 112, 140, 141, 172, 183, 196, 207, 226, 232],
  },
  {
    id: "rs014",
    theme: "2000s Indie Rock",
    description: "The garage rock revival and beyond",
    albumIds: [186, 188, 189, 190, 192, 193, 222, 228, 229, 230, 233, 245],
  },
  {
    id: "rs015",
    theme: "The Kendrick Era",
    description: "Hip-hop's modern renaissance",
    albumIds: [41, 78, 109, 23, 57, 216],
  },
];

// Get date string in Eastern Time (America/New_York)
function getAlbumEasternDateString(date) {
  return date.toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

// Get a puzzle by its ID
function getAlbumPuzzleById(id) {
  return ALBUM_DAILY_PUZZLES.find((p) => p.id === id) || null;
}

// Get the puzzle for a specific date
function getAlbumPuzzleForDate(date) {
  const dateStr = getAlbumEasternDateString(date);
  const puzzleId = ALBUM_PUZZLE_SCHEDULE[dateStr];
  if (puzzleId) {
    return getAlbumPuzzleById(puzzleId);
  }
  return null;
}

// Get today's puzzle
function getTodaysAlbumPuzzle() {
  return getAlbumPuzzleForDate(new Date());
}

// Get puzzle number (days since first puzzle)
function getAlbumPuzzleNumber(date) {
  const scheduleEntries = Object.entries(ALBUM_PUZZLE_SCHEDULE).sort(
    ([a], [b]) => new Date(a) - new Date(b)
  );

  if (scheduleEntries.length === 0) return null;

  const targetDateStr = getAlbumEasternDateString(date);
  const targetDate = new Date(targetDateStr);

  // Find this date in the schedule
  const index = scheduleEntries.findIndex(
    ([dateStr]) => dateStr === targetDateStr
  );
  if (index !== -1) {
    return index + 1; // 1-indexed
  }

  return null;
}

// Get all past puzzles (for archive)
function getAlbumPastPuzzles() {
  const now = new Date();
  const todayStr = getAlbumEasternDateString(now);

  // Get all scheduled dates up to and including today
  const pastDates = Object.entries(ALBUM_PUZZLE_SCHEDULE)
    .filter(([dateStr]) => dateStr <= todayStr)
    .sort(([a], [b]) => new Date(b) - new Date(a)); // Sort newest first

  return pastDates.map(([dateStr, puzzleId], reverseIndex) => {
    const puzzle = getAlbumPuzzleById(puzzleId);
    const totalPast = pastDates.length;
    return {
      date: dateStr,
      puzzleNumber: totalPast - reverseIndex,
      puzzle: puzzle,
      isToday: dateStr === todayStr,
    };
  });
}

// Export for use in game
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ALBUM_PUZZLE_SCHEDULE,
    ALBUM_DAILY_PUZZLES,
    getAlbumPuzzleById,
    getAlbumPuzzleForDate,
    getTodaysAlbumPuzzle,
    getAlbumPuzzleNumber,
    getAlbumPastPuzzles,
  };
}
