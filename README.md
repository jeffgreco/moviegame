# Movie Timeline Game

https://filmstrip.mov
A browser game where you arrange movie posters in chronological order based on their US release dates.

## How to Play

1. A timeline starts with a single movie poster
2. Drag the movie from the draw pile onto the timeline
3. Place it in the correct chronological position (before or after existing movies)
4. If correct, you score points and get a new movie to place
5. If wrong, the game ends and shows you the correct year

## Live Demo

Play at: [Your GitHub Pages URL]

## Development

### Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
npx serve .
```

### Updating Movie Data

The game comes with a pre-loaded dataset of popular movies. To fetch fresh data from TMDB:

1. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api)
2. Run the fetch script:

```bash
TMDB_API_KEY=your_key_here npm run fetch-movies
```

Or trigger the "Update Movie Data" GitHub Action manually (requires `TMDB_API_KEY` secret).

## Deployment

The game is deployed automatically to GitHub Pages when pushing to main/master.

To enable GitHub Pages:

1. Go to repository Settings → Pages
2. Under "Build and deployment", select "GitHub Actions"

## Tech Stack

- Vanilla HTML/CSS/JavaScript (no build step required)
- [TMDB API](https://www.themoviedb.org/) for movie data and posters
- GitHub Pages for hosting

## Credits

Movie data and images provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).

This product uses the TMDB API but is not endorsed or certified by TMDB.
