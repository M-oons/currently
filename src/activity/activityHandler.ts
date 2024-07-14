import { Client, type Presence } from "discord-rpc";
import { type Activity, defaultActivity } from "./types/Activity";
import { loadActivity } from "./activityLoader";
import { buildPresence } from "./presenceBuilder";

let client: Client | null = null;

let currentActivity: Activity = loadActivity() ?? defaultActivity;
let currentClientId: string | null = null;
let lastUpdatedAt: number = 0;
let active: boolean = false;

export const getActivityLastUpdateTime = (): number => {
    return lastUpdatedAt;
};

export const getActivity = (): Activity => {
    return currentActivity;
};

export const setActivity = (activity: Activity): void => {
    currentActivity = activity;
};

export const startActivity = async (): Promise<boolean> => {
    if (client === null || currentActivity.clientId !== currentClientId)
        await createClient(currentActivity.clientId);

    const presence: Presence = buildPresence(currentActivity);

    try {
        await client?.setActivity(presence);
        active = true;
        lastUpdatedAt = Date.now();
    }
    catch { }

    return active;
};

export const clearActivity = async (): Promise<boolean> => {
    try {
        await client?.clearActivity();
        active = false;
    }
    catch { }

    return active;
}

const createClient = async (clientId: string): Promise<void> => {
    try {
        await client?.destroy();
        client = new Client({ transport: "ipc" });
        await client.login({ clientId });
        currentClientId = clientId;
    }
    catch { }
}
