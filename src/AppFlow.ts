let startupTime: number | null = null;
let activityLastUpdateTime: number | null = null;

export const startup = () => {
    if (startupTime !== null)
        return;

    startupTime = Date.now();
};

export const getStartupTime = (): number => {
    return startupTime ?? 0;
}

export const activityUpdated = () => {
    activityLastUpdateTime = Date.now();
};

export const getActivityLastUpdateTime = (): number => {
    return activityLastUpdateTime ?? getStartupTime();
};
