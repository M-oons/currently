import type Activity from "../../activity/types/Activity";
import ActivityDisplayAssets from "./ActivityDisplayAssets/ActivityDisplayAssets";
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
                        timestampStart={activity.timestampStart}
                        timestampEnd={activity.timestampEnd}
                        edit={props.edit}
                    />
                </div>
            </div>
            <div id="activity-progress-bar">
                <ActivityDisplayProgressBar
                    timestampStart={activity.timestampStart}
                    timestampEnd={activity.timestampEnd}
                />
            </div>
        </div>
    );
};

export default ActivityDisplay;
