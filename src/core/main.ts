import { app, BrowserWindow, Event, ipcMain } from "electron";
import path from "path";

if (require("electron-squirrel-startup"))
    app.quit();

let mainWindow: BrowserWindow | null = null;

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

//==============
// main events 
//==============

app.on("ready", createWindow);

app.on("window-all-closed", (event: Event) => {
    event.preventDefault();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
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
