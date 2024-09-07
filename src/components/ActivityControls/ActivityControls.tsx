import useActivity from "../../hooks/useActivity";
import Button from "../Button/Button";
import "./ActivityControls.css";

type ActivityControlsProps = {
    edit: boolean,
    disabled: boolean,
    onEditToggle: (value: boolean) => void,
};

const ActivityControls = (props: ActivityControlsProps) => {
    const { startActivity, stopActivity, active } = useActivity();

    const startEdit = () => {
        props.onEditToggle(true);
    };

    const stopEdit = () => {
        props.onEditToggle(false);
    };

    return (
        <div id="activity-controls">
            {!props.edit &&
                (active
                    ? <Button id="activity-control-stop" color="red" disabled={props.disabled} onClick={stopActivity}>Stop</Button>
                    : <Button id="activity-control-start" color="green" disabled={props.disabled} onClick={startActivity}>Start</Button>
                )
            }
            {props.edit
                ? <Button id="activity-control-done" color="blurple" onClick={stopEdit}>Done</Button>
                : <Button id="activity-control-edit" color="blurple" onClick={startEdit}><span>✎</span></Button>
            }
        </div>
    );
};

export default ActivityControls;
