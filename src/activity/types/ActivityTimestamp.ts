import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";

export const TIMESTAMP_MIN = 1;
export const TIMESTAMP_MAX = 2147483647000;

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

    if (timestamp < TIMESTAMP_MIN || timestamp > TIMESTAMP_MAX)
        errors.push({ error: `Value must be between ${TIMESTAMP_MIN} and ${TIMESTAMP_MAX}` });

    return createValidationResult(errors);
}

export default ActivityTimestamp;
