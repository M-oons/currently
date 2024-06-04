import type ActivityDetails from "../../../activity/types/ActivityDetails";
import type ActivityState from "../../../activity/types/ActivityState";
import type ActivityTimestampEnd from "../../../activity/types/ActivityTimestampEnd";
import type ActivityTimestampStart from "../../../activity/types/ActivityTimestampStart";
import "./ActivityDisplayContent.css";

type ActivityDisplayContentProps = {
    title: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
};

const ActivityDisplayContent = (props: ActivityDisplayContentProps) => {
    return (
        <>
            <div id="activity-title"><span>Title</span></div>
            <div id="activity-details"><span>Details</span></div>
            <div id="activity-state"><span>State</span></div>
            <div id="activity-timestamp"><span>00:00:01 left</span></div>
        </>
    );
};

export default ActivityDisplayContent;
