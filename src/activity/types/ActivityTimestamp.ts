import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";

const TIMESTAMP_START_MIN = 1;
const TIMESTAMP_START_MAX = 2147483647000;

export const ActivityTimestampMode = {
    None: 0,
    AppStart: 1,
    ActivityUpdate: 2,
    Custom: 3,
} as const;

export type ActivityTimestampMode = typeof ActivityTimestampMode[keyof typeof ActivityTimestampMode];

export type ActivityTimestamp = number;

export const validateTimestampMode = (timestampMode: any): timestampMode is ActivityTimestampMode => {
    return Object.values(ActivityTimestampMode).includes(timestampMode);
};

export const validateTimestamp = (timestamp: ActivityTimestamp): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (timestamp < TIMESTAMP_START_MIN || timestamp > TIMESTAMP_START_MAX)
        errors.push({ error: `Value must be between ${TIMESTAMP_START_MIN} and ${TIMESTAMP_START_MAX}` });

    return createValidationResult(errors);
}

export default ActivityTimestamp;
