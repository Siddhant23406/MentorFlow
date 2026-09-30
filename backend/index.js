require('dotenv').config();
const { initDb } = require('./db');
const rateLimit = require('express-rate-limit');
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
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 30 requests per window
  message: { error: "Too many requests, please try again later." }
});

app.get("/health", (req, res) => {
  console.log("Health check ping received");
  res.status(200).send("OK");
});

app.get("/", async (req,res) => {
    const problem = getRandomProblem();
    const session = await createSession(crypto.randomUUID(), problem.id, problem.totalSteps);
    res.json({
      ...session,
      title: problem.title,
      description: problem.description
    });
});

app.get("/session/:id", async (req,res) => {
    const session = await getSession(req.params.id);
    if(session) return res.json(session);
    else return res.status(404).json({ error: "Session not found"});
});

app.post("/session/:id/respond", limiter , async (req, res) => {
  
  try{

    const session = await getSession(req.params.id);
    if (!session) return res.status(404).json({ error: "Session not found" });
    
    const { studentMessage } = req.body;
    if (!studentMessage || typeof studentMessage !== 'string' || studentMessage.trim().length === 0) {
      return res.status(400).json({ error: "studentMessage is required and cannot be empty" });
    }

    if (studentMessage.length > 2000) {
      return res.status(400).json({ error: "studentMessage is too long (max 2000 characters)" });
    } 
    console.log(`[${new Date().toISOString()}] Session ${req.params.id} | Message: "${studentMessage.slice(0, 80)}"`);
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

    const updatedSession = await updateSessionState(session.sessionId, changes);
    console.log(`[${new Date().toISOString()}] Session ${req.params.id} | Decision: ${decision}`);
    res.json({ decision, response: responseText, session: updatedSession });

    } catch (err) {
      console.error(`[${new Date().toISOString()}] Session ${req.params.id} | Error:`, err.message);
      res.status(500).json({ error: "The mentor is having trouble right now. Please try again in a moment." });
    }
  });

const PORT = process.env.PORT || 3000;

async function startServer() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();