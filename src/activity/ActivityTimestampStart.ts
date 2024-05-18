import ActivityValidationError from "./validation/ActivityValidationError";
import ActivityValidationResult from "./validation/ActivityValidationResult";

const TIMESTAMP_START_MIN = 1;
const TIMESTAMP_START_MAX = 2147483647000;

export type ActivityTimestampStart = boolean | number;

export const validateTimestampStart = (timestamp: ActivityTimestampStart): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (typeof timestamp === "number" && (timestamp < TIMESTAMP_START_MIN || timestamp > TIMESTAMP_START_MAX))
        errors.push({ error: `Value must be between ${TIMESTAMP_START_MIN} and ${TIMESTAMP_START_MAX}` });

    return ActivityValidationResult.from(errors);
}

export default ActivityTimestampStart;
