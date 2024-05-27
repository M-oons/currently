import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
    close: () => ipcRenderer.send("close"),
    minimize: () => ipcRenderer.send("minimize"),
    help: () => ipcRenderer.send("help"),
    startActivity: (): Promise<boolean> => ipcRenderer.invoke("start-activity"),
    stopActivity: (): Promise<boolean> => ipcRenderer.invoke("stop-activity"),
});
