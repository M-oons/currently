import type Activity from "../../activity/types/Activity";
import ActivityDisplayAssets from "./ActivityDisplayAssets/ActivityDisplayAssets";
import ActivityDisplayButtons from "./ActivityDisplayButtons/ActivityDisplayButtons";
import ActivityDisplayContent from "./ActivityDisplayContent/ActivityDisplayContent";
import ActivityDisplayProgressBar from "./ActivityDisplayProgressBar/ActivityDisplayProgressBar";
import "./ActivityDisplay.css";

type ActivityDisplayProps = {
    activity: Activity,
    edit: boolean,
};

const ActivityDisplay = (props: ActivityDisplayProps) => {
    const activity = props.activity;

    return (
        <div id="activity-display" className={props.edit ? "edit" : undefined}>
            <div id="activity-main">
                <div id="activity-assets">
                    <ActivityDisplayAssets
                        clientId={activity.clientId}
                        imageSmall={activity.imageSmall}
                        imageLarge={activity.imageLarge}
                    />
                </div>
                <div id="activity-content">
                    <ActivityDisplayContent
                        clientId={activity.clientId}
                        clientSecret={activity.clientSecret}
                        details={activity.details}
                        state={activity.state}
                        count={activity.count}
                        timestampMode={activity.timestampMode}
                        timestampStart={activity.timestampStart}
                        timestampEnd={activity.timestampEnd}
                        edit={props.edit}
                    />
                </div>
            </div>
            <div id="activity-progress-bar">
                <ActivityDisplayProgressBar
                    timestampMode={activity.timestampMode}
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
};

export default ActivityDisplay;
