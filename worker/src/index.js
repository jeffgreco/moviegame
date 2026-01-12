/**
 * Filmstrip Game Tracker - Cloudflare Worker with D1 Database
 *
 * API Endpoints:
 * POST /api/complete      - Submit a game completion
 * GET  /api/history       - Get player's score history
 * GET  /api/puzzle/:id    - Get stats for a specific puzzle
 * GET  /api/stats         - Get overall statistics
 */

// Rate limit: max submissions per player per hour
const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// In-memory rate limit store (resets on worker restart, but good enough for basic protection)
const rateLimitStore = new Map();

function checkRateLimit(playerId) {
  const now = Date.now();
  const key = playerId;
  const record = rateLimitStore.get(key);

  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { windowStart: now, count: 1 });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(env.CORS_ORIGIN, request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Route handling
      const path = url.pathname;

      if (path === '/api/complete' && request.method === 'POST') {
        return await handleComplete(request, env, corsHeaders);
      }

      if (path === '/api/history' && request.method === 'GET') {
        return await handleHistory(url, env, corsHeaders);
      }

      if (path.startsWith('/api/puzzle/') && request.method === 'GET') {
        const puzzleId = path.split('/')[3];
        return await handlePuzzleStats(puzzleId, env, corsHeaders);
      }

      if (path === '/api/stats' && request.method === 'GET') {
        return await handleStats(env, corsHeaders);
      }

      // Health check
      if (path === '/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, corsHeaders);
      }

      return jsonResponse({ error: 'Not found' }, corsHeaders, 404);

    } catch (error) {
      console.error('Worker error:', error);
      return jsonResponse({ error: 'Internal server error' }, corsHeaders, 500);
    }
  }
};

/**
 * Submit a game completion
 */
