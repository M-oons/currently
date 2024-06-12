import { type Presence } from "discord-rpc";
import type Activity from "./types/Activity";
import type ActivityTimestampStart from "./types/ActivityTimestampStart";

type PresenceStartTimestamp = number | Date;

export const buildPresence = (activity: Activity): Presence => {
    return {
        details: activity.details ?? undefined,
        state: activity.state ?? undefined,
        largeImageKey: activity.imageLarge?.key,
        largeImageText: activity.imageLarge?.text,
        smallImageKey: activity.imageSmall?.key,
        smallImageText: activity.imageSmall?.text,
        startTimestamp: buildPresenceStartTimestamp(activity.timestampStart),
        endTimestamp: activity.timestampEnd ?? undefined,
        partySize: activity.count?.current,
        partyMax: activity.count?.max,
    };
};

const buildPresenceStartTimestamp = (timestamp: ActivityTimestampStart | null): PresenceStartTimestamp | undefined => {
    if (timestamp === null)
        return undefined;

    if (typeof timestamp === "number")
        return timestamp.valueOf(); // number

    return timestamp.valueOf()
        ? new Date() // true
        : undefined; // false
};
