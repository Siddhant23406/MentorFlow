require('dotenv').config();
const crypto = require('crypto');
const cors = require('cors')
const { getProblemById, getRandomProblem } = require('./data/problems');
const { getTemplateResponse } = require('./mentor/templates');
const { generateMentorResponse } = require('./llm/generate');
const express = require("express");
const { createSession , getSession, updateSessionState } = require("./models/session");
const { DecisionType } = require("./engine/constants");
const { decide } = require("./engine/decide");
const { classifyMessage, validateClassification } = require('./llm/classify');
const app = express();
app.use(cors())
app.use(express.json());

app.get("/", (req,res) => {
    const problem = getRandomProblem();
    const session = createSession(crypto.randomUUID(), problem.id, problem.totalSteps);
    res.json(session);
});

app.get("/session/:id", (req,res) => {
    const session = getSession(req.params.id);
    if(session) return res.json(session);
    else return res.status(404).json({ error: "Session not found"});
});

app.post("/session/:id/respond", async (req, res) => {
  const session = getSession(req.params.id);
  if (!session) return res.status(404).json({ error: "Session not found" });
  
  const { studentMessage } = req.body;
  const problem = getProblemById(session.problemId);
  const problemDescription = problem.description;
  const rawOutput = await classifyMessage(problemDescription, studentMessage);
  const classification = validateClassification(rawOutput);
  const decision = decide(session.state, classification);

  let changes = {};
  if (decision === DecisionType.GIVE_HINT) {
    changes = { hintLevel: session.state.hintLevel + 1 };
  } else if (decision === DecisionType.REDIRECT_DODGE) {
    changes = { dodgeCount: session.state.dodgeCount + 1 };
  } else if (decision === DecisionType.ACKNOWLEDGE_PROGRESS) {
    changes = { currentStep: session.state.currentStep + 1 };
  }

  let responseText;
  if (decision === DecisionType.ACKNOWLEDGE_PROGRESS || decision === DecisionType.CELEBRATE_COMPLETION) {
    responseText = getTemplateResponse(decision);
    if(decision === DecisionType.CELEBRATE_COMPLETION) {
      session.solved = true;
    }
  } else {
    responseText = await generateMentorResponse(decision, problemDescription, studentMessage, session.state.hintLevel);
  }

  const updatedSession = updateSessionState(session.sessionId, changes);
  res.json({ decision, response: responseText, session: updatedSession });

});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});