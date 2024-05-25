import type ActivityButton from "./ActivityButton";
import type ActivityCount from "./ActivityCount";
import type ActivityDetails from "./ActivityDetails";
import type ActivityTimestampEnd from "./ActivityTimestampEnd";
import type ActivityImage from "./ActivityImage";
import type ActivityTimestampStart from "./ActivityTimestampStart";
import type ActivityState from "./ActivityState";

export type Activity = {
    name: string,
    applicationId: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    count: ActivityCount | null,
    imageLarge: ActivityImage | null,
    imageSmall: ActivityImage | null,
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
    button1: ActivityButton | null,
    button2: ActivityButton | null,
};

export default Activity;
