require('dotenv').config();
const { generateMentorResponse } = require('./llm/generate');
const { DecisionType } = require('./engine/constants');

async function test() {
  const result = await generateMentorResponse(
    DecisionType.GIVE_HINT,
    "Two Sum: find two numbers that add up to a target",
    "I don't know how to start",
    1
  );
  console.log(result);
}

test();