import "./ActivityPreviewProgressBar.css";
import ActivityTimestampEnd from "../../../activity/ActivityTimestampEnd";
import ActivityTimestampStart from "../../../activity/ActivityTimestampStart";

type ActivityPreviewProgressBarProps = {
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
};

function ActivityPreviewProgressBar(props: ActivityPreviewProgressBarProps) {
    return (
        <>
            <div id="activity-progress-bar-outer">
                <div id="activity-progress-bar-inner" style={{ width: "90%" }}></div>
            </div>
            <div id="activity-progress-bar-time">
                <div id="activity-progress-bar-time-current" className="activity-progress-bar-time-number">0:09</div>
                <div id="activity-progress-bar-time-max" className="activity-progress-bar-time-number">0:10</div>
            </div>
        </>
    );
}

export default ActivityPreviewProgressBar;
