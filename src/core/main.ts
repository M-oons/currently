import { app, BrowserWindow, type Event, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { getActivityLastUpdateTime, getStartupTime, startup } from "../AppFlow";
import { type AppInfo, appInfo } from "../AppInfo";
import type Activity from "../activity/types/Activity";
import { clearActivity, getActivity, getActiveState, setActivity, startActivity } from "../activity/activityHandler";
import type Config from "../config/types/Config";
import { getConfig, setConfig } from "../config/configHandler";
import IpcCommand from "../ipc/IpcCommand";
import { getAsset } from "../utils/assetLoader";
import { openURL } from "../utils/navigation";
import { isDiscordRunning } from "../utils/processHandler";

if (require("electron-squirrel-startup"))
    app.quit();

startup();

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;

const createTray = (): void => {
    tray = new Tray(getAsset("tray"));
    tray.setToolTip(appInfo.name);
    updateTrayMenu();

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

const updateTrayMenu = (): void => {
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
            label: getActiveState()
                ? "Stop activity"
                : "Start activity",
            type: "normal",
            click: async () => {
                const active = getActiveState();
                await toggleActivity(!active);
            },
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
    tray?.setContextMenu(menu);
};

const toggleActivity = async (state: boolean): Promise<boolean> => {
    const active = state
        ? await startActivity()
        : await clearActivity();
    updateTrayMenu();
    mainWindow?.webContents.send(IpcCommand.activity.SetActiveState, active);
    return active;
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

ipcMain.handle(IpcCommand.activity.StartActivity, async (): Promise<boolean> => {
    return toggleActivity(true);
});

ipcMain.handle(IpcCommand.activity.StopActivity, async (): Promise<boolean> => {
    return toggleActivity(false);
});
