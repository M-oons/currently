import "./ActivityPreview.css";

function ActivityPreview() {
    return (
        <div id="activity-preview">
            <div id="activity-main">
                <div id="activity-assets">
                    <div id="activity-asset-large">
                        <img id="activity-asset-large-image" src="/images/image.png"></img>
                        <span id="activity-asset-large-tooltip" className="activity-asset-tooltip">Large</span>
                    </div>
                    <div id="activity-asset-small">
                        <img id="activity-asset-small-image" src="/images/image.png"></img>
                        <span id="activity-asset-small-tooltip" className="activity-asset-tooltip">Small</span>
                    </div>
                </div>
                <div id="activity-content">
                    <div id="activity-title"><span>Title</span></div>
                    <div id="activity-details"><span>Details</span></div>
                    <div id="activity-state"><span>State (1 of 10)</span></div>
                    <div id="activity-timestamp"><span>00:00:01 elapsed</span></div>
                </div>
            </div>
            <div id="activity-buttons">
                <button type="button" className="activity-button"><span>Button 1</span></button>
                <button type="button" className="activity-button"><span>Button 2</span></button>
            </div>
        </div>
    );
}

export default ActivityPreview;
