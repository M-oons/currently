import { contextBridge, ipcRenderer } from "electron";
import type Activity from "../activity/types/Activity";
import type Config from "../config/types/Config";
import IpcCommand from "../ipc/IpcCommand";
import { handleMouseEvent } from "../utils/inputHandler";

//==============
// ipc
//==============

contextBridge.exposeInMainWorld("info", {
    getAppInfo: (): Promise<any> => ipcRenderer.invoke(IpcCommand.info.GetAppInfo),
});

contextBridge.exposeInMainWorld("flow", {
    getStartupTime: (): Promise<number> => ipcRenderer.invoke(IpcCommand.flow.GetStartupTime),
    getActivityLastUpdateTime: (): Promise<number> => ipcRenderer.invoke(IpcCommand.flow.GetActivityLastUpdateTime),
    isDiscordRunning: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.flow.IsDiscordRunning),
});

contextBridge.exposeInMainWorld("config", {
    getConfig: (): Promise<Config> => ipcRenderer.invoke(IpcCommand.config.GetConfig),
    setConfig: (config: Config): Promise<any> => ipcRenderer.invoke(IpcCommand.config.SetConfig, config),
});

contextBridge.exposeInMainWorld("activity", {
    getActivity: (): Promise<Activity> => ipcRenderer.invoke(IpcCommand.activity.GetActivity),
    setActivity: (activity: Activity): Promise<any> => ipcRenderer.invoke(IpcCommand.activity.SetActivity, activity),
    getActiveState: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.activity.GetActiveState),
    startActivity: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.activity.StartActivity),
    stopActivity: (): Promise<boolean> => ipcRenderer.invoke(IpcCommand.activity.StopActivity),
});

contextBridge.exposeInMainWorld("functions", {
    close: (): void => ipcRenderer.send(IpcCommand.functions.Close),
    minimize: (): void => ipcRenderer.send(IpcCommand.functions.Minimize),
    help: (): void => ipcRenderer.send(IpcCommand.functions.Help),
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
