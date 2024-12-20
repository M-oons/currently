import { BrowserWindow } from "electron";
import { Client, type Presence } from "discord-rpc";
import { type Activity, defaultActivity } from "./types/Activity";
import type ActivityClientId from "./types/ActivityClientId";
import { loadActivity, saveActivity } from "./activityLoader";
import { buildPresence } from "./presenceBuilder";
import { activityUpdated } from "../AppFlow";
import IpcCommand from "../ipc/IpcCommand";
import { runWithTimeout } from "../utils/tasks";

type ClientStatus =
    | "none"
    | "connecting"
    | "ready";

const ACTIVITY_UPDATE_INTERVAL = 15000;

let client: Client | null = null;
let currentClientId: ActivityClientId | null = null;
let activityInterval: NodeJS.Timeout | null = null;
let active: boolean = false;
let status: ClientStatus = "none";

let currentActivity = loadActivity() ?? defaultActivity;

export const getActivity = (): Activity => {
    return currentActivity;
};

export const setActivity = (activity: Activity): void => {
    currentActivity = activity;
    saveActivity(currentActivity);
};

export const getActiveState = (): boolean => {
    return active;
};

export const startActivity = async (): Promise<void> => {
    await startActivityInterval();
};

export const clearActivity = async (): Promise<void> => {
    await runWithTimeout(5000, async () => { // await client.clearActivity() may infinitely hang if the connection is broken
        await client?.clearActivity();
    });

    clearActivityInterval();
    setActiveState(false);
};

export const destroyClient = async (): Promise<void> => {
    await runWithTimeout(5000, async () => { // await client.destroy() may infinitely hang if the connection is broken
        await client?.destroy();
    });

    client?.removeAllListeners();
    client = null;
    status = "none";
};

const setupClient = async (clientId: ActivityClientId | null): Promise<boolean> => {
    await destroyClient();

    if (clientId === null)
        return false;

    return new Promise(async (resolve) => {
        try {
            status = "connecting";
            client = new Client({ transport: "ipc" });

            client.on("ready", () => {
                status = "ready";
                resolve(true);
            });

            client.on("disconnected", () => {
                status = "none";
            });

            await client.login({ clientId });
            currentClientId = clientId;
        }
        catch {
            status = "none";
            resolve(false);
        }
    });
};

const updateActivity = async (presence: Presence): Promise<void> => {
    try {
        if (client === null || status === "none" || currentActivity.clientId !== currentClientId)
            if (!await setupClient(currentActivity.clientId))
                return;

        await client?.setActivity(presence);
        activityUpdated();
        setActiveState(true);
    }
    catch { }
};

const startActivityInterval = async (): Promise<void> => {
    const presence = buildPresence(currentActivity);

    clearActivityInterval();
    await updateActivity(presence);

    activityInterval = setInterval(async () => await updateActivity(presence), ACTIVITY_UPDATE_INTERVAL);
};

const clearActivityInterval = (): void => {
    if (activityInterval === null)
        return;

    clearInterval(activityInterval);
};

const setActiveState = (state: boolean): void => {
    active = state;
    for (const win of BrowserWindow.getAllWindows())
        win.webContents.send(IpcCommand.activity.SetActiveState, active);
};
