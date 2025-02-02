import type Activity from "../../activity/types/Activity";
import type ActivityDisplayComponentProps from "./types/ActivityDisplayComponentProps";
import ActivityDisplayAssets from "./ActivityDisplayAssets/ActivityDisplayAssets";
import ActivityDisplayButtons from "./ActivityDisplayButtons/ActivityDisplayButtons";
import ActivityDisplayContent from "./ActivityDisplayContent/ActivityDisplayContent";
import ActivityDisplayProgressBar from "./ActivityDisplayProgressBar/ActivityDisplayProgressBar";
import ActivityDisplayType from "./ActivityDisplayType/ActivityDisplayType";
import "./ActivityDisplay.css";

type ActivityDisplayProps = {
    activity: Activity | null,
} & ActivityDisplayComponentProps;

const ActivityDisplay = (props: ActivityDisplayProps) => {
    const activity = props.activity;

    return activity !== null
        ? (
            <div id="activity-display" className={props.edit ? "edit" : undefined}>
                <div id="activity-type">
                    <ActivityDisplayType
                        type={activity.type}
                        edit={props.edit}
                    />
                </div>
                <div id="activity-main">
                    <div id="activity-assets">
                        <ActivityDisplayAssets
                            clientId={activity.clientId}
                            imageSmall={activity.imageSmall}
                            imageLarge={activity.imageLarge}
                            edit={props.edit}
                        />
                    </div>
                    <div id="activity-content">
                        <ActivityDisplayContent
                            clientId={activity.clientId}
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
                        edit={props.edit}
                    />
                </div>
            </div>
        )
        : null;
};

export default ActivityDisplay;
