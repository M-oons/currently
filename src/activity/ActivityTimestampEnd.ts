import ActivityValidationError from "./validation/ActivityValidationError";
import ActivityValidationResult from "./validation/ActivityValidationResult";

const TIMESTAMP_END_MIN = 1;
const TIMESTAMP_END_MAX = 2147483647000;

export type ActivityTimestampEnd = number;

export const validateTimestampEnd = (timestamp: ActivityTimestampEnd): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (timestamp < TIMESTAMP_END_MIN || timestamp > TIMESTAMP_END_MAX)
        errors.push({ error: `Value must be between ${TIMESTAMP_END_MIN} and ${TIMESTAMP_END_MAX}` });

    return ActivityValidationResult.from(errors);
}

export default ActivityTimestampEnd;
