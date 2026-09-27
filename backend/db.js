const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      session_id TEXT PRIMARY KEY,
      problem_id TEXT NOT NULL,
      solved BOOLEAN DEFAULT FALSE,
      hint_level INTEGER DEFAULT 0,
      dodge_count INTEGER DEFAULT 0,
      current_step INTEGER NOT NULL,
      total_steps INTEGER NOT NULL
    )
  `);
}

module.exports = { pool, initDb };