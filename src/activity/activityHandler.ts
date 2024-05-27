import { Client, type Presence } from "discord-rpc";
import type Activity from "./types/Activity";
import { buildPresence } from "./presenceBuilder";

let client: Client | null = null;
let currentClientId: string = "";
let active: boolean = false;

export const setActivity = async (activity: Activity): Promise<boolean> => {
    if (client === null || activity.applicationId !== currentClientId)
        await createClient(activity.applicationId);

    const presence: Presence = buildPresence(activity);

    try {
        await client?.setActivity(presence);
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
        currentClientId = clientId;
    }
    catch { }
}
