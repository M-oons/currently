import "./ActivityPreview.css";
import ActivityPreviewAssets from "./ActivityPreviewAssets/ActivityPreviewAssets";
import ActivityPreviewButtons from "./ActivityPreviewButtons/ActivityPreviewButtons";
import ActivityPreviewContent from "./ActivityPreviewContent/ActivityPreviewContent";
import ActivityPreviewProgressBar from "./ActivityPreviewProgressBar/ActivityPreviewProgressBar";

function ActivityPreview() {
    return (
        <div id="activity-preview" style={{ scale: "1.3" }}>
            <div id="activity-main">
                <div id="activity-assets">
                    <ActivityPreviewAssets />
                </div>
                <div id="activity-content">
                    <ActivityPreviewContent />
                </div>
            </div>
            <div id="activity-progress-bar">
                <ActivityPreviewProgressBar />
            </div>
            <div id="activity-buttons">
                <ActivityPreviewButtons />
            </div>
        </div>
    );
}

export default ActivityPreview;
