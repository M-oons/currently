import { Client, type Presence } from "discord-rpc";
import { type Activity, defaultActivity } from "./types/Activity";
import { loadActivity } from "./activityLoader";
import { buildPresence } from "./presenceBuilder";

let client: Client | null = null;

let currentActivity: Activity | null = null;
let active: boolean = false;

export const getActivity = (): Activity => {
    currentActivity ??= loadActivity();
    return currentActivity ?? defaultActivity;
};

export const setActivity = async (activity: Activity): Promise<boolean> => {
    if (client === null || activity.applicationId !== currentActivity?.applicationId)
        await createClient(activity.applicationId);

    const presence: Presence = buildPresence(activity);

    try {
        await client?.setActivity(presence);
        currentActivity = activity;
        active = true;
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
    }
    catch { }
}
