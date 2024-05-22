import "./ActivityPreviewContent.css";
import ActivityDetails from "../../../activity/ActivityDetails";
import ActivityState from "../../../activity/ActivityState";
import ActivityTimestampEnd from "../../../activity/ActivityTimestampEnd";
import ActivityTimestampStart from "../../../activity/ActivityTimestampStart";

type ActivityPreviewContentProps = {
    title: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
};

function ActivityPreviewContent(props: ActivityPreviewContentProps) {
    return (
        <>
            <div id="activity-title"><span>Title</span></div>
            <div id="activity-details"><span>Details</span></div>
            <div id="activity-state"><span>State</span></div>
            <div id="activity-timestamp"><span>00:00:01 left</span></div>
        </>
    );
}

export default ActivityPreviewContent;
