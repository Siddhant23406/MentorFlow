
const Limits = Object.freeze({ DODGE_LIMIT: 3 });

const DecisionType = Object.freeze({
    ASK_CLARIFYING_QUESTION: 'ask-clarifying-question', 
    ASK_GUIDING_QUESTION: 'ask-guiding-question', 
    GIVE_HINT: 'give-hint', 
    ACKNOWLEDGE_PROGRESS: 'acknowledge-progress', 
    REDIRECT_DODGE: 'redirect-dodge', 
    REVEAL_SOLUTION: 'reveal-solution',
    CELEBRATE_COMPLETION: 'celebrate-completion',
});

const Classification = Object.freeze({
    ON_TOPIC_ATTEMPT: 'on-topic-attempt',
    CORRECT_ANSWER: 'correct-answer',
    DODGE: 'dodge',
    STUCK: 'stuck',
    OFF_TOPIC: 'off-topic',
});

const HintLevels = Object.freeze({
    MIN:0,
    MAX:3,
});

module.exports = {DecisionType, Classification, HintLevels, Limits };