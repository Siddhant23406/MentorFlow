const Database = require('better-sqlite3');

const db = new Database('mentorflow.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    session_id TEXT PRIMARY KEY,
    problem_id TEXT NOT NULL,
    solved INTEGER DEFAULT 0,
    hint_level INTEGER DEFAULT 0,
    dodge_count INTEGER DEFAULT 0,
    current_step INTEGER NOT NULL,
    total_steps INTEGER NOT NULL
  )
`);

module.exports = db;