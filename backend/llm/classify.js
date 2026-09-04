require('dotenv').config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

async function classifyMessage(problemDescription, studentMessage) {
  const prompt = `You are a classifier for a coding mentor app. Given a student's message, output exactly one label from this list:
on-topic-attempt, correct-answer, dodge, stuck, off-topic

- on-topic-attempt: the student is engaging with the actual problem — proposing an approach, writing code, or reasoning about the solution — even if it's incomplete, wrong, or has errors. This does NOT include a fully correct final answer.
- correct-answer: the student's message correctly solves the current step — either the right approach/algorithm described in words, or code that would produce the correct result if run.
- stuck: the student expresses genuine confusion or not knowing how to proceed — e.g. "I don't know", "I have no idea where to start", "I'm lost". They are not avoiding the problem, they simply don't know the answer yet.
- dodge: the student is avoiding engagement with the problem itself — e.g. asking to skip it, asking for the answer directly, changing the subject, or repeatedly giving non-answers without attempting to reason.
- off-topic: the student's message has nothing to do with the current problem — e.g. asking unrelated questions, small talk, or topics unconnected to solving the problem at hand.

Current problem: ${problemDescription}
Student's message: "${studentMessage}"

Respond with ONLY the label. No punctuation, no explanation, no extra words.
Label:`;

  const result = await model.generateContent(prompt);
  const rawOutput = result.response.text();

  return rawOutput;
}

const { Classification } = require('../engine/constants');

function validateClassification(rawOutput) {
  const cleaned = rawOutput.trim().toLowerCase();

  const validLabels = Object.values(Classification);

  if (validLabels.includes(cleaned)) {
    return cleaned;
  }

  return Classification.OFF_TOPIC; // safe fallback — never assume success or failure
}


module.exports = { classifyMessage, validateClassification };