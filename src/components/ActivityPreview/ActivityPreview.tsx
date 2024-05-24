import "./ActivityPreview.css";
import Activity from "../../activity/Activity";
import ActivityPreviewAssets from "./ActivityPreviewAssets/ActivityPreviewAssets";
import ActivityPreviewButtons from "./ActivityPreviewButtons/ActivityPreviewButtons";
import ActivityPreviewContent from "./ActivityPreviewContent/ActivityPreviewContent";
import ActivityPreviewProgressBar from "./ActivityPreviewProgressBar/ActivityPreviewProgressBar";

type ActivityPreviewProps = {
    activity: Activity,
};

function ActivityPreview(props: ActivityPreviewProps) {
    const activity = props.activity;

    return (
        <div id="activity-preview">
            <div id="activity-main">
                <div id="activity-assets">
                    <ActivityPreviewAssets
                        imageSmall={activity.imageSmall}
                        imageLarge={activity.imageLarge}
                    />
                </div>
                <div id="activity-content">
                    <ActivityPreviewContent
                        title={activity.name}
                        details={activity.details}
                        state={activity.state}
                        timestampStart={activity.timestampStart}
                        timestampEnd={activity.timestampEnd}
                    />
                </div>
            </div>
            <div id="activity-progress-bar">
                <ActivityPreviewProgressBar
                    timestampStart={activity.timestampStart}
                    timestampEnd={activity.timestampEnd}
                />
            </div>
            <div id="activity-buttons">
                <ActivityPreviewButtons
                    button1={activity.button1}
                    button2={activity.button2}
                />
            </div>
        </div>
    );
}

export default ActivityPreview;
