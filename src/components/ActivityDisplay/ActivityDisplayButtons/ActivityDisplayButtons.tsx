import type ActivityButton from "../../../activity/types/ActivityButton";
import "./ActivityDisplayButtons.css";

type ActivityDisplayButtonsProps = {
    button1: ActivityButton | null,
    button2: ActivityButton | null,
};

const ActivityDisplayButtons = (props: ActivityDisplayButtonsProps) => {
    return (
        <>
            {props.button1 && <button type="button" className="activity-button" tabIndex={-1}>{props.button1.text}</button>}
            {props.button2 && <button type="button" className="activity-button" tabIndex={-1}>{props.button2.text}</button>}
        </>
    );
};

export default ActivityDisplayButtons;
