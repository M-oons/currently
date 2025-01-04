import { app, autoUpdater, BrowserWindow, type Event, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { getActivityLastUpdateTime, getStartupTime, startup } from "../AppFlow";
import { type AppInfo, appInfo } from "../AppInfo";
import type Activity from "../activity/types/Activity";
import type ActivityClientId from "../activity/types/ActivityClientId";
import type ActivityClientSecret from "../activity/types/ActivityClientSecret";
import { clearActivity, getActivity, getActiveState, setActivity, startActivity } from "../activity/activityHandler";
import type Application from "../api/types/Application";
import type ApplicationAsset from "../api/types/ApplicationAsset";
import { getApplication, getApplicationAssets, getApplicationAssetUrl } from "../api/applicationFetcher";
import type Config from "../config/types/Config";
import { applyConfig, getConfig, setConfig } from "../config/configHandler";
import IpcCommand from "../ipc/IpcCommand";
import { getAsset } from "../utils/assetLoader";
import { openURL } from "../utils/navigation";
import { isDiscordRunning } from "../utils/processHandler";
import { checkForUpdate } from "../utils/updater";

if (require("electron-squirrel-startup"))
    app.quit();

startup();
applyConfig(true);

let mainWindow: BrowserWindow | null = null;

const createTray = (): void => {
    const menu = Menu.buildFromTemplate([
        {
            label: appInfo.name,
            type: "submenu",
            submenu: [
                {
                    label: appInfo.version,
                    type: "normal",
                    enabled: false,
                },
            ],
        },
        { type: "separator" },
        {
            label: "Show",
            type: "normal",
            click: () => {
                showWindow();
            },
        },
        {
            label: "Quit",
            type: "normal",
            click: () => {
                app.quit();
            },
        },
    ]);

    const tray = new Tray(getAsset("tray"));
    tray.setToolTip(appInfo.name);
    tray.setContextMenu(menu);

    tray.on("double-click", () => {
        showWindow();
    });
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 368,
        height: 436,
        frame: false,
        transparent: true,
        titleBarStyle: "customButtonsOnHover",
        maximizable: false,
        resizable: false,
        show: false,
        icon: getAsset("app"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            devTools: !app.isPackaged,
        },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL)
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    else
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));

    mainWindow.once("ready-to-show", () => {
        mainWindow?.show();
    });
};

const showWindow = (): void => {
    if (!mainWindow || BrowserWindow.getAllWindows().length === 0) {
        createWindow();
        return;
    }

    mainWindow.show();
};

//==============
// main events
//==============

app.on("ready", () => {
    const config = getConfig();

    createTray();

    if (!config.startMinimized)
        createWindow();
});

app.on("window-all-closed", (event: Event) => {
    event.preventDefault();
});

app.on("activate", () => {
    showWindow();
});

app.on("before-quit", async () => {
    await clearActivity();
});

//===============
// ipc messages
//===============

ipcMain.handle(IpcCommand.info.GetAppInfo, (): AppInfo => {
    return appInfo;
})

ipcMain.on(IpcCommand.functions.Close, () => {
    mainWindow?.close();
});

ipcMain.on(IpcCommand.functions.Minimize, () => {
    mainWindow?.minimize();
});

ipcMain.on(IpcCommand.functions.Help, () => {
    openURL(appInfo.url);
});

ipcMain.handle(IpcCommand.flow.GetStartupTime, (): number => {
    return getStartupTime();
});

ipcMain.handle(IpcCommand.flow.GetActivityLastUpdateTime, (): number => {
    return getActivityLastUpdateTime();
});

ipcMain.handle(IpcCommand.flow.IsDiscordRunning, async (): Promise<boolean> => {
    return await isDiscordRunning();
});

ipcMain.handle(IpcCommand.flow.CheckForUpdate, async (): Promise<boolean> => {
    return await checkForUpdate();
});

ipcMain.on(IpcCommand.flow.ApplyUpdate, () => {
    autoUpdater.quitAndInstall();
});

ipcMain.handle(IpcCommand.config.GetConfig, (): Config => {
    return getConfig();
});

ipcMain.handle(IpcCommand.config.SetConfig, (_, config: Config): void => {
    return setConfig(config);
});

ipcMain.handle(IpcCommand.activity.GetActivity, (): Activity => {
    return getActivity();
});

ipcMain.handle(IpcCommand.activity.SetActivity, (_, activity: Activity): void => {
    return setActivity(activity);
});

ipcMain.handle(IpcCommand.activity.GetActiveState, async (): Promise<boolean> => {
    return getActiveState();
});

ipcMain.handle(IpcCommand.activity.StartActivity, async (): Promise<void> => {
    return await startActivity();
});

ipcMain.handle(IpcCommand.activity.StopActivity, async (): Promise<void> => {
    return await clearActivity();
});

ipcMain.handle(IpcCommand.api.GetApplication, async (_, clientId: ActivityClientId, clientSecret: ActivityClientSecret, useCache: boolean): Promise<Application | null> => {
    return await getApplication(clientId, clientSecret, useCache);
});

ipcMain.handle(IpcCommand.api.GetApplicationAssets, async (_, clientId: ActivityClientId, useCache: boolean): Promise<ApplicationAsset[] | null> => {
    return await getApplicationAssets(clientId, useCache);
});

ipcMain.handle(IpcCommand.api.GetApplicationAssetUrl, (_, applicationId: ActivityClientId, assetId: string): string => {
    return getApplicationAssetUrl(applicationId, assetId);
});
