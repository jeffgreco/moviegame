-- Game completions tracking for Filmstrip
-- Run: wrangler d1 execute filmstrip-games --file=./schema.sql

-- Main table for all game completions
CREATE TABLE IF NOT EXISTS game_completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- Player identification (anonymous fingerprint)
    player_id TEXT NOT NULL,

    -- Game mode: 'daily', 'random', 'archive', 'challenge'
    game_mode TEXT NOT NULL,

    -- Score data
    score INTEGER NOT NULL,           -- bestStreak value
    total_movies INTEGER,             -- Total movies in puzzle (for daily/archive)
    won INTEGER NOT NULL DEFAULT 0,   -- 1 if completed all movies, 0 if failed

    -- Puzzle identification (for daily/archive modes)
    puzzle_id TEXT,                   -- 5-char puzzle ID
    puzzle_number INTEGER,            -- Sequential puzzle number
    puzzle_theme TEXT,                -- Theme name

    -- For random mode - track the movies in timeline order
    movie_ids TEXT,                   -- JSON array of TMDB movie IDs in timeline order

    -- Timestamps
    completed_at TEXT NOT NULL DEFAULT (datetime('now')),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_player_id ON game_completions(player_id);
CREATE INDEX IF NOT EXISTS idx_game_mode ON game_completions(game_mode);
CREATE INDEX IF NOT EXISTS idx_puzzle_id ON game_completions(puzzle_id);
CREATE INDEX IF NOT EXISTS idx_score ON game_completions(score DESC);
CREATE INDEX IF NOT EXISTS idx_completed_at ON game_completions(completed_at);

-- Index for finding high-score random games
CREATE INDEX IF NOT EXISTS idx_random_high_scores ON game_completions(game_mode, score DESC)
    WHERE game_mode = 'random';

-- Index for player's puzzle history
CREATE INDEX IF NOT EXISTS idx_player_puzzles ON game_completions(player_id, game_mode, puzzle_id);

-- View for random mode leaderboard
CREATE VIEW IF NOT EXISTS random_leaderboard AS
SELECT
    id,
    player_id,
    score,
    movie_ids,
    completed_at
FROM game_completions
WHERE game_mode = 'random' AND score >= 10
ORDER BY score DESC
LIMIT 100;

-- View for daily puzzle stats
CREATE VIEW IF NOT EXISTS daily_stats AS
SELECT
    puzzle_id,
    puzzle_number,
    puzzle_theme,
    total_movies,
    COUNT(*) as attempts,
    SUM(CASE WHEN won = 1 THEN 1 ELSE 0 END) as completions,
    ROUND(AVG(score), 1) as avg_score,
    MAX(score) as high_score
FROM game_completions
WHERE game_mode = 'daily'
GROUP BY puzzle_id
ORDER BY puzzle_number DESC;
