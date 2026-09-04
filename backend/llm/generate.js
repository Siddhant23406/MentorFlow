const { GoogleGenerativeAI } = require('@google/generative-ai');
const { DecisionType } = require('../engine/constants');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
const PERSONALITY = "You are conducting a technical interview. Be terse and professional. Do not offer encouragement or praise. Ask direct, probing questions. Push the candidate to justify their reasoning.";

async function generateMentorResponse(decision, problemDescription, studentMessage, hintLevel) {
    let instruction;
    switch (decision) {
        case DecisionType.GIVE_HINT:
            instruction = `${PERSONALITY} The student is working on: ${problemDescription}
They said: "${studentMessage}"
Give the student a hint, appropriate for hint level ${hintLevel} out of 3.
Level 0-1 hints should be vague, pointing at a concept or direction without giving specifics.
Level 2-3 hints should be much more specific and concrete, close to walking them through it.
Do not give the full solution or working code.`;
            break;

        case DecisionType.ASK_GUIDING_QUESTION:
            instruction = `${PERSONALITY} The student is working on: ${problemDescription}
They said: "${studentMessage}"
Ask them a guiding question that pushes their thinking forward, without revealing the technique or approach needed to solve it.`;
            break;

        case DecisionType.REDIRECT_DODGE:
            instruction = `${PERSONALITY} The student is working on: ${problemDescription}
They said: "${studentMessage}"
This looks like the student is trying to dodge the problem instead of attempting it. Gently redirect them back toward attempting it, without giving away the answer.`;
            break;

        case DecisionType.ASK_CLARIFYING_QUESTION:
            instruction = `${PERSONALITY} The student is working on: ${problemDescription}
They said: "${studentMessage}"
Their message is unclear or doesn't clearly relate to the problem. Ask a short clarifying question to understand what they mean, without assuming they're wrong or right.`;
            break;

        case DecisionType.REVEAL_SOLUTION:
            instruction = `${PERSONALITY} The student has struggled with this problem despite multiple hints: ${problemDescription}
Clearly explain the solution and approach, including the reasoning behind it, in a way a beginner can follow.`;
            break;

        default:
            instruction = `${PERSONALITY} Respond helpfully to the student.`;
    }

    const result = await model.generateContent(instruction);
    const responseText = result.response.text();
    return responseText;
}

module.exports = { generateMentorResponse };