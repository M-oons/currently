import "./ActivityPreviewAssets.css";
import ActivityImage from "../../../activity/ActivityImage";

type ActivityPreviewAssetsProps = {
    imageLarge: ActivityImage | null,
    imageSmall: ActivityImage | null,
};

function ActivityPreviewAssets(props: ActivityPreviewAssetsProps) {
    return (
        <>
            <div id="activity-asset-large">
                <img id="activity-asset-large-image" src="/images/image.png"></img>
                <span id="activity-asset-large-tooltip" className="activity-asset-tooltip">Large</span>
            </div>
            <div id="activity-asset-small">
                <img id="activity-asset-small-image" src="/images/image.png"></img>
                <span id="activity-asset-small-tooltip" className="activity-asset-tooltip">Small</span>
            </div>
        </>
    );
}

export default ActivityPreviewAssets;
