import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";

export const CLIENT_SECRET_LENGTH = 32;
const CLIENT_SECRET_REGEX = new RegExp(`^[a-zA-Z0-9-_]{${CLIENT_SECRET_LENGTH}}$`);

export type ActivityClientSecret = string;

export const validateClientSecret = (clientSecret: ActivityClientSecret): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (!CLIENT_SECRET_REGEX.test(clientSecret))
        errors.push({ error: "Invalid client secret" });

    return createValidationResult(errors);
}

export default ActivityClientSecret;
