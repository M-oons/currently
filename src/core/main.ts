import { app, BrowserWindow, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { getActivityLastUpdateTime, getStartupTime, startup } from "../AppFlow";
import { type AppInfo, appInfo } from "../AppInfo";
import type Activity from "../activity/types/Activity";
import { clearActivity, getActivity, setActivity, startActivity } from "../activity/activityHandler";
import { type Config, defaultConfig } from "../config/types/Config";
import { loadConfig, saveConfig } from "../config/configLoader";
import IpcCommand from "../ipc/IpcCommand";
import { getIcon } from "../utils/assetLoader";
import { openURL } from "../utils/navigation";

if (require("electron-squirrel-startup"))
    app.quit();

startup();

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;

const createTray = (): void => {
    const icon = getIcon("icon");

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

    tray = new Tray(icon);
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
        icon: getIcon("icon"),
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
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
    createTray();
    createWindow();
});

app.on("window-all-closed", (event: Electron.Event) => {
    event.preventDefault();
});

app.on("activate", () => {
    showWindow();
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

ipcMain.handle(IpcCommand.config.GetConfig, (): Config => {
    return loadConfig() ?? defaultConfig;
});

ipcMain.handle(IpcCommand.config.SetConfig, (_, config: Config): void => {
    return saveConfig(config);
});

ipcMain.handle(IpcCommand.activity.GetActivity, (): Activity => {
    return getActivity();
});

ipcMain.handle(IpcCommand.activity.SetActivity, (_, activity: Activity): void => {
    return setActivity(activity);
});

ipcMain.handle(IpcCommand.activity.StartActivity, async (): Promise<boolean> => {
    return await startActivity();
});

ipcMain.handle(IpcCommand.activity.StopActivity, async (): Promise<boolean> => {
    return await clearActivity();
});
