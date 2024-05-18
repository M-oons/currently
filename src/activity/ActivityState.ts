import ActivityValidationError from "./validation/ActivityValidationError";
import ActivityValidationResult from "./validation/ActivityValidationResult";

const STATE_LENGTH_MIN = 2;
const STATE_LENGTH_MAX = 128;

export type ActivityState = string;

export const validateState = (state: ActivityState): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (state.length < STATE_LENGTH_MIN || state.length > STATE_LENGTH_MAX)
        errors.push({ error: `Length must be between ${STATE_LENGTH_MIN} and ${STATE_LENGTH_MAX} characters` });

    return ActivityValidationResult.from(errors);
}

export default ActivityState;
