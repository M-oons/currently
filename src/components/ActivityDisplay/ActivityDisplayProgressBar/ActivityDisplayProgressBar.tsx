import type ActivityTimestampEnd from "../../../activity/types/ActivityTimestampEnd";
import type ActivityTimestampStart from "../../../activity/types/ActivityTimestampStart";
import "./ActivityDisplayProgressBar.css";

type ActivityDisplayProgressBarProps = {
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
};

function ActivityDisplayProgressBar(props: ActivityDisplayProgressBarProps) {
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

export default ActivityDisplayProgressBar;