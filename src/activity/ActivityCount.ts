import ActivityValidationError from "./validation/ActivityValidationError";
import ActivityValidationResult from "./validation/ActivityValidationResult";

const COUNT_CURRENT_MIN = 1;
const COUNT_MAX_MIN = 1;

export type ActivityCount = {
    current: number,
    max: number,
};

export const validateCount = (count: ActivityCount): ActivityValidationResult => {
    let errors: ActivityValidationError[] = [];

    if (count.current < COUNT_CURRENT_MIN)
        errors.push({ property: "current", error: `Value must be greater than ${COUNT_CURRENT_MIN}` });
    if (count.max < COUNT_MAX_MIN)
        errors.push({ property: "max", error: `Value must be greater than ${COUNT_MAX_MIN}` });

    return ActivityValidationResult.from(errors);
}

export default ActivityCount;