async function handleComplete(request, env, corsHeaders) {
  const body = await request.json();

  // Validate required fields
  const { playerId, gameMode, score, won } = body;
  if (!playerId || !gameMode || score === undefined) {
    return jsonResponse({ error: 'Missing required fields: playerId, gameMode, score' }, corsHeaders, 400);
  }

  // Validate player ID format (should be p_ followed by alphanumeric)
  if (!/^p_[A-Za-z0-9]{10,20}$/.test(playerId)) {
    return jsonResponse({ error: 'Invalid player ID format' }, corsHeaders, 400);
  }

  // Rate limiting
  if (!checkRateLimit(playerId)) {
    return jsonResponse({ error: 'Rate limit exceeded. Try again later.' }, corsHeaders, 429);
  }

  // Validate game mode
  const validModes = ['daily', 'random', 'archive', 'challenge'];
  if (!validModes.includes(gameMode)) {
    return jsonResponse({ error: 'Invalid game mode' }, corsHeaders, 400);
  }

  // Validate score - must be reasonable
  if (typeof score !== 'number' || score < 0 || !Number.isInteger(score)) {
    return jsonResponse({ error: 'Invalid score' }, corsHeaders, 400);
  }

  // For daily/archive, score can't exceed total movies
  if ((gameMode === 'daily' || gameMode === 'archive') && body.totalMovies) {
    if (score > body.totalMovies) {
      return jsonResponse({ error: 'Score exceeds puzzle size' }, corsHeaders, 400);
    }
  }

  // For random mode, cap at a reasonable maximum (no puzzle has >50 movies)
  if (gameMode === 'random' && score > 500) {
    return jsonResponse({ error: 'Invalid score' }, corsHeaders, 400);
  }

  // Skip recording trivial games (score of 0) for random mode
  if (gameMode === 'random' && score < 1) {
    return jsonResponse({ success: true, skipped: true }, corsHeaders);
  }

  // For daily/archive modes, check if player already completed this puzzle
  let isReplay = false;
  if ((gameMode === 'daily' || gameMode === 'archive') && body.puzzleId) {
    const existing = await env.DB.prepare(`
      SELECT id FROM game_completions
      WHERE player_id = ? AND puzzle_id = ? AND game_mode = ?
    `).bind(playerId, body.puzzleId, gameMode).first();

    if (existing) {
      isReplay = true;
    }
  }

  // Insert the completion
  const result = await env.DB.prepare(`
    INSERT INTO game_completions (
      player_id, game_mode, score, total_movies, won,
      puzzle_id, puzzle_number, puzzle_theme, movie_ids, is_replay, completed_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    playerId,
    gameMode,
    score,
    body.totalMovies || null,
    won ? 1 : 0,
    body.puzzleId || null,
    body.puzzleNumber || null,
    body.puzzleTheme || null,
    body.movieIds ? JSON.stringify(body.movieIds) : null,
    isReplay ? 1 : 0,
    body.completedAt || new Date().toISOString()
  ).run();

  return jsonResponse({
    success: true,
    id: result.meta.last_row_id,
    isReplay
  }, corsHeaders);
}

/**
 * Get player's score history
 */
async function handleHistory(url, env, corsHeaders) {
  const playerId = url.searchParams.get('playerId');
  const gameMode = url.searchParams.get('gameMode');
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 100);

  if (!playerId) {
    return jsonResponse({ error: 'playerId is required' }, corsHeaders, 400);
  }

  let query = `
    SELECT
      id, game_mode, score, total_movies, won,
      puzzle_id, puzzle_number, puzzle_theme,
      completed_at
    FROM game_completions
    WHERE player_id = ?
  `;
  const params = [playerId];

  if (gameMode) {
    query += ' AND game_mode = ?';
    params.push(gameMode);
  }

  query += ' ORDER BY completed_at DESC LIMIT ?';
  params.push(limit);

  const stmt = env.DB.prepare(query);
  const results = await stmt.bind(...params).all();

  return jsonResponse({
    playerId,
    history: results.results.map(row => ({
      ...row,
      won: !!row.won
    }))
  }, corsHeaders);
}

/**
 * Get stats for a specific puzzle
 */
async function handlePuzzleStats(puzzleId, env, corsHeaders) {
  if (!puzzleId) {
    return jsonResponse({ error: 'puzzleId is required' }, corsHeaders, 400);
  }

  // Get aggregate stats (excluding replays for accurate first-attempt stats)
  const stats = await env.DB.prepare(`
    SELECT
      puzzle_id,
      puzzle_number,
      puzzle_theme,
      total_movies,
      COUNT(*) as attempts,
      SUM(CASE WHEN won = 1 THEN 1 ELSE 0 END) as completions,
      ROUND(AVG(score), 1) as avg_score,
      MAX(score) as high_score,
      MIN(score) as low_score
    FROM game_completions
    WHERE puzzle_id = ? AND is_replay = 0
    GROUP BY puzzle_id
  `).bind(puzzleId).first();

  if (!stats) {
    return jsonResponse({ error: 'Puzzle not found' }, corsHeaders, 404);
  }

  // Get score distribution (excluding replays)
  const distribution = await env.DB.prepare(`
    SELECT score, COUNT(*) as count
    FROM game_completions
    WHERE puzzle_id = ? AND is_replay = 0
    GROUP BY score
    ORDER BY score ASC
  `).bind(puzzleId).all();

  return jsonResponse({
    ...stats,
    completionRate: stats.attempts > 0
      ? Math.round((stats.completions / stats.attempts) * 100)
      : 0,
    scoreDistribution: distribution.results
  }, corsHeaders);
}

/**
 * Get overall statistics
 */
async function handleStats(env, corsHeaders) {
  // Total games played
  const totals = await env.DB.prepare(`
    SELECT
      COUNT(*) as total_games,
      COUNT(DISTINCT player_id) as unique_players,
      SUM(CASE WHEN game_mode = 'daily' THEN 1 ELSE 0 END) as daily_games,
      SUM(CASE WHEN game_mode = 'random' THEN 1 ELSE 0 END) as random_games,
      SUM(CASE WHEN game_mode = 'archive' THEN 1 ELSE 0 END) as archive_games,
      SUM(CASE WHEN game_mode = 'challenge' THEN 1 ELSE 0 END) as challenge_games
    FROM game_completions
  `).first();

  // Random mode stats
  const randomStats = await env.DB.prepare(`
    SELECT
      MAX(score) as highest_streak,
      ROUND(AVG(score), 1) as avg_streak
    FROM game_completions
    WHERE game_mode = 'random'
  `).first();

  // Recent activity (last 24 hours)
  const recentActivity = await env.DB.prepare(`
    SELECT COUNT(*) as games_today
    FROM game_completions
    WHERE completed_at >= datetime('now', '-1 day')
  `).first();

  return jsonResponse({
    totalGames: totals.total_games,
    uniquePlayers: totals.unique_players,
    byMode: {
      daily: totals.daily_games,
      random: totals.random_games,
      archive: totals.archive_games,
      challenge: totals.challenge_games
    },
    randomMode: {
      highestStreak: randomStats?.highest_streak || 0,
      averageStreak: randomStats?.avg_streak || 0
    },
    gamesToday: recentActivity?.games_today || 0
  }, corsHeaders);
}

/**
 * Helper: Generate CORS headers
 */
function getCorsHeaders(allowedOrigin, request) {
  const origin = request.headers.get('Origin') || '';

  // Allow the configured origin, localhost for development, and Cloudflare Pages preview deployments
  const isAllowed = origin === allowedOrigin ||
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1') ||
    origin.endsWith('.pages.dev') ||
    allowedOrigin === '*';

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

/**
 * Helper: JSON response
 */
function jsonResponse(data, corsHeaders, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders
    }
  });
}
