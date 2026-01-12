// Game Utility Functions
// These pure functions are extracted for testability

/**
 * Extract the year from a date string
 * @param {string} dateString - ISO date string (e.g., "2023-07-21")
 * @returns {number} The year
 */
function getYear(dateString) {
  return new Date(dateString).getFullYear();
}

/**
 * Format a date string into display format
 * @param {string} dateString - ISO date string (e.g., "2023-07-21")
 * @returns {{ monthDay: string, year: string }} Formatted date parts
 */
function formatDate(dateString) {
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

/**
 * Get the poster URL for a movie
 * @param {Object} movie - Movie object with poster_url or poster_path
 * @returns {string|null} Full poster URL or null
 */
function getPosterUrl(movie) {
  return movie.poster_url || movie.poster_path
    ? movie.poster_url || `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;
}

/**
 * Shuffle an array in place using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle (mutated in place)
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * Shuffle an array with a seed for deterministic results
 * @param {Array} array - Array to shuffle (mutated in place)
 * @param {number} seed - Seed for the random number generator
 */
function seededShuffleArray(array, seed) {
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

/**
 * Encode challenge data to URL-safe string
 * @param {number[]} movieIds - Array of movie IDs
 * @param {number} score - Score to beat
 * @returns {string} URL-safe encoded string
 */
function encodeChallengeData(movieIds, score) {
  // Format: score,id1,id2,id3,...
  const data = [score, ...movieIds].join(",");
  // Use base64 encoding for URL safety
  return btoa(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decode challenge data from URL string
 * @param {string} encoded - URL-safe encoded string
 * @returns {{ score: number, movieIds: number[] }|null} Decoded data or null if invalid
 */
function decodeChallengeData(encoded) {
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
    return null;
  }
}

/**
 * Check if the placed movie has the exact same release date as a neighbor
 * @param {Array} timeline - Array of movie objects with release_date
 * @param {Date} newDate - Date of the newly placed movie
 * @param {number} index - Index where the movie was placed
 * @returns {{ matched: boolean, neighborIndex?: number }}
 */
function checkForSameDateNeighbor(timeline, newDate, index) {
  if (index > 0) {
    const beforeDate = new Date(timeline[index - 1].release_date);
    if (newDate.getTime() === beforeDate.getTime()) {
      return { matched: true, neighborIndex: index - 1 };
    }
  }

  if (index < timeline.length - 1) {
    const afterDate = new Date(timeline[index + 1].release_date);
    if (newDate.getTime() === afterDate.getTime()) {
      return { matched: true, neighborIndex: index + 1 };
    }
  }

  return { matched: false };
}

/**
 * Check if the placed movie is within 30 days of either neighbor
 * @param {Array} timeline - Array of movie objects with release_date
 * @param {Date} newDate - Date of the newly placed movie
 * @param {number} index - Index where the movie was placed
 * @param {number} [thresholdDays=30] - Number of days to consider "close"
 * @returns {{ matched: boolean, neighborIndex?: number }}
 */
function checkForCloseNeighbor(timeline, newDate, index, thresholdDays = 30) {
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // Check movie before (now at index - 1 since we already inserted)
  if (index > 0) {
    const beforeDate = new Date(timeline[index - 1].release_date);
    const daysDiff = Math.abs((newDate - beforeDate) / MS_PER_DAY);
    if (daysDiff <= thresholdDays && daysDiff > 0) {
      return { matched: true, neighborIndex: index - 1 };
    }
  }

  // Check movie after (now at index + 1 since we already inserted)
  if (index < timeline.length - 1) {
    const afterDate = new Date(timeline[index + 1].release_date);
    const daysDiff = Math.abs((newDate - afterDate) / MS_PER_DAY);
    if (daysDiff <= thresholdDays && daysDiff > 0) {
      return { matched: true, neighborIndex: index + 1 };
    }
  }

  return { matched: false };
}

/**
 * Calculate score based on base points and current streak
 * @param {number} basePoints - Base points for correct placement (typically 10)
 * @param {number} streak - Current streak count
 * @returns {number} Total points earned
 */
function calculateScore(basePoints, streak) {
  return basePoints + streak * 5;
}

// Export for ES modules (used in tests)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
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
  };
}

// Also expose as globals for browser use
if (typeof window !== 'undefined') {
  window.GameUtils = {
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
  };
}
