import { app, BrowserWindow, type Event, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { getActivityLastUpdateTime, getStartupTime, startup } from "../AppFlow";
import AppInfo from "../AppInfo";
import type Activity from "../activity/types/Activity";
import { clearActivity, getActivity, setActivity, startActivity } from "../activity/activityHandler";
import IpcCommand from "../ipc/IpcCommand";
import { getIcon } from "../utils/assetLoader";
import { openURL } from "../utils/navigation";

startup();

if (require("electron-squirrel-startup"))
    app.quit();

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;

const createTray = (): void => {
    const icon = getIcon("icon");

    const menu = Menu.buildFromTemplate([
        {
            label: AppInfo.name,
            type: "submenu",
            submenu: [
                {
                    label: AppInfo.version,
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
    tray.setToolTip(AppInfo.name);
    tray.setContextMenu(menu);

    tray.on("double-click", () => {
        showWindow();
    });
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 308,
        height: 360,
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

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

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

app.on("window-all-closed", (event: Event) => {
    event.preventDefault();
});

app.on("activate", () => {
    showWindow();
});

//===============
// ipc messages 
//===============

ipcMain.on(IpcCommand.Close, () => {
    mainWindow?.close();
});

ipcMain.on(IpcCommand.Minimize, () => {
    mainWindow?.minimize();
});

ipcMain.on(IpcCommand.Help, () => {
    openURL(AppInfo.url);
});

ipcMain.handle(IpcCommand.GetStartupTime, (): number => {
    return getStartupTime();
});

ipcMain.handle(IpcCommand.GetActivityLastUpdateTime, (): number => {
    return getActivityLastUpdateTime();
});

ipcMain.handle(IpcCommand.GetActivity, (): Activity => {
    return getActivity();
});

ipcMain.handle(IpcCommand.SetActivity, (_, activity: Activity): void => {
    return setActivity(activity);
});

ipcMain.handle(IpcCommand.StartActivity, async (): Promise<boolean> => {
    return await startActivity();
});

ipcMain.handle(IpcCommand.StopActivity, async (): Promise<boolean> => {
    return await clearActivity();
});
