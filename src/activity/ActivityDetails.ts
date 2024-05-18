import ActivityValidationError from "./validation/ActivityValidationError";
import ActivityValidationResult from "./validation/ActivityValidationResult";

const DETAILS_LENGTH_MIN = 2;
const DETAILS_LENGTH_MAX = 128;

export type ActivityDetails = string;

export const validateDetails = (details: ActivityDetails): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (details.length < DETAILS_LENGTH_MIN || details.length > DETAILS_LENGTH_MAX)
        errors.push({ error: `Length must be between ${DETAILS_LENGTH_MIN} and ${DETAILS_LENGTH_MAX} characters` });

    return ActivityValidationResult.from(errors);
}

export default ActivityDetails;
