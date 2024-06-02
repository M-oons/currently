import { contextBridge, ipcRenderer } from "electron";
import Activity from "../activity/types/Activity";

contextBridge.exposeInMainWorld("api", {
    close: () => ipcRenderer.send("close"),
    minimize: () => ipcRenderer.send("minimize"),
    help: () => ipcRenderer.send("help"),
    getActivity: (): Promise<Activity> => ipcRenderer.invoke("get-activity"),
    startActivity: (): Promise<boolean> => ipcRenderer.invoke("start-activity"),
    stopActivity: (): Promise<boolean> => ipcRenderer.invoke("stop-activity"),
});
