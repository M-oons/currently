import type ActivityButton from "../../../activity/types/ActivityButton";
import Button from "../../../components/Button/Button";
import "./ActivityDisplayButtons.css";

type ActivityDisplayButtonsProps = {
    button1: ActivityButton | null,
    button2: ActivityButton | null,
};

const ActivityDisplayButtons = (props: ActivityDisplayButtonsProps) => {
    return (
        <>
            {props.button1 && <Button className="activity-button">{props.button1.text}</Button>}
            {props.button2 && <Button className="activity-button">{props.button2.text}</Button>}
        </>
    );
};

export default ActivityDisplayButtons;
