import { type Presence } from "discord-rpc";
import type Activity from "./types/Activity";
import type ActivityButton from "./types/ActivityButton";

type PresenceButton = {
    label: string,
    url: string,
};

export const buildPresence = (activity: Activity): Presence => {
    return {
        details: activity.details ?? undefined,
        state: activity.state ?? undefined,
        largeImageKey: activity.imageLarge?.key,
        largeImageText: activity.imageLarge?.text,
        smallImageKey: activity.imageSmall?.key,
        smallImageText: activity.imageSmall?.text,
        startTimestamp: activity.timestampStart ?? undefined,
        endTimestamp: activity.timestampEnd ?? undefined,
        partySize: activity.count?.current,
        partyMax: activity.count?.max,
        buttons: buildPresenceButtons(activity.button1, activity.button2),
    };
};

const buildPresenceButtons = (button1: ActivityButton | null, button2: ActivityButton | null): PresenceButton[] => {
    const buttons: PresenceButton[] = [];

    if (button1 !== null)
        buttons.push({
            label: button1.text,
            url: button1.url,
        });
    if (button2 !== null)
        buttons.push({
            label: button2.text,
            url: button2.url,
        });

    return buttons;
};
