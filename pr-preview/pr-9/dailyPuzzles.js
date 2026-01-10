// Daily Puzzle Data
// Each puzzle is a curated set of movies for a specific day

// Helper function to get current date in Eastern Time
function getEasternDate(date = new Date()) {
  // Convert to Eastern Time using Intl API
  const eastern = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  return eastern;
}

// Get date string in Eastern Time (YYYY-MM-DD format)
function getEasternDateString(date = new Date()) {
  const eastern = getEasternDate(date);
  const year = eastern.getFullYear();
  const month = String(eastern.getMonth() + 1).padStart(2, '0');
  const day = String(eastern.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const DAILY_PUZZLES = [
  {
    id: 4,
    startDate: "2026-01-09", // First daily puzzle starts Jan 9 (Michael Mann on Jan 10)
    theme: "Oscar Best Picture Winners",
    description: "Academy Award winners for Best Picture",
    movieIds: [
      // EASIEST - Most iconic
      597, // Titanic (1997)
      238, // The Godfather (1972)
      13, // Forrest Gump (1994)
      98, // Gladiator (2000)

      // EASY - Very well-known
      274, // The Silence of the Lambs (1991)
      424, // Schindler's List (1993)
      1366, // Rocky (1976)
      510, // One Flew Over the Cuckoo's Nest (1975)

      // MEDIUM - Well-known but harder to date
      1422, // The Departed (2006)
      6977, // No Country for Old Men (2007)
      194662, // Birdman (2014)
      76203, // 12 Years a Slave (2013)

      // MEDIUM-HARD - Less mainstream
      376867, // Moonlight (2016)
      74643, // The Artist (2011)
      399055, // The Shape of Water (2017)
      776503, // CODA (2021)

      // HARDEST - Older classics
      792, // Platoon (1986)
      380, // Rain Man (1988)
      581, // Dances with Wolves (1990)
      12162, // The Hurt Locker (2009)
    ],
  },
  {
    id: 3,
    theme: "Michael Mann",
    description: "Stylish crime dramas from the master of mood",
    movieIds: [
      // EASIEST - Most iconic
      949, // Heat (1995)
      1538, // Collateral (2004)

      // EASY - Very well-known
      9361, // The Last of the Mohicans (1992)
      11322, // Public Enemies (2009)
      82, // Miami Vice (2006)

      // MEDIUM - Well-known but less mainstream
      8489, // Ali (2001)
      9008, // The Insider (1999)

      // MEDIUM-HARD - Cult classics
      11454, // Manhunter (1986)
      11524, // Thief (1981)
      365620, // Ferrari (2023)

      // HARDEST - Lesser known
      201088, // Blackhat (2015)
      26198, // The Keep (1983)
    ],
  },
  {
    id: 1,
    theme: "Spielberg, Scorsese & Coppola",
    description: "Movies from three legendary directors",
    movieIds: [
      // EASIEST - Most iconic, culturally significant films
      578, // Jaws (1975) - Spielberg
      238, // The Godfather (1972) - Coppola
      329, // Jurassic Park (1993) - Spielberg
      85, // Raiders of the Lost Ark (1981) - Spielberg
      601, // E.T. the Extra-Terrestrial (1982) - Spielberg
      424, // Schindler's List (1994) - Spielberg

      // EASY - Very well-known films
      103, // Taxi Driver (1976) - Scorsese
      28, // Apocalypse Now (1979) - Coppola
      769, // GoodFellas (1990) - Scorsese
      240, // The Godfather Part II (1974) - Coppola
      857, // Saving Private Ryan (1998) - Spielberg
      87, // Indiana Jones and the Temple of Doom (1984) - Spielberg

      // MEDIUM-EASY - Famous but less culturally dominant
      89, // Indiana Jones and the Last Crusade (1989) - Spielberg
      524, // Casino (1995) - Scorsese
      840, // Close Encounters of the Third Kind (1977) - Spielberg
      1422, // The Departed (2006) - Scorsese
      879, // Hook (1991) - Spielberg
      640, // Catch Me If You Can (2002) - Spielberg

      // MEDIUM - Well-known but harder to date
      873, // The Color Purple (1985) - Spielberg
      242, // The Godfather Part III (1990) - Coppola
      6114, // Bram Stoker's Dracula (1992) - Coppola
      180, // Minority Report (2002) - Spielberg
      74, // War of the Worlds (2005) - Spielberg
      11324, // Shutter Island (2010) - Scorsese
      106646, // The Wolf of Wall Street (2013) - Scorsese

      // MEDIUM-HARD - Less mainstream appeal
      227, // The Outsiders (1983) - Coppola
      1598, // Cape Fear (1991) - Scorsese
      594, // The Terminal (2004) - Spielberg
      217, // Indiana Jones and the Kingdom of the Crystal Skull (2008) - Spielberg
      57212, // War Horse (2011) - Spielberg
      333339, // Ready Player One (2018) - Spielberg

      // HARDEST - Obscure or poorly received
      839, // Duel (1971) - Spielberg TV movie
      232, // Rumble Fish (1983) - Coppola
      11352, // Always (1989) - Spielberg
      7095, // Jack (1996) - Coppola
    ],
  },
  {
    id: 2,
    theme: "Disney Animation Classics",
    description: "Beloved animated films from Disney and Pixar",
    movieIds: [
      // EASIEST - Iconic, culturally dominant films
      8587, // The Lion King (1994)
      109445, // Frozen (2013)
      12, // Finding Nemo (2003)
      862, // Toy Story (1995)
      10020, // Beauty and the Beast (1991)
      812, // Aladdin (1992)

      // EASY - Very well-known films
      10144, // The Little Mermaid (1989)
      585, // Monsters, Inc. (2001)
      14160, // Up (2009)
      10681, // WALL·E (2008)
      38757, // Tangled (2010)
      354912, // Coco (2017)

      // MEDIUM-EASY - Famous but slightly less dominant
      10674, // Mulan (1998)
      11970, // Hercules (1997)
      2062, // Ratatouille (2007)
      150540, // Inside Out (2015)
      269149, // Zootopia (2016)
      568124, // Encanto (2021)

      // MEDIUM - Well-known but harder to date precisely
      37135, // Tarzan (1999)
      10530, // Pocahontas (1995)
      177572, // Big Hero 6 (2014)
      82690, // Wreck-It Ralph (2012)

      // MEDIUM-HARD - Cult favorites, less mainstream
      11544, // Lilo & Stitch (2002)
      11688, // The Emperor's New Groove (2000)

      // HARDEST - Older classics, less commonly known release dates
      10112, // The Aristocats (1970)
      11886, // Robin Hood (1973)
    ],
  },
  // Future puzzles will be added here
];

// Get the puzzle for a specific date (uses Eastern Time)
function getPuzzleForDate(date) {
  // Convert to Eastern Time date string for consistent comparison
  const targetDateStr = getEasternDateString(date);
  const targetDate = new Date(targetDateStr + 'T00:00:00');

  // Get first puzzle start date
  const firstPuzzle = DAILY_PUZZLES[0];
  const firstDate = new Date(firstPuzzle.startDate + 'T00:00:00');

  // If before first puzzle, return null
  if (targetDate < firstDate) {
    return null;
  }

  // Calculate which puzzle to show (cycles through available puzzles)
  const daysSinceFirst = Math.floor(
    (targetDate - firstDate) / (1000 * 60 * 60 * 24)
  );
  const puzzleIndex = daysSinceFirst % DAILY_PUZZLES.length;

  return DAILY_PUZZLES[puzzleIndex];
}

// Get today's puzzle (based on Eastern Time)
function getTodaysPuzzle() {
  return getPuzzleForDate(new Date());
}

// Get puzzle number for a date (1-indexed, uses Eastern Time)
function getPuzzleNumber(date) {
  // Convert to Eastern Time date string for consistent comparison
  const targetDateStr = getEasternDateString(date);
  const targetDate = new Date(targetDateStr + 'T00:00:00');

  const firstDate = new Date(DAILY_PUZZLES[0].startDate + 'T00:00:00');

  if (targetDate < firstDate) {
    return null;
  }

  const daysSinceFirst = Math.floor(
    (targetDate - firstDate) / (1000 * 60 * 60 * 24)
  );
  return daysSinceFirst + 1;
}
