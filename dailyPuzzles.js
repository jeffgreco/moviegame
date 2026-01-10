// Daily Puzzle Data
// Each puzzle is a curated set of movies for a specific day

const DAILY_PUZZLES = [
  {
    id: 1,
    startDate: "2026-01-09", // First daily puzzle
    theme: "Spielberg, Scorsese & Coppola",
    description: "Movies from three legendary directors",
    movieIds: [
      // EASIEST - Most iconic, culturally significant films
      578,    // Jaws (1975) - Spielberg
      238,    // The Godfather (1972) - Coppola
      329,    // Jurassic Park (1993) - Spielberg
      85,     // Raiders of the Lost Ark (1981) - Spielberg
      601,    // E.T. the Extra-Terrestrial (1982) - Spielberg
      424,    // Schindler's List (1994) - Spielberg

      // EASY - Very well-known films
      103,    // Taxi Driver (1976) - Scorsese
      28,     // Apocalypse Now (1979) - Coppola
      769,    // GoodFellas (1990) - Scorsese
      240,    // The Godfather Part II (1974) - Coppola
      857,    // Saving Private Ryan (1998) - Spielberg
      87,     // Indiana Jones and the Temple of Doom (1984) - Spielberg

      // MEDIUM-EASY - Famous but less culturally dominant
      89,     // Indiana Jones and the Last Crusade (1989) - Spielberg
      524,    // Casino (1995) - Scorsese
      840,    // Close Encounters of the Third Kind (1977) - Spielberg
      1422,   // The Departed (2006) - Scorsese
      879,    // Hook (1991) - Spielberg
      640,    // Catch Me If You Can (2002) - Spielberg

      // MEDIUM - Well-known but harder to date
      873,    // The Color Purple (1985) - Spielberg
      242,    // The Godfather Part III (1990) - Coppola
      6114,   // Bram Stoker's Dracula (1992) - Coppola
      180,    // Minority Report (2002) - Spielberg
      74,     // War of the Worlds (2005) - Spielberg
      11324,  // Shutter Island (2010) - Scorsese
      106646, // The Wolf of Wall Street (2013) - Scorsese

      // MEDIUM-HARD - Less mainstream appeal
      227,    // The Outsiders (1983) - Coppola
      1598,   // Cape Fear (1991) - Scorsese
      594,    // The Terminal (2004) - Spielberg
      217,    // Indiana Jones and the Kingdom of the Crystal Skull (2008) - Spielberg
      57212,  // War Horse (2011) - Spielberg
      333339, // Ready Player One (2018) - Spielberg

      // HARDEST - Obscure or poorly received
      839,    // Duel (1971) - Spielberg TV movie
      232,    // Rumble Fish (1983) - Coppola
      11352,  // Always (1989) - Spielberg
      7095    // Jack (1996) - Coppola
    ]
  }
  // Future puzzles will be added here
];

// Get the puzzle for a specific date
function getPuzzleForDate(date) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0); // Normalize to start of day

  // Calculate days since first puzzle
  const firstPuzzle = DAILY_PUZZLES[0];
  const firstDate = new Date(firstPuzzle.startDate);
  firstDate.setHours(0, 0, 0, 0);

  // If before first puzzle, return null
  if (targetDate < firstDate) {
    return null;
  }

  // Calculate which puzzle to show (cycles through available puzzles)
  const daysSinceFirst = Math.floor((targetDate - firstDate) / (1000 * 60 * 60 * 24));
  const puzzleIndex = daysSinceFirst % DAILY_PUZZLES.length;

  return DAILY_PUZZLES[puzzleIndex];
}

// Get today's puzzle
function getTodaysPuzzle() {
  return getPuzzleForDate(new Date());
}

// Get puzzle number for a date (1-indexed)
function getPuzzleNumber(date) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const firstDate = new Date(DAILY_PUZZLES[0].startDate);
  firstDate.setHours(0, 0, 0, 0);

  if (targetDate < firstDate) {
    return null;
  }

  const daysSinceFirst = Math.floor((targetDate - firstDate) / (1000 * 60 * 60 * 24));
  return daysSinceFirst + 1;
}
