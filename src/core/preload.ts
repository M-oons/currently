import { contextBridge, ipcRenderer } from "electron";
import type Activity from "../activity/types/Activity";

contextBridge.exposeInMainWorld("api", {
    close: () => ipcRenderer.send("close"),
    minimize: () => ipcRenderer.send("minimize"),
    help: () => ipcRenderer.send("help"),
    getActivity: (): Promise<Activity> => ipcRenderer.invoke("get-activity"),
    setActivity: (activity: Activity) => ipcRenderer.invoke("set-activity", activity),
    startActivity: (): Promise<boolean> => ipcRenderer.invoke("start-activity"),
    stopActivity: (): Promise<boolean> => ipcRenderer.invoke("stop-activity"),
});

contextBridge.exposeInMainWorld("utils", {
    toBase64: (data: string): string => Buffer.from(data).toString("base64"),
});
