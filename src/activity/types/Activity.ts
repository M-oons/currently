import type ActivityButton from "./ActivityButton";
import type ActivityCount from "./ActivityCount";
import type ActivityDetails from "./ActivityDetails";
import type ActivityImage from "./ActivityImage";
import type ActivityState from "./ActivityState";
import { type ActivityTimestamp, ActivityTimestampMode } from "./ActivityTimestamp";

export type Activity = {
    name: string,
    clientId: string,
    clientSecret: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    count: ActivityCount | null,
    imageLarge: ActivityImage | null,
    imageSmall: ActivityImage | null,
    timestampMode: ActivityTimestampMode,
    timestampStart: ActivityTimestamp | null,
    timestampEnd: ActivityTimestamp | null,
    button1: ActivityButton | null,
    button2: ActivityButton | null,
};

export const defaultActivity: Activity = {
    clientId: "",
    clientSecret: "",
    name: "",
    details: null,
    state: null,
    count: null,
    imageLarge: null,
    imageSmall: null,
    timestampMode: ActivityTimestampMode.None,
    timestampStart: null,
    timestampEnd: null,
    button1: null,
    button2: null,
};

export default Activity;
