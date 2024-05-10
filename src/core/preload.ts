import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    minimize: () => ipcRenderer.send("minimize"),
    close: () => ipcRenderer.send("close")
});
