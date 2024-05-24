import "./ActivityDisplay.css";
import Activity from "../../activity/Activity";
import ActivityDisplayAssets from "./ActivityDisplayAssets/ActivityDisplayAssets";
import ActivityDisplayButtons from "./ActivityDisplayButtons/ActivityDisplayButtons";
import ActivityDisplayContent from "./ActivityDisplayContent/ActivityDisplayContent";
import ActivityDisplayProgressBar from "./ActivityDisplayProgressBar/ActivityDisplayProgressBar";

type ActivityDisplayProps = {
    activity: Activity,
};

function ActivityDisplay(props: ActivityDisplayProps) {
    const activity = props.activity;

    return (
        <div id="activity-display">
            <div id="activity-main">
                <div id="activity-assets">
                    <ActivityDisplayAssets
                        imageSmall={activity.imageSmall}
                        imageLarge={activity.imageLarge}
                    />
                </div>
                <div id="activity-content">
                    <ActivityDisplayContent
                        title={activity.name}
                        details={activity.details}
                        state={activity.state}
                        timestampStart={activity.timestampStart}
                        timestampEnd={activity.timestampEnd}
                    />
                </div>
            </div>
            <div id="activity-progress-bar">
                <ActivityDisplayProgressBar
                    timestampStart={activity.timestampStart}
                    timestampEnd={activity.timestampEnd}
                />
            </div>
            <div id="activity-buttons">
                <ActivityDisplayButtons
                    button1={activity.button1}
                    button2={activity.button2}
                />
            </div>
        </div>
    );
}

export default ActivityDisplay;
