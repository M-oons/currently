import { app, BrowserWindow, Event, ipcMain, Menu, Tray } from "electron";
import path from "path";
import { getIcon } from "../utils/assetLoader";

if (require("electron-squirrel-startup"))
    app.quit();

let tray: Tray | null = null;
let mainWindow: BrowserWindow | null = null;

const createTray = (): void => {
    const icon = getIcon("icon");

    const menu = Menu.buildFromTemplate([
        {
            label: "Currently",
            type: "normal",
            enabled: false
        },
        { type: "separator" },
        {
            label: "Show",
            type: "normal",
            click: () => {
                showWindow();
            },
        },
        { type: "separator" },
        {
            label: "Quit",
            type: "normal",
            click: () => {
                app.quit();
            },
        },
    ]);

    tray = new Tray(icon);
    tray.setToolTip("Currently");
    tray.setContextMenu(menu);

    tray.on("double-click", () => {
        showWindow();
    });
};

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 800,
        frame: false,
        titleBarStyle: "customButtonsOnHover",
        maximizable: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }
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

ipcMain.on("minimize", () => {
    mainWindow?.minimize();
});

ipcMain.on("close", () => {
    mainWindow?.close();
});
