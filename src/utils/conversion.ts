export const toBoolean = (value?: string | null): boolean => {
    if (!value)
        return false;

    switch (value.toLowerCase()) {
        case "true":
        case "1":
            return true;

        default:
            return false;
    }
};
