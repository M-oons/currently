import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";
import { isValidUrl } from "../../utils/validation";

const BUTTON_TEXT_LENGTH_MIN = 2;
const BUTTON_TEXT_LENGTH_MAX = 32;

export type ActivityButton = {
    text: string,
    url: string,
};

export const validateButton = (button: ActivityButton): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (button.text.length < BUTTON_TEXT_LENGTH_MIN || button.text.length > BUTTON_TEXT_LENGTH_MAX)
        errors.push({ property: "text", error: `Length must be between ${BUTTON_TEXT_LENGTH_MIN} and ${BUTTON_TEXT_LENGTH_MAX} characters` });
    if (!isValidUrl(button.url))
        errors.push({ property: "url", error: "Invalid URL" });

    return createValidationResult(errors);
}

export default ActivityButton;
