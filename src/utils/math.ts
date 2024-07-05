export const INT32_MAX_VALUE = 2147483647;
export const INT32_MIN_VALUE = -2147483648;

export const clamp = (num: number, min: number, max: number): number => {
    return Math.max(min, Math.min(num, max));
};

export const roundToFixed = (num: number, digits: number): number => {
    const factor = Math.pow(10, digits);
    return Math.round(num * factor) / factor;
};
