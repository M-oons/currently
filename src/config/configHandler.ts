import { app } from "electron";
import AutoLaunch from "auto-launch";
import { type Config, defaultConfig } from "./types/Config";
import { loadConfig, saveConfig } from "./configLoader";
import { startActivity } from "../activity/activityHandler";
import appInfo from "../AppInfo";

let currentConfig: Config = loadConfig() ?? defaultConfig;

const autoLaunch = new AutoLaunch({
    name: appInfo.name,
    path: app.getPath("exe"),
});

export const applyConfig = (startup: boolean): void => {
    // auto launch
    if (app.isPackaged)
        autoLaunch.isEnabled()
            .then(enabled => {
                if (enabled && !currentConfig.launchOnSystemStartup)
                    autoLaunch.disable();
                else if (!enabled && currentConfig.launchOnSystemStartup)
                    autoLaunch.enable();
            })
            .catch(() => { });

    // set activity on launch
    if (startup && currentConfig.setActivityOnLaunch)
        startActivity();
};

export const getConfig = (): Config => {
    return currentConfig;
};

export const setConfig = (config: Config): void => {
    currentConfig = config;
    saveConfig(config);
    applyConfig(false);
};
