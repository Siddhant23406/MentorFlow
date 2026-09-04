const { HintLevels } = require("../engine/constants");

const sessions = new Map();

function createSession(sessionId,problemId, totalSteps) {
    const session = {
        sessionId,
        problemId,
        solved: false,
        state: {
            hintLevel: HintLevels.MIN,
            dodgeCount: 0,
            currentStep:1 ,
            totalSteps,
        }
    };
    sessions.set(sessionId, session);
    return session;
}
function getSession(sessionId)
{
    return sessions.get(sessionId) || null;
}

function updateSessionState(sessionId, changes)
{
    const session = getSession(sessionId);
    if(!session) return null;

    session.state = {...session.state, ...changes};
    return session;
}
module.exports = {createSession, getSession, updateSessionState}; 