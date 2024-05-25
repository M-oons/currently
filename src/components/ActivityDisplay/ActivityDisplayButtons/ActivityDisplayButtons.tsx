import type ActivityButton from "../../../activity/types/ActivityButton";
import "./ActivityDisplayButtons.css";

type ActivityDisplayButtonsProps = {
    button1: ActivityButton | null,
    button2: ActivityButton | null,
};

function ActivityDisplayButtons(props: ActivityDisplayButtonsProps) {
    return (
        <>
            <button type="button" className="activity-button"><span>Button 1</span></button>
            <button type="button" className="activity-button"><span>Button 2</span></button>
        </>
    );
}

export default ActivityDisplayButtons;
