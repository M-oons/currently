import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";

export const CLIENT_ID_LENGTH_MIN = 17;
export const CLIENT_ID_LENGTH_MAX = 19;
const CLIENT_ID_REGEX = new RegExp(`^\\d{${CLIENT_ID_LENGTH_MIN},${CLIENT_ID_LENGTH_MAX}}$`);

export type ActivityClientId = string;

export const validateClientId = (clientId: ActivityClientId): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (!CLIENT_ID_REGEX.test(clientId))
        errors.push({ error: "Invalid client ID" });

    return createValidationResult(errors);
}

export default ActivityClientId;
