import ActivityButton from "./ActivityButton";
import ActivityCount from "./ActivityCount";
import ActivityDetails from "./ActivityDetails";
import ActivityTimestampEnd from "./ActivityTimestampEnd";
import ActivityImage from "./ActivityImage";
import ActivityTimestampStart from "./ActivityTimestampStart";
import ActivityState from "./ActivityState";

type Activity = {
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
