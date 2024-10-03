export type Config = {
    launchOnSystemStartup: boolean,
    startMinimized: boolean,
    setActivityOnLaunch: boolean,
}

export const defaultConfig: Config = {
    launchOnSystemStartup: false,
    startMinimized: false,
    setActivityOnLaunch: false,
};

export default Config;
