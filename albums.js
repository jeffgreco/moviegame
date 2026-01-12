// Rolling Stone Top 500 Albums Data
// Based on Rolling Stone's "500 Greatest Albums of All Time" list
// Last updated: 2026-01-12
// Cover art from iTunes

const ALBUMS_DATA = [
  {
    id: 1,
    title: "What's Going On",
    artist: "Marvin Gaye",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/36/2d/76362d74-cb7a-8ef9-104e-cde1d858e9a9/20UMGIM95279.rgb.jpg/600x600bb.jpg",
    release_date: "1971-05-21",
    rank: 1
  },
  {
    id: 2,
    title: "Pet Sounds",
    artist: "The Beach Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/35/bb/c4/35bbc4eb-9387-97b0-b138-64b7a949ea43/13UABIM03512.rgb.jpg/600x600bb.jpg",
    release_date: "1966-05-16",
    rank: 2
  },
  {
    id: 3,
    title: "Blue",
    artist: "Joni Mitchell",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/00/a2/43/00a24363-cf69-bfd2-a26a-a042d57ab141/075992719926.jpg/600x600bb.jpg",
    release_date: "1971-06-22",
    rank: 3
  },
  {
    id: 4,
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/eb/1f/12/eb1f12ec-474c-63aa-43af-09282f423b9d/00602537004737.rgb.jpg/600x600bb.jpg",
    release_date: "1976-09-28",
    rank: 4
  },
  {
    id: 5,
    title: "Abbey Road",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/48/53/43/485343e3-dd6a-0034-faec-f4b6403f8108/13UMGIM63890.rgb.jpg/600x600bb.jpg",
    release_date: "1969-09-26",
    rank: 5
  },
  {
    id: 6,
    title: "Nevermind",
    artist: "Nirvana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/45/b2/24/45b224b7-baa4-c320-9e3b-fd37dcfcdcb1/mzi.nkvwvqxf.jpg/600x600bb.jpg",
    release_date: "1991-09-24",
    rank: 6
  },
  {
    id: 7,
    title: "Rumours",
    artist: "Fleetwood Mac",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4d/13/ba/4d13bac3-d3d5-7581-2c74-034219eadf2b/081227970949.jpg/600x600bb.jpg",
    release_date: "1977-02-04",
    rank: 7
  },
  {
    id: 8,
    title: "Purple Rain",
    artist: "Prince and the Revolution",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/00/17/f2/0017f24f-e580-b77a-71a8-1bc7b75881bf/603497822065.jpg/600x600bb.jpg",
    release_date: "1984-06-25",
    rank: 8
  },
  {
    id: 9,
    title: "Blood on the Tracks",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/6e/4d/346e4d1c-c9ef-cf7f-96d9-aad97286febb/074643323529.jpg/600x600bb.jpg",
    release_date: "1975-01-20",
    rank: 9
  },
  {
    id: 10,
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/6b/55/096b55c4-ee8f-23bd-df8f-0ca0821f3028/886446727189.jpg/600x600bb.jpg",
    release_date: "1998-08-25",
    rank: 10
  },
  {
    id: 11,
    title: "Kind of Blue",
    artist: "Miles Davis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/7f/9f/d6/mzi.vtnaewef.jpg/600x600bb.jpg",
    release_date: "1959-08-17",
    rank: 11
  },
  {
    id: 12,
    title: "A Love Supreme",
    artist: "John Coltrane",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e5/24/aa/e524aacd-467b-66f3-8931-0fcd6750a4b9/08UMGIM07914.rgb.jpg/600x600bb.jpg",
    release_date: "1965-02-01",
    rank: 12
  },
  {
    id: 13,
    title: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/92/93/39/9293397f-a707-237e-ec7e-0ca613a67e3c/06UMGIM04143.rgb.jpg/600x600bb.jpg",
    release_date: "1967-03-12",
    rank: 13
  },
  {
    id: 14,
    title: "Thriller",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
    release_date: "1982-11-30",
    rank: 14
  },
  {
    id: 15,
    title: "OK Computer",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg",
    release_date: "1997-06-16",
    rank: 15
  },
  {
    id: 16,
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/64/85/d2/6485d219-91ac-5481-2668-7eab1320436d/21UMGIM57007.rgb.jpg/600x600bb.jpg",
    release_date: "1967-05-26",
    rank: 16
  },
  {
    id: 17,
    title: "London Calling",
    artist: "The Clash",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/93/cb/20/93cb201b-154b-7b74-a10b-48fbef9b3281/888880348937.jpg/600x600bb.jpg",
    release_date: "1979-12-14",
    rank: 17
  },
  {
    id: 18,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/54/d0/62/54d06230-1196-0bd0-93b3-1bd3eef2b43d/cover_-.jpg/600x600bb.jpg",
    release_date: "1973-03-01",
    rank: 18
  },
  {
    id: 19,
    title: "Innervisions",
    artist: "Stevie Wonder",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ff/c2/5f/ffc25f04-cb3b-b56e-dd28-8b77ae63e613/00602537070824.rgb.jpg/600x600bb.jpg",
    release_date: "1973-08-03",
    rank: 19
  },
  {
    id: 20,
    title: "Lemonade",
    artist: "Beyoncé",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d2/53/65/d2536587-c7f3-9153-4677-f5a2f3e9e5ad/886447691120.jpg/600x600bb.jpg",
    release_date: "2016-04-23",
    rank: 20
  },
  {
    id: 21,
    title: "Highway 61 Revisited",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f8/ff/c0/f8ffc056-55b4-2033-657d-32492d1eea25/827969239926.jpg/600x600bb.jpg",
    release_date: "1965-08-30",
    rank: 21
  },
  {
    id: 22,
    title: "Revolver",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/97/f4/3a/97f43ab4-9fdf-7a41-e430-7c6c313f3883/13UMGIM63887.rgb.jpg/600x600bb.jpg",
    release_date: "1966-08-05",
    rank: 22
  },
  {
    id: 23,
    title: "My Beautiful Dark Twisted Fantasy",
    artist: "Kanye West",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/37/da/7c/37da7cc5-2b6f-9bb8-30ba-8a8c3be3e16a/00602527584973.rgb.jpg/600x600bb.jpg",
    release_date: "2010-11-22",
    rank: 23
  },
  {
    id: 24,
    title: "The Rise and Fall of Ziggy Stardust",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5f/fa/56/5ffa56c2-ea1f-7a17-6bad-192ff9b6476d/825646124206.jpg/600x600bb.jpg",
    release_date: "1972-06-16",
    rank: 24
  },
  {
    id: 25,
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f8/6a/3d/f86a3db0-d518-cd49-c0c9-25e767ae0a6d/075679456861.jpg/600x600bb.jpg",
    release_date: "1994-09-13",
    rank: 25
  },
  {
    id: 26,
    title: "Exile on Main St.",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7f/e0/b4/7fe0b4da-36cd-a1d0-0f19-ef3fec18e3cd/08UMGIM15742.rgb.jpg/600x600bb.jpg",
    release_date: "1972-05-12",
    rank: 26
  },
  {
    id: 27,
    title: "Horses",
    artist: "Patti Smith",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0b/cd/a8/0bcda80a-0046-aa13-1416-71d844dfb711/886445500394.jpg/600x600bb.jpg",
    release_date: "1975-12-13",
    rank: 27
  },
  {
    id: 28,
    title: "Blonde on Blonde",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/20/9d/bf/209dbf58-f698-7181-33de-0c29480beba0/074640084126.jpg/600x600bb.jpg",
    release_date: "1966-05-16",
    rank: 28
  },
  {
    id: 29,
    title: "Illmatic",
    artist: "Nas",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b9/eb/cc/b9ebccbc-5ba4-2cdb-5332-b065739abd9a/886444567619.jpg/600x600bb.jpg",
    release_date: "1994-04-19",
    rank: 29
  },
  {
    id: 30,
    title: "Are You Experienced",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/00/67/45/006745f5-95d5-5a06-35ed-d515e9cfd7d8/dj.tbwlxwoh.jpg/600x600bb.jpg",
    release_date: "1967-05-12",
    rank: 30
  },
  {
    id: 31,
    title: "I Never Loved a Man the Way I Love You",
    artist: "Aretha Franklin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d1/31/ee/d131eec4-614c-d661-b580-3dc32b8547e8/603497896622.jpg/600x600bb.jpg",
    release_date: "1967-03-10",
    rank: 31
  },
  {
    id: 32,
    title: "Born to Run",
    artist: "Bruce Springsteen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0a/02/f7/0a02f7a1-ca2a-c0d7-7192-50314971721f/884977157031.jpg/600x600bb.jpg",
    release_date: "1975-08-25",
    rank: 32
  },
  {
    id: 33,
    title: "Sign o' the Times",
    artist: "Prince",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a9/52/38/a95238ab-10f9-e407-4bc8-755148d32d65/886448874546.jpg/600x600bb.jpg",
    release_date: "1987-03-30",
    rank: 33
  },
  {
    id: 34,
    title: "The White Album",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fa/5b/89/fa5b898d-bad6-e053-4195-260e5c74f2bb/00602567725466.rgb.jpg/600x600bb.jpg",
    release_date: "1968-11-22",
    rank: 34
  },
  {
    id: 35,
    title: "Aquemini",
    artist: "OutKast",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0e/48/dd/0e48dd9a-07c9-46de-a838-b4ddb4e508a7/886448814191.jpg/600x600bb.jpg",
    release_date: "1998-09-29",
    rank: 35
  },
  {
    id: 36,
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5c/15/9b/5c159b27-95ca-b9a7-84e3-28e795fffd39/dj.kvkrpptq.jpg/600x600bb.jpg",
    release_date: "1971-11-08",
    rank: 36
  },
  {
    id: 37,
    title: "The Joshua Tree",
    artist: "U2",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/e2/c3/8fe2c384-f6cb-9af7-371d-2b6a9b204e59/17UMGIM79292.rgb.jpg/600x600bb.jpg",
    release_date: "1987-03-09",
    rank: 37
  },
  {
    id: 38,
    title: "Tapestry",
    artist: "Carole King",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/68/b6/0e/68b60e89-9d41-e8a1-bba2-05c750f0832b/dj.hwpyamqm.jpg/600x600bb.jpg",
    release_date: "1971-02-10",
    rank: 38
  },
  {
    id: 39,
    title: "Who's Next",
    artist: "The Who",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/a5/e7/70/a5e7703c-4e30-da7a-a319-2d3caef42c0e/23UM1IM04872.rgb.jpg/600x600bb.jpg",
    release_date: "1971-08-14",
    rank: 39
  },
  {
    id: 40,
    title: "Remain in Light",
    artist: "Talking Heads",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/87/5f/5b/mzi.zzquknhm.jpg/600x600bb.jpg",
    release_date: "1980-10-08",
    rank: 40
  },
  {
    id: 41,
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b5/a6/91/b5a69171-5232-3d5b-9c15-8963802f83dd/15UMGIM15814.rgb.jpg/600x600bb.jpg",
    release_date: "2015-03-15",
    rank: 41
  },
  {
    id: 42,
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8c/20/1f/8c201f03-7617-2d8b-3d8d-e0ba2d55041b/196872123784.jpg/600x600bb.jpg",
    release_date: "1993-11-09",
    rank: 42
  },
  {
    id: 43,
    title: "Let It Bleed",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/69/64/67/696467fe-9ed1-b65e-1016-a10d07e6464d/20UMGIM14087.rgb.jpg/600x600bb.jpg",
    release_date: "1969-12-05",
    rank: 43
  },
  {
    id: 44,
    title: "Hotel California",
    artist: "Eagles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/88/16/2c/88162c3d-46db-8321-61f3-3a47404cfe76/075596050920.jpg/600x600bb.jpg",
    release_date: "1976-12-08",
    rank: 44
  },
  {
    id: 45,
    title: "The Chronic",
    artist: "Dr. Dre",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b0/51/4f/b0514fda-a9ca-d08b-1e89-eca02d9e792f/00602547530684.rgb.jpg/600x600bb.jpg",
    release_date: "1992-12-15",
    rank: 45
  },
  {
    id: 46,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a3/20/20/a3202033-3d92-2267-eab4-9a87ec1aa95e/710423.jpg/600x600bb.jpg",
    release_date: "1987-07-21",
    rank: 46
  },
  {
    id: 47,
    title: "Low",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/49/2d/f7492da6-164e-b023-4b17-937329c35458/190295842895.jpg/600x600bb.jpg",
    release_date: "1977-01-14",
    rank: 47
  },
  {
    id: 48,
    title: "Rubber Soul",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/af/20/aa/af20aa89-4002-11fb-25d8-ff544af67eb4/00602567725404.rgb.jpg/600x600bb.jpg",
    release_date: "1965-12-03",
    rank: 48
  },
  {
    id: 49,
    title: "Sticky Fingers",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7f/e0/b4/7fe0b4da-36cd-a1d0-0f19-ef3fec18e3cd/08UMGIM15742.rgb.jpg/600x600bb.jpg",
    release_date: "1971-04-23",
    rank: 49
  },
  {
    id: 50,
    title: "Achtung Baby",
    artist: "U2",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/fe/5e/4f/fe5e4f79-c74f-c39e-39dc-4c8a952b9665/17UMGIM98829.rgb.jpg/600x600bb.jpg",
    release_date: "1991-11-18",
    rank: 50
  },
  {
    id: 51,
    title: "Automatic for the People",
    artist: "R.E.M.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e8/a9/b3/e8a9b351-578c-12b7-4cc4-791b90fac17b/00602537796731.rgb.jpg/600x600bb.jpg",
    release_date: "1992-10-05",
    rank: 51
  },
  {
    id: 52,
    title: "Off the Wall",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cc/b0/7f/ccb07f0d-1530-00b0-244a-6332daffc2b9/dj.xnuhftrz.jpg/600x600bb.jpg",
    release_date: "1979-08-10",
    rank: 52
  },
  {
    id: 53,
    title: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b3/60/b6/b360b655-4d28-179d-d0d4-4e128ebdf4c9/13UAEIM19273.rgb.jpg/600x600bb.jpg",
    release_date: "1973-10-05",
    rank: 53
  },
  {
    id: 54,
    title: "Control",
    artist: "Janet Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ed/b0/20/edb02000-b77f-22f4-6b7f-c46f62d4517c/00602547592361.rgb.jpg/600x600bb.jpg",
    release_date: "1986-02-04",
    rank: 54
  },
  {
    id: 55,
    title: "Live at the Apollo",
    artist: "James Brown",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/e7/41/db/e741dbd4-3795-8eef-969c-546ff7c5b1a8/00602537429806.rgb.jpg/600x600bb.jpg",
    release_date: "1963-01-01",
    rank: 55
  },
  {
    id: 56,
    title: "Catch a Fire",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/25/b3/cd/25b3cd5f-2e29-8c3f-68ed-677786a7d55a/06UMGIM06492.rgb.jpg/600x600bb.jpg",
    release_date: "1973-04-13",
    rank: 56
  },
  {
    id: 57,
    title: "Late Registration",
    artist: "Kanye West",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0e/90/3c/0e903c43-9d81-f91b-90f1-727a58f7fb2c/00602498824030.rgb.jpg/600x600bb.jpg",
    release_date: "2005-08-30",
    rank: 57
  },
  {
    id: 58,
    title: "Graceland",
    artist: "Paul Simon",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a7/73/c1/a773c1f0-281c-324c-204f-540444080ea8/886443445697.jpg/600x600bb.jpg",
    release_date: "1986-08-25",
    rank: 58
  },
  {
    id: 59,
    title: "The Doors",
    artist: "The Doors",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/97/e2/ce/97e2ce16-02e1-54f6-3896-dcc55249ff7d/603497838738.jpg/600x600bb.jpg",
    release_date: "1967-01-04",
    rank: 59
  },
  {
    id: 60,
    title: "1999",
    artist: "Prince",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/ae/2c/7b/ae2c7bdd-477a-cd69-585b-2f3b5773d3de/886448937784.jpg/600x600bb.jpg",
    release_date: "1982-10-27",
    rank: 60
  },
  {
    id: 61,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/78/07/35/78073533-a113-170d-bfab-acc3cec405d1/00602567238218.rgb.jpg/600x600bb.jpg",
    release_date: "1999-02-23",
    rank: 61
  },
  {
    id: 62,
    title: "Disintegration",
    artist: "The Cure",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/93/3c/2c/mzi.ujtdsknz.jpg/600x600bb.jpg",
    release_date: "1989-05-02",
    rank: 62
  },
  {
    id: 63,
    title: "Paid in Full",
    artist: "Eric B. & Rakim",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/13/11/10/13111001-0c28-9fd7-9d50-194e72e23f53/00602547742254.rgb.jpg/600x600bb.jpg",
    release_date: "1987-07-07",
    rank: 63
  },
  {
    id: 64,
    title: "Electric Ladyland",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/b8/45/a6b84589-6ff7-a462-9ff9-170b724980d5/dj.wjkdwlks.jpg/600x600bb.jpg",
    release_date: "1968-10-16",
    rank: 64
  },
  {
    id: 65,
    title: "Bridge Over Troubled Water",
    artist: "Simon & Garfunkel",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a3/84/0a/a3840a6d-44e8-0afe-fc3e-316c517dddfe/5099749521421.jpg/600x600bb.jpg",
    release_date: "1970-01-26",
    rank: 65
  },
  {
    id: 66,
    title: "Back to Black",
    artist: "Amy Winehouse",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/cf/3f/09/cf3f0994-980d-d8ed-088d-ae89af256b73/15UMGIM24224.rgb.jpg/600x600bb.jpg",
    release_date: "2006-10-27",
    rank: 66
  },
  {
    id: 67,
    title: "Paranoid",
    artist: "Black Sabbath",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/be/27/91/be279120-2285-16c6-c7ba-9d6643d4a948/075992732727.jpg/600x600bb.jpg",
    release_date: "1970-09-18",
    rank: 67
  },
  {
    id: 68,
    title: "Star Time",
    artist: "James Brown",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/14/5b/1c/145b1cc1-3c63-7385-500e-c6ed8b190c3b/06UMGIM18886.rgb.jpg/600x600bb.jpg",
    release_date: "1991-03-05",
    rank: 68
  },
  {
    id: 69,
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/aa/e0/ab/aae0ab6a-d906-a189-81bf-70b56aa43f7a/886445635843.jpg/600x600bb.jpg",
    release_date: "1975-09-12",
    rank: 69
  },
  {
    id: 70,
    title: "Superfly",
    artist: "Curtis Mayfield",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c4/34/f0/c434f094-4c7e-3c62-8f15-cd02028e1ce7/603497885978.jpg/600x600bb.jpg",
    release_date: "1972-07-11",
    rank: 70
  },
  {
    id: 71,
    title: "Kid A",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/8e/13/bd8e1358-b367-a689-cb84-cebd0b067dc4/634904078263.png/600x600bb.jpg",
    release_date: "2000-10-02",
    rank: 71
  },
  {
    id: 72,
    title: "The Wall",
    artist: "Pink Floyd",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/17/ec/3e17ec6d-f980-c64f-19e0-a6fd8bbf0c10/886445635850.jpg/600x600bb.jpg",
    release_date: "1979-11-30",
    rank: 72
  },
  {
    id: 73,
    title: "Straight Outta Compton",
    artist: "N.W.A",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/4c/b1/32/4cb13290-7d01-1949-57e9-a8a1874e60a2/19UMGIM79184.rgb.jpg/600x600bb.jpg",
    release_date: "1988-08-08",
    rank: 73
  },
  {
    id: 74,
    title: "What's the Story Morning Glory?",
    artist: "Oasis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/2e/cb/342ecb17-ef19-816a-4ce5-e60b9ceec161/5051961073164.jpg/600x600bb.jpg",
    release_date: "1995-10-02",
    rank: 74
  },
  {
    id: 75,
    title: "Led Zeppelin",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4c/7b/80/4c7b80b4-ed35-4e06-ec80-2f7aaaabb5c5/dj.pjjmtwdc.jpg/600x600bb.jpg",
    release_date: "1969-01-12",
    rank: 75
  },
  {
    id: 76,
    title: "Talking Book",
    artist: "Stevie Wonder",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/62/61/61/626161c0-f4d7-e6ff-8586-768340ef278f/00602537002382.rgb.jpg/600x600bb.jpg",
    release_date: "1972-10-28",
    rank: 76
  },
  {
    id: 77,
    title: "Dusty in Memphis",
    artist: "Dusty Springfield",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/06/e8/3d/mzi.ckgjvgxx.jpg/600x600bb.jpg",
    release_date: "1969-03-18",
    rank: 77
  },
  {
    id: 78,
    title: "Good Kid, M.A.A.D City",
    artist: "Kendrick Lamar",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/36/86/ec/3686ec99-dec4-0a01-8b74-2d8a9a0263a7/12UMGIM52988.rgb.jpg/600x600bb.jpg",
    release_date: "2012-10-22",
    rank: 78
  },
  {
    id: 79,
    title: "Modern Sounds in Country and Western Music",
    artist: "Ray Charles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/11/38/8f/11388f60-526a-06e6-9c84-40404508fce6/4334.jpg/600x600bb.jpg",
    release_date: "1962-04-01",
    rank: 79
  },
  {
    id: 80,
    title: "Raising Hell",
    artist: "Run-D.M.C.",
    cover_url: "",
    release_date: "1986-05-15",
    rank: 80
  },
  {
    id: 81,
    title: "Physical Graffiti",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/82/6c/5d/826c5d66-67b7-62f2-4d78-dd3c7b415e08/dj.pifhrvpa.jpg/600x600bb.jpg",
    release_date: "1975-02-24",
    rank: 81
  },
  {
    id: 82,
    title: "In the Wee Small Hours",
    artist: "Frank Sinatra",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/97/a7/42/97a7424f-8161-052f-ce3c-93730c2d30de/14UMGIM32540.rgb.jpg/600x600bb.jpg",
    release_date: "1955-04-25",
    rank: 82
  },
  {
    id: 83,
    title: "Like a Prayer",
    artist: "Madonna",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/20/3c/f5/203cf53d-689e-528f-29d7-ba33758254aa/mzi.rotbotfl.jpg/600x600bb.jpg",
    release_date: "1989-03-21",
    rank: 83
  },
  {
    id: 84,
    title: "It Takes a Nation of Millions to Hold Us Back",
    artist: "Public Enemy",
    cover_url: "",
    release_date: "1988-04-14",
    rank: 84
  },
  {
    id: 85,
    title: "There's a Riot Goin' On",
    artist: "Sly and the Family Stone",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/01/9f/91019f68-fbc9-5620-d49a-88043d75371e/828767591124.jpg/600x600bb.jpg",
    release_date: "1971-11-01",
    rank: 85
  },
  {
    id: 86,
    title: "At Fillmore East",
    artist: "The Allman Brothers Band",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/78/7a/92/787a929d-abd8-ca82-f908-c3509aabdc24/06UMGIM10914.rgb.jpg/600x600bb.jpg",
    release_date: "1971-07-01",
    rank: 86
  },
  {
    id: 87,
    title: "Jagged Little Pill",
    artist: "Alanis Morissette",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/e0/b7/d1/e0b7d17a-50ea-8ae0-780a-8b0208901147/075679834683.jpg/600x600bb.jpg",
    release_date: "1995-06-13",
    rank: 87
  },
  {
    id: 88,
    title: "Station to Station",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/91/d8/47/91d847ac-8e39-85b0-36a6-ab3b8db46803/190295990268.jpg/600x600bb.jpg",
    release_date: "1976-01-23",
    rank: 88
  },
  {
    id: 89,
    title: "The Low End Theory",
    artist: "A Tribe Called Quest",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/12/b4/0c/12b40cae-c845-1729-a374-cb5f3619d061/886446229980.jpg/600x600bb.jpg",
    release_date: "1991-09-24",
    rank: 89
  },
  {
    id: 90,
    title: "Otis Blue: Otis Redding Sings Soul",
    artist: "Otis Redding",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/29/46/1e/29461e3c-8402-b84c-6ba1-d9e892aedabe/603497982158.jpg/600x600bb.jpg",
    release_date: "1965-09-15",
    rank: 90
  },
  {
    id: 91,
    title: "Master of Puppets",
    artist: "Metallica",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/51/ba/0d/51ba0d6f-cf65-36ff-fb8b-6227da20f70f/Untitled_design.jpg/600x600bb.jpg",
    release_date: "1986-03-03",
    rank: 91
  },
  {
    id: 92,
    title: "Parallel Lines",
    artist: "Blondie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2f/0b/25/2f0b252d-838e-4f19-3c08-91e49b269564/15UMGIM18445.rgb.jpg/600x600bb.jpg",
    release_date: "1978-09-01",
    rank: 92
  },
  {
    id: 93,
    title: "Legend",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/cf/64/e5/cf64e5bf-0bb7-288e-b33a-58e1ea80a44a/24UMGIM03301.rgb.jpg/600x600bb.jpg",
    release_date: "1984-05-08",
    rank: 93
  },
  {
    id: 94,
    title: "Beggars Banquet",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a3/d1/78/a3d178a8-f1c2-c1c3-1c5d-d78ab3af9768/20UMGIM13726.rgb.jpg/600x600bb.jpg",
    release_date: "1968-12-06",
    rank: 94
  },
  {
    id: 95,
    title: "The Blueprint",
    artist: "Jay-Z",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/19/c0/e3/19c0e3b6-4c2f-17ee-2a4a-6e2208de8aa6/00857366006951.rgb.jpg/600x600bb.jpg",
    release_date: "2001-09-11",
    rank: 95
  },
  {
    id: 96,
    title: "Pearl",
    artist: "Janis Joplin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/16/9d/87/169d87fe-76ee-1c50-d186-14ac71ab237e/886443610538.jpg/600x600bb.jpg",
    release_date: "1971-01-11",
    rank: 96
  },
  {
    id: 97,
    title: "After the Gold Rush",
    artist: "Neil Young",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/88/9f/0a/889f0afc-ca89-5968-ef83-ab07f7184eb6/093624924753.jpg/600x600bb.jpg",
    release_date: "1970-09-19",
    rank: 97
  },
  {
    id: 98,
    title: "Hunky Dory",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f0/b9/68/f0b9680e-b028-b3d6-f793-7c268256499a/825646286034.jpg/600x600bb.jpg",
    release_date: "1971-12-17",
    rank: 98
  },
  {
    id: 99,
    title: "The Bends",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/a9/5c/1ba95cac-b245-d386-63fb-6b857aa9dce8/634904078065.png/600x600bb.jpg",
    release_date: "1995-03-13",
    rank: 99
  },
  {
    id: 100,
    title: "Stankonia",
    artist: "OutKast",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d6/21/fb/d621fbde-c099-6794-7102-2692f10c4dbb/886448814283.jpg/600x600bb.jpg",
    release_date: "2000-10-31",
    rank: 100
  },
  {
    id: 101,
    title: "The Queen Is Dead",
    artist: "The Smiths",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/e8/70/1ae870c3-b402-096b-c4c4-8022af5a2ed9/745099189662.jpg/600x600bb.jpg",
    release_date: "1986-06-16",
    rank: 101
  },
  {
    id: 102,
    title: "Court and Spark",
    artist: "Joni Mitchell",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/41/dc/bc/41dcbcc4-115b-7c60-cc8e-a1c1011d9d2a/603497833450.jpg/600x600bb.jpg",
    release_date: "1974-01-17",
    rank: 102
  },
  {
    id: 103,
    title: "Let's Get It On",
    artist: "Marvin Gaye",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/dc/fa/3a/dcfa3a34-a2eb-8144-7fda-b978b7afbe19/06UMGIM11335.rgb.jpg/600x600bb.jpg",
    release_date: "1973-08-28",
    rank: 103
  },
  {
    id: 104,
    title: "The Smiths",
    artist: "The Smiths",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/9d/b2/b0/9db2b04c-d7b2-050b-5c9e-4f64c6e03a3a/745099189228.jpg/600x600bb.jpg",
    release_date: "1984-02-20",
    rank: 104
  },
  {
    id: 105,
    title: "Midnight Marauders",
    artist: "A Tribe Called Quest",
    cover_url: "",
    release_date: "1993-11-09",
    rank: 105
  },
  {
    id: 106,
    title: "Fun House",
    artist: "The Stooges",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music6/v4/ea/84/3c/ea843cdb-04ca-63c1-dd30-ddf3a0b94ca9/075596066921.jpg/600x600bb.jpg",
    release_date: "1970-07-07",
    rank: 106
  },
  {
    id: 107,
    title: "Harvest",
    artist: "Neil Young",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/4b/c4/e04bc4e6-9d3a-0bab-c953-f139c72fd337/093624924722.jpg/600x600bb.jpg",
    release_date: "1972-02-14",
    rank: 107
  },
  {
    id: 108,
    title: "All Eyez on Me",
    artist: "2Pac",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/55/e5/7c/55e57cf2-8325-a088-7d54-3aeedad1143f/21UM1IM16263.rgb.jpg/600x600bb.jpg",
    release_date: "1996-02-13",
    rank: 108
  },
  {
    id: 109,
    title: "Damn",
    artist: "Kendrick Lamar",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg/600x600bb.jpg",
    release_date: "2017-04-14",
    rank: 109
  },
  {
    id: 110,
    title: "Substance",
    artist: "New Order",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/10/38/a1/1038a176-a759-df9a-6aa0-e8497bb0cfd0/190295211592.jpg/600x600bb.jpg",
    release_date: "1987-08-17",
    rank: 110
  },
  {
    id: 111,
    title: "Marquee Moon",
    artist: "Television",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1b/6a/c1/1b6ac100-8d0e-ec9d-4639-88b11ed2cdad/603497886029.jpg/600x600bb.jpg",
    release_date: "1977-02-08",
    rank: 111
  },
  {
    id: 112,
    title: "Unknown Pleasures",
    artist: "Joy Division",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/13/90/c0/1390c072-4249-3739-7b3d-fd73ee4a5698/825646562831.jpg/600x600bb.jpg",
    release_date: "1979-06-15",
    rank: 112
  },
  {
    id: 113,
    title: "Ten",
    artist: "Pearl Jam",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/16/9d/87/169d87fe-76ee-1c50-d186-14ac71ab237e/886443610538.jpg/600x600bb.jpg",
    release_date: "1991-08-27",
    rank: 113
  },
  {
    id: 114,
    title: "The Marshall Mathers LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ea/ac/03/eaac03e5-8e9d-847e-d5b9-af7dee6a970b/00606949063221.rgb.jpg/600x600bb.jpg",
    release_date: "2000-05-23",
    rank: 114
  },
  {
    id: 115,
    title: "Doolittle",
    artist: "Pixies",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f8/80/17/f8801798-6f7f-fa2a-446e-729a8b46e7ab/5014436905025.png/600x600bb.jpg",
    release_date: "1989-04-17",
    rank: 115
  },
  {
    id: 116,
    title: "Lady Soul",
    artist: "Aretha Franklin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/a7/ac/e3a7aca0-48e1-0882-8e25-3d68f7ba3a72/603497896646.jpg/600x600bb.jpg",
    release_date: "1968-01-22",
    rank: 116
  },
  {
    id: 117,
    title: "Transformer",
    artist: "Lou Reed",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/e7/69/2ae76967-b94e-3b80-a079-93202eeb6157/886445151930.jpg/600x600bb.jpg",
    release_date: "1972-11-08",
    rank: 117
  },
  {
    id: 118,
    title: "Channel Orange",
    artist: "Frank Ocean",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/42/62/50/426250f9-7e39-f907-687c-442caa436636/dj.nhptxziz.jpg/600x600bb.jpg",
    release_date: "2012-07-10",
    rank: 118
  },
  {
    id: 119,
    title: "Axis: Bold as Love",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/93/5d/c5/935dc5d5-a985-333d-0825-879ddb36e461/884977526585.jpg/600x600bb.jpg",
    release_date: "1967-12-01",
    rank: 119
  },
  {
    id: 120,
    title: "Surfer Rosa",
    artist: "Pixies",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/02/b8/eb/02b8eb75-56b5-8b0f-cd1a-558d7d506871/713746310325.jpg/600x600bb.jpg",
    release_date: "1988-03-21",
    rank: 120
  },
  {
    id: 121,
    title: "Led Zeppelin II",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/3d/bb/1a3dbb86-c1f8-737e-571f-d6b647a230be/dj.rhubuvkd.jpg/600x600bb.jpg",
    release_date: "1969-10-22",
    rank: 121
  },
  {
    id: 122,
    title: "Voodoo",
    artist: "D'Angelo",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e9/b9/9e/e9b99e73-58a5-1e31-f57c-b11e78419dcf/16UMGIM86249.rgb.jpg/600x600bb.jpg",
    release_date: "2000-01-25",
    rank: 122
  },
  {
    id: 123,
    title: "Blonde",
    artist: "Frank Ocean",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/aa/9f/21/aa9f2126-5745-4e74-b71f-e7a864c24cc8/886447159491.jpg/600x600bb.jpg",
    release_date: "2016-08-20",
    rank: 123
  },
  {
    id: 124,
    title: "In Utero",
    artist: "Nirvana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e3/20/03/e32003a4-99bc-1c70-40ba-001882f35dba/00602537526840.rgb.jpg/600x600bb.jpg",
    release_date: "1993-09-21",
    rank: 124
  },
  {
    id: 125,
    title: "3 Feet High and Rising",
    artist: "De La Soul",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/17/43/a2/1743a2ab-0630-6527-cca5-a73d855df4a1/810098505963.png/600x600bb.jpg",
    release_date: "1989-03-03",
    rank: 125
  },
  {
    id: 126,
    title: "Moondance",
    artist: "Van Morrison",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9a/c7/e2/9ac7e266-1f0d-997a-fe43-6741bc96eda6/081227963637.jpg/600x600bb.jpg",
    release_date: "1970-02-01",
    rank: 126
  },
  {
    id: 127,
    title: "Loaded",
    artist: "The Velvet Underground",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/87/7d/5e/877d5e8d-8aff-717f-576c-f237ee8d7a34/603497884575.jpg/600x600bb.jpg",
    release_date: "1970-11-01",
    rank: 127
  },
  {
    id: 128,
    title: "Definitely Maybe",
    artist: "Oasis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/00/af/e3/00afe365-35f8-04cb-379a-e12abead71cd/5051961070132.jpg/600x600bb.jpg",
    release_date: "1994-08-29",
    rank: 128
  },
  {
    id: 129,
    title: "Demon Days",
    artist: "Gorillaz",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1c/0f/81/1c0f818a-e458-dd84-6f1b-ccbdf5fe14d6/825646291045.jpg/600x600bb.jpg",
    release_date: "2005-05-23",
    rank: 129
  },
  {
    id: 130,
    title: "Rage Against the Machine",
    artist: "Rage Against the Machine",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music3/v4/b8/cd/b7/b8cdb739-8ae8-61e4-a68f-023fa2f2e872/TCMzp.png/600x600bb.jpg",
    release_date: "1992-11-03",
    rank: 130
  },
  {
    id: 131,
    title: "Bitches Brew",
    artist: "Miles Davis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9b/e1/63/9be1630c-486d-760c-76cf-04282174700a/074646577424.jpg/600x600bb.jpg",
    release_date: "1970-04-01",
    rank: 131
  },
  {
    id: 132,
    title: "Santana",
    artist: "Santana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bc/fd/23/bcfd234d-657d-3e51-b92d-762fb4301b6d/886444593021.jpg/600x600bb.jpg",
    release_date: "1969-08-30",
    rank: 132
  },
  {
    id: 133,
    title: "Siamese Dream",
    artist: "Smashing Pumpkins",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ad/6a/ee/ad6aeebf-6c80-fa75-beb3-f52d0bc7768e/19UMGIM59909.rgb.jpg/600x600bb.jpg",
    release_date: "1993-07-27",
    rank: 133
  },
  {
    id: 134,
    title: "Tommy",
    artist: "The Who",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f3/22/7f/f3227fd3-758e-2728-7db2-25b29373c8ae/18UMGIM35635.rgb.jpg/600x600bb.jpg",
    release_date: "1969-05-23",
    rank: 134
  },
  {
    id: 135,
    title: "Speakerboxxx/The Love Below",
    artist: "OutKast",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/71/ae/6a/71ae6a46-99a6-e9d8-d7f3-41c0f2df45c4/196872579123.jpg/600x600bb.jpg",
    release_date: "2003-09-23",
    rank: 135
  },
  {
    id: 136,
    title: "At Last!",
    artist: "Etta James",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/25/46/17/2546176c-0f7c-b1a0-20b8-5200ebc6c473/16UMGIM27321.rgb.jpg/600x600bb.jpg",
    release_date: "1960-11-15",
    rank: 136
  },
  {
    id: 137,
    title: "Here's Little Richard",
    artist: "Little Richard",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/6a/59/ba/6a59ba83-b62c-0aba-afdf-70112572352d/00888072025745.rgb.jpg/600x600bb.jpg",
    release_date: "1957-03-01",
    rank: 137
  },
  {
    id: 138,
    title: "Reasonable Doubt",
    artist: "Jay-Z",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d1/a9/bb/d1a9bbc1-2f5f-3dc9-0670-0a0ebe7341dd/24UMGIM95693.rgb.jpg/600x600bb.jpg",
    release_date: "1996-06-25",
    rank: 138
  },
  {
    id: 139,
    title: "Music from Big Pink",
    artist: "The Band",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/44/eb/9f/44eb9ffc-8e77-9a3d-8be7-8ca579de93cc/13UACIM30926.rgb.jpg/600x600bb.jpg",
    release_date: "1968-07-01",
    rank: 139
  },
  {
    id: 140,
    title: "Power, Corruption & Lies",
    artist: "New Order",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d2/3f/c8/d23fc8e7-3baa-eae3-7301-7a868d00ab09/825646053803.jpg/600x600bb.jpg",
    release_date: "1983-05-02",
    rank: 140
  },
  {
    id: 141,
    title: "Closer",
    artist: "Joy Division",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/d9/2a/d1/d92ad12e-cdf2-e567-9612-af2fdfa82237/dj.uzqznczn.jpg/600x600bb.jpg",
    release_date: "1980-07-18",
    rank: 141
  },
  {
    id: 142,
    title: "Dookie",
    artist: "Green Day",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/28/ed/a1/28eda132-ebb4-9d9c-676b-04d237e3a1a9/238719.jpg/600x600bb.jpg",
    release_date: "1994-02-01",
    rank: 142
  },
  {
    id: 143,
    title: "Post",
    artist: "Björk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/69/62/1c/69621c9a-514f-00cf-1de6-6e49f004fb28/075596174060.jpg/600x600bb.jpg",
    release_date: "1995-06-13",
    rank: 143
  },
  {
    id: 144,
    title: "Fear of a Black Planet",
    artist: "Public Enemy",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/da/ed/4f/daed4f89-7b14-e0b9-9c25-00f1dd7de9aa/659123518529.jpg/600x600bb.jpg",
    release_date: "1990-04-10",
    rank: 144
  },
  {
    id: 145,
    title: "Music",
    artist: "Madonna",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/1c/46/da/1c46da55-6dff-2c58-837e-bdd419ff9ca8/093624759829.jpg/600x600bb.jpg",
    release_date: "2000-09-18",
    rank: 145
  },
  {
    id: 146,
    title: "Super Fly",
    artist: "Curtis Mayfield",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c4/34/f0/c434f094-4c7e-3c62-8f15-cd02028e1ce7/603497885978.jpg/600x600bb.jpg",
    release_date: "1972-07-14",
    rank: 146
  },
  {
    id: 147,
    title: "Brothers in Arms",
    artist: "Dire Straits",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/bd/54/e8bd54fd-6595-4ebf-aa4c-58139ed316e6/dj.bngafruf.jpg/600x600bb.jpg",
    release_date: "1985-05-13",
    rank: 147
  },
  {
    id: 148,
    title: "The Score",
    artist: "Fugees",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0e/d1/5b/0ed15b14-271c-35d5-5909-49f18fbfb32b/886445600605.jpg/600x600bb.jpg",
    release_date: "1996-02-13",
    rank: 148
  },
  {
    id: 149,
    title: "MTV Unplugged in New York",
    artist: "Nirvana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/46/24/33/462433f9-ee74-2d60-4538-859826a7bed7/00720642472729.rgb.jpg/600x600bb.jpg",
    release_date: "1994-11-01",
    rank: 149
  },
  {
    id: 150,
    title: "Bad",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8d/97/f4/8d97f427-2d17-1a51-1714-324483eb5fc1/886443546264.jpg/600x600bb.jpg",
    release_date: "1987-08-31",
    rank: 150
  },
  {
    id: 151,
    title: "Weezer (Blue Album)",
    artist: "Weezer",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d0/16/da/d016da24-577e-b584-3a5a-116efb5ca362/16UMGIM52971.rgb.jpg/600x600bb.jpg",
    release_date: "1994-05-10",
    rank: 151
  },
  {
    id: 152,
    title: "Crosby, Stills & Nash",
    artist: "Crosby, Stills & Nash",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2e/94/48/2e94483a-cfac-1b06-e2bd-0f01a9341d1e/081227653767.jpg/600x600bb.jpg",
    release_date: "1969-05-29",
    rank: 152
  },
  {
    id: 153,
    title: "Elvis Presley",
    artist: "Elvis Presley",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c2/21/a8/c221a818-bc9f-675a-cecb-7dbc3bbe17a4/886444095242.jpg/600x600bb.jpg",
    release_date: "1956-03-23",
    rank: 153
  },
  {
    id: 154,
    title: "Daydream Nation",
    artist: "Sonic Youth",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9a/55/3b/9a553bab-12a5-a385-31b7-720087fa3130/818756010958_cover.jpg/600x600bb.jpg",
    release_date: "1988-10-18",
    rank: 154
  },
  {
    id: 155,
    title: "Meat Is Murder",
    artist: "The Smiths",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/74/1f/ff/741fff7e-e99e-757d-e600-e19d9df0d078/745099189563.jpg/600x600bb.jpg",
    release_date: "1985-02-11",
    rank: 155
  },
  {
    id: 156,
    title: "Born in the U.S.A.",
    artist: "Bruce Springsteen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/72/68/327268ba-b9dd-b322-2a16-bdd0212df48c/074643865326.jpg/600x600bb.jpg",
    release_date: "1984-06-04",
    rank: 156
  },
  {
    id: 157,
    title: "Astral Weeks",
    artist: "Van Morrison",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/88/91/1b/88911b7b-a63f-4624-3fb1-2976b628c59a/603497886340.jpg/600x600bb.jpg",
    release_date: "1968-11-01",
    rank: 157
  },
  {
    id: 158,
    title: "Murmur",
    artist: "R.E.M.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/6c/e2/c3/6ce2c349-4169-df92-e5ca-2faba4cf087f/09UMGIM13824.rgb.jpg/600x600bb.jpg",
    release_date: "1983-04-12",
    rank: 158
  },
  {
    id: 159,
    title: "In the Court of the Crimson King",
    artist: "King Crimson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/2f/c7/19/2fc71988-6871-be2c-6731-a3d0f2a6b232/Court_2500px.jpg/600x600bb.jpg",
    release_date: "1969-10-10",
    rank: 159
  },
  {
    id: 160,
    title: "Homogenic",
    artist: "Björk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/80/01/7e/mzi.jmcslmlj.jpg/600x600bb.jpg",
    release_date: "1997-09-22",
    rank: 160
  },
  {
    id: 161,
    title: "Nothing's Shocking",
    artist: "Jane's Addiction",
    cover_url: "",
    release_date: "1988-08-23",
    rank: 161
  },
  {
    id: 162,
    title: "Exodus",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/23/fa/f8/23faf820-c4fa-2bf1-d672-846971f5cf5c/06UMGIM31355.rgb.jpg/600x600bb.jpg",
    release_date: "1977-06-03",
    rank: 162
  },
  {
    id: 163,
    title: "The Freewheelin' Bob Dylan",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/63/3c/98/633c98ab-b4f3-3f40-798b-bdb49d923468/074640878626.jpg/600x600bb.jpg",
    release_date: "1963-05-27",
    rank: 163
  },
  {
    id: 164,
    title: "Meat Loaf - Bat Out of Hell",
    artist: "Meat Loaf",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cd/90/b5/cd90b5c4-9379-92ae-da01-4b27ea00697b/886443775787.jpg/600x600bb.jpg",
    release_date: "1977-10-21",
    rank: 164
  },
  {
    id: 165,
    title: "Synchronicity",
    artist: "The Police",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a4/67/ba/a467ba62-87df-9d10-98d2-c517f68ac870/16UMGIM60882.rgb.jpg/600x600bb.jpg",
    release_date: "1983-06-17",
    rank: 165
  },
  {
    id: 166,
    title: "Licensed to Ill",
    artist: "Beastie Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e4/d7/81/e4d781e8-bd3f-486a-cd18-e9b3a7d12b34/00731452735126.rgb.jpg/600x600bb.jpg",
    release_date: "1986-11-15",
    rank: 166
  },
  {
    id: 167,
    title: "Odelay",
    artist: "Beck",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/7f/cd/e2/7fcde2a5-93be-d7ed-a015-6969298b5d96/19UM1IM00477.rgb.jpg/600x600bb.jpg",
    release_date: "1996-06-18",
    rank: 167
  },
  {
    id: 168,
    title: "The Soft Bulletin",
    artist: "The Flaming Lips",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/da/cc/ca/dacccae4-4f00-f451-6051-46d04a7d5099/093624911791.jpg/600x600bb.jpg",
    release_date: "1999-05-17",
    rank: 168
  },
  {
    id: 169,
    title: "Ray of Light",
    artist: "Madonna",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/dd/2b/8d/dd2b8d84-e032-94d2-473a-3f8efd18fe36/dj.rwfgroxa.jpg/600x600bb.jpg",
    release_date: "1998-03-03",
    rank: 169
  },
  {
    id: 170,
    title: "Dig Me Out",
    artist: "Sleater-Kinney",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2f/ad/dd/2fadddc8-116d-bc4a-0fbb-77d493a5681c/SleaterKinney_DigMeOut_1425.jpg/600x600bb.jpg",
    release_date: "1997-04-08",
    rank: 170
  },
  {
    id: 171,
    title: "The Stranger",
    artist: "Billy Joel",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/37/68/4c/37684c52-dbdf-9bfe-0d87-07492f43dc4c/dj.gmcbwich.jpg/600x600bb.jpg",
    release_date: "1977-09-29",
    rank: 171
  },
  {
    id: 172,
    title: "Dig Your Own Hole",
    artist: "The Chemical Brothers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/54/c6/e4/54c6e459-524b-790c-80d6-5dee6cde1633/00724384295059.jpg/600x600bb.jpg",
    release_date: "1997-04-07",
    rank: 172
  },
  {
    id: 173,
    title: "Paul's Boutique",
    artist: "Beastie Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e4/d7/81/e4d781e8-bd3f-486a-cd18-e9b3a7d12b34/00731452735126.rgb.jpg/600x600bb.jpg",
    release_date: "1989-07-25",
    rank: 173
  },
  {
    id: 174,
    title: "Bringing It All Back Home",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/ad/46/61ad469e-1e2d-da3c-6847-b939c07924f9/074640912825.jpg/600x600bb.jpg",
    release_date: "1965-03-22",
    rank: 174
  },
  {
    id: 175,
    title: "American Idiot",
    artist: "Green Day",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/6c/e2/d0/6ce2d0d8-39a1-4691-1496-1de687b7f9a1/mzi.gtvcisvd.jpg/600x600bb.jpg",
    release_date: "2004-09-21",
    rank: 175
  },
  {
    id: 176,
    title: "Black Sabbath",
    artist: "Black Sabbath",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/62/8a/3d/628a3dc3-c862-8641-6306-64d7e7e8960a/075992718523.jpg/600x600bb.jpg",
    release_date: "1970-02-13",
    rank: 176
  },
  {
    id: 177,
    title: "Violent Femmes",
    artist: "Violent Femmes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/4e/9e/fd/4e9efd70-0497-a149-61d7-9a74de72ba16/21CRGIM28264.rgb.jpg/600x600bb.jpg",
    release_date: "1983-04-01",
    rank: 177
  },
  {
    id: 178,
    title: "Head Hunters",
    artist: "Herbie Hancock",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/e5/f5/4fe5f511-462e-e87b-0711-d4e42809fb17/dj.goshfswo.jpg/600x600bb.jpg",
    release_date: "1973-10-26",
    rank: 178
  },
  {
    id: 179,
    title: "So",
    artist: "Peter Gabriel",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/29/d7/7d/29d77d60-24b8-f45b-936f-d8cf3ce52d8d/884108003503.jpg/600x600bb.jpg",
    release_date: "1986-05-19",
    rank: 179
  },
  {
    id: 180,
    title: "Back in Black",
    artist: "AC/DC",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1e/14/58/1e145814-281a-58e0-3ab1-145f5d1af421/886443673441.jpg/600x600bb.jpg",
    release_date: "1980-07-25",
    rank: 180
  },
  {
    id: 181,
    title: "Loveless",
    artist: "My Bloody Valentine",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f9/7e/6b/f97e6b94-f307-ae7f-e94c-d74860a44350/887830016094.png/600x600bb.jpg",
    release_date: "1991-11-04",
    rank: 181
  },
  {
    id: 182,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/78/07/35/78073533-a113-170d-bfab-acc3cec405d1/00602567238218.rgb.jpg/600x600bb.jpg",
    release_date: "1999-02-23",
    rank: 182
  },
  {
    id: 183,
    title: "Discovery",
    artist: "Daft Punk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/4a/77/fd4a77db-0ebc-d043-41a2-f32fa1bb0fb4/dj.qrikkdwj.jpg/600x600bb.jpg",
    release_date: "2001-03-12",
    rank: 183
  },
  {
    id: 184,
    title: "White Light/White Heat",
    artist: "The Velvet Underground",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/ee/ac/91/eeac9154-5178-ebbc-be57-81bfb11f8ce7/00602537589678.rgb.jpg/600x600bb.jpg",
    release_date: "1968-01-30",
    rank: 184
  },
  {
    id: 185,
    title: "Layla and Other Assorted Love Songs",
    artist: "Derek and the Dominos",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/89/ed/29/89ed29be-8412-0b5a-1df0-295fb5337dd6/00600753314289.rgb.jpg/600x600bb.jpg",
    release_date: "1970-11-09",
    rank: 185
  },
  {
    id: 186,
    title: "Is This It",
    artist: "The Strokes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8a/90/df/8a90dff0-73c6-c483-ab79-6810308414a2/884977195552.jpg/600x600bb.jpg",
    release_date: "2001-07-30",
    rank: 186
  },
  {
    id: 187,
    title: "Tragic Kingdom",
    artist: "No Doubt",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fe/0a/68/fe0a687a-537e-e902-0778-90465c118f77/00602547870575.rgb.jpg/600x600bb.jpg",
    release_date: "1995-10-10",
    rank: 187
  },
  {
    id: 188,
    title: "Elephant",
    artist: "The White Stripes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/48/b5/b9/48b5b90e-ba1e-08ff-1217-9e479afdad5d/196589901750.jpg/600x600bb.jpg",
    release_date: "2003-04-01",
    rank: 188
  },
  {
    id: 189,
    title: "Funeral",
    artist: "Arcade Fire",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2b/09/6e/2b096e8c-ae65-fc42-a4b1-19abb4100433/886446576442.jpg/600x600bb.jpg",
    release_date: "2004-09-14",
    rank: 189
  },
  {
    id: 190,
    title: "Songs for the Deaf",
    artist: "Queens of the Stone Age",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ee/48/7e/ee487e5e-dbfb-e54d-e967-b0e3f7b4cfef/00602517417199.rgb.jpg/600x600bb.jpg",
    release_date: "2002-08-27",
    rank: 190
  },
  {
    id: 191,
    title: "American Beauty",
    artist: "Grateful Dead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f5/27/20/f5272061-2466-6375-c2d1-f20d14be569f/603497920952.jpg/600x600bb.jpg",
    release_date: "1970-11-01",
    rank: 191
  },
  {
    id: 192,
    title: "Whatever People Say I Am, That's What I'm Not",
    artist: "Arctic Monkeys",
    cover_url: "",
    release_date: "2006-01-23",
    rank: 192
  },
  {
    id: 193,
    title: "Turn on the Bright Lights",
    artist: "Interpol",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/be/ef/aa/beefaad1-64ba-1288-d2ce-95a5964a020b/744861054566.png/600x600bb.jpg",
    release_date: "2002-08-20",
    rank: 193
  },
  {
    id: 194,
    title: "Rust Never Sleeps",
    artist: "Neil Young & Crazy Horse",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/9a/65/18/9a6518c2-850f-f40a-5bad-540a9ef4ad70/093624924708.jpg/600x600bb.jpg",
    release_date: "1979-06-22",
    rank: 194
  },
  {
    id: 195,
    title: "Darkness on the Edge of Town",
    artist: "Bruce Springsteen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b3/13/4e/b3134ed3-a05d-d3b2-8f96-8cddd067aa32/884977798753.jpg/600x600bb.jpg",
    release_date: "1978-06-02",
    rank: 195
  },
  {
    id: 196,
    title: "Random Access Memories",
    artist: "Daft Punk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/43/5f/e8435ffa-b6b9-b171-40ab-4ff3959ab661/886443919266.jpg/600x600bb.jpg",
    release_date: "2013-05-17",
    rank: 196
  },
  {
    id: 197,
    title: "Fresh Fruit for Rotting Vegetables",
    artist: "Dead Kennedys",
    cover_url: "",
    release_date: "1980-09-02",
    rank: 197
  },
  {
    id: 198,
    title: "In Rainbows",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/600x600bb.jpg",
    release_date: "2007-10-10",
    rank: 198
  },
  {
    id: 199,
    title: "Aladdin Sane",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/aa/3e/32aa3eeb-830e-e378-dd40-ac2b701066d8/825646123582.jpg/600x600bb.jpg",
    release_date: "1973-04-13",
    rank: 199
  },
  {
    id: 200,
    title: "Alive!",
    artist: "Kiss",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ea/70/91/ea70918a-2d22-7bab-35ec-24c890880d12/06UMGIM02296.rgb.jpg/600x600bb.jpg",
    release_date: "1975-09-10",
    rank: 200
  },
  {
    id: 201,
    title: "Young Americans",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/0a/a7/0c/0aa70c09-e325-3900-6a5e-1557ff7ce710/190295990329.jpg/600x600bb.jpg",
    release_date: "1975-03-07",
    rank: 201
  },
  {
    id: 202,
    title: "Houses of the Holy",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/88/ad/4f88ad28-3953-fded-6c18-fe87b5d0dc7b/dj.iqdrlirx.jpg/600x600bb.jpg",
    release_date: "1973-03-28",
    rank: 202
  },
  {
    id: 203,
    title: "21",
    artist: "Adele",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/e3/f9/d8e3f9ea-d6fe-9a1b-9f13-109983d3062e/191404113868.png/600x600bb.jpg",
    release_date: "2011-01-19",
    rank: 203
  },
  {
    id: 204,
    title: "Thriller (25th Anniversary Edition)",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b5/58/d3/b558d32f-24fd-c889-d544-bc4c96f6113e/dj.oinzmlgt.jpg/600x600bb.jpg",
    release_date: "2008-02-08",
    rank: 204
  },
  {
    id: 205,
    title: "Songs of Leonard Cohen",
    artist: "Leonard Cohen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d8/5a/08/d85a084b-2295-680e-871f-226daa83de5c/196873434049.jpg/600x600bb.jpg",
    release_date: "1967-12-27",
    rank: 205
  },
  {
    id: 206,
    title: "Only Built 4 Cuban Linx...",
    artist: "Raekwon",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/8e/fb/f2/8efbf20d-84d2-5b34-f617-6a026e1bacee/05099996879351.jpg/600x600bb.jpg",
    release_date: "1995-08-01",
    rank: 206
  },
  {
    id: 207,
    title: "Mezzanine",
    artist: "Massive Attack",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8a/c1/04/8ac104fb-d37e-1433-5d2e-805710d7a7c4/00602567930983.rgb.jpg/600x600bb.jpg",
    release_date: "1998-04-20",
    rank: 207
  },
  {
    id: 208,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/78/07/35/78073533-a113-170d-bfab-acc3cec405d1/00602567238218.rgb.jpg/600x600bb.jpg",
    release_date: "1999-02-23",
    rank: 208
  },
  {
    id: 209,
    title: "John Lennon/Plastic Ono Band",
    artist: "John Lennon",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/48/53/43/485343e3-dd6a-0034-faec-f4b6403f8108/13UMGIM63890.rgb.jpg/600x600bb.jpg",
    release_date: "1970-12-11",
    rank: 209
  },
  {
    id: 210,
    title: "Mellon Collie and the Infinite Sadness",
    artist: "Smashing Pumpkins",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/7e/3b/91/7e3b9146-cce2-0326-40db-854eacac9668/25UM2IM05245.rgb.jpg/600x600bb.jpg",
    release_date: "1995-10-24",
    rank: 210
  },
  {
    id: 211,
    title: "Pretzel Logic",
    artist: "Steely Dan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/49/6e/70/496e703c-f15e-8e95-821c-f94fac1f4c8e/23UMGIM50278.rgb.jpg/600x600bb.jpg",
    release_date: "1974-02-20",
    rank: 211
  },
  {
    id: 212,
    title: "Kick",
    artist: "INXS",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/04/ca/65/04ca65d0-c796-3f9b-0446-f013dfc1a8d9/603497838899.jpg/600x600bb.jpg",
    release_date: "1987-10-19",
    rank: 212
  },
  {
    id: 213,
    title: "Mama Said Knock You Out",
    artist: "LL Cool J",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/c7/e2/fe/c7e2feff-9ae5-3090-87c9-77bfb6940d9a/20UMGIM39999.rgb.jpg/600x600bb.jpg",
    release_date: "1990-09-04",
    rank: 213
  },
  {
    id: 214,
    title: "Aja",
    artist: "Steely Dan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c2/3c/54/c23c5414-20d1-7aea-f0f5-187974c58d65/23UMGIM79990.rgb.jpg/600x600bb.jpg",
    release_date: "1977-09-23",
    rank: 214
  },
  {
    id: 215,
    title: "Goo",
    artist: "Sonic Youth",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ec/b5/df/ecb5dfa7-e50f-d44e-eef0-9a4c38abc76f/00602547570017.rgb.jpg/600x600bb.jpg",
    release_date: "1990-06-26",
    rank: 215
  },
  {
    id: 216,
    title: "The College Dropout",
    artist: "Kanye West",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/15/05/09/15050911-a2f1-9ebc-0d16-6e8faad1cf80/00602567924326.rgb.jpg/600x600bb.jpg",
    release_date: "2004-02-10",
    rank: 216
  },
  {
    id: 217,
    title: "Pleased to Meet Me",
    artist: "The Replacements",
    cover_url: "",
    release_date: "1987-04-28",
    rank: 217
  },
  {
    id: 218,
    title: "Thirteen",
    artist: "Big Star",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/a5/7e/f7a57efe-0099-728d-de70-7527d91b954e/cover.jpg/600x600bb.jpg",
    release_date: "1972-07-01",
    rank: 218
  },
  {
    id: 219,
    title: "Let It Be",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5f/ff/9a/5fff9a6a-bb13-6507-5e68-2793ef798834/21UMGIM61121.rgb.jpg/600x600bb.jpg",
    release_date: "1970-05-08",
    rank: 219
  },
  {
    id: 220,
    title: "Thriller",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
    release_date: "1982-11-30",
    rank: 220
  },
  {
    id: 221,
    title: "Dirty Mind",
    artist: "Prince",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a9/96/58/a99658ea-7ce5-fd87-d0c7-f755782efdb5/cover.jpg/600x600bb.jpg",
    release_date: "1980-10-08",
    rank: 221
  },
  {
    id: 222,
    title: "Yankee Hotel Foxtrot",
    artist: "Wilco",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/b5/81/1c/b5811ceb-55f0-a751-d95e-3891021c7125/artwork.jpg/600x600bb.jpg",
    release_date: "2002-04-23",
    rank: 222
  },
  {
    id: 223,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/a3/20/20/a3202033-3d92-2267-eab4-9a87ec1aa95e/710423.jpg/600x600bb.jpg",
    release_date: "1987-07-21",
    rank: 223
  },
  {
    id: 224,
    title: "Red Headed Stranger",
    artist: "Willie Nelson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/88/d6/67/88d6676e-67ce-f907-d4fe-eae50f805f63/074643348225.jpg/600x600bb.jpg",
    release_date: "1975-05-01",
    rank: 224
  },
  {
    id: 225,
    title: "Entertainment!",
    artist: "Gang of Four",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/86/8e/e9/868ee973-0caf-a663-9d4f-58ff57c104da/191401174275.png/600x600bb.jpg",
    release_date: "1979-09-01",
    rank: 225
  },
  {
    id: 226,
    title: "Trans-Europe Express",
    artist: "Kraftwerk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/80/bc/e280bcf9-4048-8c42-2b6b-d8b9c9bbed52/5099996602058_1500x1500_300dpi.jpg/600x600bb.jpg",
    release_date: "1977-03-01",
    rank: 226
  },
  {
    id: 227,
    title: "Hello Nasty",
    artist: "Beastie Boys",
    cover_url: "",
    release_date: "1998-07-14",
    rank: 227
  },
  {
    id: 228,
    title: "The Suburbs",
    artist: "Arcade Fire",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ea/9f/1a/ea9f1ab0-4cac-c925-590d-14461f676912/886446576510.jpg/600x600bb.jpg",
    release_date: "2010-08-02",
    rank: 228
  },
  {
    id: 229,
    title: "Hot Fuss",
    artist: "The Killers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/1a/5a/071a5aee-6e42-060c-35b9-6a6e45b9ea59/06UMGIM10441.rgb.jpg/600x600bb.jpg",
    release_date: "2004-06-15",
    rank: 229
  },
  {
    id: 230,
    title: "Room on Fire",
    artist: "The Strokes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/e5/87/60/e5876016-d748-6454-fdb5-f81dfe8aefa1/193428820173.jpg/600x600bb.jpg",
    release_date: "2003-10-28",
    rank: 230
  },
  {
    id: 231,
    title: "Currents",
    artist: "Tame Impala",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/64/48/5c/64485cc9-968c-68cc-764e-9a7c71733def/00602567155454.rgb.jpg/600x600bb.jpg",
    release_date: "2015-07-17",
    rank: 231
  },
  {
    id: 232,
    title: "Dummy",
    artist: "Portishead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c1/71/93/c1719342-df7d-e9c5-c87c-53dae5afb289/00042282855329.rgb.jpg/600x600bb.jpg",
    release_date: "1994-08-22",
    rank: 232
  },
  {
    id: 233,
    title: "Silent Alarm",
    artist: "Bloc Party",
    cover_url: "",
    release_date: "2005-02-14",
    rank: 233
  },
  {
    id: 234,
    title: "The Colour of Spring",
    artist: "Talk Talk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/98/0f/9b/980f9bcc-f049-f0e9-a762-46578ad0adf0/dj.ahsuktom.jpg/600x600bb.jpg",
    release_date: "1986-02-24",
    rank: 234
  },
  {
    id: 235,
    title: "Abraxas",
    artist: "Santana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/30/03/7f/30037fd6-3292-1806-c806-5341391c9aac/886444593038.jpg/600x600bb.jpg",
    release_date: "1970-09-23",
    rank: 235
  },
  {
    id: 236,
    title: "Rust Never Sleeps",
    artist: "Neil Young",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/9a/65/18/9a6518c2-850f-f40a-5bad-540a9ef4ad70/093624924708.jpg/600x600bb.jpg",
    release_date: "1979-07-02",
    rank: 236
  },
  {
    id: 237,
    title: "Rated R",
    artist: "Queens of the Stone Age",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/85/72/ed/8572ed39-4646-98de-4657-a49526a07590/191401176859.png/600x600bb.jpg",
    release_date: "2000-06-06",
    rank: 237
  },
  {
    id: 238,
    title: "I Am...",
    artist: "Nas",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d0/88/20/d0882040-a591-c85e-fa24-87a6edbf6a39/074646975329.jpg/600x600bb.jpg",
    release_date: "1999-04-06",
    rank: 238
  },
  {
    id: 239,
    title: "You're Living All Over Me",
    artist: "Dinosaur Jr.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9c/73/59/9c73597a-d4fd-6726-4524-ad87333fe2b9/cover.jpg/600x600bb.jpg",
    release_date: "1987-07-01",
    rank: 239
  },
  {
    id: 240,
    title: "Sam Cooke at the Copa",
    artist: "Sam Cooke",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/47/4d/00/474d0063-12a9-d94b-0cb0-b8baa5e04343/15ABKIM00034.rgb.jpg/600x600bb.jpg",
    release_date: "1964-10-01",
    rank: 240
  },
  {
    id: 241,
    title: "Technique",
    artist: "New Order",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/49/51/83/4951838a-1b2f-35c3-3984-89e87f288288/825646051021.jpg/600x600bb.jpg",
    release_date: "1989-01-30",
    rank: 241
  },
  {
    id: 242,
    title: "Remain in Light",
    artist: "Talking Heads",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/87/5f/5b/mzi.zzquknhm.jpg/600x600bb.jpg",
    release_date: "1980-10-08",
    rank: 242
  },
  {
    id: 243,
    title: "Maggot Brain",
    artist: "Funkadelic",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/0e/1e/49/0e1e494b-c07d-e61a-5d0a-7aa14fa9b15d/0.jpg/600x600bb.jpg",
    release_date: "1971-07-12",
    rank: 243
  },
  {
    id: 244,
    title: "Stop Making Sense",
    artist: "Talking Heads",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/57/94/37/57943788-4a20-07db-1ed9-1fd526a7d0f4/mzi.wfxekfgc.jpg/600x600bb.jpg",
    release_date: "1984-10-01",
    rank: 244
  },
  {
    id: 245,
    title: "Fever to Tell",
    artist: "Yeah Yeah Yeahs",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ee/b8/cb/eeb8cb4f-61a5-e7da-a3d1-67e65d5002bb/859773286483_cover.jpg/600x600bb.jpg",
    release_date: "2003-04-28",
    rank: 245
  },
  {
    id: 246,
    title: "The Band",
    artist: "The Band",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ca/b2/06/cab20688-46b7-e7be-c64a-dbbeeb2fc864/15UMGIM06558.rgb.jpg/600x600bb.jpg",
    release_date: "1969-09-22",
    rank: 246
  },
  {
    id: 247,
    title: "Feels Like Home",
    artist: "Norah Jones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/32/0a/e6/320ae656-e1d6-a49d-eead-06a84d3987ce/19UMGIM49910.rgb.jpg/600x600bb.jpg",
    release_date: "2004-02-10",
    rank: 247
  },
  {
    id: 248,
    title: "Buena Vista Social Club",
    artist: "Buena Vista Social Club",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/93/8b/5a938b3e-a74d-9c8b-dcf1-c9c1f83498da/4050538455618.jpg/600x600bb.jpg",
    release_date: "1997-09-16",
    rank: 248
  },
  {
    id: 249,
    title: "Spirit of Eden",
    artist: "Talk Talk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/36/84/e8/3684e84e-5b87-f5d3-3e93-500c9807aefd/724385712951.jpg/600x600bb.jpg",
    release_date: "1988-09-12",
    rank: 249
  },
  {
    id: 250,
    title: "Hounds of Love",
    artist: "Kate Bush",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/62/97/32/62973286-5bb3-0de7-c051-8b2de8d95472/cover.jpg/600x600bb.jpg",
    release_date: "1985-09-16",
    rank: 250
  }
];

// Helper function to get album by ID
function getAlbumById(id) {
  return ALBUMS_DATA.find(album => album.id === id);
}

// Helper function to get albums by rank range
function getAlbumsByRankRange(start, end) {
  return ALBUMS_DATA.filter(album => album.rank >= start && album.rank <= end);
}
