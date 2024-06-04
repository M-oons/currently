import type ActivityImage from "../../../activity/types/ActivityImage"
import "./ActivityDisplayAssets.css";

type ActivityDisplayAssetsProps = {
    imageLarge: ActivityImage | null,
    imageSmall: ActivityImage | null,
};

const ActivityDisplayAssets = (props: ActivityDisplayAssetsProps) => {
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
};

export default ActivityDisplayAssets;
