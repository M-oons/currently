import type ActivityValidationError from "./validation/ActivityValidationError";
import { type ActivityValidationResult, createValidationResult } from "./validation/ActivityValidationResult";

export const IMAGE_KEY_LENGTH_MIN = 1;
export const IMAGE_KEY_LENGTH_MAX = 256;
export const IMAGE_TEXT_LENGTH_MIN = 2;
export const IMAGE_TEXT_LENGTH_MAX = 128;

const VALID_IMAGE_TYPES = ["jpg", "jpeg", "png", "gif", "webp"];

export const ActivityAssetType = {
    Asset: 0,
    URL: 1,
} as const;

export type ActivityAssetType = typeof ActivityAssetType[keyof typeof ActivityAssetType];

export type ActivityImage = {
    key: string,
    text?: string,
};

export const validateImage = (image: ActivityImage, assetType: ActivityAssetType): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (assetType === ActivityAssetType.URL && !isValidImageUrl(image.key))
        errors.push({ property: "image", error: "Invalid image URL" });
    if (image.key.length < IMAGE_KEY_LENGTH_MIN || image.key.length > IMAGE_KEY_LENGTH_MAX)
        errors.push({
            property: "image",
            error: assetType === ActivityAssetType.Asset
                ? "Invalid asset"
                : `Length must be between ${IMAGE_KEY_LENGTH_MIN} and ${IMAGE_KEY_LENGTH_MAX} characters`,
        });
    if (image.text !== undefined && (image.text.length < IMAGE_TEXT_LENGTH_MIN || image.text.length > IMAGE_TEXT_LENGTH_MAX))
        errors.push({ property: "tooltip", error: `Length must be between ${IMAGE_TEXT_LENGTH_MIN} and ${IMAGE_TEXT_LENGTH_MAX} characters` });

    return createValidationResult(errors);
}

export const getAssetType = (image: string): ActivityAssetType => {
    return image.toLowerCase().startsWith("http://") || image.toLowerCase().startsWith("https://")
        ? ActivityAssetType.URL
        : ActivityAssetType.Asset;
};

const isValidImageUrl = (image: string): boolean => {
    if (getAssetType(image) !== ActivityAssetType.URL)
        return false;

    try {
        const url = new URL(image);
        const extension = url.pathname.toLowerCase().split(".").pop() ?? "";
        return VALID_IMAGE_TYPES.includes(extension);
    }
    catch {
        return false;
    }
};

export default ActivityImage;
