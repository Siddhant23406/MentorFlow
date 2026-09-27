const { pool } = require('../db');
const { HintLevels } = require("../engine/constants");

async function createSession(sessionId, problemId, totalSteps) {
    await pool.query(
        'INSERT INTO sessions (session_id, problem_id, current_step, total_steps) VALUES ($1, $2, $3, $4)',
        [sessionId, problemId, 1, totalSteps]
    );

    return {
        sessionId,
        problemId,
        solved: false,
        state: {
            hintLevel: HintLevels.MIN,
            dodgeCount: 0,
            currentStep: 1,
            totalSteps,
        }
    };
}

async function getSession(sessionId) {
    const result = await pool.query('SELECT * FROM sessions WHERE session_id = $1', [sessionId]);
    const row = result.rows[0];

    if (!row) return null;

    return {
        sessionId: row.session_id,
        problemId: row.problem_id,
        solved: row.solved,
        state: {
            hintLevel: row.hint_level,
            dodgeCount: row.dodge_count,
            currentStep: row.current_step,
            totalSteps: row.total_steps,
        }
    };
}

async function updateSessionState(sessionId, changes) {
    const session = await getSession(sessionId);
    if (!session) return null;

    const mergedState = { ...session.state, ...changes };

    await pool.query(
        'UPDATE sessions SET hint_level = $1, dodge_count = $2, current_step = $3, total_steps = $4 WHERE session_id = $5',
        [mergedState.hintLevel, mergedState.dodgeCount, mergedState.currentStep, mergedState.totalSteps, sessionId]
    );

    return {
        ...session,
        state: mergedState
    };
}

module.exports = { createSession, getSession, updateSessionState };