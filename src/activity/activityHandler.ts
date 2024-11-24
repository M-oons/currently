import { Client, type Presence } from "discord-rpc";
import { type Activity, defaultActivity } from "./types/Activity";
import type ActivityClientId from "./types/ActivityClientId";
import { loadActivity, saveActivity } from "./activityLoader";
import { buildPresence } from "./presenceBuilder";
import { activityUpdated } from "../AppFlow";

const ACTIVITY_UPDATE_INTERVAL = 15000;

let client: Client | null = null;
let currentClientId: ActivityClientId | null = null;
let activityInterval: NodeJS.Timeout | null = null;
let active: boolean = false;

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

export const startActivity = async (): Promise<boolean> => {
    if (client === null || currentActivity.clientId !== currentClientId)
        await updateClient(currentActivity.clientId);

    await startActivityInterval();

    return active;
};

export const clearActivity = async (): Promise<boolean> => {
    try {
        await client?.clearActivity();
        active = false;
        clearActivityInterval();
    }
    catch { }

    return active;
};

const updateActivity = async (presence: Presence) => {
    try {
        await client?.setActivity(presence);
        active = true;
        activityUpdated();
    }
    catch { }
};

const updateClient = async (clientId: ActivityClientId | null): Promise<void> => {
    try {
        await client?.destroy();
        client = null;

        if (clientId === null)
            return;

        client = new Client({ transport: "ipc" });
        await client.login({ clientId });
        currentClientId = clientId;
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
