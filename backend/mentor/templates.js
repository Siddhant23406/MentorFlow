const { DecisionType } = require('../engine/constants');

const templates = {
  [DecisionType.ACKNOWLEDGE_PROGRESS]: [
    "Nice, you're on the right track!",
    "Good progress — keep going.",
  ],
  [DecisionType.CELEBRATE_COMPLETION]: [
    "You solved it! Great work.",
    "That's correct — problem complete!",
  ],
};

function getTemplateResponse(decision) {
  const options = templates[decision];

  if (!options) {
    throw new Error(`No template found for decision: ${decision}`);
  }
  
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

module.exports = { getTemplateResponse };