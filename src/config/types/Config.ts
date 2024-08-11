export type Config = {
    launchOnSystemStartup: boolean,
    setActivityOnLaunch: boolean,
}

export const defaultConfig: Config = {
    launchOnSystemStartup: false,
    setActivityOnLaunch: false,
};

export default Config;
