import "./ActivityPreviewButtons.css";
import ActivityButton from "../../../activity/ActivityButton";

type ActivityPreviewButtonsProps = {
    button1: ActivityButton | null,
    button2: ActivityButton | null,
};

function ActivityPreviewButtons(props: ActivityPreviewButtonsProps) {
    return (
        <>
            <button type="button" className="activity-button"><span>Button 1</span></button>
            <button type="button" className="activity-button"><span>Button 2</span></button>
        </>
    );
}

export default ActivityPreviewButtons;
