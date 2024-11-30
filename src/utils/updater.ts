import { app, autoUpdater } from "electron";
import log from "electron-log";
import { updateElectronApp } from "update-electron-app";
import { gt } from "semver";
import { appInfo, type PackageInfo } from "../AppInfo";

let shouldUpdate = true;

export const checkForUpdate = async (): Promise<boolean> => {
    if (!shouldUpdate || !app.isPackaged)
        return false;

    shouldUpdate = false;

    return process.platform === "win32"
        ? await checkForUpdateWindows()
        : await checkForUpdateOther();
};

const checkForUpdateWindows = async (): Promise<boolean> => {
    return new Promise(async resolve => {
        try {
            autoUpdater.on("update-downloaded", () => {
                resolve(true);
            });
            
            autoUpdater.on("update-not-available", () => {
                resolve(false);
            });
            
            autoUpdater.on("error", () => {
                resolve(false);
            });

            updateElectronApp({
                updateInterval: "24 hours",
                notifyUser: false,
                logger: log,
            });
        }
        catch {
            resolve(false);
        }
    });
};

const checkForUpdateOther = async (): Promise<boolean> => {
    try {
        const response = await fetch(`${appInfo.url}/blob/main/package.json?raw=true`);
        const pkg = await response.json() as PackageInfo;
        const local = appInfo.version;
        const remote = pkg.version;
        return gt(remote, local);
    }
    catch {
        return false;
    }
};
