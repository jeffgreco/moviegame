-- Migration to add is_replay column
ALTER TABLE game_completions ADD COLUMN is_replay INTEGER NOT NULL DEFAULT 0;
