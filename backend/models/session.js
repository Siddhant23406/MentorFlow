const db = require('../db');
const { HintLevels } = require("../engine/constants");

function createSession(sessionId, problemId, totalSteps) {
    const stmt = db.prepare(
        'INSERT INTO sessions (session_id, problem_id, current_step, total_steps) VALUES (?, ?, ?, ?)'
    );
    stmt.run(sessionId, problemId, 1, totalSteps);

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

function getSession(sessionId) {
    const row = db.prepare('SELECT * FROM sessions WHERE session_id = ?').get(sessionId);

    if (!row) return null;

    return {
        sessionId: row.session_id,
        problemId: row.problem_id,
        solved: row.solved === 1,
        state: {
            hintLevel: row.hint_level,
            dodgeCount: row.dodge_count,
            currentStep: row.current_step,
            totalSteps: row.total_steps,
        }
    };
}

function updateSessionState(sessionId, changes) {
    const session = getSession(sessionId);
    if (!session) return null;

    const mergedState = { ...session.state, ...changes };

    const stmt = db.prepare(
        'UPDATE sessions SET hint_level = ?, dodge_count = ?, current_step = ?, total_steps = ? WHERE session_id = ?'
    );
    stmt.run(mergedState.hintLevel, mergedState.dodgeCount, mergedState.currentStep, mergedState.totalSteps, sessionId);

    return {
        ...session,
        state: mergedState
    };
}

module.exports = { createSession, getSession, updateSessionState };