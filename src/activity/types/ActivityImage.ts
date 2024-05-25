import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";

const IMAGE_KEY_LENGTH_MIN = 1;
const IMAGE_KEY_LENGTH_MAX = 16;
const IMAGE_TEXT_LENGTH_MIN = 2;
const IMAGE_TEXT_LENGTH_MAX = 128;

export type ActivityImage = {
    key: string,
    text?: string,
};

export const validateImage = (image: ActivityImage): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (image.key.length < IMAGE_KEY_LENGTH_MIN || image.key.length > IMAGE_KEY_LENGTH_MAX)
        errors.push({ property: "key", error: `Length must be between ${IMAGE_KEY_LENGTH_MIN} and ${IMAGE_KEY_LENGTH_MAX} characters` });
    if (image.text && (image.text.length < IMAGE_TEXT_LENGTH_MIN || image.text.length > IMAGE_TEXT_LENGTH_MAX))
        errors.push({ property: "text", error: `Length must be between ${IMAGE_TEXT_LENGTH_MIN} and ${IMAGE_TEXT_LENGTH_MAX} characters` });

    return createValidationResult(errors);
}

export default ActivityImage;
