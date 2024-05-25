import type ActivityValidationError from "./ActivityValidationError";

export type ActivityValidationResult = {
    valid: boolean,
    errors: ActivityValidationError[],
};

export const createValidationResult = (errors: ActivityValidationError[]): ActivityValidationResult => {
    return {
        valid: errors.length === 0,
        errors
    };
}

export default ActivityValidationResult;
