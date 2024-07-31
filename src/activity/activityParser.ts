import type Activity from "./types/Activity";
import type ActivityButton from "./types/ActivityButton";
import type ActivityClientId from "./types/ActivityClientId";
import type ActivityClientSecret from "./types/ActivityClientSecret";
import type ActivityCount from "./types/ActivityCount";
import type ActivityDetails from "./types/ActivityDetails";
import type ActivityImage from "./types/ActivityImage";
import type ActivityState from "./types/ActivityState";
import { type ActivityTimestamp, ActivityTimestampMode, validateTimestampMode } from "./types/ActivityTimestamp";

export const parseActivity = (json: string): Activity | null => {
    try {
        const parsedActivity = JSON.parse(json) as Activity;
        return {
            name: parseName(parsedActivity.name),
            clientId: parseClientId(parsedActivity.clientId),
            clientSecret: parseClientSecret(parsedActivity.clientSecret),
            details: parseDetails(parsedActivity.details),
            state: parseState(parsedActivity.state),
            count: parseCount(parsedActivity.count),
            imageLarge: parseImage(parsedActivity.imageLarge),
            imageSmall: parseImage(parsedActivity.imageSmall),
            timestampMode: parseTimestampMode(parsedActivity.timestampMode),
            timestampStart: parseTimestamp(parsedActivity.timestampStart),
            timestampEnd: parseTimestamp(parsedActivity.timestampEnd),
            button1: parseButton(parsedActivity.button1),
            button2: parseButton(parsedActivity.button2),
        };
    }
    catch {
        // error parsing JSON
    }

    return null;
};

const parseName = (name?: string): string => {
    return typeof name === "string"
        ? name
        : "";
};

const parseClientId = (clientId?: ActivityClientId): ActivityClientId => {
    return typeof clientId === "string"
        ? clientId
        : "";
};

const parseClientSecret = (clientSecret?: ActivityClientSecret | null): ActivityClientSecret | null => {
    return typeof clientSecret === "string"
        ? clientSecret
        : null;
};

const parseDetails = (details?: ActivityDetails | null): ActivityDetails | null => {
    return typeof details === "string"
        ? details
        : null;
};

const parseState = (state?: ActivityState | null): ActivityState | null => {
    return typeof state === "string"
        ? state
        : null;
};

const parseCount = (count?: ActivityCount | null): ActivityCount | null => {
    return typeof count === "object" && count !== null
        ? {
            current: typeof count.current === "number"
                ? count.current
                : 0,
            max: typeof count.max === "number"
                ? count.max
                : 0,
        }
        : null;
};

const parseImage = (image?: ActivityImage | null): ActivityImage | null => {
    return typeof image === "object" && image !== null
        ? {
            key: typeof image.key === "string"
                ? image.key
                : "",
            text: typeof image.text === "string"
                ? image.text
                : undefined,
        }
        : null;
};

const parseTimestampMode = (timestampMode?: ActivityTimestampMode): ActivityTimestampMode => {
    return validateTimestampMode(timestampMode)
        ? timestampMode
        : ActivityTimestampMode.None;
};

const parseTimestamp = (timestamp?: ActivityTimestamp | null): ActivityTimestamp | null => {
    return typeof timestamp === "number"
        ? timestamp
        : null;
};

const parseButton = (button?: ActivityButton | null): ActivityButton | null => {
    return typeof button === "object" && button !== null
        ? {
            text: typeof button.text === "string"
                ? button.text
                : "",
            url: typeof button.url === "string"
                ? button.url
                : "",
        }
        : null;
};
