const { DecisionType, Classification, HintLevels, Limits } = require('./constants');

function decide (state, classification)
{
    const capped = state.hintLevel > HintLevels.MAX || state.dodgeCount > Limits.DODGE_LIMIT;
    const stillStruggling = classification === Classification.STUCK || classification === Classification.DODGE;

    if (capped && stillStruggling) {
        return DecisionType.REVEAL_SOLUTION;
    }

    if (classification === Classification.CORRECT_ANSWER) 
    {

        const isLastStep = state.currentStep === state.totalSteps;
        

        if (isLastStep) 
        {
            return DecisionType.CELEBRATE_COMPLETION;
        } 
        else
        {
            return DecisionType.ACKNOWLEDGE_PROGRESS;
        }

    }

    if(classification === Classification.STUCK)
    {
        return DecisionType.GIVE_HINT;
    }
    else if(classification === Classification.DODGE)
    {
        return DecisionType.REDIRECT_DODGE;
    }

    else if(classification === Classification.ON_TOPIC_ATTEMPT)
    {
        return DecisionType.ASK_GUIDING_QUESTION;
    }
    else if(classification === Classification.OFF_TOPIC)
    {
        return DecisionType.ASK_CLARIFYING_QUESTION;
    }
    else
    {
        return DecisionType.ASK_CLARIFYING_QUESTION;
    }

}



module.exports = { decide };