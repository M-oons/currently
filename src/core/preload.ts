import { contextBridge, ipcRenderer } from "electron";
import type Activity from "../activity/types/Activity";
import type Config from "../config/types/Config";
import IpcCommand from "../ipc/IpcCommand";
import { handleMouseEvent } from "../utils/inputHandler";

//==============
// ipc
//==============

contextBridge.exposeInMainWorld("info", {
    getAppInfo: () => ipcRenderer.invoke(IpcCommand.info.GetAppInfo),
});

contextBridge.exposeInMainWorld("flow", {
    getStartupTime: (): Promise<number> => ipcRenderer.invoke(IpcCommand.flow.GetStartupTime),
    getActivityLastUpdateTime: (): Promise<number> => ipcRenderer.invoke(IpcCommand.flow.GetActivityLastUpdateTime),
});

contextBridge.exposeInMainWorld("config", {
    getConfig: (): Promise<Config> => ipcRenderer.invoke(IpcCommand.config.GetConfig),
    setConfig: (config: Config) => ipcRenderer.invoke(IpcCommand.config.SetConfig, config),
});

contextBridge.exposeInMainWorld("activity", {
    getActivity: (): Promise<Activity> => ipcRenderer.invoke(IpcCommand.activity.GetActivity),
    setActivity: (activity: Activity) => ipcRenderer.invoke(IpcCommand.activity.SetActivity, activity),
    startActivity: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.activity.StartActivity),
    stopActivity: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.activity.StopActivity),
});

contextBridge.exposeInMainWorld("functions", {
    close: () => ipcRenderer.send(IpcCommand.functions.Close),
    minimize: () => ipcRenderer.send(IpcCommand.functions.Minimize),
    help: () => ipcRenderer.send(IpcCommand.functions.Help),
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
