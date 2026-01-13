// Rolling Stone Top 500 Albums Data
// Based on Rolling Stone's "500 Greatest Albums of All Time" list
// Last updated: 2026-01-12
// Cover art and audio previews from iTunes

const ALBUMS_DATA = [
  {
    id: 1,
    title: "What's Going On",
    artist: "Marvin Gaye",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/76/36/2d/76362d74-cb7a-8ef9-104e-cde1d858e9a9/20UMGIM95279.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/08/f3/f4/08f3f452-b24f-e25b-92bc-15850f1bdc6a/mzaf_14002930736666872327.plus.aac.p.m4a",
    release_date: "1971-05-21",
    rank: 1
  },
  {
    id: 2,
    title: "Pet Sounds",
    artist: "The Beach Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/35/bb/c4/35bbc4eb-9387-97b0-b138-64b7a949ea43/13UABIM03512.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/64/2e/48/642e4821-75be-cc38-1e68-0fd5fc13e325/mzaf_17071298821692070086.plus.aac.p.m4a",
    release_date: "1966-05-16",
    rank: 2
  },
  {
    id: 3,
    title: "Blue",
    artist: "Joni Mitchell",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/00/a2/43/00a24363-cf69-bfd2-a26a-a042d57ab141/075992719926.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2c/aa/c8/2caac825-7360-a67d-0b13-ff22030893d2/mzaf_9584339373565033929.plus.aac.p.m4a",
    release_date: "1971-06-22",
    rank: 3
  },
  {
    id: 4,
    title: "Songs in the Key of Life",
    artist: "Stevie Wonder",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/eb/1f/12/eb1f12ec-474c-63aa-43af-09282f423b9d/00602537004737.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a2/23/a8/a223a8dc-826e-8bac-2e30-fa86a148ce34/mzaf_7138818373738553579.plus.aac.p.m4a",
    release_date: "1976-09-28",
    rank: 4
  },
  {
    id: 5,
    title: "Abbey Road",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/48/53/43/485343e3-dd6a-0034-faec-f4b6403f8108/13UMGIM63890.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6f/4b/4a/6f4b4a52-3a41-6277-ba89-61d5e3c1d596/mzaf_7271648021499018653.plus.aac.p.m4a",
    release_date: "1969-09-26",
    rank: 5
  },
  {
    id: 6,
    title: "Nevermind",
    artist: "Nirvana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/95/fd/b9/95fdb9b2-6d2b-92a6-97f2-51c1a6d77f1a/00602527874609.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a6/53/1e/a6531efa-397c-eb73-ecab-9b2790c1471e/mzaf_16440344883389407474.plus.aac.p.m4a",
    release_date: "1991-09-24",
    rank: 6
  },
  {
    id: 7,
    title: "Rumours",
    artist: "Fleetwood Mac",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4d/13/ba/4d13bac3-d3d5-7581-2c74-034219eadf2b/081227970949.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/c5/66/84/c56684af-1c68-0215-8f7b-d6c92cba05b9/mzaf_17079408791247500302.plus.aac.p.m4a",
    release_date: "1977-02-04",
    rank: 7
  },
  {
    id: 8,
    title: "Purple Rain",
    artist: "Prince and the Revolution",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/00/17/f2/0017f24f-e580-b77a-71a8-1bc7b75881bf/603497822065.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4a/70/9b/4a709b41-3c29-626a-ca69-44aa907f4705/mzaf_14388295257133509788.plus.aac.p.m4a",
    release_date: "1984-06-25",
    rank: 8
  },
  {
    id: 9,
    title: "Blood on the Tracks",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/34/6e/4d/346e4d1c-c9ef-cf7f-96d9-aad97286febb/074643323529.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b6/49/b1/b649b17a-f39e-39fb-529e-8eabdcfc7190/mzaf_13950861447076013536.plus.aac.p.m4a",
    release_date: "1975-01-20",
    rank: 9
  },
  {
    id: 10,
    title: "The Miseducation of Lauryn Hill",
    artist: "Lauryn Hill",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/09/6b/55/096b55c4-ee8f-23bd-df8f-0ca0821f3028/886446727189.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/28/e4/a5/28e4a57b-2409-4679-b910-19e6e4fd1671/mzaf_1899250437694222298.plus.aac.p.m4a",
    release_date: "1998-08-25",
    rank: 10
  },
  {
    id: 11,
    title: "Kind of Blue",
    artist: "Miles Davis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/7f/9f/d6/mzi.vtnaewef.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9e/4d/df/9e4ddf83-c750-4892-4010-26e5286a38c7/mzaf_2873652449231945721.plus.aac.p.m4a",
    release_date: "1959-08-17",
    rank: 11
  },
  {
    id: 12,
    title: "A Love Supreme",
    artist: "John Coltrane",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e5/24/aa/e524aacd-467b-66f3-8931-0fcd6750a4b9/08UMGIM07914.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/ac/7e/fb/ac7efb79-7dda-631f-9432-549ce2d4752b/mzaf_8721454991504769547.plus.aac.p.m4a",
    release_date: "1965-02-01",
    rank: 12
  },
  {
    id: 13,
    title: "The Velvet Underground & Nico",
    artist: "The Velvet Underground",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/33/98/39/3398391b-3586-0903-a094-423c93d8fe53/00602547075031.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ec/14/f8/ec14f8db-824f-6b17-b77d-f08a14ebf776/mzaf_4678052817657554987.plus.aac.p.m4a",
    release_date: "1967-03-12",
    rank: 13
  },
  {
    id: 14,
    title: "Thriller",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/58/8c/cb/588ccb9a-ab79-4a38-43b5-d4c24ea42859/mzaf_2083607504726567992.plus.aac.p.m4a",
    release_date: "1982-11-30",
    rank: 14
  },
  {
    id: 15,
    title: "OK Computer",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7a/0d/da/7a0ddafc-b83b-bc77-2f34-db75caca92c1/mzaf_9668535207056622280.plus.aac.p.m4a",
    release_date: "1997-06-16",
    rank: 15
  },
  {
    id: 16,
    title: "Sgt. Pepper's Lonely Hearts Club Band",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/6f/79/8d/6f798d84-7475-8525-fc91-f7b51b2b5a9b/00602567725428.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a6/91/d7/a691d7a7-61cb-c299-efd9-9a7eb0669523/mzaf_747994897546992804.plus.aac.p.m4a",
    release_date: "1967-05-26",
    rank: 16
  },
  {
    id: 17,
    title: "London Calling",
    artist: "The Clash",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/93/cb/20/93cb201b-154b-7b74-a10b-48fbef9b3281/888880348937.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/fb/f5/b4/fbf5b472-dd9d-5984-c8c5-114716c105cb/mzaf_14673080368047782781.plus.aac.p.m4a",
    release_date: "1979-12-14",
    rank: 17
  },
  {
    id: 18,
    title: "The Dark Side of the Moon",
    artist: "Pink Floyd",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/76/b0/3e76b0e3-762b-2286-a019-8afb19cee541/886445635829.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/58/5b/bb/585bbb32-7f6f-d6fd-2470-e02d7414544e/mzaf_10600413524328381964.plus.aac.p.m4a",
    release_date: "1973-03-01",
    rank: 18
  },
  {
    id: 19,
    title: "Innervisions",
    artist: "Stevie Wonder",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ff/c2/5f/ffc25f04-cb3b-b56e-dd28-8b77ae63e613/00602537070824.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/77/f0/91/77f0918f-11c6-509d-aa6f-1f284be5a37c/mzaf_764800984787521060.plus.aac.p.m4a",
    release_date: "1973-08-03",
    rank: 19
  },
  {
    id: 20,
    title: "Lemonade",
    artist: "Beyoncé",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d2/53/65/d2536587-c7f3-9153-4677-f5a2f3e9e5ad/886447691120.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/c3/14/cb/c314cb42-04f6-5753-20d7-9e71372f00f1/mzaf_4533911873467767307.plus.aac.p.m4a",
    release_date: "2016-04-23",
    rank: 20
  },
  {
    id: 21,
    title: "Highway 61 Revisited",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f8/ff/c0/f8ffc056-55b4-2033-657d-32492d1eea25/827969239926.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/55/96/3f/55963fea-80a4-a4ca-48ab-6092846b8cdb/mzaf_11040377413361623138.plus.aac.p.m4a",
    release_date: "1965-08-30",
    rank: 21
  },
  {
    id: 22,
    title: "Revolver",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/97/f4/3a/97f43ab4-9fdf-7a41-e430-7c6c313f3883/13UMGIM63887.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/13/30/df/1330df8c-8235-df91-8d8f-4b12174a6afa/mzaf_13939545437886156645.plus.aac.p.m4a",
    release_date: "1966-08-05",
    rank: 22
  },
  {
    id: 23,
    title: "My Beautiful Dark Twisted Fantasy",
    artist: "Kanye West",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d1/74/da/d174dacf-5782-dfe2-19f7-ce037dcd0237/00602527584935.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/10/58/bb/1058bbc8-8771-85d2-19a0-64b225d4ccd6/mzaf_15008276184889852591.plus.aac.p.m4a",
    release_date: "2010-11-22",
    rank: 23
  },
  {
    id: 24,
    title: "The Rise and Fall of Ziggy Stardust",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/5f/fa/56/5ffa56c2-ea1f-7a17-6bad-192ff9b6476d/825646124206.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e1/5f/44/e15f442d-95f5-41cc-6f69-b23eb58c4af7/mzaf_17935873034057372065.plus.aac.p.m4a",
    release_date: "1972-06-16",
    rank: 24
  },
  {
    id: 25,
    title: "Ready to Die",
    artist: "The Notorious B.I.G.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/f8/6a/3d/f86a3db0-d518-cd49-c0c9-25e767ae0a6d/075679456861.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5b/81/21/5b8121d4-1b2b-511a-1f38-0ef4346909b0/mzaf_4190278176982078552.plus.aac.p.m4a",
    release_date: "1994-09-13",
    rank: 25
  },
  {
    id: 26,
    title: "Exile on Main St.",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b6/7b/df/b67bdff8-4e30-d46d-e869-fc0f38462f4c/08UMGIM15728.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2f/18/12/2f18122f-0a63-6287-f80b-d60027e2767f/mzaf_8917422509864767269.plus.aac.p.m4a",
    release_date: "1972-05-12",
    rank: 26
  },
  {
    id: 27,
    title: "Horses",
    artist: "Patti Smith",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/0b/cd/a8/0bcda80a-0046-aa13-1416-71d844dfb711/886445500394.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e5/89/d5/e589d580-9b9e-e283-c58a-fd378f602c9a/mzaf_6255921329199901020.plus.aac.p.m4a",
    release_date: "1975-12-13",
    rank: 27
  },
  {
    id: 28,
    title: "Blonde on Blonde",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/20/9d/bf/209dbf58-f698-7181-33de-0c29480beba0/074640084126.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/25/11/ec/2511ec1e-c551-b4ce-d9ec-22faec5fcc9e/mzaf_10573987368366267286.plus.aac.p.m4a",
    release_date: "1966-05-16",
    rank: 28
  },
  {
    id: 29,
    title: "Illmatic",
    artist: "Nas",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/b9/eb/cc/b9ebccbc-5ba4-2cdb-5332-b065739abd9a/886444567619.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b9/9b/e3/b99be353-830a-3d05-a01e-2b43f5431f0e/mzaf_4867638769925967441.plus.aac.p.m4a",
    release_date: "1994-04-19",
    rank: 29
  },
  {
    id: 30,
    title: "Are You Experienced",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/00/67/45/006745f5-95d5-5a06-35ed-d515e9cfd7d8/dj.tbwlxwoh.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/39/0c/75/390c7571-e027-568d-b6c6-394161b12100/mzaf_13644352496267712961.plus.aac.p.m4a",
    release_date: "1967-05-12",
    rank: 30
  },
  {
    id: 31,
    title: "I Never Loved a Man the Way I Love You",
    artist: "Aretha Franklin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d1/31/ee/d131eec4-614c-d661-b580-3dc32b8547e8/603497896622.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/92/0f/b7/920fb7f6-3dff-ac0b-cae7-315ab50aec71/mzaf_17889926618036836629.plus.aac.p.m4a",
    release_date: "1967-03-10",
    rank: 31
  },
  {
    id: 32,
    title: "Born to Run",
    artist: "Bruce Springsteen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0a/02/f7/0a02f7a1-ca2a-c0d7-7192-50314971721f/884977157031.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a8/b7/0a/a8b70ad0-b907-0360-99b1-5bf23bdc8322/mzaf_11319548672709322634.plus.aac.p.m4a",
    release_date: "1975-08-25",
    rank: 32
  },
  {
    id: 33,
    title: "Sign o' the Times",
    artist: "Prince",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/a9/52/38/a95238ab-10f9-e407-4bc8-755148d32d65/886448874546.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/05/e8/02/05e8024a-a420-335a-e4ef-3c658e5a1360/mzaf_1684481295741467876.plus.aac.p.m4a",
    release_date: "1987-03-30",
    rank: 33
  },
  {
    id: 34,
    title: "The White Album",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fa/5b/89/fa5b898d-bad6-e053-4195-260e5c74f2bb/00602567725466.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/88/1c/72/881c723e-9bd5-0619-c803-4022e4da642a/mzaf_2961717660523968849.plus.aac.p.m4a",
    release_date: "1968-11-22",
    rank: 34
  },
  {
    id: 35,
    title: "Aquemini",
    artist: "OutKast",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0e/48/dd/0e48dd9a-07c9-46de-a838-b4ddb4e508a7/886448814191.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ad/25/99/ad2599f9-0f5b-09af-26ac-6ab4b2bbc3a4/mzaf_9392667577771581826.plus.aac.p.m4a",
    release_date: "1998-09-29",
    rank: 35
  },
  {
    id: 36,
    title: "Led Zeppelin IV",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/5c/15/9b/5c159b27-95ca-b9a7-84e3-28e795fffd39/dj.kvkrpptq.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/63/a5/39/63a539db-8275-14fb-a564-9da91cda82b4/mzaf_9015152451469223111.plus.aac.p.m4a",
    release_date: "1971-11-08",
    rank: 36
  },
  {
    id: 37,
    title: "The Joshua Tree",
    artist: "U2",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8f/e2/c3/8fe2c384-f6cb-9af7-371d-2b6a9b204e59/17UMGIM79292.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b9/f9/1f/b9f91fdc-20bc-15a7-5170-8143b0afb547/mzaf_18433944617360780576.plus.aac.p.m4a",
    release_date: "1987-03-09",
    rank: 37
  },
  {
    id: 38,
    title: "Tapestry",
    artist: "Carole King",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/68/b6/0e/68b60e89-9d41-e8a1-bba2-05c750f0832b/dj.hwpyamqm.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e0/a4/8b/e0a48b0c-5c93-e9c9-2b6e-8fbac5ddeed5/mzaf_4641359490482463754.plus.aac.p.m4a",
    release_date: "1971-02-10",
    rank: 38
  },
  {
    id: 39,
    title: "Who's Next",
    artist: "The Who",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/4e/d5/19/4ed519ca-3f8b-65ee-eb21-89d5c6a0b44e/00602547140265.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9d/23/a5/9d23a517-a405-d8be-d119-8b1443cccda3/mzaf_10976006011126409643.plus.aac.p.m4a",
    release_date: "1971-08-14",
    rank: 39
  },
  {
    id: 40,
    title: "Remain in Light",
    artist: "Talking Heads",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/87/5f/5b/mzi.zzquknhm.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b1/44/9d/b1449d35-5812-e1a5-e1de-0bf501759207/mzaf_16841230900131618285.plus.aac.p.m4a",
    release_date: "1980-10-08",
    rank: 40
  },
  {
    id: 41,
    title: "To Pimp a Butterfly",
    artist: "Kendrick Lamar",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/b5/a6/91/b5a69171-5232-3d5b-9c15-8963802f83dd/15UMGIM15814.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/45/26/fa/4526fa9f-f70d-abc6-25bf-1594b9dfdb13/mzaf_14854083311939736968.plus.aac.p.m4a",
    release_date: "2015-03-15",
    rank: 41
  },
  {
    id: 42,
    title: "Enter the Wu-Tang (36 Chambers)",
    artist: "Wu-Tang Clan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/8c/20/1f/8c201f03-7617-2d8b-3d8d-e0ba2d55041b/196872123784.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/71/71/bd/7171bd1f-365a-bbdb-0489-e1387a4902b5/mzaf_5867304806706979068.plus.aac.p.m4a",
    release_date: "1993-11-09",
    rank: 42
  },
  {
    id: 43,
    title: "Let It Bleed",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/69/64/67/696467fe-9ed1-b65e-1016-a10d07e6464d/20UMGIM14087.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/f8/0a/e5/f80ae51b-7ac3-dc4e-ae74-0475e52078e5/mzaf_16321368258004173429.plus.aac.p.m4a",
    release_date: "1969-12-05",
    rank: 43
  },
  {
    id: 44,
    title: "Hotel California",
    artist: "Eagles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/88/16/2c/88162c3d-46db-8321-61f3-3a47404cfe76/075596050920.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a7/1b/f0/a71bf07d-f498-05c9-2c8a-d12af7d019d8/mzaf_11402952498213508559.plus.aac.p.m4a",
    release_date: "1976-12-08",
    rank: 44
  },
  {
    id: 45,
    title: "The Chronic",
    artist: "Dr. Dre",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/22/55/6c/22556ce7-92fb-3a7a-af98-33b0e4bed0d8/23UMGIM07603.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/fa/98/ad/fa98ad28-5aed-ef5b-6747-f7ef9ccab1e5/mzaf_10668902108723034119.plus.aac.p.m4a",
    release_date: "1992-12-15",
    rank: 45
  },
  {
    id: 46,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a0/4d/c4/a04dc484-03cc-02aa-fa82-5334fcb4bc16/18UMGIM24878.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cd/ed/17/cded17d5-ee32-1b97-7a11-527ab7b677d7/mzaf_2128362282849775567.plus.aac.p.m4a",
    release_date: "1987-07-21",
    rank: 46
  },
  {
    id: 47,
    title: "Low",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/49/2d/f7492da6-164e-b023-4b17-937329c35458/190295842895.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f0/e8/bd/f0e8bdcd-6962-b8f8-d0bf-4dc25893ed99/mzaf_4991925338582405351.plus.aac.p.m4a",
    release_date: "1977-01-14",
    rank: 47
  },
  {
    id: 48,
    title: "Rubber Soul",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/af/20/aa/af20aa89-4002-11fb-25d8-ff544af67eb4/00602567725404.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/26/00/39/260039f3-51bb-c479-16b7-8412199ccbc2/mzaf_2459513772630634554.plus.aac.p.m4a",
    release_date: "1965-12-03",
    rank: 48
  },
  {
    id: 49,
    title: "Sticky Fingers",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/7f/e0/b4/7fe0b4da-36cd-a1d0-0f19-ef3fec18e3cd/08UMGIM15742.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/31/3b/1c/313b1c62-5cfe-c782-8b9a-1f7a51de349e/mzaf_14059101886259720637.plus.aac.p.m4a",
    release_date: "1971-04-23",
    rank: 49
  },
  {
    id: 50,
    title: "Achtung Baby",
    artist: "U2",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/fe/5e/4f/fe5e4f79-c74f-c39e-39dc-4c8a952b9665/17UMGIM98829.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/96/3b/83/963b83c9-c1bb-eb52-8f4e-e53db70deff3/mzaf_6212797104353436615.plus.aac.p.m4a",
    release_date: "1991-11-18",
    rank: 50
  },
  {
    id: 51,
    title: "Automatic for the People",
    artist: "R.E.M.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fb/d9/e2/fbd9e203-818c-06cf-405d-8906f2eae6ec/00888072396258.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/db/00/4b/db004b97-05eb-dc8a-4ab2-9ea1e57cd5e9/mzaf_10085189027933565055.plus.aac.p.m4a",
    release_date: "1992-10-05",
    rank: 51
  },
  {
    id: 52,
    title: "Off the Wall",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/cc/b0/7f/ccb07f0d-1530-00b0-244a-6332daffc2b9/dj.xnuhftrz.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/38/e9/6d/38e96d15-c9ae-b500-ccf6-ec8fb0faece4/mzaf_9211848530914134875.plus.aac.p.m4a",
    release_date: "1979-08-10",
    rank: 52
  },
  {
    id: 53,
    title: "Goodbye Yellow Brick Road",
    artist: "Elton John",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/b3/60/b6/b360b655-4d28-179d-d0d4-4e128ebdf4c9/13UAEIM19273.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e5/98/3b/e5983ba6-9b01-ccc0-1f99-8606972d8822/mzaf_18199799859454220066.plus.aac.p.m4a",
    release_date: "1973-10-05",
    rank: 53
  },
  {
    id: 54,
    title: "Control",
    artist: "Janet Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ed/b0/20/edb02000-b77f-22f4-6b7f-c46f62d4517c/00602547592361.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/da/8e/55/da8e55ea-31e2-f890-c107-cf82ca0efa1b/mzaf_3407864923924191730.plus.aac.p.m4a",
    release_date: "1986-02-04",
    rank: 54
  },
  {
    id: 55,
    title: "Live at the Apollo",
    artist: "James Brown",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/0b/16/f1/0b16f1aa-f6fd-d25f-52ab-934e780459cc/00602577173707.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a9/a6/b7/a9a6b711-2c3e-bf1b-f5a3-567e278e3fd9/mzaf_3379405240239921789.plus.aac.p.m4a",
    release_date: "1963-01-01",
    rank: 55
  },
  {
    id: 56,
    title: "Catch a Fire",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/a2/2a/6f/a22a6f9a-a4cc-9d1f-8e5b-9b7fa41177c3/23UMGIM37450.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/25/c0/d2/25c0d297-4f75-d028-e208-ab61ee3c5540/mzaf_10712254209711878762.plus.aac.p.m4a",
    release_date: "1973-04-13",
    rank: 56
  },
  {
    id: 57,
    title: "Late Registration",
    artist: "Kanye West",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/0e/90/3c/0e903c43-9d81-f91b-90f1-727a58f7fb2c/00602498824030.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/cb/de/f4/cbdef40e-2976-d699-44c5-f6738422d4bb/mzaf_2396892204349104861.plus.aac.p.m4a",
    release_date: "2005-08-30",
    rank: 57
  },
  {
    id: 58,
    title: "Graceland",
    artist: "Paul Simon",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a7/73/c1/a773c1f0-281c-324c-204f-540444080ea8/886443445697.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/aa/96/a3/aa96a3fa-b5de-bbd2-d518-e771d08035b6/mzaf_9536889355239436310.plus.aac.p.m4a",
    release_date: "1986-08-25",
    rank: 58
  },
  {
    id: 59,
    title: "The Doors",
    artist: "The Doors",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/97/e2/ce/97e2ce16-02e1-54f6-3896-dcc55249ff7d/603497838738.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/24/97/62/249762b1-20f3-d8bc-07a9-c55ef9f916b8/mzaf_1544101955086864471.plus.aac.p.m4a",
    release_date: "1967-01-04",
    rank: 59
  },
  {
    id: 60,
    title: "1999",
    artist: "Prince",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/68/23/df/6823df45-c3fe-48e9-15c6-2b620febbd4b/886448376293.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/1a/ab/3a/1aab3ab1-ef79-599a-1961-ab711772d2f8/mzaf_8053810746502222611.plus.aac.p.m4a",
    release_date: "1982-10-27",
    rank: 60
  },
  {
    id: 61,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/82/3b/60/823b6012-8dd5-b74c-55d0-6a104ec91430/06UMGIM04056.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/20/a4/92/20a49265-4541-516a-3e7f-928767123565/mzaf_16810646058963162444.plus.aac.p.m4a",
    release_date: "1999-02-23",
    rank: 61
  },
  {
    id: 62,
    title: "Disintegration",
    artist: "The Cure",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/ce/8b/65/ce8b65d5-9a2d-12aa-692c-bd9cba493e24/19UMGIM71891.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b2/83/a5/b283a5d0-f650-602c-d852-bfe85e14ac26/mzaf_15746174422357183334.plus.aac.p.m4a",
    release_date: "1989-05-02",
    rank: 62
  },
  {
    id: 63,
    title: "Paid in Full",
    artist: "Eric B. & Rakim",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/13/11/10/13111001-0c28-9fd7-9d50-194e72e23f53/00602547742254.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1a/05/85/1a0585cc-fb3a-0479-d678-356f4a3a9d3d/mzaf_6389461792317294971.plus.aac.p.m4a",
    release_date: "1987-07-07",
    rank: 63
  },
  {
    id: 64,
    title: "Electric Ladyland",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a6/b8/45/a6b84589-6ff7-a462-9ff9-170b724980d5/dj.wjkdwlks.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7a/75/19/7a751906-e3c9-b945-aaed-f5d2c9fab3c7/mzaf_7452473214220700286.plus.aac.p.m4a",
    release_date: "1968-10-16",
    rank: 64
  },
  {
    id: 65,
    title: "Bridge Over Troubled Water",
    artist: "Simon & Garfunkel",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a3/84/0a/a3840a6d-44e8-0afe-fc3e-316c517dddfe/5099749521421.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/02/a2/17/02a21703-ed00-e68a-2411-104437c2a7e4/mzaf_11284201080504456602.plus.aac.p.m4a",
    release_date: "1970-01-26",
    rank: 65
  },
  {
    id: 66,
    title: "Back to Black",
    artist: "Amy Winehouse",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/cf/3f/09/cf3f0994-980d-d8ed-088d-ae89af256b73/15UMGIM24224.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/40/07/2c/40072c1f-c551-e490-4ee4-d864eeb28c51/mzaf_11174458628498475021.plus.aac.p.m4a",
    release_date: "2006-10-27",
    rank: 66
  },
  {
    id: 67,
    title: "Paranoid",
    artist: "Black Sabbath",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/be/27/91/be279120-2285-16c6-c7ba-9d6643d4a948/075992732727.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/87/7e/c4/877ec400-6e44-8bc4-bb22-b88273a3330d/mzaf_15381783367282008011.plus.aac.p.m4a",
    release_date: "1970-09-18",
    rank: 67
  },
  {
    id: 68,
    title: "Star Time",
    artist: "James Brown",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/14/5b/1c/145b1cc1-3c63-7385-500e-c6ed8b190c3b/06UMGIM18886.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/41/5e/fd/415efd79-95b4-361f-2932-6b18b41ff366/mzaf_11126149358147706972.plus.aac.p.m4a",
    release_date: "1991-03-05",
    rank: 68
  },
  {
    id: 69,
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/aa/e0/ab/aae0ab6a-d906-a189-81bf-70b56aa43f7a/886445635843.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b3/f0/e4/b3f0e422-4568-5dcc-5045-965337fcf712/mzaf_9838901551531704078.plus.aac.p.m4a",
    release_date: "1975-09-12",
    rank: 69
  },
  {
    id: 70,
    title: "Superfly",
    artist: "Curtis Mayfield",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c4/34/f0/c434f094-4c7e-3c62-8f15-cd02028e1ce7/603497885978.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/5f/78/e2/5f78e2b7-ed98-ba1c-d9cd-140e39011819/mzaf_16325640461992530251.plus.aac.p.m4a",
    release_date: "1972-07-11",
    rank: 70
  },
  {
    id: 71,
    title: "Kid A",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/bd/8e/13/bd8e1358-b367-a689-cb84-cebd0b067dc4/634904078263.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/dd/17/5b/dd175b86-947b-2833-a955-526977f5c4ba/mzaf_310731774401592456.plus.aac.p.m4a",
    release_date: "2000-10-02",
    rank: 71
  },
  {
    id: 72,
    title: "The Wall",
    artist: "Pink Floyd",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3e/17/ec/3e17ec6d-f980-c64f-19e0-a6fd8bbf0c10/886445635850.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/7f/0a/b2/7f0ab2de-c58f-ab90-aaa7-69e76ea1614e/mzaf_13903338154361109472.plus.aac.p.m4a",
    release_date: "1979-11-30",
    rank: 72
  },
  {
    id: 73,
    title: "Straight Outta Compton",
    artist: "N.W.A",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/4c/b1/32/4cb13290-7d01-1949-57e9-a8a1874e60a2/19UMGIM79184.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/45/c3/6e/45c36e06-c594-1b45-bc4d-4fa94ae6230c/mzaf_9922128183683368203.plus.aac.p.m4a",
    release_date: "1988-08-08",
    rank: 73
  },
  {
    id: 74,
    title: "What's the Story Morning Glory?",
    artist: "Oasis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/04/92/e0/0492e08b-cbcc-9969-9ad6-8f5a0888068c/5051961007107.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a2/ce/35/a2ce35c2-93ff-993e-53ba-fc22bab8357f/mzaf_16847435411827195474.plus.aac.p.m4a",
    release_date: "1995-10-02",
    rank: 74
  },
  {
    id: 75,
    title: "Led Zeppelin",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4c/7b/80/4c7b80b4-ed35-4e06-ec80-2f7aaaabb5c5/dj.pjjmtwdc.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/60/61/5f/60615fd1-7425-78b3-21ab-fed7411a89ea/mzaf_7178841208140363975.plus.aac.p.m4a",
    release_date: "1969-01-12",
    rank: 75
  },
  {
    id: 76,
    title: "Talking Book",
    artist: "Stevie Wonder",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/62/61/61/626161c0-f4d7-e6ff-8586-768340ef278f/00602537002382.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/ff/a3/1a/ffa31a9f-8d91-68a8-e85c-cf8e74284079/mzaf_15951061299338017971.plus.aac.p.m4a",
    release_date: "1972-10-28",
    rank: 76
  },
  {
    id: 77,
    title: "Dusty in Memphis",
    artist: "Dusty Springfield",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/06/e8/3d/mzi.ckgjvgxx.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/f2/af/1a/f2af1a3f-35b0-6d34-2705-4330ab60fb23/mzaf_13892491604968614390.plus.aac.p.m4a",
    release_date: "1969-03-18",
    rank: 77
  },
  {
    id: 78,
    title: "Good Kid, M.A.A.D City",
    artist: "Kendrick Lamar",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9a/50/a1/9a50a1d8-01c2-2504-8d99-3f2fc7e5c2ff/12UMGIM52988.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5c/c4/78/5cc47802-9719-10c0-42d6-07351b44ee34/mzaf_15609471773835932579.plus.aac.p.m4a",
    release_date: "2012-10-22",
    rank: 78
  },
  {
    id: 79,
    title: "Modern Sounds in Country and Western Music",
    artist: "Ray Charles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/11/38/8f/11388f60-526a-06e6-9c84-40404508fce6/4334.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0d/1a/43/0d1a4388-335e-6e8a-c628-54931856cd46/mzaf_8277062413639721000.plus.aac.p.m4a",
    release_date: "1962-04-01",
    rank: 79
  },
  {
    id: 80,
    title: "Raising Hell",
    artist: "Run-D.M.C.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/00/3f/21/003f21c0-6bc3-dbed-7081-04ffaf172016/078221640824.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9f/1d/26/9f1d26b8-eac9-5791-8d79-55d05663fa43/mzaf_935454447677198606.plus.aac.p.m4a",
    release_date: "1986-05-15",
    rank: 80
  },
  {
    id: 81,
    title: "Physical Graffiti",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/82/6c/5d/826c5d66-67b7-62f2-4d78-dd3c7b415e08/dj.pifhrvpa.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a2/1d/90/a21d9033-259e-690d-b887-e1e0839fcfc2/mzaf_552562555563590.plus.aac.p.m4a",
    release_date: "1975-02-24",
    rank: 81
  },
  {
    id: 82,
    title: "In the Wee Small Hours",
    artist: "Frank Sinatra",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/97/a7/42/97a7424f-8161-052f-ce3c-93730c2d30de/14UMGIM32540.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/16/2e/6f/162e6f1f-ad13-dc6f-74ab-6b8163d359fb/mzaf_10843607891199828716.plus.aac.p.m4a",
    release_date: "1955-04-25",
    rank: 82
  },
  {
    id: 83,
    title: "Like a Prayer",
    artist: "Madonna",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/20/3c/f5/203cf53d-689e-528f-29d7-ba33758254aa/mzi.rotbotfl.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0b/23/82/0b238289-52e2-2107-5531-181836267ed2/mzaf_6726729811402686020.plus.aac.p.m4a",
    release_date: "1989-03-21",
    rank: 83
  },
  {
    id: 84,
    title: "It Takes a Nation of Millions to Hold Us Back",
    artist: "Public Enemy",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/9f/49/d0/9f49d09b-6842-081e-8cec-67b19a686397/06UMGIM18700.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/09/ae/2e/09ae2efb-74fb-cf53-f4ef-aa93abe5ae71/mzaf_6160778412565102725.plus.aac.p.m4a",
    release_date: "1988-04-14",
    rank: 84
  },
  {
    id: 85,
    title: "There's a Riot Goin' On",
    artist: "Sly and the Family Stone",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/01/9f/91019f68-fbc9-5620-d49a-88043d75371e/828767591124.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/d4/05/aa/d405aa04-2234-0c30-1068-6ab6a602c007/mzaf_12694696185505644862.plus.aac.p.m4a",
    release_date: "1971-11-01",
    rank: 85
  },
  {
    id: 86,
    title: "At Fillmore East",
    artist: "The Allman Brothers Band",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/da/e0/c9/dae0c9cf-2977-19f8-06fa-8adcf7ca86f0/00602547880314.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/18/08/a0/1808a084-0d2b-4083-457b-966d6657404a/mzaf_1288902131983370981.plus.aac.p.m4a",
    release_date: "1971-07-01",
    rank: 86
  },
  {
    id: 87,
    title: "Jagged Little Pill",
    artist: "Alanis Morissette",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/4d/04/71/4d0471a5-3bd6-2c5b-a438-3568fcd70e1c/603497885510.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/85/17/28/851728b5-4dd9-f5c7-f5de-b5af8e5f1d93/mzaf_5967890705575716076.plus.aac.p.m4a",
    release_date: "1995-06-13",
    rank: 87
  },
  {
    id: 88,
    title: "Station to Station",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/91/d8/47/91d847ac-8e39-85b0-36a6-ab3b8db46803/190295990268.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b3/37/51/b3375110-b472-adbb-2ddf-5fc950a5ccdc/mzaf_18265167111952179788.plus.aac.p.m4a",
    release_date: "1976-01-23",
    rank: 88
  },
  {
    id: 89,
    title: "The Low End Theory",
    artist: "A Tribe Called Quest",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/14/c8/e014c80a-425b-e01a-1124-cee985bcb5e6/dj.qafpkddz.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/83/f2/44/83f24487-592e-b4e8-1351-42e2a57cce4e/mzaf_13045707279146561116.plus.aac.p.m4a",
    release_date: "1991-09-24",
    rank: 89
  },
  {
    id: 90,
    title: "Otis Blue: Otis Redding Sings Soul",
    artist: "Otis Redding",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/1f/b4/cf/1fb4cf66-d3cf-9a25-bf58-103bb91e615c/603497890279.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/9e/23/9b/9e239bf3-7f0d-427d-320a-a9e4161fc729/mzaf_13927852051387693425.plus.aac.p.m4a",
    release_date: "1965-09-15",
    rank: 90
  },
  {
    id: 91,
    title: "Master of Puppets",
    artist: "Metallica",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/ed/ee/7f/edee7f18-85b6-ebb4-0620-89cbe56fe205/858978005554.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/da/e7/9c/dae79c08-a960-2d21-8eab-42e9d70e29e6/mzaf_7135498142102205621.plus.aac.p.m4a",
    release_date: "1986-03-03",
    rank: 91
  },
  {
    id: 92,
    title: "Parallel Lines",
    artist: "Blondie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2f/0b/25/2f0b252d-838e-4f19-3c08-91e49b269564/15UMGIM18445.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/38/a5/9b/38a59b56-987e-e3f3-964d-63c76c568620/mzaf_7637545549457512062.plus.aac.p.m4a",
    release_date: "1978-09-01",
    rank: 92
  },
  {
    id: 93,
    title: "Legend",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/3c/c2/0d/3cc20dcc-8f4e-f060-36dd-7de52a7ec8fe/12UMGIM14712.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/94/19/4d/94194de5-5358-a97f-a3a5-715b5ba43f9c/mzaf_288671793593887414.plus.aac.p.m4a",
    release_date: "1984-05-08",
    rank: 93
  },
  {
    id: 94,
    title: "Beggars Banquet",
    artist: "The Rolling Stones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a3/d1/78/a3d178a8-f1c2-c1c3-1c5d-d78ab3af9768/20UMGIM13726.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/1b/f7/73/1bf77304-235f-3f02-c126-fac9a5aa9917/mzaf_4625747673195165829.plus.aac.p.m4a",
    release_date: "1968-12-06",
    rank: 94
  },
  {
    id: 95,
    title: "The Blueprint",
    artist: "Jay-Z",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/19/c0/e3/19c0e3b6-4c2f-17ee-2a4a-6e2208de8aa6/00857366006951.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7a/07/4c/7a074c8d-d0e5-4fd7-45d2-62d12160db47/mzaf_11304122442362450310.plus.aac.p.m4a",
    release_date: "2001-09-11",
    rank: 95
  },
  {
    id: 96,
    title: "Pearl",
    artist: "Janis Joplin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/16/9d/87/169d87fe-76ee-1c50-d186-14ac71ab237e/886443610538.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0b/57/f4/0b57f4e5-f29d-5ed5-391e-f06218f0a02f/mzaf_17766513720783708681.plus.aac.p.m4a",
    release_date: "1971-01-11",
    rank: 96
  },
  {
    id: 97,
    title: "After the Gold Rush",
    artist: "Neil Young",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/88/9f/0a/889f0afc-ca89-5968-ef83-ab07f7184eb6/093624924753.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f4/51/e7/f451e7ca-0759-4eaf-0c4e-041a2d8aa675/mzaf_12602843870084438932.plus.aac.p.m4a",
    release_date: "1970-09-19",
    rank: 97
  },
  {
    id: 98,
    title: "Hunky Dory",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f0/b9/68/f0b9680e-b028-b3d6-f793-7c268256499a/825646286034.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fc/10/92/fc10922e-78c2-c5fc-66ce-5f6532bec57e/mzaf_9421831923991808719.plus.aac.p.m4a",
    release_date: "1971-12-17",
    rank: 98
  },
  {
    id: 99,
    title: "The Bends",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/1b/a9/5c/1ba95cac-b245-d386-63fb-6b857aa9dce8/634904078065.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5a/1b/38/5a1b38c0-e751-b65a-91f4-5c0ecf8981fe/mzaf_13497506801332646990.plus.aac.p.m4a",
    release_date: "1995-03-13",
    rank: 99
  },
  {
    id: 100,
    title: "Stankonia",
    artist: "OutKast",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/d6/21/fb/d621fbde-c099-6794-7102-2692f10c4dbb/886448814283.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/73/dd/36/73dd36ec-eaaa-83cd-1a7b-71de28541ced/mzaf_16514838695000151630.plus.aac.p.m4a",
    release_date: "2000-10-31",
    rank: 100
  },
  {
    id: 101,
    title: "The Queen Is Dead",
    artist: "The Smiths",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/e8/70/1ae870c3-b402-096b-c4c4-8022af5a2ed9/745099189662.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/3c/94/11/3c9411a4-bc62-f544-06c5-2a87dd5694f3/mzaf_11652113659510251792.plus.aac.p.m4a",
    release_date: "1986-06-16",
    rank: 101
  },
  {
    id: 102,
    title: "Court and Spark",
    artist: "Joni Mitchell",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a1/ca/b2/a1cab2b5-9c83-986d-0b88-e0e76b4c3f00/081227986186.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e0/f7/d2/e0f7d25b-a8af-ee10-0aca-4d4964ca69c4/mzaf_16687054824652002932.plus.aac.p.m4a",
    release_date: "1974-01-17",
    rank: 102
  },
  {
    id: 103,
    title: "Let's Get It On",
    artist: "Marvin Gaye",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/dc/fa/3a/dcfa3a34-a2eb-8144-7fda-b978b7afbe19/06UMGIM11335.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/10/36/77/103677db-b70e-505f-eefd-cfb20ae130d2/mzaf_3849021925576978930.plus.aac.p.m4a",
    release_date: "1973-08-28",
    rank: 103
  },
  {
    id: 104,
    title: "The Smiths",
    artist: "The Smiths",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/9d/b2/b0/9db2b04c-d7b2-050b-5c9e-4f64c6e03a3a/745099189228.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/86/62/20/866220b0-7138-bcf3-ea0c-fd04008704ac/mzaf_12553643161494243762.plus.aac.p.m4a",
    release_date: "1984-02-20",
    rank: 104
  },
  {
    id: 105,
    title: "Midnight Marauders",
    artist: "A Tribe Called Quest",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/d1/90/11/d1901153-4595-7f2f-12d2-661be9eef883/012414149022.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/0b/5c/16/0b5c169e-b9a7-88aa-5381-58ab99966305/mzaf_14275197497073071026.plus.aac.p.m4a",
    release_date: "1993-11-09",
    rank: 105
  },
  {
    id: 106,
    title: "Fun House",
    artist: "The Stooges",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music6/v4/ea/84/3c/ea843cdb-04ca-63c1-dd30-ddf3a0b94ca9/075596066921.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/52/0b/d4/520bd479-39e7-fffe-18c3-2bd6312de33d/mzaf_11089783897698324331.plus.aac.p.m4a",
    release_date: "1970-07-07",
    rank: 106
  },
  {
    id: 107,
    title: "Harvest",
    artist: "Neil Young",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/4b/c4/e04bc4e6-9d3a-0bab-c953-f139c72fd337/093624924722.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6f/37/59/6f37592d-534f-ac6e-65ce-9f74551a0fe9/mzaf_16348941019324956193.plus.aac.p.m4a",
    release_date: "1972-02-14",
    rank: 107
  },
  {
    id: 108,
    title: "All Eyez on Me",
    artist: "2Pac",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/55/e5/7c/55e57cf2-8325-a088-7d54-3aeedad1143f/21UM1IM16263.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/bc/ce/31/bcce3175-61d8-99da-03ec-2646308b05b8/mzaf_16629756380024085628.plus.aac.p.m4a",
    release_date: "1996-02-13",
    rank: 108
  },
  {
    id: 109,
    title: "Damn",
    artist: "Kendrick Lamar",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/ab/16/ef/ab16efe9-e7f1-66ec-021c-5592a23f0f9e/17UMGIM88793.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/30/3f/27/303f27c8-1997-8c57-66b3-b67e7c720779/mzaf_5598476068977070849.plus.aac.p.m4a",
    release_date: "2017-04-14",
    rank: 109
  },
  {
    id: 110,
    title: "Substance",
    artist: "New Order",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/10/38/a1/1038a176-a759-df9a-6aa0-e8497bb0cfd0/190295211592.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/49/ae/99/49ae9942-efc2-66c9-68d2-b2ba12ae899f/mzaf_3119884863508531048.plus.aac.p.m4a",
    release_date: "1987-08-17",
    rank: 110
  },
  {
    id: 111,
    title: "Marquee Moon",
    artist: "Television",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1b/6a/c1/1b6ac100-8d0e-ec9d-4639-88b11ed2cdad/603497886029.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e7/f9/36/e7f936cc-4902-6d36-856d-f757e00b43af/mzaf_15216285374598129354.plus.aac.p.m4a",
    release_date: "1977-02-08",
    rank: 111
  },
  {
    id: 112,
    title: "Unknown Pleasures",
    artist: "Joy Division",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/13/90/c0/1390c072-4249-3739-7b3d-fd73ee4a5698/825646562831.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/2a/37/29/2a3729c6-413c-0654-2f05-ccef587c7dae/mzaf_18010867471192224238.plus.aac.p.m4a",
    release_date: "1979-06-15",
    rank: 112
  },
  {
    id: 113,
    title: "Ten",
    artist: "Pearl Jam",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/79/20/11/mzi.njtszwnb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/85/dd/65/85dd659d-d88d-303f-f854-b2cc7dd85d4c/mzaf_1627641021050197115.plus.aac.p.m4a",
    release_date: "1991-08-27",
    rank: 113
  },
  {
    id: 114,
    title: "The Marshall Mathers LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/ea/ac/03/eaac03e5-8e9d-847e-d5b9-af7dee6a970b/00606949063221.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/3e/15/21/3e15210e-a536-dade-8969-7b1640e18a82/mzaf_2019628126954193758.plus.aac.p.m4a",
    release_date: "2000-05-23",
    rank: 114
  },
  {
    id: 115,
    title: "Doolittle",
    artist: "Pixies",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f8/80/17/f8801798-6f7f-fa2a-446e-729a8b46e7ab/5014436905025.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9c/c9/41/9cc941dd-3678-424a-81ee-0d0e6b1e8759/mzaf_12602522663278451800.plus.aac.p.m4a",
    release_date: "1989-04-17",
    rank: 115
  },
  {
    id: 116,
    title: "Lady Soul",
    artist: "Aretha Franklin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/a7/ac/e3a7aca0-48e1-0882-8e25-3d68f7ba3a72/603497896646.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/54/7b/6b/547b6bf5-6559-8f67-dd3c-50b4699f9824/mzaf_15273997644284394648.plus.aac.p.m4a",
    release_date: "1968-01-22",
    rank: 116
  },
  {
    id: 117,
    title: "Transformer",
    artist: "Lou Reed",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2a/e7/69/2ae76967-b94e-3b80-a079-93202eeb6157/886445151930.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ff/2a/3f/ff2a3fef-526f-c4a1-87a7-d183b88de527/mzaf_12169782340914697842.plus.aac.p.m4a",
    release_date: "1972-11-08",
    rank: 117
  },
  {
    id: 118,
    title: "Channel Orange",
    artist: "Frank Ocean",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/04/f8/63/04f863fc-2852-604f-c910-a97ac069506b/12UMGIM40339.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/8a/2c/35/8a2c35f6-ac70-560c-0a1c-516e105c6af8/mzaf_13522699475931524613.plus.aac.p.m4a",
    release_date: "2012-07-10",
    rank: 118
  },
  {
    id: 119,
    title: "Axis: Bold as Love",
    artist: "The Jimi Hendrix Experience",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/93/5d/c5/935dc5d5-a985-333d-0825-879ddb36e461/884977526585.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/48/f2/e8/48f2e8af-5033-4348-135e-0065ba9425a0/mzaf_15634140819032916773.plus.aac.p.m4a",
    release_date: "1967-12-01",
    rank: 119
  },
  {
    id: 120,
    title: "Surfer Rosa",
    artist: "Pixies",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/68/b7/c0/68b7c018-dc15-f44a-2611-be10237fc9a5/652637080308.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/35/d6/20/35d62017-543e-95ec-65c0-93bd25a12272/mzaf_4699521915064733573.plus.aac.p.m4a",
    release_date: "1988-03-21",
    rank: 120
  },
  {
    id: 121,
    title: "Led Zeppelin II",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1a/3d/bb/1a3dbb86-c1f8-737e-571f-d6b647a230be/dj.rhubuvkd.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/6b/d4/03/6bd403a7-3903-f42c-0710-506b77e91a68/mzaf_3618936417604930753.plus.aac.p.m4a",
    release_date: "1969-10-22",
    rank: 121
  },
  {
    id: 122,
    title: "Voodoo",
    artist: "D'Angelo",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/e9/b9/9e/e9b99e73-58a5-1e31-f57c-b11e78419dcf/16UMGIM86249.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7b/cf/73/7bcf7371-4602-7fc5-1abb-271ad12793cd/mzaf_14567856399701536994.plus.aac.p.m4a",
    release_date: "2000-01-25",
    rank: 122
  },
  {
    id: 123,
    title: "Blonde",
    artist: "Frank Ocean",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/bb/45/68/bb4568f3-68cd-619d-fbcb-4e179916545d/BlondCover-Final.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/86/5a/d1/865ad14f-f77e-3b9c-b108-930af566864d/mzaf_286153466120868843.plus.aac.p.m4a",
    release_date: "2016-08-20",
    rank: 123
  },
  {
    id: 124,
    title: "In Utero",
    artist: "Nirvana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/e3/20/03/e32003a4-99bc-1c70-40ba-001882f35dba/00602537526840.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/3f/9e/dc/3f9edcf0-85bd-4f77-f76b-fd8dddf54833/mzaf_15265546566067665047.plus.aac.p.m4a",
    release_date: "1993-09-21",
    rank: 124
  },
  {
    id: 125,
    title: "3 Feet High and Rising",
    artist: "De La Soul",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/17/43/a2/1743a2ab-0630-6527-cca5-a73d855df4a1/810098505963.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/87/49/fb/8749fbb8-88d0-1589-27c6-48e2492e8101/mzaf_13626901933803547458.plus.aac.p.m4a",
    release_date: "1989-03-03",
    rank: 125
  },
  {
    id: 126,
    title: "Moondance",
    artist: "Van Morrison",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/9a/c7/e2/9ac7e266-1f0d-997a-fe43-6741bc96eda6/081227963637.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/80/20/5a/80205a8d-9816-80a0-8cd4-e8a78f367490/mzaf_16423546555609360234.plus.aac.p.m4a",
    release_date: "1970-02-01",
    rank: 126
  },
  {
    id: 127,
    title: "Loaded",
    artist: "The Velvet Underground",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music62/v4/3e/64/ec/3e64ec37-bf54-e089-e4f4-8ff82907c934/mzm.bffnbhxs.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2b/85/3d/2b853d2a-8d1e-bd4b-b211-eaab17ca1cb9/mzaf_2003270620198321174.plus.aac.p.m4a",
    release_date: "1970-11-01",
    rank: 127
  },
  {
    id: 128,
    title: "Definitely Maybe",
    artist: "Oasis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/00/af/e3/00afe365-35f8-04cb-379a-e12abead71cd/5051961070132.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/52/a5/ba/52a5ba29-c07d-41f0-295b-1ceff13a4cb1/mzaf_4947876947094851032.plus.aac.p.m4a",
    release_date: "1994-08-29",
    rank: 128
  },
  {
    id: 129,
    title: "Demon Days",
    artist: "Gorillaz",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1c/0f/81/1c0f818a-e458-dd84-6f1b-ccbdf5fe14d6/825646291045.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/9f/ba/33/9fba33bf-4f45-9ec2-0aab-80b9f7d6c3e5/mzaf_3193562485044482866.plus.aac.p.m4a",
    release_date: "2005-05-23",
    rank: 129
  },
  {
    id: 130,
    title: "Rage Against the Machine",
    artist: "Rage Against the Machine",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8e/08/bf/8e08bf66-8690-1ba7-affb-fe173c08623d/074645295923.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d9/66/ee/d966eec0-f38d-1f40-961a-6b1ff6a9794e/mzaf_1438648303792446222.plus.aac.p.m4a",
    release_date: "1992-11-03",
    rank: 130
  },
  {
    id: 131,
    title: "Bitches Brew",
    artist: "Miles Davis",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/9b/e1/63/9be1630c-486d-760c-76cf-04282174700a/074646577424.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/9a/61/05/9a610566-2a4e-7736-6402-543a7200cab4/mzaf_14746105208488169655.plus.aac.p.m4a",
    release_date: "1970-04-01",
    rank: 131
  },
  {
    id: 132,
    title: "Santana",
    artist: "Santana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bc/fd/23/bcfd234d-657d-3e51-b92d-762fb4301b6d/886444593021.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b7/1d/4d/b71d4d54-21b1-6c29-5fff-f26e61a5c389/mzaf_2015481211642125585.plus.aac.p.m4a",
    release_date: "1969-08-30",
    rank: 132
  },
  {
    id: 133,
    title: "Siamese Dream",
    artist: "Smashing Pumpkins",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/3a/dc/08/3adc08b0-e98c-b5dd-943e-a37c7ed06205/13UABIM03615.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/15/64/1a/15641a19-3580-1629-ab64-2fcefd1336ec/mzaf_4153946855135298130.plus.aac.p.m4a",
    release_date: "1993-07-27",
    rank: 133
  },
  {
    id: 134,
    title: "Tommy",
    artist: "The Who",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f3/22/7f/f3227fd3-758e-2728-7db2-25b29373c8ae/18UMGIM35635.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/41/6e/8b/416e8bb8-8531-24cd-56fa-c44961d4669e/mzaf_12596653431302546279.plus.aac.p.m4a",
    release_date: "1969-05-23",
    rank: 134
  },
  {
    id: 135,
    title: "Speakerboxxx/The Love Below",
    artist: "OutKast",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/71/ae/6a/71ae6a46-99a6-e9d8-d7f3-41c0f2df45c4/196872579123.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9a/13/6a/9a136a12-b94c-7fee-d7ae-50bd711f1112/mzaf_89563845375737794.plus.aac.p.m4a",
    release_date: "2003-09-23",
    rank: 135
  },
  {
    id: 136,
    title: "At Last!",
    artist: "Etta James",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/25/46/17/2546176c-0f7c-b1a0-20b8-5200ebc6c473/16UMGIM27321.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/67/18/5e/67185ee9-aecc-8dd0-4f7b-a3ecb5a3b4ff/mzaf_7750868242870313549.plus.aac.p.m4a",
    release_date: "1960-11-15",
    rank: 136
  },
  {
    id: 137,
    title: "Here's Little Richard",
    artist: "Little Richard",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/6a/59/ba/6a59ba83-b62c-0aba-afdf-70112572352d/00888072025745.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/99/a3/50/99a350f2-a073-b5dc-3be9-dc54765bc16e/mzaf_572709223409242354.plus.aac.p.m4a",
    release_date: "1957-03-01",
    rank: 137
  },
  {
    id: 138,
    title: "Reasonable Doubt",
    artist: "Jay-Z",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/f5/5d/8a/f55d8a6b-9294-7f8f-441a-9d337059a364/270.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/74/18/70/7418701c-8719-6a96-48cc-5da2a5a8d547/mzaf_961414554076330188.plus.aac.p.m4a",
    release_date: "1996-06-25",
    rank: 138
  },
  {
    id: 139,
    title: "Music from Big Pink",
    artist: "The Band",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/44/eb/9f/44eb9ffc-8e77-9a3d-8be7-8ca579de93cc/13UACIM30926.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ea/4a/08/ea4a089c-1c38-b72e-5801-2a5d26befe99/mzaf_8796917369892240378.plus.aac.p.m4a",
    release_date: "1968-07-01",
    rank: 139
  },
  {
    id: 140,
    title: "Power, Corruption & Lies",
    artist: "New Order",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d2/3f/c8/d23fc8e7-3baa-eae3-7301-7a868d00ab09/825646053803.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2a/eb/23/2aeb23fc-7c67-0612-efef-cace5649fc7a/mzaf_3920263434050581191.plus.aac.p.m4a",
    release_date: "1983-05-02",
    rank: 140
  },
  {
    id: 141,
    title: "Closer",
    artist: "Joy Division",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Features114/v4/d9/2a/d1/d92ad12e-cdf2-e567-9612-af2fdfa82237/dj.uzqznczn.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/19/a6/54/19a654d2-ae33-d3fd-92bc-ad1171207923/mzaf_12260601832692783476.plus.aac.p.m4a",
    release_date: "1980-07-18",
    rank: 141
  },
  {
    id: 142,
    title: "Dookie",
    artist: "Green Day",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/88/83/e7/8883e74b-1b7c-0725-09de-21e4e00d54b5/093624915713.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/c2/c9/0f/c2c90fef-f994-111d-2afc-17747de6bc03/mzaf_8917420879191568081.plus.aac.p.m4a",
    release_date: "1994-02-01",
    rank: 142
  },
  {
    id: 143,
    title: "Post",
    artist: "Björk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/69/62/1c/69621c9a-514f-00cf-1de6-6e49f004fb28/075596174060.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9c/dd/11/9cdd11cd-8cdd-d900-7d86-e840d3d2ea6c/mzaf_9126218952563736457.plus.aac.p.m4a",
    release_date: "1995-06-13",
    rank: 143
  },
  {
    id: 144,
    title: "Fear of a Black Planet",
    artist: "Public Enemy",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/5f/56/ff/5f56ff7b-71b3-3e5f-208a-3b20d96bb4b0/06UMGIM21173.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b2/22/5c/b2225cd9-6ffe-317f-6093-a4c4cbf20616/mzaf_6029217797213338594.plus.aac.p.m4a",
    release_date: "1990-04-10",
    rank: 144
  },
  {
    id: 145,
    title: "Music",
    artist: "Madonna",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/1c/46/da/1c46da55-6dff-2c58-837e-bdd419ff9ca8/093624759829.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f7/3a/72/f73a728e-5e89-8c8d-69f2-578e6e2d1819/mzaf_6039980339395716833.plus.aac.p.m4a",
    release_date: "2000-09-18",
    rank: 145
  },
  {
    id: 146,
    title: "Super Fly",
    artist: "Curtis Mayfield",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c4/34/f0/c434f094-4c7e-3c62-8f15-cd02028e1ce7/603497885978.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d7/87/00/d7870058-f46e-08a8-64a1-d24a83c577c4/mzaf_16355087774459402943.plus.aac.p.m4a",
    release_date: "1972-07-14",
    rank: 146
  },
  {
    id: 147,
    title: "Brothers in Arms",
    artist: "Dire Straits",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/bd/54/e8bd54fd-6595-4ebf-aa4c-58139ed316e6/dj.bngafruf.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/22/e4/92/22e492ea-d19e-d154-d0e0-4fe4cc283996/mzaf_14466723799107475022.plus.aac.p.m4a",
    release_date: "1985-05-13",
    rank: 147
  },
  {
    id: 148,
    title: "The Score",
    artist: "Fugees",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0e/d1/5b/0ed15b14-271c-35d5-5909-49f18fbfb32b/886445600605.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/51/61/50/5161506a-b397-a7de-9165-60cce98ee4b8/mzaf_13073337438197226146.plus.aac.p.m4a",
    release_date: "1996-02-13",
    rank: 148
  },
  {
    id: 149,
    title: "MTV Unplugged in New York",
    artist: "Nirvana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/46/24/33/462433f9-ee74-2d60-4538-859826a7bed7/00720642472729.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/24/ab/c4/24abc43a-ec5e-a149-df97-210989a8fc7f/mzaf_17516118546009764028.plus.aac.p.m4a",
    release_date: "1994-11-01",
    rank: 149
  },
  {
    id: 150,
    title: "Bad",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8d/97/f4/8d97f427-2d17-1a51-1714-324483eb5fc1/886443546264.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/8b/c5/388bc5d3-310c-a3cc-af29-809afd5aa2fb/mzaf_4675496220866418725.plus.aac.p.m4a",
    release_date: "1987-08-31",
    rank: 150
  },
  {
    id: 151,
    title: "Weezer (Blue Album)",
    artist: "Weezer",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/d0/16/da/d016da24-577e-b584-3a5a-116efb5ca362/16UMGIM52971.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/1b/45/3b/1b453b39-0dfb-8128-f171-f3960a1ad21b/mzaf_107687258400386577.plus.aac.p.m4a",
    release_date: "1994-05-10",
    rank: 151
  },
  {
    id: 152,
    title: "Crosby, Stills & Nash",
    artist: "Crosby, Stills & Nash",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a0/ad/8a/a0ad8a5f-6805-b41a-c076-ee1f779d2a42/603497928323.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/08/dc/57/08dc5776-2df4-6ce1-7c80-6034ad2b6248/mzaf_10985082673586298208.plus.aac.p.m4a",
    release_date: "1969-05-29",
    rank: 152
  },
  {
    id: 153,
    title: "Elvis Presley",
    artist: "Elvis Presley",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c2/21/a8/c221a818-bc9f-675a-cecb-7dbc3bbe17a4/886444095242.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e6/6a/48/e66a48fd-afef-6de1-1cb9-65ec7ba3736b/mzaf_4841145739023933906.plus.aac.p.m4a",
    release_date: "1956-03-23",
    rank: 153
  },
  {
    id: 154,
    title: "Daydream Nation",
    artist: "Sonic Youth",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9a/55/3b/9a553bab-12a5-a385-31b7-720087fa3130/818756010958_cover.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e4/e8/3a/e4e83a53-027f-2eef-0d3f-e9558fd2867d/mzaf_11611864741895325008.plus.aac.p.m4a",
    release_date: "1988-10-18",
    rank: 154
  },
  {
    id: 155,
    title: "Meat Is Murder",
    artist: "The Smiths",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/74/1f/ff/741fff7e-e99e-757d-e600-e19d9df0d078/745099189563.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/27/87/49/27874950-d861-75a8-8efe-8a3037b447ec/mzaf_13187336429598076009.plus.aac.p.m4a",
    release_date: "1985-02-11",
    rank: 155
  },
  {
    id: 156,
    title: "Born in the U.S.A.",
    artist: "Bruce Springsteen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/72/68/327268ba-b9dd-b322-2a16-bdd0212df48c/074643865326.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/47/97/9e/47979e22-8765-4d1b-add9-49f48fe79746/mzaf_9314457552309258705.plus.aac.p.m4a",
    release_date: "1984-06-04",
    rank: 156
  },
  {
    id: 157,
    title: "Astral Weeks",
    artist: "Van Morrison",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/88/91/1b/88911b7b-a63f-4624-3fb1-2976b628c59a/603497886340.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a1/6f/6d/a16f6d1c-7338-62fe-9b41-aae77614d44c/mzaf_5097363580226178061.plus.aac.p.m4a",
    release_date: "1968-11-01",
    rank: 157
  },
  {
    id: 158,
    title: "Murmur",
    artist: "R.E.M.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/6c/e2/c3/6ce2c349-4169-df92-e5ca-2faba4cf087f/09UMGIM13824.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/e1/1f/2b/e11f2b0c-4ccc-3527-4913-9a8e036fa7f8/mzaf_8664395857872299472.plus.aac.p.m4a",
    release_date: "1983-04-12",
    rank: 158
  },
  {
    id: 159,
    title: "In the Court of the Crimson King",
    artist: "King Crimson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music5/v4/2f/c7/19/2fc71988-6871-be2c-6731-a3d0f2a6b232/Court_2500px.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/8f/71/0d/8f710d7e-7848-509d-61ff-d6e8e95b82f1/mzaf_10673333842927127196.plus.aac.p.m4a",
    release_date: "1969-10-10",
    rank: 159
  },
  {
    id: 160,
    title: "Homogenic",
    artist: "Björk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/80/01/7e/mzi.jmcslmlj.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/70/12/c1/7012c1d2-482e-643d-0203-d157f38a17c9/mzaf_2699281367921431203.plus.aac.p.m4a",
    release_date: "1997-09-22",
    rank: 160
  },
  {
    id: 161,
    title: "Nothing's Shocking",
    artist: "Jane's Addiction",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/01/10/3e/01103e60-0892-8fe2-3789-31ba2637237d/603497887576.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/17/21/5f/17215f6b-dd21-291a-6e81-8c030c674ae9/mzaf_16386502144906482582.plus.aac.p.m4a",
    release_date: "1988-08-23",
    rank: 161
  },
  {
    id: 162,
    title: "Exodus",
    artist: "Bob Marley and the Wailers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/f6/11/44/f61144b6-806c-3c9d-93d1-2dc611662336/17UMGIM95823.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/58/e8/9e/58e89e36-90d2-354a-2158-30af49279432/mzaf_953921667447123536.plus.aac.p.m4a",
    release_date: "1977-06-03",
    rank: 162
  },
  {
    id: 163,
    title: "The Freewheelin' Bob Dylan",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/63/3c/98/633c98ab-b4f3-3f40-798b-bdb49d923468/074640878626.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/86/db/13/86db13c7-3148-c3c3-13ef-d34aa8dd1b93/mzaf_7616061957856387732.plus.aac.p.m4a",
    release_date: "1963-05-27",
    rank: 163
  },
  {
    id: 164,
    title: "Meat Loaf - Bat Out of Hell",
    artist: "Meat Loaf",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/cd/90/b5/cd90b5c4-9379-92ae-da01-4b27ea00697b/886443775787.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/97/43/71/97437107-00fe-0e3e-ce77-7787108ab7a9/mzaf_10331480211947666678.plus.aac.p.m4a",
    release_date: "1977-10-21",
    rank: 164
  },
  {
    id: 165,
    title: "Synchronicity",
    artist: "The Police",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a4/67/ba/a467ba62-87df-9d10-98d2-c517f68ac870/16UMGIM60882.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b1/f9/fb/b1f9fb93-dffd-cd0f-ad03-f84e55147734/mzaf_17115672058268955962.plus.aac.p.m4a",
    release_date: "1983-06-17",
    rank: 165
  },
  {
    id: 166,
    title: "Licensed to Ill",
    artist: "Beastie Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/e4/d7/81/e4d781e8-bd3f-486a-cd18-e9b3a7d12b34/00731452735126.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/55/38/2a/55382a75-b018-df25-20b1-84ce68fd5373/mzaf_8683034412598570396.plus.aac.p.m4a",
    release_date: "1986-11-15",
    rank: 166
  },
  {
    id: 167,
    title: "Odelay",
    artist: "Beck",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/7f/cd/e2/7fcde2a5-93be-d7ed-a015-6969298b5d96/19UM1IM00477.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/df/38/ff/df38ffc2-a065-36fe-0c33-472f32ec1791/mzaf_14922065517739240034.plus.aac.p.m4a",
    release_date: "1996-06-18",
    rank: 167
  },
  {
    id: 168,
    title: "The Soft Bulletin",
    artist: "The Flaming Lips",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music113/v4/da/cc/ca/dacccae4-4f00-f451-6051-46d04a7d5099/093624911791.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/19/f5/3a/19f53ae0-bc45-9874-a950-a8645268aebc/mzaf_2975609157599388084.plus.aac.p.m4a",
    release_date: "1999-05-17",
    rank: 168
  },
  {
    id: 169,
    title: "Ray of Light",
    artist: "Madonna",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/dd/2b/8d/dd2b8d84-e032-94d2-473a-3f8efd18fe36/dj.rwfgroxa.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/70/89/f5/7089f568-0704-297e-a7b0-3a5821cf6a9b/mzaf_17227329976947751151.plus.aac.p.m4a",
    release_date: "1998-03-03",
    rank: 169
  },
  {
    id: 170,
    title: "Dig Me Out",
    artist: "Sleater-Kinney",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/2f/ad/dd/2fadddc8-116d-bc4a-0fbb-77d493a5681c/SleaterKinney_DigMeOut_1425.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/90/1b/ba/901bba26-e2f1-d057-4a88-526f3f31c9dd/mzaf_5325863054690202139.plus.aac.p.m4a",
    release_date: "1997-04-08",
    rank: 170
  },
  {
    id: 171,
    title: "The Stranger",
    artist: "Billy Joel",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/37/68/4c/37684c52-dbdf-9bfe-0d87-07492f43dc4c/dj.gmcbwich.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/92/d0/2c/92d02c17-65ea-5561-6505-44b7000acec9/mzaf_4142093251624687108.plus.aac.p.m4a",
    release_date: "1977-09-29",
    rank: 171
  },
  {
    id: 172,
    title: "Dig Your Own Hole",
    artist: "The Chemical Brothers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/54/c6/e4/54c6e459-524b-790c-80d6-5dee6cde1633/00724384295059.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview112/v4/29/3a/c9/293ac9a5-dca8-5210-67c1-aecea720079b/mzaf_17616101196129574015.plus.aac.p.m4a",
    release_date: "1997-04-07",
    rank: 172
  },
  {
    id: 173,
    title: "Paul's Boutique",
    artist: "Beastie Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/63/8c/46/638c461c-7bdd-5181-13c5-619b9c178a9f/13UABIM29394.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/5b/34/5f/5b345fe2-f591-4ca9-38d4-c8a7947c4f0d/mzaf_5824682091151241889.plus.aac.p.m4a",
    release_date: "1989-07-25",
    rank: 173
  },
  {
    id: 174,
    title: "Bringing It All Back Home",
    artist: "Bob Dylan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/61/ad/46/61ad469e-1e2d-da3c-6847-b939c07924f9/074640912825.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a2/eb/4f/a2eb4f8d-6215-4a44-ae85-8def58f4ba32/mzaf_14885110421792163818.plus.aac.p.m4a",
    release_date: "1965-03-22",
    rank: 174
  },
  {
    id: 175,
    title: "American Idiot",
    artist: "Green Day",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0e/17/f0/0e17f011-aadf-d4d1-1c7e-b61ce39f968b/093624947301.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/46/aa/66/46aa66b9-d664-e6ea-4681-4c6fae5c430d/mzaf_3243628110780033088.plus.aac.p.m4a",
    release_date: "2004-09-21",
    rank: 175
  },
  {
    id: 176,
    title: "Black Sabbath",
    artist: "Black Sabbath",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/62/8a/3d/628a3dc3-c862-8641-6306-64d7e7e8960a/075992718523.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/42/2d/b9/422db974-52a7-4d31-1276-2bd833e0ec75/mzaf_4497976836886329719.plus.aac.p.m4a",
    release_date: "1970-02-13",
    rank: 176
  },
  {
    id: 177,
    title: "Violent Femmes",
    artist: "Violent Femmes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/92/ba/7f/92ba7f8c-77f0-23d2-fbcb-6617785f940e/18CRGIM06158.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/92/c1/12/92c11215-9798-8a7d-f93f-4cbb2bfcd0cc/mzaf_6897907934447064928.plus.aac.p.m4a",
    release_date: "1983-04-01",
    rank: 177
  },
  {
    id: 178,
    title: "Head Hunters",
    artist: "Herbie Hancock",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/e5/f5/4fe5f511-462e-e87b-0711-d4e42809fb17/dj.goshfswo.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/38/4c/ad/384cad20-caef-1896-c860-d61ba7563f69/mzaf_2551244958972940205.plus.aac.p.m4a",
    release_date: "1973-10-26",
    rank: 178
  },
  {
    id: 179,
    title: "So",
    artist: "Peter Gabriel",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/29/d7/7d/29d77d60-24b8-f45b-936f-d8cf3ce52d8d/884108003503.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fa/22/f7/fa22f780-d6b3-7f79-bd6f-917d97f7f7fc/mzaf_12203058584136347938.plus.aac.p.m4a",
    release_date: "1986-05-19",
    rank: 179
  },
  {
    id: 180,
    title: "Back in Black",
    artist: "AC/DC",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1e/14/58/1e145814-281a-58e0-3ab1-145f5d1af421/886443673441.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e7/7d/25/e77d252b-b9d2-d5b5-4f73-8e1cb75cca19/mzaf_5673079058814175168.plus.aac.p.m4a",
    release_date: "1980-07-25",
    rank: 180
  },
  {
    id: 181,
    title: "Loveless",
    artist: "My Bloody Valentine",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/f9/7e/6b/f97e6b94-f307-ae7f-e94c-d74860a44350/887830016094.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/05/9d/0d/059d0ddb-ad99-210e-d454-7b42555f0e01/mzaf_10944168424933317890.plus.aac.p.m4a",
    release_date: "1991-11-04",
    rank: 181
  },
  {
    id: 182,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/82/3b/60/823b6012-8dd5-b74c-55d0-6a104ec91430/06UMGIM04056.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/20/a4/92/20a49265-4541-516a-3e7f-928767123565/mzaf_16810646058963162444.plus.aac.p.m4a",
    release_date: "1999-02-23",
    rank: 182
  },
  {
    id: 183,
    title: "Discovery",
    artist: "Daft Punk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/fd/4a/77/fd4a77db-0ebc-d043-41a2-f32fa1bb0fb4/dj.qrikkdwj.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/9a/10/16/9a101659-7e2b-2af5-47ca-2399aa11d41d/mzaf_2308252532029859970.plus.aac.p.m4a",
    release_date: "2001-03-12",
    rank: 183
  },
  {
    id: 184,
    title: "White Light/White Heat",
    artist: "The Velvet Underground",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/ee/ac/91/eeac9154-5178-ebbc-be57-81bfb11f8ce7/00602537589678.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/a3/97/4b/a3974b82-4c8c-f270-7bd4-73c12ee442f0/mzaf_3947296069466280491.plus.aac.p.m4a",
    release_date: "1968-01-30",
    rank: 184
  },
  {
    id: 185,
    title: "Layla and Other Assorted Love Songs",
    artist: "Derek and the Dominos",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/89/ed/29/89ed29be-8412-0b5a-1df0-295fb5337dd6/00600753314289.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/94/e8/01/94e80130-1c56-d474-d742-d5925eb76725/mzaf_4915490710680006786.plus.aac.p.m4a",
    release_date: "1970-11-09",
    rank: 185
  },
  {
    id: 186,
    title: "Is This It",
    artist: "The Strokes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Features115/v4/ea/04/d4/ea04d45d-6f5d-ede6-fb64-71f3e6a6e62f/dj.ojkzzidd.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ca/5e/ef/ca5eef9d-ac81-4097-89d4-8e35f0bac2ac/mzaf_4249669243958107881.plus.aac.p.m4a",
    release_date: "2001-07-30",
    rank: 186
  },
  {
    id: 187,
    title: "Tragic Kingdom",
    artist: "No Doubt",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/fe/0a/68/fe0a687a-537e-e902-0778-90465c118f77/00602547870575.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/6b/34/a0/6b34a078-dfbd-3796-f021-561b44e1b330/mzaf_8948020623710274653.plus.aac.p.m4a",
    release_date: "1995-10-10",
    rank: 187
  },
  {
    id: 188,
    title: "Elephant",
    artist: "The White Stripes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/07/25/09/0725098a-09f4-f240-e551-94384a590371/886448799009.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/61/54/97/61549744-a83b-1c4d-58cf-e56b36beb4a7/mzaf_1246579179619940831.plus.aac.p.m4a",
    release_date: "2003-04-01",
    rank: 188
  },
  {
    id: 189,
    title: "Funeral",
    artist: "Arcade Fire",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/2b/09/6e/2b096e8c-ae65-fc42-a4b1-19abb4100433/886446576442.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/48/06/30/4806304b-864b-2245-3132-2a7afb024cda/mzaf_3214310670253708667.plus.aac.p.m4a",
    release_date: "2004-09-14",
    rank: 189
  },
  {
    id: 190,
    title: "Songs for the Deaf",
    artist: "Queens of the Stone Age",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ee/48/7e/ee487e5e-dbfb-e54d-e967-b0e3f7b4cfef/00602517417199.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a4/cd/ec/a4cdec17-fa26-87c4-60a3-b09a839ef675/mzaf_13452283902132739988.plus.aac.p.m4a",
    release_date: "2002-08-27",
    rank: 190
  },
  {
    id: 191,
    title: "American Beauty",
    artist: "Grateful Dead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/f5/27/20/f5272061-2466-6375-c2d1-f20d14be569f/603497920952.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/0e/1b/fa/0e1bfa29-90b6-093a-f5f4-82855a120fe7/mzaf_13140355652441833900.plus.aac.p.m4a",
    release_date: "1970-11-01",
    rank: 191
  },
  {
    id: 192,
    title: "Whatever People Say I Am, That's What I'm Not",
    artist: "Arctic Monkeys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Features125/v4/cf/9b/96/cf9b9637-f619-eceb-5382-e9b4d44e74fb/dj.npwkgmai.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/d5/fa/0b/d5fa0b43-8a9d-71b8-c174-06120380e2f2/mzaf_9555095373337300237.plus.aac.p.m4a",
    release_date: "2006-01-23",
    rank: 192
  },
  {
    id: 193,
    title: "Turn on the Bright Lights",
    artist: "Interpol",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/be/ef/aa/beefaad1-64ba-1288-d2ce-95a5964a020b/744861054566.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e6/23/e8/e623e857-5975-2283-1c03-afe7bbdc371a/mzaf_15464406628593306920.plus.aac.p.m4a",
    release_date: "2002-08-20",
    rank: 193
  },
  {
    id: 194,
    title: "Rust Never Sleeps",
    artist: "Neil Young & Crazy Horse",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/9a/65/18/9a6518c2-850f-f40a-5bad-540a9ef4ad70/093624924708.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/be/cc/e7/becce7ff-1079-aa99-0ebc-8727bc99b8ae/mzaf_12047780586136925897.plus.aac.p.m4a",
    release_date: "1979-06-22",
    rank: 194
  },
  {
    id: 195,
    title: "Darkness on the Edge of Town",
    artist: "Bruce Springsteen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/b3/13/4e/b3134ed3-a05d-d3b2-8f96-8cddd067aa32/884977798753.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/48/7c/ae/487caea8-dcf8-a1a0-0550-6623c46e4fa5/mzaf_7180152401670576082.plus.aac.p.m4a",
    release_date: "1978-06-02",
    rank: 195
  },
  {
    id: 196,
    title: "Random Access Memories",
    artist: "Daft Punk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e8/43/5f/e8435ffa-b6b9-b171-40ab-4ff3959ab661/886443919266.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/ce/15/b1/ce15b154-2b27-9d65-4d12-7736f3e029c2/mzaf_15463046040604482889.plus.aac.p.m4a",
    release_date: "2013-05-17",
    rank: 196
  },
  {
    id: 197,
    title: "Fresh Fruit for Rotting Vegetables",
    artist: "Dead Kennedys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/37/b9/b9/37b9b9e1-3340-2864-e4c4-3a677a2466c4/767004290720_Cover.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/73/3a/30/733a3040-452b-266a-cac6-64dc495ccc2c/mzaf_15781433871585553166.plus.aac.p.m4a",
    release_date: "1980-09-02",
    rank: 197
  },
  {
    id: 198,
    title: "In Rainbows",
    artist: "Radiohead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/dd/50/c7/dd50c790-99ac-d3d0-5ab8-e3891fb8fd52/634904032463.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7a/1c/68/7a1c6810-0a1e-bca7-d3af-e9984fbd938b/mzaf_10305004532975521267.plus.aac.p.m4a",
    release_date: "2007-10-10",
    rank: 198
  },
  {
    id: 199,
    title: "Aladdin Sane",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/aa/3e/32aa3eeb-830e-e378-dd40-ac2b701066d8/825646123582.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f4/a4/5a/f4a45a3e-81c6-b33e-4070-985318088bbe/mzaf_5394154194450773484.plus.aac.p.m4a",
    release_date: "1973-04-13",
    rank: 199
  },
  {
    id: 200,
    title: "Alive!",
    artist: "Kiss",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/ea/70/91/ea70918a-2d22-7bab-35ec-24c890880d12/06UMGIM02296.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/38/6d/5c/386d5cf3-7d5d-222a-2bfb-d7ef62952384/mzaf_15140622148242007830.plus.aac.p.m4a",
    release_date: "1975-09-10",
    rank: 200
  },
  {
    id: 201,
    title: "Young Americans",
    artist: "David Bowie",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/0a/a7/0c/0aa70c09-e325-3900-6a5e-1557ff7ce710/190295990329.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/55/54/6f/55546fed-00e5-958c-6a4a-f85241ab26c2/mzaf_11850948229286846561.plus.aac.p.m4a",
    release_date: "1975-03-07",
    rank: 201
  },
  {
    id: 202,
    title: "Houses of the Holy",
    artist: "Led Zeppelin",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/4f/88/ad/4f88ad28-3953-fded-6c18-fe87b5d0dc7b/dj.iqdrlirx.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/0c/1d/df/0c1ddfd2-26ce-fac1-588d-469b92c6a6d3/mzaf_317165064203611330.plus.aac.p.m4a",
    release_date: "1973-03-28",
    rank: 202
  },
  {
    id: 203,
    title: "21",
    artist: "Adele",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/d8/e3/f9/d8e3f9ea-d6fe-9a1b-9f13-109983d3062e/191404113868.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/26/b0/54/26b0549c-ac6b-6c05-c93c-40cea9a46c43/mzaf_7826805358339553927.plus.aac.p.m4a",
    release_date: "2011-01-19",
    rank: 203
  },
  {
    id: 204,
    title: "Thriller (25th Anniversary Edition)",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/01/2a/b5/012ab507-1b6e-198c-0f9d-5e44a2c2b919/mzaf_16660153232571583201.plus.aac.p.m4a",
    release_date: "2008-02-08",
    rank: 204
  },
  {
    id: 205,
    title: "Songs of Leonard Cohen",
    artist: "Leonard Cohen",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d8/5a/08/d85a084b-2295-680e-871f-226daa83de5c/196873434049.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d3/1e/fb/d31efb82-ea0e-43db-c6fe-f7b8ba4a9be7/mzaf_5721146869265760982.plus.aac.p.m4a",
    release_date: "1967-12-27",
    rank: 205
  },
  {
    id: 206,
    title: "Only Built 4 Cuban Linx...",
    artist: "Raekwon",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/8e/fb/f2/8efbf20d-84d2-5b34-f617-6a026e1bacee/05099996879351.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/0b/6a/fb/0b6afb22-5a4b-eb72-b020-79c933237538/mzaf_15433473370028306777.plus.aac.p.m4a",
    release_date: "1995-08-01",
    rank: 206
  },
  {
    id: 207,
    title: "Mezzanine",
    artist: "Massive Attack",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0a/98/55/0a98555b-8d9d-3b46-660a-b91261557d17/00724384559953.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/24/fa/74/24fa74f0-7762-ce8f-a82c-daaf2528f880/mzaf_5011728731736259680.plus.aac.p.m4a",
    release_date: "1998-04-20",
    rank: 207
  },
  {
    id: 208,
    title: "The Slim Shady LP",
    artist: "Eminem",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/82/3b/60/823b6012-8dd5-b74c-55d0-6a104ec91430/06UMGIM04056.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/20/a4/92/20a49265-4541-516a-3e7f-928767123565/mzaf_16810646058963162444.plus.aac.p.m4a",
    release_date: "1999-02-23",
    rank: 208
  },
  {
    id: 209,
    title: "John Lennon/Plastic Ono Band",
    artist: "John Lennon",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/f1/ba/ad/f1baadd5-df47-406e-f4be-603eff9d9e3c/13UABIM11969.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3a/5f/9d/3a5f9dc6-8d41-542c-889a-8eeaa167f6d7/mzaf_17167420538954691197.plus.aac.p.m4a",
    release_date: "1970-12-11",
    rank: 209
  },
  {
    id: 210,
    title: "Mellon Collie and the Infinite Sadness",
    artist: "Smashing Pumpkins",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/ca/ce/b2/caceb2ed-50f0-c666-e4d0-165a0a1541fc/13UABIM04008.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b2/bf/49/b2bf490c-c5c8-385e-d257-55d46b424644/mzaf_17871092097330216413.plus.aac.p.m4a",
    release_date: "1995-10-24",
    rank: 210
  },
  {
    id: 211,
    title: "Pretzel Logic",
    artist: "Steely Dan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/49/6e/70/496e703c-f15e-8e95-821c-f94fac1f4c8e/23UMGIM50278.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/f2/b5/22/f2b52201-8666-2e56-0f19-c01244925653/mzaf_6444459176380717379.plus.aac.p.m4a",
    release_date: "1974-02-20",
    rank: 211
  },
  {
    id: 212,
    title: "Kick",
    artist: "INXS",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/04/ca/65/04ca65d0-c796-3f9b-0446-f013dfc1a8d9/603497838899.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b5/ce/85/b5ce856a-74ba-efb8-5126-ff771261df3e/mzaf_4840450252503785860.plus.aac.p.m4a",
    release_date: "1987-10-19",
    rank: 212
  },
  {
    id: 213,
    title: "Mama Said Knock You Out",
    artist: "LL Cool J",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/19/7e/e0/197ee0b3-d43d-ee74-9a7f-586f3931e51b/00731452347725.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/fa/1c/1e/fa1c1ee7-699d-e25e-f998-0463ba06e3d4/mzaf_8574581585368250643.plus.aac.p.m4a",
    release_date: "1990-09-04",
    rank: 213
  },
  {
    id: 214,
    title: "Aja",
    artist: "Steely Dan",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c2/3c/54/c23c5414-20d1-7aea-f0f5-187974c58d65/23UMGIM79990.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/84/d2/c3/84d2c399-f366-30e3-1e4a-cf81e5a000fb/mzaf_5603870882962646364.plus.aac.p.m4a",
    release_date: "1977-09-23",
    rank: 214
  },
  {
    id: 215,
    title: "Goo",
    artist: "Sonic Youth",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/ec/b5/df/ecb5dfa7-e50f-d44e-eef0-9a4c38abc76f/00602547570017.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/92/50/bd/9250bdc9-af97-917d-563e-9407c730db8c/mzaf_6117177262573909815.plus.aac.p.m4a",
    release_date: "1990-06-26",
    rank: 215
  },
  {
    id: 216,
    title: "The College Dropout",
    artist: "Kanye West",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/15/05/09/15050911-a2f1-9ebc-0d16-6e8faad1cf80/00602567924326.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/2d/5c/ea/2d5cea77-a56f-50ec-c6dc-f74a04d832dd/mzaf_822615455610190516.plus.aac.p.m4a",
    release_date: "2004-02-10",
    rank: 216
  },
  {
    id: 217,
    title: "Pleased to Meet Me",
    artist: "The Replacements",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/da/63/5e/mzi.lfwlkpez.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview122/v4/ae/a5/74/aea574fd-0cfa-880e-3e7a-acbf1de408cb/mzaf_2392088022850715161.plus.aac.p.m4a",
    release_date: "1987-04-28",
    rank: 217
  },
  {
    id: 218,
    title: "Thirteen",
    artist: "Big Star",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/a5/7e/f7a57efe-0099-728d-de70-7527d91b954e/cover.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bc/fc/69/bcfc69a4-cd62-3fc0-916a-f455ee54a7e9/mzaf_12418586343256806409.plus.aac.p.m4a",
    release_date: "1972-07-01",
    rank: 218
  },
  {
    id: 219,
    title: "Let It Be",
    artist: "The Beatles",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ae/98/4c/ae984c7a-cd06-a7cd-e8bf-32cb15ba698d/00602567705475.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/0f/f7/e1/0ff7e145-6be6-4341-4fa1-32999d20707f/mzaf_15493778815944217662.plus.aac.p.m4a",
    release_date: "1970-05-08",
    rank: 219
  },
  {
    id: 220,
    title: "Thriller",
    artist: "Michael Jackson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/32/4f/fd/324ffda2-9e51-8f6a-0c2d-c6fd2b41ac55/074643811224.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/58/8c/cb/588ccb9a-ab79-4a38-43b5-d4c24ea42859/mzaf_2083607504726567992.plus.aac.p.m4a",
    release_date: "1982-11-30",
    rank: 220
  },
  {
    id: 221,
    title: "Dirty Mind",
    artist: "Prince",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/c3/a5/8c/c3a58ccb-18d8-a6e4-4fb1-a3c4797806f3/886448892984.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/ea/19/5f/ea195fab-54f4-f693-e02c-c2a63bf16b2f/mzaf_5348788563096302739.plus.aac.p.m4a",
    release_date: "1980-10-08",
    rank: 221
  },
  {
    id: 222,
    title: "Yankee Hotel Foxtrot",
    artist: "Wilco",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/79/1d/3c/791d3cfe-d1b0-67a9-acbd-559fd83b3401/075597966961.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/44/86/ea/4486ea54-6e7f-48ab-6d5c-f283fd8bfe50/mzaf_15749072995880483661.plus.aac.p.m4a",
    release_date: "2002-04-23",
    rank: 222
  },
  {
    id: 223,
    title: "Appetite for Destruction",
    artist: "Guns N' Roses",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/a0/4d/c4/a04dc484-03cc-02aa-fa82-5334fcb4bc16/18UMGIM24878.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cd/ed/17/cded17d5-ee32-1b97-7a11-527ab7b677d7/mzaf_2128362282849775567.plus.aac.p.m4a",
    release_date: "1987-07-21",
    rank: 223
  },
  {
    id: 224,
    title: "Red Headed Stranger",
    artist: "Willie Nelson",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/88/d6/67/88d6676e-67ce-f907-d4fe-eae50f805f63/074643348225.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/d9/31/da/d931da9e-ab6d-83d8-38de-9dd5d72ce86d/mzaf_10848358622579858947.plus.aac.p.m4a",
    release_date: "1975-05-01",
    rank: 224
  },
  {
    id: 225,
    title: "Entertainment!",
    artist: "Gang of Four",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/de/5d/41/de5d41cf-eed8-3819-86dc-9f0a136efabe/191401156462.png/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/89/fd/fe/89fdfe1c-8a17-7782-2635-90c3dc438ab4/mzaf_1994294452528411201.plus.aac.p.m4a",
    release_date: "1979-09-01",
    rank: 225
  },
  {
    id: 226,
    title: "Trans-Europe Express",
    artist: "Kraftwerk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e2/80/bc/e280bcf9-4048-8c42-2b6b-d8b9c9bbed52/5099996602058_1500x1500_300dpi.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/43/b2/b0/43b2b010-156f-b321-30ab-48a5aff07d02/mzaf_3115365669483405076.plus.aac.p.m4a",
    release_date: "1977-03-01",
    rank: 226
  },
  {
    id: 227,
    title: "Hello Nasty",
    artist: "Beastie Boys",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music128/v4/31/2c/df/312cdf13-5ec0-5488-0289-419e1b1f79e4/00724383771653.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/56/f6/6e/56f66edd-c323-3e20-abf1-a7b2c2cf2d0c/mzaf_16981923539670451478.plus.aac.p.m4a",
    release_date: "1998-07-14",
    rank: 227
  },
  {
    id: 228,
    title: "The Suburbs",
    artist: "Arcade Fire",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ea/9f/1a/ea9f1ab0-4cac-c925-590d-14461f676912/886446576510.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/01/c9/16/01c91671-0b00-9a35-57ea-17b8a72eba38/mzaf_1371304302885385649.plus.aac.p.m4a",
    release_date: "2010-08-02",
    rank: 228
  },
  {
    id: 229,
    title: "Hot Fuss",
    artist: "The Killers",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/1a/5a/071a5aee-6e42-060c-35b9-6a6e45b9ea59/06UMGIM10441.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/72/87/ad/7287ad98-6919-79d2-27ab-ae614ab31c7f/mzaf_17132484015775786271.plus.aac.p.m4a",
    release_date: "2004-06-15",
    rank: 229
  },
  {
    id: 230,
    title: "Room on Fire",
    artist: "The Strokes",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/f7/e9/2a/f7e92a48-0e20-8286-bbbf-80bd85fbb1af/mzi.gcledsjj.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/47/a1/4c/47a14cf3-bf73-cc57-933e-a9929903bb85/mzaf_11799304496117316449.plus.aac.p.m4a",
    release_date: "2003-10-28",
    rank: 230
  },
  {
    id: 231,
    title: "Currents",
    artist: "Tame Impala",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/64/48/5c/64485cc9-968c-68cc-764e-9a7c71733def/00602567155454.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/8d/60/fb/8d60fb3b-208b-70db-f712-801034be3130/mzaf_14872027621360090334.plus.aac.p.m4a",
    release_date: "2015-07-17",
    rank: 231
  },
  {
    id: 232,
    title: "Dummy",
    artist: "Portishead",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/c1/71/93/c1719342-df7d-e9c5-c87c-53dae5afb289/00042282855329.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/e9/12/99/e91299a5-115b-85d5-c6a5-7d7ffca699cf/mzaf_16022543165233599469.plus.aac.p.m4a",
    release_date: "1994-08-22",
    rank: 232
  },
  {
    id: 233,
    title: "Silent Alarm",
    artist: "Bloc Party",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/y2005/m03/d14/h21/s06.kpabadxl.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/99/da/e7/99dae7e3-c8c4-7bc2-0e30-29674666d09c/mzaf_11848459001791633112.plus.aac.p.m4a",
    release_date: "2005-02-14",
    rank: 233
  },
  {
    id: 234,
    title: "The Colour of Spring",
    artist: "Talk Talk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/98/0f/9b/980f9bcc-f049-f0e9-a762-46578ad0adf0/dj.ahsuktom.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/93/fa/40/93fa4074-e57c-61ca-b58f-a57d3c9d0ac6/mzaf_6518020022425030748.plus.aac.p.m4a",
    release_date: "1986-02-24",
    rank: 234
  },
  {
    id: 235,
    title: "Abraxas",
    artist: "Santana",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/30/03/7f/30037fd6-3292-1806-c806-5341391c9aac/886444593038.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/1c/ba/87/1cba87e2-2d36-cb55-40bc-e7e1e0a55604/mzaf_14636445199027856789.plus.aac.p.m4a",
    release_date: "1970-09-23",
    rank: 235
  },
  {
    id: 236,
    title: "Rust Never Sleeps",
    artist: "Neil Young",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music1/v4/9a/65/18/9a6518c2-850f-f40a-5bad-540a9ef4ad70/093624924708.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/be/cc/e7/becce7ff-1079-aa99-0ebc-8727bc99b8ae/mzaf_12047780586136925897.plus.aac.p.m4a",
    release_date: "1979-07-02",
    rank: 236
  },
  {
    id: 237,
    title: "Rated R",
    artist: "Queens of the Stone Age",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music118/v4/9e/5f/17/9e5f17fb-6c19-590d-4891-b31e06462bd1/00602517425835.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/e4/77/67/e4776781-8b97-fff3-67b3-7557691e6596/mzaf_18204190184118787622.plus.aac.p.m4a",
    release_date: "2000-06-06",
    rank: 237
  },
  {
    id: 238,
    title: "I Am...",
    artist: "Nas",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d0/88/20/d0882040-a591-c85e-fa24-87a6edbf6a39/074646975329.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/77/50/84/7750848d-5d6d-134e-6ad2-72921a5ae4b1/mzaf_14963607388882747606.plus.aac.p.m4a",
    release_date: "1999-04-06",
    rank: 238
  },
  {
    id: 239,
    title: "You're Living All Over Me",
    artist: "Dinosaur Jr.",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/9c/73/59/9c73597a-d4fd-6726-4524-ad87333fe2b9/cover.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/6b/b8/62/6bb8625f-ce3c-6469-377f-c9633dd83b2f/mzaf_15196045924922004.plus.aac.p.m4a",
    release_date: "1987-07-01",
    rank: 239
  },
  {
    id: 240,
    title: "Sam Cooke at the Copa",
    artist: "Sam Cooke",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/47/4d/00/474d0063-12a9-d94b-0cb0-b8baa5e04343/15ABKIM00034.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2d/69/9a/2d699a8f-828e-63ab-51e3-e0186eb6e592/mzaf_229907417029768779.plus.aac.p.m4a",
    release_date: "1964-10-01",
    rank: 240
  },
  {
    id: 241,
    title: "Technique",
    artist: "New Order",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/49/51/83/4951838a-1b2f-35c3-3984-89e87f288288/825646051021.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/60/a4/d6/60a4d6c6-e738-c7fe-38ac-e9358bc607b4/mzaf_14881252284726240288.plus.aac.p.m4a",
    release_date: "1989-01-30",
    rank: 241
  },
  {
    id: 242,
    title: "Remain in Light",
    artist: "Talking Heads",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music/87/5f/5b/mzi.zzquknhm.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b1/44/9d/b1449d35-5812-e1a5-e1de-0bf501759207/mzaf_16841230900131618285.plus.aac.p.m4a",
    release_date: "1980-10-08",
    rank: 242
  },
  {
    id: 243,
    title: "Maggot Brain",
    artist: "Funkadelic",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/c4/19/49/c4194943-0b41-5987-b2e8-193b74ea70ed/artwork.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/28/3c/e1/283ce111-e199-9ec0-b87a-86eaaa85bdcb/mzaf_13252658475940650056.plus.aac.p.m4a",
    release_date: "1971-07-12",
    rank: 243
  },
  {
    id: 244,
    title: "Stop Making Sense",
    artist: "Talking Heads",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/57/94/37/57943788-4a20-07db-1ed9-1fd526a7d0f4/mzi.wfxekfgc.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/73/be/6e/73be6e97-4414-aa0b-5b7a-21c7dcdc207f/mzaf_15800315593807489948.plus.aac.p.m4a",
    release_date: "1984-10-01",
    rank: 244
  },
  {
    id: 245,
    title: "Fever to Tell",
    artist: "Yeah Yeah Yeahs",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/1c/9b/9a/1c9b9a3e-099c-b3d6-c3ce-4a270a2d221c/17UM1IM27260.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/5e/66/5c/5e665cdf-0fb1-bfdc-4918-f404973e2f2c/mzaf_5791198614670144572.plus.aac.p.m4a",
    release_date: "2003-04-28",
    rank: 245
  },
  {
    id: 246,
    title: "The Band",
    artist: "The Band",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/ca/b2/06/cab20688-46b7-e7be-c64a-dbbeeb2fc864/15UMGIM06558.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d7/c4/7e/d7c47ead-115a-46c7-b470-2efd2c1e3b44/mzaf_5283724448606145747.plus.aac.p.m4a",
    release_date: "1969-09-22",
    rank: 246
  },
  {
    id: 247,
    title: "Feels Like Home",
    artist: "Norah Jones",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/16/bf/bd/16bfbd53-3e83-c840-bdf6-053326af381b/05099946404855.rgb.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/2d/66/d4/2d66d48f-72b6-4b8c-315a-d392b2c6d8f9/mzaf_4032533871395368472.plus.aac.p.m4a",
    release_date: "2004-02-10",
    rank: 247
  },
  {
    id: 248,
    title: "Buena Vista Social Club",
    artist: "Buena Vista Social Club",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/5a/93/8b/5a938b3e-a74d-9c8b-dcf1-c9c1f83498da/4050538455618.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview116/v4/76/15/8d/76158dba-8527-6c8d-72b3-c0b2d35e5399/mzaf_10487625414141182513.plus.aac.p.m4a",
    release_date: "1997-09-16",
    rank: 248
  },
  {
    id: 249,
    title: "Spirit of Eden",
    artist: "Talk Talk",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/36/84/e8/3684e84e-5b87-f5d3-3e93-500c9807aefd/724385712951.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/60/6e/2b/606e2b6e-7325-b2cd-cc46-7075b96a8407/mzaf_5526497764175437775.plus.aac.p.m4a",
    release_date: "1988-09-12",
    rank: 249
  },
  {
    id: 250,
    title: "Hounds of Love",
    artist: "Kate Bush",
    cover_url: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2c/3e/c9/2c3ec991-0f6e-bec3-7eff-750f50c5b3a6/cover.jpg/600x600bb.jpg",
    preview_url: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/3a/e7/1d/3ae71d3f-56cf-8e72-5312-af60e3b5ac06/mzaf_1919105001560352476.plus.aac.p.m4a",
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
