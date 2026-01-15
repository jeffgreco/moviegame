// Pure game logic functions - extracted for testability
// Works both as ES module (for tests) and as regular script (for browser)

/**
 * Check if placing a movie at a given index is valid
 * @param {Array} timeline - Array of movies already in timeline
 * @param {Object} newMovie - Movie being placed
 * @param {number} index - Position to insert (0 = before first, timeline.length = after last)
 * @returns {boolean} Whether the placement is valid
 */
function isValidPlacement(timeline, newMovie, index) {
  const newDate = new Date(newMovie.release_date);

  // Check movie before this position (should be earlier or same)
  if (index > 0) {
    const beforeDate = new Date(timeline[index - 1].release_date);
    if (newDate < beforeDate) {
      return false;
    }
  }

  // Check movie after this position (should be later or same)
  if (index < timeline.length) {
    const afterDate = new Date(timeline[index].release_date);
    if (newDate > afterDate) {
      return false;
    }
  }

  return true;
}

/**
 * Calculate score for a correct placement
 * @param {number} streak - Current streak count
 * @returns {number} Points earned
 */
function calculateScore(streak) {
  return 10 + streak * 5;
}

/**
 * Check if two dates are within a specified number of days
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @param {number} days - Maximum days apart
 * @returns {boolean} Whether dates are within threshold
 */
function isWithinDays(date1, date2, days) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const daysDiff = Math.abs((d1 - d2) / MS_PER_DAY);
  return daysDiff <= days && daysDiff > 0;
}

/**
 * Check if two dates are exactly the same day
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {boolean} Whether dates are the same
 */
function isSameDate(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return d1.getTime() === d2.getTime();
}

/**
 * Fisher-Yates shuffle (in-place)
 * @param {Array} array - Array to shuffle
 */
function shuffleArrayFn(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Seeded shuffle for deterministic results (e.g., daily puzzles)
 * Uses mulberry32 PRNG
 * @param {Array} array - Array to shuffle
 * @param {number} seed - Seed value
 */
function seededShuffleArrayFn(array, seed) {
  let state = seed;
  const random = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Encode challenge data to URL-safe string
 * @param {Array<number>} movieIds - Array of movie IDs
 * @param {number} score - Score to beat
 * @returns {string} Encoded string
 */
function encodeChallengeDataFn(movieIds, score) {
  const data = [score, ...movieIds].join(',');
  return btoa(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

/**
 * Decode challenge data from URL string
 * @param {string} encoded - Encoded challenge string
 * @returns {{score: number, movieIds: number[]}|null} Decoded data or null if invalid
 */
function decodeChallengeDataFn(encoded) {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const data = atob(base64);
    const parts = data.split(',').map(Number);
    if (parts.length < 2 || parts.some(isNaN)) return null;
    return {
      score: parts[0],
      movieIds: parts.slice(1),
    };
  } catch (e) {
    return null;
  }
}

/**
 * Format a date string for display
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {{monthDay: string, year: string}} Formatted date parts
 */
function formatDateFn(dateString) {
  // Parse as local time by adding time component to avoid UTC interpretation
  const date = new Date(dateString + 'T00:00:00');
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return { monthDay: `${month} ${day}`, year: year.toString() };
}

/**
 * Get year from date string
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {number} Year
 */
function getYearFn(dateString) {
  // Parse as local time to avoid UTC timezone issues
  return new Date(dateString + 'T00:00:00').getFullYear();
}

// ES Module exports (for tests)
export {
  isValidPlacement,
  calculateScore,
  isWithinDays,
  isSameDate,
  shuffleArrayFn as shuffleArray,
  seededShuffleArrayFn as seededShuffleArray,
  encodeChallengeDataFn as encodeChallengeData,
  decodeChallengeDataFn as decodeChallengeData,
  formatDateFn as formatDate,
  getYearFn as getYear,
};
