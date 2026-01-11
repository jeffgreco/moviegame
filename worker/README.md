# Filmstrip Game Tracker

Cloudflare Worker with D1 database for tracking game completions.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create the D1 database:
   ```bash
   npm run db:create
   ```

3. Copy the database ID from the output and update `wrangler.toml`

4. Initialize the database schema:
   ```bash
   npm run db:init
   ```

5. Update `CORS_ORIGIN` in `wrangler.toml` to your GitHub Pages URL

## Development

Run locally with:
```bash
npm run dev
```

Initialize local database:
```bash
npm run db:init:local
```

## Deployment

```bash
npm run deploy
```

## API Endpoints

### POST /api/complete
Submit a game completion.

**Request body:**
```json
{
  "playerId": "anonymous-fingerprint",
  "gameMode": "daily|random|archive|challenge",
  "score": 5,
  "won": true,
  "totalMovies": 10,
  "puzzleId": "abc12",
  "puzzleNumber": 42,
  "puzzleTheme": "Oscar Winners",
  "movieIds": [123, 456, 789],
  "completedAt": "2024-01-15T12:00:00Z"
}
```

### GET /api/history?playerId=xxx&gameMode=daily&limit=50
Get player's score history.

### GET /api/puzzle/:puzzleId
Get statistics for a specific puzzle.

### GET /api/random/top?limit=25&minScore=10
Get top random mode scores (hall of fame).

### GET /api/stats
Get overall game statistics.
