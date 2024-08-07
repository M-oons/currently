import { contextBridge, ipcRenderer } from "electron";
import type Activity from "../activity/types/Activity";
import IpcCommand from "../ipc/IpcCommand";
import { handleMouseEvent } from "../utils/inputHandler";

//==============
// ipc
//==============

contextBridge.exposeInMainWorld("api", {
    close: () => ipcRenderer.send(IpcCommand.Close),
    minimize: () => ipcRenderer.send(IpcCommand.Minimize),
    help: () => ipcRenderer.send(IpcCommand.Help),
    getStartupTime: (): Promise<number> => ipcRenderer.invoke(IpcCommand.GetStartupTime),
    getActivityLastUpdateTime: (): Promise<number> => ipcRenderer.invoke(IpcCommand.GetActivityLastUpdateTime),
    getActivity: (): Promise<Activity> => ipcRenderer.invoke(IpcCommand.GetActivity),
    setActivity: (activity: Activity) => ipcRenderer.invoke(IpcCommand.SetActivity, activity),
    startActivity: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.StartActivity),
    stopActivity: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.StopActivity),
});

contextBridge.exposeInMainWorld("utils", {
    toBase64: (data: string): string => Buffer.from(data).toString("base64"),
});

//==============
// events
//==============

window.addEventListener("mouseup", (event) => {
    handleMouseEvent(event);
});
