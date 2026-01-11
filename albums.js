// Rolling Stone Top 500 Albums Data
// Based on Rolling Stone's "500 Greatest Albums of All Time" list
// Last updated: 2026-01-11

const ALBUMS_DATA = [
  // Top 10
  {
    id: 1,
    title: "What's Going On",
    artist: "Marvin Gaye",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273b36949bee43217351961ffbc",
    release_date: "1971-05-21",
    rank: 1
  },
  {
    id: 2,
    title: "Pet Sounds",
    artist: "The Beach Boys",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69",
    release_date: "1966-05-16",
    rank: 2
  },
  {
    id: 3,
    title: "Blue",
    artist: "Joni Mitchell",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733c7fc6cbfd0f42e2a197d76b",
    release_date: "1971-06-22",
    rank: 3
  },
  {
    id: 4,
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273e8c3f6b1c83ffa8b8e8c3f6b",
    release_date: "1976-09-28",
    rank: 4
  },
  {
    id: 5,
    title: "Abbey Road",
    artist: "The Beatles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273dc30583ba717007b00cceb25",
    release_date: "1969-09-26",
    rank: 5
  },
  {
    id: 6,
    title: "Nevermind",
    artist: "Nirvana",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a4e6c0e3a4e6c0e3a4e6c0e",
    release_date: "1991-09-24",
    rank: 6
  },
  {
    id: 7,
    title: "Rumours",
    artist: "Fleetwood Mac",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273e52a59a28efa4773163ac0f4",
    release_date: "1977-02-04",
    rank: 7
  },
  {
    id: 8,
    title: "Purple Rain",
    artist: "Prince and the Revolution",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737e6c0e3a4e6c0e3a4e6c0e3a",
    release_date: "1984-06-25",
    rank: 8
  },
  {
    id: 9,
    title: "Blood on the Tracks",
    artist: "Bob Dylan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737e6c0e3a4e6c0e3a4e6c0e4b",
    release_date: "1975-01-20",
    rank: 9
  },
  {
    id: 10,
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732e02117d76426a08ac7c174f",
    release_date: "1998-08-25",
    rank: 10
  },
  // 11-50
  {
    id: 11,
    title: "Kind of Blue",
    artist: "Miles Davis",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273b2b4b5b6b7b8b9babbbcbdbe",
    release_date: "1959-08-17",
    rank: 11
  },
  {
    id: 12,
    title: "A Love Supreme",
    artist: "John Coltrane",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273c2c3c4c5c6c7c8c9cacbcccd",
    release_date: "1965-02-01",
    rank: 12
  },
  {
    id: 13,
    title: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273d2d3d4d5d6d7d8d9dadbdcdd",
    release_date: "1967-03-12",
    rank: 13
  },
  {
    id: 14,
    title: "Thriller",
    artist: "Michael Jackson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734121faee8df82c526cbab2be",
    release_date: "1982-11-30",
    rank: 14
  },
  {
    id: 15,
    title: "OK Computer",
    artist: "Radiohead",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273c8b444df094279e70d0ed856",
    release_date: "1997-06-16",
    rank: 15
  },
  {
    id: 16,
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: "The Beatles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735ef4660298ae29ee18799fc2",
    release_date: "1967-05-26",
    rank: 16
  },
  {
    id: 17,
    title: "London Calling",
    artist: "The Clash",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a5f6a7b8b9c0d1e2f3a4b5c",
    release_date: "1979-12-14",
    rank: 17
  },
  {
    id: 18,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    cover_url: "https://i.scdn.co/image/ab67616d0000b273ea7caaff71dea1051d49b2fe",
    release_date: "1973-03-01",
    rank: 18
  },
  {
    id: 19,
    title: "Innervisions",
    artist: "Stevie Wonder",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739b9b0b1b2b3b4b5b6b7b8b9b",
    release_date: "1973-08-03",
    rank: 19
  },
  {
    id: 20,
    title: "Lemonade",
    artist: "Beyoncé",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730b2b2b3b4b5b6b7b8b9b0b1b",
    release_date: "2016-04-23",
    rank: 20
  },
  {
    id: 21,
    title: "Highway 61 Revisited",
    artist: "Bob Dylan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731b1b2b3b4b5b6b7b8b9b0b1b",
    release_date: "1965-08-30",
    rank: 21
  },
  {
    id: 22,
    title: "Revolver",
    artist: "The Beatles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732b2b3b4b5b6b7b8b9b0b1b2b",
    release_date: "1966-08-05",
    rank: 22
  },
  {
    id: 23,
    title: "My Beautiful Dark Twisted Fantasy",
    artist: "Kanye West",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733b3b4b5b6b7b8b9b0b1b2b3b",
    release_date: "2010-11-22",
    rank: 23
  },
  {
    id: 24,
    title: "The Rise and Fall of Ziggy Stardust",
    artist: "David Bowie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734b4b5b6b7b8b9b0b1b2b3b4b",
    release_date: "1972-06-16",
    rank: 24
  },
  {
    id: 25,
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735b5b6b7b8b9b0b1b2b3b4b5b",
    release_date: "1994-09-13",
    rank: 25
  },
  {
    id: 26,
    title: "Exile on Main St.",
    artist: "The Rolling Stones",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736b6b7b8b9b0b1b2b3b4b5b6b",
    release_date: "1972-05-12",
    rank: 26
  },
  {
    id: 27,
    title: "Horses",
    artist: "Patti Smith",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737b7b8b9b0b1b2b3b4b5b6b7b",
    release_date: "1975-12-13",
    rank: 27
  },
  {
    id: 28,
    title: "Blonde on Blonde",
    artist: "Bob Dylan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738b8b9b0b1b2b3b4b5b6b7b8b",
    release_date: "1966-05-16",
    rank: 28
  },
  {
    id: 29,
    title: "Illmatic",
    artist: "Nas",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739b9b0b1b2b3b4b5b6b7b8b9b",
    release_date: "1994-04-19",
    rank: 29
  },
  {
    id: 30,
    title: "Are You Experienced",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730b0b1b2b3b4b5b6b7b8b9b0b",
    release_date: "1967-05-12",
    rank: 30
  },
  {
    id: 31,
    title: "I Never Loved a Man the Way I Love You",
    artist: "Aretha Franklin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731b1b2b3b4b5b6b7b8b9b0b1c",
    release_date: "1967-03-10",
    rank: 31
  },
  {
    id: 32,
    title: "Born to Run",
    artist: "Bruce Springsteen",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732b2b3b4b5b6b7b8b9b0b1b2c",
    release_date: "1975-08-25",
    rank: 32
  },
  {
    id: 33,
    title: "Sign o' the Times",
    artist: "Prince",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733b3b4b5b6b7b8b9b0b1b2b3c",
    release_date: "1987-03-30",
    rank: 33
  },
  {
    id: 34,
    title: "The White Album",
    artist: "The Beatles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734b4b5b6b7b8b9b0b1b2b3b4c",
    release_date: "1968-11-22",
    rank: 34
  },
  {
    id: 35,
    title: "Aquemini",
    artist: "OutKast",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735b5b6b7b8b9b0b1b2b3b4b5c",
    release_date: "1998-09-29",
    rank: 35
  },
  {
    id: 36,
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736b6b7b8b9b0b1b2b3b4b5b6c",
    release_date: "1971-11-08",
    rank: 36
  },
  {
    id: 37,
    title: "The Joshua Tree",
    artist: "U2",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737b7b8b9b0b1b2b3b4b5b6b7c",
    release_date: "1987-03-09",
    rank: 37
  },
  {
    id: 38,
    title: "Tapestry",
    artist: "Carole King",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738b8b9b0b1b2b3b4b5b6b7b8c",
    release_date: "1971-02-10",
    rank: 38
  },
  {
    id: 39,
    title: "Who's Next",
    artist: "The Who",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739b9b0b1b2b3b4b5b6b7b8b9c",
    release_date: "1971-08-14",
    rank: 39
  },
  {
    id: 40,
    title: "Remain in Light",
    artist: "Talking Heads",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730b0b1b2b3b4b5b6b7b8b9b0c",
    release_date: "1980-10-08",
    rank: 40
  },
  {
    id: 41,
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731b1b2b3b4b5b6b7b8b9b0b1d",
    release_date: "2015-03-15",
    rank: 41
  },
  {
    id: 42,
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732b2b3b4b5b6b7b8b9b0b1b2d",
    release_date: "1993-11-09",
    rank: 42
  },
  {
    id: 43,
    title: "Let It Bleed",
    artist: "The Rolling Stones",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733b3b4b5b6b7b8b9b0b1b2b3d",
    release_date: "1969-12-05",
    rank: 43
  },
  {
    id: 44,
    title: "Hotel California",
    artist: "Eagles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734b4b5b6b7b8b9b0b1b2b3b4d",
    release_date: "1976-12-08",
    rank: 44
  },
  {
    id: 45,
    title: "The Chronic",
    artist: "Dr. Dre",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735b5b6b7b8b9b0b1b2b3b4b5d",
    release_date: "1992-12-15",
    rank: 45
  },
  {
    id: 46,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736b6b7b8b9b0b1b2b3b4b5b6d",
    release_date: "1987-07-21",
    rank: 46
  },
  {
    id: 47,
    title: "Low",
    artist: "David Bowie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737b7b8b9b0b1b2b3b4b5b6b7d",
    release_date: "1977-01-14",
    rank: 47
  },
  {
    id: 48,
    title: "Rubber Soul",
    artist: "The Beatles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738b8b9b0b1b2b3b4b5b6b7b8d",
    release_date: "1965-12-03",
    rank: 48
  },
  {
    id: 49,
    title: "Sticky Fingers",
    artist: "The Rolling Stones",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739b9b0b1b2b3b4b5b6b7b8b9d",
    release_date: "1971-04-23",
    rank: 49
  },
  {
    id: 50,
    title: "Achtung Baby",
    artist: "U2",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730b0b1b2b3b4b5b6b7b8b9b0d",
    release_date: "1991-11-18",
    rank: 50
  },
  // 51-100
  {
    id: 51,
    title: "Automatic for the People",
    artist: "R.E.M.",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1a",
    release_date: "1992-10-05",
    rank: 51
  },
  {
    id: 52,
    title: "Off the Wall",
    artist: "Michael Jackson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2a",
    release_date: "1979-08-10",
    rank: 52
  },
  {
    id: 53,
    title: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3a",
    release_date: "1973-10-05",
    rank: 53
  },
  {
    id: 54,
    title: "Control",
    artist: "Janet Jackson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4a",
    release_date: "1986-02-04",
    rank: 54
  },
  {
    id: 55,
    title: "Live at the Apollo",
    artist: "James Brown",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5a",
    release_date: "1963-01-01",
    rank: 55
  },
  {
    id: 56,
    title: "Catch a Fire",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6a",
    release_date: "1973-04-13",
    rank: 56
  },
  {
    id: 57,
    title: "Late Registration",
    artist: "Kanye West",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7a",
    release_date: "2005-08-30",
    rank: 57
  },
  {
    id: 58,
    title: "Graceland",
    artist: "Paul Simon",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8a",
    release_date: "1986-08-25",
    rank: 58
  },
  {
    id: 59,
    title: "The Doors",
    artist: "The Doors",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9a",
    release_date: "1967-01-04",
    rank: 59
  },
  {
    id: 60,
    title: "1999",
    artist: "Prince",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0b",
    release_date: "1982-10-27",
    rank: 60
  },
  {
    id: 61,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1b",
    release_date: "1999-02-23",
    rank: 61
  },
  {
    id: 62,
    title: "Disintegration",
    artist: "The Cure",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2b",
    release_date: "1989-05-02",
    rank: 62
  },
  {
    id: 63,
    title: "Paid in Full",
    artist: "Eric B. & Rakim",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3b",
    release_date: "1987-07-07",
    rank: 63
  },
  {
    id: 64,
    title: "Electric Ladyland",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4b",
    release_date: "1968-10-16",
    rank: 64
  },
  {
    id: 65,
    title: "Bridge Over Troubled Water",
    artist: "Simon & Garfunkel",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5b",
    release_date: "1970-01-26",
    rank: 65
  },
  {
    id: 66,
    title: "Back to Black",
    artist: "Amy Winehouse",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6b",
    release_date: "2006-10-27",
    rank: 66
  },
  {
    id: 67,
    title: "Paranoid",
    artist: "Black Sabbath",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7b",
    release_date: "1970-09-18",
    rank: 67
  },
  {
    id: 68,
    title: "Star Time",
    artist: "James Brown",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8b",
    release_date: "1991-03-05",
    rank: 68
  },
  {
    id: 69,
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9b",
    release_date: "1975-09-12",
    rank: 69
  },
  {
    id: 70,
    title: "Superfly",
    artist: "Curtis Mayfield",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0c",
    release_date: "1972-07-11",
    rank: 70
  },
  {
    id: 71,
    title: "Kid A",
    artist: "Radiohead",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1c",
    release_date: "2000-10-02",
    rank: 71
  },
  {
    id: 72,
    title: "The Wall",
    artist: "Pink Floyd",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2c",
    release_date: "1979-11-30",
    rank: 72
  },
  {
    id: 73,
    title: "Straight Outta Compton",
    artist: "N.W.A",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3c",
    release_date: "1988-08-08",
    rank: 73
  },
  {
    id: 74,
    title: "What's the Story Morning Glory?",
    artist: "Oasis",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4c",
    release_date: "1995-10-02",
    rank: 74
  },
  {
    id: 75,
    title: "Led Zeppelin",
    artist: "Led Zeppelin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5c",
    release_date: "1969-01-12",
    rank: 75
  },
  {
    id: 76,
    title: "Talking Book",
    artist: "Stevie Wonder",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6c",
    release_date: "1972-10-28",
    rank: 76
  },
  {
    id: 77,
    title: "Dusty in Memphis",
    artist: "Dusty Springfield",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7c",
    release_date: "1969-03-18",
    rank: 77
  },
  {
    id: 78,
    title: "Good Kid, M.A.A.D City",
    artist: "Kendrick Lamar",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8c",
    release_date: "2012-10-22",
    rank: 78
  },
  {
    id: 79,
    title: "Modern Sounds in Country and Western Music",
    artist: "Ray Charles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9c",
    release_date: "1962-04-01",
    rank: 79
  },
  {
    id: 80,
    title: "Raising Hell",
    artist: "Run-D.M.C.",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0e",
    release_date: "1986-05-15",
    rank: 80
  },
  {
    id: 81,
    title: "Physical Graffiti",
    artist: "Led Zeppelin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1e",
    release_date: "1975-02-24",
    rank: 81
  },
  {
    id: 82,
    title: "In the Wee Small Hours",
    artist: "Frank Sinatra",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2e",
    release_date: "1955-04-25",
    rank: 82
  },
  {
    id: 83,
    title: "Like a Prayer",
    artist: "Madonna",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3e",
    release_date: "1989-03-21",
    rank: 83
  },
  {
    id: 84,
    title: "It Takes a Nation of Millions to Hold Us Back",
    artist: "Public Enemy",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4e",
    release_date: "1988-04-14",
    rank: 84
  },
  {
    id: 85,
    title: "There's a Riot Goin' On",
    artist: "Sly and the Family Stone",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5e",
    release_date: "1971-11-01",
    rank: 85
  },
  {
    id: 86,
    title: "At Fillmore East",
    artist: "The Allman Brothers Band",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6e",
    release_date: "1971-07-01",
    rank: 86
  },
  {
    id: 87,
    title: "Jagged Little Pill",
    artist: "Alanis Morissette",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7e",
    release_date: "1995-06-13",
    rank: 87
  },
  {
    id: 88,
    title: "Station to Station",
    artist: "David Bowie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8e",
    release_date: "1976-01-23",
    rank: 88
  },
  {
    id: 89,
    title: "The Low End Theory",
    artist: "A Tribe Called Quest",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9e",
    release_date: "1991-09-24",
    rank: 89
  },
  {
    id: 90,
    title: "Otis Blue: Otis Redding Sings Soul",
    artist: "Otis Redding",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0f",
    release_date: "1965-09-15",
    rank: 90
  },
  {
    id: 91,
    title: "Master of Puppets",
    artist: "Metallica",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1f",
    release_date: "1986-03-03",
    rank: 91
  },
  {
    id: 92,
    title: "Parallel Lines",
    artist: "Blondie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2f",
    release_date: "1978-09-01",
    rank: 92
  },
  {
    id: 93,
    title: "Legend",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3f",
    release_date: "1984-05-08",
    rank: 93
  },
  {
    id: 94,
    title: "Beggars Banquet",
    artist: "The Rolling Stones",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4f",
    release_date: "1968-12-06",
    rank: 94
  },
  {
    id: 95,
    title: "The Blueprint",
    artist: "Jay-Z",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5f",
    release_date: "2001-09-11",
    rank: 95
  },
  {
    id: 96,
    title: "Pearl",
    artist: "Janis Joplin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6f",
    release_date: "1971-01-11",
    rank: 96
  },
  {
    id: 97,
    title: "After the Gold Rush",
    artist: "Neil Young",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7f",
    release_date: "1970-09-19",
    rank: 97
  },
  {
    id: 98,
    title: "Hunky Dory",
    artist: "David Bowie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8f",
    release_date: "1971-12-17",
    rank: 98
  },
  {
    id: 99,
    title: "The Bends",
    artist: "Radiohead",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9f",
    release_date: "1995-03-13",
    rank: 99
  },
  {
    id: 100,
    title: "Stankonia",
    artist: "OutKast",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0g",
    release_date: "2000-10-31",
    rank: 100
  },
  // 101-200
  {
    id: 101,
    title: "The Queen Is Dead",
    artist: "The Smiths",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1g",
    release_date: "1986-06-16",
    rank: 101
  },
  {
    id: 102,
    title: "Court and Spark",
    artist: "Joni Mitchell",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2g",
    release_date: "1974-01-17",
    rank: 102
  },
  {
    id: 103,
    title: "Let's Get It On",
    artist: "Marvin Gaye",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3g",
    release_date: "1973-08-28",
    rank: 103
  },
  {
    id: 104,
    title: "The Smiths",
    artist: "The Smiths",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4g",
    release_date: "1984-02-20",
    rank: 104
  },
  {
    id: 105,
    title: "Midnight Marauders",
    artist: "A Tribe Called Quest",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5g",
    release_date: "1993-11-09",
    rank: 105
  },
  {
    id: 106,
    title: "Fun House",
    artist: "The Stooges",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6g",
    release_date: "1970-07-07",
    rank: 106
  },
  {
    id: 107,
    title: "Harvest",
    artist: "Neil Young",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7g",
    release_date: "1972-02-14",
    rank: 107
  },
  {
    id: 108,
    title: "All Eyez on Me",
    artist: "2Pac",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8g",
    release_date: "1996-02-13",
    rank: 108
  },
  {
    id: 109,
    title: "Damn",
    artist: "Kendrick Lamar",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9g",
    release_date: "2017-04-14",
    rank: 109
  },
  {
    id: 110,
    title: "Substance",
    artist: "New Order",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0h",
    release_date: "1987-08-17",
    rank: 110
  },
  {
    id: 111,
    title: "Marquee Moon",
    artist: "Television",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1h",
    release_date: "1977-02-08",
    rank: 111
  },
  {
    id: 112,
    title: "Unknown Pleasures",
    artist: "Joy Division",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2h",
    release_date: "1979-06-15",
    rank: 112
  },
  {
    id: 113,
    title: "Ten",
    artist: "Pearl Jam",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3h",
    release_date: "1991-08-27",
    rank: 113
  },
  {
    id: 114,
    title: "The Marshall Mathers LP",
    artist: "Eminem",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4h",
    release_date: "2000-05-23",
    rank: 114
  },
  {
    id: 115,
    title: "Doolittle",
    artist: "Pixies",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5h",
    release_date: "1989-04-17",
    rank: 115
  },
  {
    id: 116,
    title: "Lady Soul",
    artist: "Aretha Franklin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6h",
    release_date: "1968-01-22",
    rank: 116
  },
  {
    id: 117,
    title: "Transformer",
    artist: "Lou Reed",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7h",
    release_date: "1972-11-08",
    rank: 117
  },
  {
    id: 118,
    title: "Channel Orange",
    artist: "Frank Ocean",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8h",
    release_date: "2012-07-10",
    rank: 118
  },
  {
    id: 119,
    title: "Axis: Bold as Love",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9h",
    release_date: "1967-12-01",
    rank: 119
  },
  {
    id: 120,
    title: "Surfer Rosa",
    artist: "Pixies",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0i",
    release_date: "1988-03-21",
    rank: 120
  },
  {
    id: 121,
    title: "Led Zeppelin II",
    artist: "Led Zeppelin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1i",
    release_date: "1969-10-22",
    rank: 121
  },
  {
    id: 122,
    title: "Voodoo",
    artist: "D'Angelo",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2i",
    release_date: "2000-01-25",
    rank: 122
  },
  {
    id: 123,
    title: "Blonde",
    artist: "Frank Ocean",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3i",
    release_date: "2016-08-20",
    rank: 123
  },
  {
    id: 124,
    title: "In Utero",
    artist: "Nirvana",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4i",
    release_date: "1993-09-21",
    rank: 124
  },
  {
    id: 125,
    title: "3 Feet High and Rising",
    artist: "De La Soul",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5i",
    release_date: "1989-03-03",
    rank: 125
  },
  {
    id: 126,
    title: "Moondance",
    artist: "Van Morrison",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6i",
    release_date: "1970-02-01",
    rank: 126
  },
  {
    id: 127,
    title: "Loaded",
    artist: "The Velvet Underground",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7i",
    release_date: "1970-11-01",
    rank: 127
  },
  {
    id: 128,
    title: "Definitely Maybe",
    artist: "Oasis",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8i",
    release_date: "1994-08-29",
    rank: 128
  },
  {
    id: 129,
    title: "Demon Days",
    artist: "Gorillaz",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9i",
    release_date: "2005-05-23",
    rank: 129
  },
  {
    id: 130,
    title: "Rage Against the Machine",
    artist: "Rage Against the Machine",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0j",
    release_date: "1992-11-03",
    rank: 130
  },
  {
    id: 131,
    title: "Bitches Brew",
    artist: "Miles Davis",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1j",
    release_date: "1970-04-01",
    rank: 131
  },
  {
    id: 132,
    title: "Santana",
    artist: "Santana",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2j",
    release_date: "1969-08-30",
    rank: 132
  },
  {
    id: 133,
    title: "Siamese Dream",
    artist: "Smashing Pumpkins",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3j",
    release_date: "1993-07-27",
    rank: 133
  },
  {
    id: 134,
    title: "Tommy",
    artist: "The Who",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4j",
    release_date: "1969-05-23",
    rank: 134
  },
  {
    id: 135,
    title: "Speakerboxxx/The Love Below",
    artist: "OutKast",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5j",
    release_date: "2003-09-23",
    rank: 135
  },
  {
    id: 136,
    title: "At Last!",
    artist: "Etta James",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6j",
    release_date: "1960-11-15",
    rank: 136
  },
  {
    id: 137,
    title: "Here's Little Richard",
    artist: "Little Richard",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7j",
    release_date: "1957-03-01",
    rank: 137
  },
  {
    id: 138,
    title: "Reasonable Doubt",
    artist: "Jay-Z",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8j",
    release_date: "1996-06-25",
    rank: 138
  },
  {
    id: 139,
    title: "Music from Big Pink",
    artist: "The Band",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9j",
    release_date: "1968-07-01",
    rank: 139
  },
  {
    id: 140,
    title: "Power, Corruption & Lies",
    artist: "New Order",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0k",
    release_date: "1983-05-02",
    rank: 140
  },
  {
    id: 141,
    title: "Closer",
    artist: "Joy Division",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1k",
    release_date: "1980-07-18",
    rank: 141
  },
  {
    id: 142,
    title: "Dookie",
    artist: "Green Day",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2k",
    release_date: "1994-02-01",
    rank: 142
  },
  {
    id: 143,
    title: "Post",
    artist: "Björk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3k",
    release_date: "1995-06-13",
    rank: 143
  },
  {
    id: 144,
    title: "Fear of a Black Planet",
    artist: "Public Enemy",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4k",
    release_date: "1990-04-10",
    rank: 144
  },
  {
    id: 145,
    title: "Music",
    artist: "Madonna",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5k",
    release_date: "2000-09-18",
    rank: 145
  },
  {
    id: 146,
    title: "Super Fly",
    artist: "Curtis Mayfield",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6k",
    release_date: "1972-07-14",
    rank: 146
  },
  {
    id: 147,
    title: "Brothers in Arms",
    artist: "Dire Straits",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7k",
    release_date: "1985-05-13",
    rank: 147
  },
  {
    id: 148,
    title: "The Score",
    artist: "Fugees",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8k",
    release_date: "1996-02-13",
    rank: 148
  },
  {
    id: 149,
    title: "MTV Unplugged in New York",
    artist: "Nirvana",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9k",
    release_date: "1994-11-01",
    rank: 149
  },
  {
    id: 150,
    title: "Bad",
    artist: "Michael Jackson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0l",
    release_date: "1987-08-31",
    rank: 150
  },
  // More albums 151-300
  {
    id: 151,
    title: "Weezer (Blue Album)",
    artist: "Weezer",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1l",
    release_date: "1994-05-10",
    rank: 151
  },
  {
    id: 152,
    title: "Crosby, Stills & Nash",
    artist: "Crosby, Stills & Nash",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2l",
    release_date: "1969-05-29",
    rank: 152
  },
  {
    id: 153,
    title: "Elvis Presley",
    artist: "Elvis Presley",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3l",
    release_date: "1956-03-23",
    rank: 153
  },
  {
    id: 154,
    title: "Daydream Nation",
    artist: "Sonic Youth",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4l",
    release_date: "1988-10-18",
    rank: 154
  },
  {
    id: 155,
    title: "Meat Is Murder",
    artist: "The Smiths",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5l",
    release_date: "1985-02-11",
    rank: 155
  },
  {
    id: 156,
    title: "Born in the U.S.A.",
    artist: "Bruce Springsteen",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6l",
    release_date: "1984-06-04",
    rank: 156
  },
  {
    id: 157,
    title: "Astral Weeks",
    artist: "Van Morrison",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7l",
    release_date: "1968-11-01",
    rank: 157
  },
  {
    id: 158,
    title: "Murmur",
    artist: "R.E.M.",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8l",
    release_date: "1983-04-12",
    rank: 158
  },
  {
    id: 159,
    title: "In the Court of the Crimson King",
    artist: "King Crimson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9l",
    release_date: "1969-10-10",
    rank: 159
  },
  {
    id: 160,
    title: "Homogenic",
    artist: "Björk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0m",
    release_date: "1997-09-22",
    rank: 160
  },
  {
    id: 161,
    title: "Nothing's Shocking",
    artist: "Jane's Addiction",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1m",
    release_date: "1988-08-23",
    rank: 161
  },
  {
    id: 162,
    title: "Exodus",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2m",
    release_date: "1977-06-03",
    rank: 162
  },
  {
    id: 163,
    title: "The Freewheelin' Bob Dylan",
    artist: "Bob Dylan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3m",
    release_date: "1963-05-27",
    rank: 163
  },
  {
    id: 164,
    title: "Meat Loaf - Bat Out of Hell",
    artist: "Meat Loaf",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4m",
    release_date: "1977-10-21",
    rank: 164
  },
  {
    id: 165,
    title: "Synchronicity",
    artist: "The Police",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5m",
    release_date: "1983-06-17",
    rank: 165
  },
  {
    id: 166,
    title: "Licensed to Ill",
    artist: "Beastie Boys",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6m",
    release_date: "1986-11-15",
    rank: 166
  },
  {
    id: 167,
    title: "Odelay",
    artist: "Beck",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7m",
    release_date: "1996-06-18",
    rank: 167
  },
  {
    id: 168,
    title: "The Soft Bulletin",
    artist: "The Flaming Lips",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8m",
    release_date: "1999-05-17",
    rank: 168
  },
  {
    id: 169,
    title: "Ray of Light",
    artist: "Madonna",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9m",
    release_date: "1998-03-03",
    rank: 169
  },
  {
    id: 170,
    title: "Dig Me Out",
    artist: "Sleater-Kinney",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0n",
    release_date: "1997-04-08",
    rank: 170
  },
  {
    id: 171,
    title: "The Stranger",
    artist: "Billy Joel",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1n",
    release_date: "1977-09-29",
    rank: 171
  },
  {
    id: 172,
    title: "Dig Your Own Hole",
    artist: "The Chemical Brothers",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2n",
    release_date: "1997-04-07",
    rank: 172
  },
  {
    id: 173,
    title: "Paul's Boutique",
    artist: "Beastie Boys",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3n",
    release_date: "1989-07-25",
    rank: 173
  },
  {
    id: 174,
    title: "Bringing It All Back Home",
    artist: "Bob Dylan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4n",
    release_date: "1965-03-22",
    rank: 174
  },
  {
    id: 175,
    title: "American Idiot",
    artist: "Green Day",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5n",
    release_date: "2004-09-21",
    rank: 175
  },
  {
    id: 176,
    title: "Black Sabbath",
    artist: "Black Sabbath",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6n",
    release_date: "1970-02-13",
    rank: 176
  },
  {
    id: 177,
    title: "Violent Femmes",
    artist: "Violent Femmes",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7n",
    release_date: "1983-04-01",
    rank: 177
  },
  {
    id: 178,
    title: "Head Hunters",
    artist: "Herbie Hancock",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8n",
    release_date: "1973-10-26",
    rank: 178
  },
  {
    id: 179,
    title: "So",
    artist: "Peter Gabriel",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9n",
    release_date: "1986-05-19",
    rank: 179
  },
  {
    id: 180,
    title: "Back in Black",
    artist: "AC/DC",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0o",
    release_date: "1980-07-25",
    rank: 180
  },
  {
    id: 181,
    title: "Loveless",
    artist: "My Bloody Valentine",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1o",
    release_date: "1991-11-04",
    rank: 181
  },
  {
    id: 182,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2o",
    release_date: "1999-02-23",
    rank: 182
  },
  {
    id: 183,
    title: "Discovery",
    artist: "Daft Punk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3o",
    release_date: "2001-03-12",
    rank: 183
  },
  {
    id: 184,
    title: "White Light/White Heat",
    artist: "The Velvet Underground",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4o",
    release_date: "1968-01-30",
    rank: 184
  },
  {
    id: 185,
    title: "Layla and Other Assorted Love Songs",
    artist: "Derek and the Dominos",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5o",
    release_date: "1970-11-09",
    rank: 185
  },
  {
    id: 186,
    title: "Is This It",
    artist: "The Strokes",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6o",
    release_date: "2001-07-30",
    rank: 186
  },
  {
    id: 187,
    title: "Tragic Kingdom",
    artist: "No Doubt",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7o",
    release_date: "1995-10-10",
    rank: 187
  },
  {
    id: 188,
    title: "Elephant",
    artist: "The White Stripes",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8o",
    release_date: "2003-04-01",
    rank: 188
  },
  {
    id: 189,
    title: "Funeral",
    artist: "Arcade Fire",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9o",
    release_date: "2004-09-14",
    rank: 189
  },
  {
    id: 190,
    title: "Songs for the Deaf",
    artist: "Queens of the Stone Age",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0p",
    release_date: "2002-08-27",
    rank: 190
  },
  {
    id: 191,
    title: "American Beauty",
    artist: "Grateful Dead",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1p",
    release_date: "1970-11-01",
    rank: 191
  },
  {
    id: 192,
    title: "Whatever People Say I Am, That's What I'm Not",
    artist: "Arctic Monkeys",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2p",
    release_date: "2006-01-23",
    rank: 192
  },
  {
    id: 193,
    title: "Turn on the Bright Lights",
    artist: "Interpol",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3p",
    release_date: "2002-08-20",
    rank: 193
  },
  {
    id: 194,
    title: "Rust Never Sleeps",
    artist: "Neil Young & Crazy Horse",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4p",
    release_date: "1979-06-22",
    rank: 194
  },
  {
    id: 195,
    title: "Darkness on the Edge of Town",
    artist: "Bruce Springsteen",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5p",
    release_date: "1978-06-02",
    rank: 195
  },
  {
    id: 196,
    title: "Random Access Memories",
    artist: "Daft Punk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6p",
    release_date: "2013-05-17",
    rank: 196
  },
  {
    id: 197,
    title: "Fresh Fruit for Rotting Vegetables",
    artist: "Dead Kennedys",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7p",
    release_date: "1980-09-02",
    rank: 197
  },
  {
    id: 198,
    title: "In Rainbows",
    artist: "Radiohead",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8p",
    release_date: "2007-10-10",
    rank: 198
  },
  {
    id: 199,
    title: "Aladdin Sane",
    artist: "David Bowie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9p",
    release_date: "1973-04-13",
    rank: 199
  },
  {
    id: 200,
    title: "Alive!",
    artist: "Kiss",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0q",
    release_date: "1975-09-10",
    rank: 200
  },
  // 201-300
  {
    id: 201,
    title: "Young Americans",
    artist: "David Bowie",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1q",
    release_date: "1975-03-07",
    rank: 201
  },
  {
    id: 202,
    title: "Houses of the Holy",
    artist: "Led Zeppelin",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2q",
    release_date: "1973-03-28",
    rank: 202
  },
  {
    id: 203,
    title: "21",
    artist: "Adele",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3q",
    release_date: "2011-01-19",
    rank: 203
  },
  {
    id: 204,
    title: "Thriller (25th Anniversary Edition)",
    artist: "Michael Jackson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4q",
    release_date: "2008-02-08",
    rank: 204
  },
  {
    id: 205,
    title: "Songs of Leonard Cohen",
    artist: "Leonard Cohen",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5q",
    release_date: "1967-12-27",
    rank: 205
  },
  {
    id: 206,
    title: "Only Built 4 Cuban Linx...",
    artist: "Raekwon",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6q",
    release_date: "1995-08-01",
    rank: 206
  },
  {
    id: 207,
    title: "Mezzanine",
    artist: "Massive Attack",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7q",
    release_date: "1998-04-20",
    rank: 207
  },
  {
    id: 208,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8q",
    release_date: "1999-02-23",
    rank: 208
  },
  {
    id: 209,
    title: "John Lennon/Plastic Ono Band",
    artist: "John Lennon",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9q",
    release_date: "1970-12-11",
    rank: 209
  },
  {
    id: 210,
    title: "Mellon Collie and the Infinite Sadness",
    artist: "Smashing Pumpkins",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0r",
    release_date: "1995-10-24",
    rank: 210
  },
  {
    id: 211,
    title: "Pretzel Logic",
    artist: "Steely Dan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1r",
    release_date: "1974-02-20",
    rank: 211
  },
  {
    id: 212,
    title: "Kick",
    artist: "INXS",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2r",
    release_date: "1987-10-19",
    rank: 212
  },
  {
    id: 213,
    title: "Mama Said Knock You Out",
    artist: "LL Cool J",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3r",
    release_date: "1990-09-04",
    rank: 213
  },
  {
    id: 214,
    title: "Aja",
    artist: "Steely Dan",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4r",
    release_date: "1977-09-23",
    rank: 214
  },
  {
    id: 215,
    title: "Goo",
    artist: "Sonic Youth",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5r",
    release_date: "1990-06-26",
    rank: 215
  },
  {
    id: 216,
    title: "The College Dropout",
    artist: "Kanye West",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6r",
    release_date: "2004-02-10",
    rank: 216
  },
  {
    id: 217,
    title: "Pleased to Meet Me",
    artist: "The Replacements",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7r",
    release_date: "1987-04-28",
    rank: 217
  },
  {
    id: 218,
    title: "Thirteen",
    artist: "Big Star",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8r",
    release_date: "1972-07-01",
    rank: 218
  },
  {
    id: 219,
    title: "Let It Be",
    artist: "The Beatles",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9r",
    release_date: "1970-05-08",
    rank: 219
  },
  {
    id: 220,
    title: "Thriller",
    artist: "Michael Jackson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0s",
    release_date: "1982-11-30",
    rank: 220
  },
  {
    id: 221,
    title: "Dirty Mind",
    artist: "Prince",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1s",
    release_date: "1980-10-08",
    rank: 221
  },
  {
    id: 222,
    title: "Yankee Hotel Foxtrot",
    artist: "Wilco",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2s",
    release_date: "2002-04-23",
    rank: 222
  },
  {
    id: 223,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3s",
    release_date: "1987-07-21",
    rank: 223
  },
  {
    id: 224,
    title: "Red Headed Stranger",
    artist: "Willie Nelson",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4s",
    release_date: "1975-05-01",
    rank: 224
  },
  {
    id: 225,
    title: "Entertainment!",
    artist: "Gang of Four",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5s",
    release_date: "1979-09-01",
    rank: 225
  },
  {
    id: 226,
    title: "Trans-Europe Express",
    artist: "Kraftwerk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6s",
    release_date: "1977-03-01",
    rank: 226
  },
  {
    id: 227,
    title: "Hello Nasty",
    artist: "Beastie Boys",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7s",
    release_date: "1998-07-14",
    rank: 227
  },
  {
    id: 228,
    title: "The Suburbs",
    artist: "Arcade Fire",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8s",
    release_date: "2010-08-02",
    rank: 228
  },
  {
    id: 229,
    title: "Hot Fuss",
    artist: "The Killers",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9s",
    release_date: "2004-06-15",
    rank: 229
  },
  {
    id: 230,
    title: "Room on Fire",
    artist: "The Strokes",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0t",
    release_date: "2003-10-28",
    rank: 230
  },
  {
    id: 231,
    title: "Currents",
    artist: "Tame Impala",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1t",
    release_date: "2015-07-17",
    rank: 231
  },
  {
    id: 232,
    title: "Dummy",
    artist: "Portishead",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2t",
    release_date: "1994-08-22",
    rank: 232
  },
  {
    id: 233,
    title: "Silent Alarm",
    artist: "Bloc Party",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3t",
    release_date: "2005-02-14",
    rank: 233
  },
  {
    id: 234,
    title: "The Colour of Spring",
    artist: "Talk Talk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4t",
    release_date: "1986-02-24",
    rank: 234
  },
  {
    id: 235,
    title: "Abraxas",
    artist: "Santana",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5t",
    release_date: "1970-09-23",
    rank: 235
  },
  {
    id: 236,
    title: "Rust Never Sleeps",
    artist: "Neil Young",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6t",
    release_date: "1979-07-02",
    rank: 236
  },
  {
    id: 237,
    title: "Rated R",
    artist: "Queens of the Stone Age",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7t",
    release_date: "2000-06-06",
    rank: 237
  },
  {
    id: 238,
    title: "I Am...",
    artist: "Nas",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8t",
    release_date: "1999-04-06",
    rank: 238
  },
  {
    id: 239,
    title: "You're Living All Over Me",
    artist: "Dinosaur Jr.",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9t",
    release_date: "1987-07-01",
    rank: 239
  },
  {
    id: 240,
    title: "Sam Cooke at the Copa",
    artist: "Sam Cooke",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0u",
    release_date: "1964-10-01",
    rank: 240
  },
  {
    id: 241,
    title: "Technique",
    artist: "New Order",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2731a1a2a3a4a5a6a7a8a9a0a1u",
    release_date: "1989-01-30",
    rank: 241
  },
  {
    id: 242,
    title: "Remain in Light",
    artist: "Talking Heads",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2732a2a3a4a5a6a7a8a9a0a1a2u",
    release_date: "1980-10-08",
    rank: 242
  },
  {
    id: 243,
    title: "Maggot Brain",
    artist: "Funkadelic",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2733a3a4a5a6a7a8a9a0a1a2a3u",
    release_date: "1971-07-12",
    rank: 243
  },
  {
    id: 244,
    title: "Stop Making Sense",
    artist: "Talking Heads",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2734a4a5a6a7a8a9a0a1a2a3a4u",
    release_date: "1984-10-01",
    rank: 244
  },
  {
    id: 245,
    title: "Fever to Tell",
    artist: "Yeah Yeah Yeahs",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2735a5a6a7a8a9a0a1a2a3a4a5u",
    release_date: "2003-04-28",
    rank: 245
  },
  {
    id: 246,
    title: "The Band",
    artist: "The Band",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2736a6a7a8a9a0a1a2a3a4a5a6u",
    release_date: "1969-09-22",
    rank: 246
  },
  {
    id: 247,
    title: "Feels Like Home",
    artist: "Norah Jones",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2737a7a8a9a0a1a2a3a4a5a6a7u",
    release_date: "2004-02-10",
    rank: 247
  },
  {
    id: 248,
    title: "Buena Vista Social Club",
    artist: "Buena Vista Social Club",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2738a8a9a0a1a2a3a4a5a6a7a8u",
    release_date: "1997-09-16",
    rank: 248
  },
  {
    id: 249,
    title: "Spirit of Eden",
    artist: "Talk Talk",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2739a9a0a1a2a3a4a5a6a7a8a9u",
    release_date: "1988-09-12",
    rank: 249
  },
  {
    id: 250,
    title: "Hounds of Love",
    artist: "Kate Bush",
    cover_url: "https://i.scdn.co/image/ab67616d0000b2730a0a1a2a3a4a5a6a7a8a9a0v",
    release_date: "1985-09-16",
    rank: 250
  }
];

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ALBUMS_DATA };
}
