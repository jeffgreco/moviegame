// Movie data - Sample dataset of popular movies
// To update with fresh data, run: TMDB_API_KEY=your_key npm run fetch-movies
// Poster images are from TMDB (https://www.themoviedb.org/)

const MOVIES_DATA = [
  {
    "id": 238,
    "title": "The Godfather",
    "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "release_date": "1972-03-15"
  },
  {
    "id": 240,
    "title": "The Godfather Part II",
    "poster_path": "/hek3koDUyRQq7FoLJqT5y3dZZZl.jpg",
    "release_date": "1974-12-20"
  },
  {
    "id": 11,
    "title": "Star Wars",
    "poster_path": "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    "release_date": "1977-05-25"
  },
  {
    "id": 1891,
    "title": "The Empire Strikes Back",
    "poster_path": "/nNAeTmF4CtdSgMDplXTDPOpYzsX.jpg",
    "release_date": "1980-05-21"
  },
  {
    "id": 78,
    "title": "Blade Runner",
    "poster_path": "/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg",
    "release_date": "1982-06-25"
  },
  {
    "id": 1895,
    "title": "Return of the Jedi",
    "poster_path": "/mDCBQNhR6R0PVFucJAb3LJcKXsZ.jpg",
    "release_date": "1983-05-25"
  },
  {
    "id": 105,
    "title": "Back to the Future",
    "poster_path": "/fNOH9f1aA7XRTzl1sAOx9iF553Q.jpg",
    "release_date": "1985-07-03"
  },
  {
    "id": 218,
    "title": "The Terminator",
    "poster_path": "/qvktm0BHcnmDpul4Hz01GNazW5X.jpg",
    "release_date": "1984-10-26"
  },
  {
    "id": 89,
    "title": "Indiana Jones and the Last Crusade",
    "poster_path": "/4p1N2Qrt8j0H8xMHMHvtRxv9weZ.jpg",
    "release_date": "1989-05-24"
  },
  {
    "id": 679,
    "title": "Aliens",
    "poster_path": "/r1x5JGpyqZU8PYhbs4UcrO1Xb6x.jpg",
    "release_date": "1986-07-18"
  },
  {
    "id": 280,
    "title": "Terminator 2: Judgment Day",
    "poster_path": "/5M0j0B18abtBI5gi2RhfjjurTqb.jpg",
    "release_date": "1991-07-03"
  },
  {
    "id": 497,
    "title": "The Green Mile",
    "poster_path": "/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
    "release_date": "1999-12-10"
  },
  {
    "id": 424,
    "title": "Schindler's List",
    "poster_path": "/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg",
    "release_date": "1993-12-15"
  },
  {
    "id": 155,
    "title": "The Dark Knight",
    "poster_path": "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "release_date": "2008-07-18"
  },
  {
    "id": 680,
    "title": "Pulp Fiction",
    "poster_path": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    "release_date": "1994-10-14"
  },
  {
    "id": 13,
    "title": "Forrest Gump",
    "poster_path": "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    "release_date": "1994-07-06"
  },
  {
    "id": 550,
    "title": "Fight Club",
    "poster_path": "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    "release_date": "1999-10-15"
  },
  {
    "id": 278,
    "title": "The Shawshank Redemption",
    "poster_path": "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "release_date": "1994-09-23"
  },
  {
    "id": 603,
    "title": "The Matrix",
    "poster_path": "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    "release_date": "1999-03-31"
  },
  {
    "id": 120,
    "title": "The Lord of the Rings: The Fellowship of the Ring",
    "poster_path": "/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    "release_date": "2001-12-19"
  },
  {
    "id": 121,
    "title": "The Lord of the Rings: The Two Towers",
    "poster_path": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
    "release_date": "2002-12-18"
  },
  {
    "id": 122,
    "title": "The Lord of the Rings: The Return of the King",
    "poster_path": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "release_date": "2003-12-17"
  },
  {
    "id": 807,
    "title": "Se7en",
    "poster_path": "/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    "release_date": "1995-09-22"
  },
  {
    "id": 627,
    "title": "Trainspotting",
    "poster_path": "/bhY62Dw8iW54DIhxPQerbuB9DOP.jpg",
    "release_date": "1996-02-23"
  },
  {
    "id": 73,
    "title": "American History X",
    "poster_path": "/euypWkaYFOLW3e5rLIcTAjWnhhT.jpg",
    "release_date": "1998-10-30"
  },
  {
    "id": 329,
    "title": "Jurassic Park",
    "poster_path": "/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
    "release_date": "1993-06-11"
  },
  {
    "id": 857,
    "title": "Saving Private Ryan",
    "poster_path": "/uqx37cS8cpHg8U35f9U5IuAXLX9.jpg",
    "release_date": "1998-07-24"
  },
  {
    "id": 598,
    "title": "City of God",
    "poster_path": "/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg",
    "release_date": "2002-08-30"
  },
  {
    "id": 244786,
    "title": "Whiplash",
    "poster_path": "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    "release_date": "2014-10-10"
  },
  {
    "id": 389,
    "title": "12 Angry Men",
    "poster_path": "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
    "release_date": "1957-04-10"
  },
  {
    "id": 637,
    "title": "Life Is Beautiful",
    "poster_path": "/74hLDKjD5aGYOotO6esUVaeISa2.jpg",
    "release_date": "1997-12-20"
  },
  {
    "id": 14,
    "title": "American Beauty",
    "poster_path": "/wby9315QzVKdW9BonAefg8jGTTb.jpg",
    "release_date": "1999-09-17"
  },
  {
    "id": 769,
    "title": "GoodFellas",
    "poster_path": "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    "release_date": "1990-09-19"
  },
  {
    "id": 19404,
    "title": "Dilwale Dulhania Le Jayenge",
    "poster_path": "/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg",
    "release_date": "1995-10-20"
  },
  {
    "id": 27205,
    "title": "Inception",
    "poster_path": "/ljsZTbVsrQSqZgWeep9B1QDKBoB.jpg",
    "release_date": "2010-07-16"
  },
  {
    "id": 157336,
    "title": "Interstellar",
    "poster_path": "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    "release_date": "2014-11-07"
  },
  {
    "id": 429,
    "title": "The Good, the Bad and the Ugly",
    "poster_path": "/bX2xnavhMYjWDoZp1VM6VnU1xwe.jpg",
    "release_date": "1966-12-23"
  },
  {
    "id": 372058,
    "title": "Your Name.",
    "poster_path": "/q719jXXEzOoYaps6babgKnONONX.jpg",
    "release_date": "2016-08-26"
  },
  {
    "id": 129,
    "title": "Spirited Away",
    "poster_path": "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    "release_date": "2001-07-20"
  },
  {
    "id": 496243,
    "title": "Parasite",
    "poster_path": "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "release_date": "2019-05-30"
  },
  {
    "id": 539,
    "title": "Psycho",
    "poster_path": "/yz4QVqPx3h1hD1DfqqQkCq3rmxW.jpg",
    "release_date": "1960-09-08"
  },
  {
    "id": 769,
    "title": "GoodFellas",
    "poster_path": "/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    "release_date": "1990-09-19"
  },
  {
    "id": 146233,
    "title": "Prisoners",
    "poster_path": "/uhvhfm5YxfEdSj78AmMaGUYlSl5.jpg",
    "release_date": "2013-09-20"
  },
  {
    "id": 745,
    "title": "The Sixth Sense",
    "poster_path": "/4AfSDjjCy6T5LA1TMz0Lh2HlpRh.jpg",
    "release_date": "1999-08-06"
  },
  {
    "id": 510,
    "title": "One Flew Over the Cuckoo's Nest",
    "poster_path": "/3jcbDmRFiQ83drXNOvRDeKHxS0C.jpg",
    "release_date": "1975-11-19"
  },
  {
    "id": 103,
    "title": "Taxi Driver",
    "poster_path": "/ekstpH614fwDX8DUln1a2Opz0N8.jpg",
    "release_date": "1976-02-08"
  },
  {
    "id": 185,
    "title": "A Clockwork Orange",
    "poster_path": "/4sHeTAp65WrSSuc05nRBKddhBxO.jpg",
    "release_date": "1971-12-19"
  },
  {
    "id": 348,
    "title": "Alien",
    "poster_path": "/vfrQk5IPloGg1v9Rzbh2Eg3VGyM.jpg",
    "release_date": "1979-05-25"
  },
  {
    "id": 597,
    "title": "Titanic",
    "poster_path": "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    "release_date": "1997-12-19"
  },
  {
    "id": 489,
    "title": "Good Will Hunting",
    "poster_path": "/bABCBKYBK7A5G1x0FzoeoNNMOKs.jpg",
    "release_date": "1997-12-05"
  },
  {
    "id": 197,
    "title": "Braveheart",
    "poster_path": "/or1gBugydmjToAEq7OZY0owwFk.jpg",
    "release_date": "1995-05-24"
  },
  {
    "id": 272,
    "title": "Batman Begins",
    "poster_path": "/4MpN4kIEqUjW8OPtOQJXlTdHiJV.jpg",
    "release_date": "2005-06-15"
  },
  {
    "id": 98,
    "title": "Gladiator",
    "poster_path": "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    "release_date": "2000-05-05"
  },
  {
    "id": 106646,
    "title": "The Wolf of Wall Street",
    "poster_path": "/34m2tygAYBGqA9MXKhRDtzYd4MR.jpg",
    "release_date": "2013-12-25"
  },
  {
    "id": 500,
    "title": "Reservoir Dogs",
    "poster_path": "/lsBnfheKZBO3UKU7lVLlcgIfBQm.jpg",
    "release_date": "1992-09-02"
  },
  {
    "id": 77,
    "title": "Memento",
    "poster_path": "/yuNs09hvpHVU1cBTCAk9zxsL2oW.jpg",
    "release_date": "2000-10-11"
  },
  {
    "id": 101,
    "title": "Leon: The Professional",
    "poster_path": "/yI6X2cCM5YPJtxMhUd3dPGqDAhw.jpg",
    "release_date": "1994-09-14"
  },
  {
    "id": 274,
    "title": "The Silence of the Lambs",
    "poster_path": "/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg",
    "release_date": "1991-02-14"
  },
  {
    "id": 11036,
    "title": "The Notebook",
    "poster_path": "/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
    "release_date": "2004-06-25"
  },
  {
    "id": 313369,
    "title": "La La Land",
    "poster_path": "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    "release_date": "2016-12-09"
  },
  {
    "id": 284053,
    "title": "Thor: Ragnarok",
    "poster_path": "/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg",
    "release_date": "2017-11-03"
  },
  {
    "id": 299536,
    "title": "Avengers: Infinity War",
    "poster_path": "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "release_date": "2018-04-27"
  },
  {
    "id": 299534,
    "title": "Avengers: Endgame",
    "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    "release_date": "2019-04-26"
  },
  {
    "id": 324857,
    "title": "Spider-Man: Into the Spider-Verse",
    "poster_path": "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg",
    "release_date": "2018-12-14"
  },
  {
    "id": 475557,
    "title": "Joker",
    "poster_path": "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    "release_date": "2019-10-04"
  },
  {
    "id": 438631,
    "title": "Dune",
    "poster_path": "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    "release_date": "2021-10-22"
  },
  {
    "id": 693134,
    "title": "Dune: Part Two",
    "poster_path": "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    "release_date": "2024-03-01"
  },
  {
    "id": 238,
    "title": "The Godfather",
    "poster_path": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    "release_date": "1972-03-15"
  },
  {
    "id": 568124,
    "title": "Encanto",
    "poster_path": "/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg",
    "release_date": "2021-11-24"
  },
  {
    "id": 361743,
    "title": "Top Gun: Maverick",
    "poster_path": "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    "release_date": "2022-05-27"
  },
  {
    "id": 76600,
    "title": "Avatar: The Way of Water",
    "poster_path": "/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    "release_date": "2022-12-16"
  },
  {
    "id": 19995,
    "title": "Avatar",
    "poster_path": "/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    "release_date": "2009-12-18"
  },
  {
    "id": 346698,
    "title": "Barbie",
    "poster_path": "/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    "release_date": "2023-07-21"
  },
  {
    "id": 872585,
    "title": "Oppenheimer",
    "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "release_date": "2023-07-21"
  },
  {
    "id": 575264,
    "title": "Mission: Impossible - Dead Reckoning Part One",
    "poster_path": "/NNxYkU70HPurnNCSiCjYAmacwm.jpg",
    "release_date": "2023-07-12"
  },
  {
    "id": 569094,
    "title": "Spider-Man: Across the Spider-Verse",
    "poster_path": "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "release_date": "2023-06-02"
  },
  {
    "id": 862,
    "title": "Toy Story",
    "poster_path": "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
    "release_date": "1995-11-22"
  },
  {
    "id": 863,
    "title": "Toy Story 2",
    "poster_path": "/xkkHMnK5mHd4EvET6rUMaWImeHF.jpg",
    "release_date": "1999-11-24"
  },
  {
    "id": 10193,
    "title": "Toy Story 3",
    "poster_path": "/mMltbSxwEdNE4Cv8QYLpzkHWTDo.jpg",
    "release_date": "2010-06-18"
  },
  {
    "id": 671,
    "title": "Harry Potter and the Philosopher's Stone",
    "poster_path": "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    "release_date": "2001-11-16"
  },
  {
    "id": 672,
    "title": "Harry Potter and the Chamber of Secrets",
    "poster_path": "/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
    "release_date": "2002-11-15"
  },
  {
    "id": 673,
    "title": "Harry Potter and the Prisoner of Azkaban",
    "poster_path": "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
    "release_date": "2004-06-04"
  },
  {
    "id": 674,
    "title": "Harry Potter and the Goblet of Fire",
    "poster_path": "/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg",
    "release_date": "2005-11-18"
  },
  {
    "id": 675,
    "title": "Harry Potter and the Order of the Phoenix",
    "poster_path": "/5aOyriWkPec0zUDxmHFP9qMgNhL.jpg",
    "release_date": "2007-07-11"
  },
  {
    "id": 767,
    "title": "Harry Potter and the Half-Blood Prince",
    "poster_path": "/z7uo9zmyHPSwU3rrhKjLT4IWUQT.jpg",
    "release_date": "2009-07-15"
  },
  {
    "id": 12444,
    "title": "Harry Potter and the Deathly Hallows: Part 1",
    "poster_path": "/iGoXIpQb7Pot00EEdwpwPajheZ5.jpg",
    "release_date": "2010-11-19"
  },
  {
    "id": 12445,
    "title": "Harry Potter and the Deathly Hallows: Part 2",
    "poster_path": "/c54HpQmuwXjHq2C9wmoACjxoom3.jpg",
    "release_date": "2011-07-15"
  },
  {
    "id": 1726,
    "title": "Iron Man",
    "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
    "release_date": "2008-05-02"
  },
  {
    "id": 1771,
    "title": "Captain America: The First Avenger",
    "poster_path": "/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg",
    "release_date": "2011-07-22"
  },
  {
    "id": 24428,
    "title": "The Avengers",
    "poster_path": "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
    "release_date": "2012-05-04"
  },
  {
    "id": 68721,
    "title": "Iron Man 3",
    "poster_path": "/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg",
    "release_date": "2013-05-03"
  },
  {
    "id": 118340,
    "title": "Guardians of the Galaxy",
    "poster_path": "/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg",
    "release_date": "2014-08-01"
  },
  {
    "id": 271110,
    "title": "Captain America: Civil War",
    "poster_path": "/rAGiXaUfPzY7CDEyNKUofk3Kw2e.jpg",
    "release_date": "2016-05-06"
  },
  {
    "id": 284052,
    "title": "Doctor Strange",
    "poster_path": "/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
    "release_date": "2016-11-04"
  },
  {
    "id": 315635,
    "title": "Spider-Man: Homecoming",
    "poster_path": "/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg",
    "release_date": "2017-07-07"
  },
  {
    "id": 181808,
    "title": "Star Wars: The Force Awakens",
    "poster_path": "/wqnLdwVXoBjKibFRR5U3y0aDUhs.jpg",
    "release_date": "2015-12-18"
  },
  {
    "id": 140607,
    "title": "Star Wars: The Last Jedi",
    "poster_path": "/kOVEVeg59E0wsnXmF9nrh6OmWII.jpg",
    "release_date": "2017-12-15"
  },
  {
    "id": 181812,
    "title": "Star Wars: The Rise of Skywalker",
    "poster_path": "/db32LaOibwEliAmSL2jjDF6oDdj.jpg",
    "release_date": "2019-12-20"
  },
  {
    "id": 1124,
    "title": "The Prestige",
    "poster_path": "/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
    "release_date": "2006-10-20"
  },
  {
    "id": 49026,
    "title": "The Dark Knight Rises",
    "poster_path": "/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg",
    "release_date": "2012-07-20"
  },
  {
    "id": 37724,
    "title": "No Country for Old Men",
    "poster_path": "/6d5XOczc226jECq0LIX0siKtgHR.jpg",
    "release_date": "2007-11-21"
  },
  {
    "id": 1422,
    "title": "The Departed",
    "poster_path": "/nT97ifVT2J1yMQmeq20Qblg61T.jpg",
    "release_date": "2006-10-06"
  },
  {
    "id": 6977,
    "title": "No Country for Old Men",
    "poster_path": "/bj1v6YKF8yHqA489VFfnQvOJpnc.jpg",
    "release_date": "2007-11-21"
  },
  {
    "id": 4935,
    "title": "Howl's Moving Castle",
    "poster_path": "/TkTPELv4kC3u1lkloush8skOjE.jpg",
    "release_date": "2004-11-20"
  },
  {
    "id": 128,
    "title": "Princess Mononoke",
    "poster_path": "/cMYCDADoLKLbB83g4WnJegaZimC.jpg",
    "release_date": "1997-07-12"
  },
  {
    "id": 81,
    "title": "Nausicaä of the Valley of the Wind",
    "poster_path": "/sIpcATxMrAHIsqnhQfJyEMiovLf.jpg",
    "release_date": "1984-03-11"
  },
  {
    "id": 812,
    "title": "Aladdin",
    "poster_path": "/ru7Fs9AbNlmUdExGFZFcDTp2ceD.jpg",
    "release_date": "1992-11-25"
  },
  {
    "id": 8587,
    "title": "The Lion King",
    "poster_path": "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    "release_date": "1994-06-24"
  },
  {
    "id": 10681,
    "title": "WALL-E",
    "poster_path": "/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg",
    "release_date": "2008-06-27"
  },
  {
    "id": 12,
    "title": "Finding Nemo",
    "poster_path": "/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
    "release_date": "2003-05-30"
  },
  {
    "id": 9806,
    "title": "The Incredibles",
    "poster_path": "/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg",
    "release_date": "2004-11-05"
  },
  {
    "id": 585,
    "title": "Monsters, Inc.",
    "poster_path": "/sgheSKxZkttIe8ONsf2sKu62ybf.jpg",
    "release_date": "2001-11-02"
  },
  {
    "id": 920,
    "title": "Cars",
    "poster_path": "/qa6HCwP4Z15l3hpsASz3auugEW6.jpg",
    "release_date": "2006-06-09"
  },
  {
    "id": 354912,
    "title": "Coco",
    "poster_path": "/gGEsBPAijhVUFoiNpgZS2PRqZKl.jpg",
    "release_date": "2017-11-22"
  },
  {
    "id": 508442,
    "title": "Soul",
    "poster_path": "/hm58Jw4Lw8OIeECIq5qyPYhAeRJ.jpg",
    "release_date": "2020-12-25"
  },
  {
    "id": 150540,
    "title": "Inside Out",
    "poster_path": "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    "release_date": "2015-06-19"
  },
  {
    "id": 508943,
    "title": "Luca",
    "poster_path": "/jTswp6KyDYKtvC52GbHagrZbGvD.jpg",
    "release_date": "2021-06-18"
  },
  {
    "id": 301528,
    "title": "Toy Story 4",
    "poster_path": "/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg",
    "release_date": "2019-06-21"
  },
  {
    "id": 508947,
    "title": "Turning Red",
    "poster_path": "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
    "release_date": "2022-03-11"
  },
  {
    "id": 1022789,
    "title": "Inside Out 2",
    "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    "release_date": "2024-06-14"
  }
];
