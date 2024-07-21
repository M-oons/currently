import { type Presence } from "discord-rpc";
import type Activity from "./types/Activity";
import type ActivityButton from "./types/ActivityButton";
import { type ActivityTimestamp, ActivityTimestampMode } from "./types/ActivityTimestamp";

type PresenceButton = {
    label: string,
    url: string,
};

type PresenceTimestamp = number | Date;

export const buildPresence = (activity: Activity): Presence => {
    return {
        details: activity.details ?? undefined,
        state: activity.state ?? undefined,
        largeImageKey: activity.imageLarge?.key,
        largeImageText: activity.imageLarge?.text,
        smallImageKey: activity.imageSmall?.key,
        smallImageText: activity.imageSmall?.text,
        startTimestamp: buildPresenceTimestamp(activity.timestampMode, activity.timestampStart),
        endTimestamp: buildPresenceTimestamp(activity.timestampMode, activity.timestampEnd),
        partySize: activity.count?.current,
        partyMax: activity.count?.max,
        buttons: buildPresenceButtons(activity.button1, activity.button2),
    };
};

const buildPresenceTimestamp = (timestampMode: ActivityTimestampMode, timestamp: ActivityTimestamp | null): PresenceTimestamp | undefined => {
    return timestampMode === ActivityTimestampMode.None
        ? undefined
        : timestamp ?? undefined;
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
