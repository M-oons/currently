import type Config from "./types/Config";

export const parseConfig = (json: string): Config | null => {
    try {
        const parsedConfig = JSON.parse(json) as Config;
        return {
            launchOnSystemStartup: parseLaunchOnSystemStartup(parsedConfig.launchOnSystemStartup),
            setActivityOnLaunch: parseSetActivityOnLaunch(parsedConfig.setActivityOnLaunch),
        };
    }
    catch {
        // error parsing JSON
    }

    return null;
};

const parseLaunchOnSystemStartup = (launchOnSystemStartup?: boolean): boolean => {
    return typeof launchOnSystemStartup === "boolean"
        ? launchOnSystemStartup
        : false;
};

const parseSetActivityOnLaunch = (setActivityOnLaunch?: boolean): boolean => {
    return typeof setActivityOnLaunch === "boolean"
        ? setActivityOnLaunch
        : false;
};
