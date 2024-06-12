import type Activity from "./types/Activity";
import type ActivityCount from "./types/ActivityCount";
import type ActivityDetails from "./types/ActivityDetails";
import type ActivityImage from "./types/ActivityImage";
import type ActivityState from "./types/ActivityState";
import type ActivityTimestampEnd from "./types/ActivityTimestampEnd";
import type ActivityTimestampStart from "./types/ActivityTimestampStart";

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
            timestampStart: parseTimestampStart(parsedActivity.timestampStart),
            timestampEnd: parseTimestampEnd(parsedActivity.timestampEnd),
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

const parseClientId = (clientId?: string): string => {
    return typeof clientId === "string"
        ? clientId
        : "";
};

const parseClientSecret = (clientSecret?: string): string => {
    return typeof clientSecret === "string"
        ? clientSecret
        : "";
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

const parseTimestampStart = (timestampStart?: ActivityTimestampStart | null): ActivityTimestampStart | null => {
    return typeof timestampStart === "number" || typeof timestampStart === "boolean"
        ? timestampStart
        : null;
};

const parseTimestampEnd = (timestampEnd?: ActivityTimestampEnd | null): ActivityTimestampEnd | null => {
    return typeof timestampEnd === "number"
        ? timestampEnd
        : null;
};
