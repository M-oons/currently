import useActivity from "../../hooks/useActivity";
import Button from "../Button/Button";
import "./ActivityControls.css";

type ActivityControlsProps = {
    edit: boolean,
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
                    ? <Button id="activity-control-stop" onClick={stopActivity}>Stop</Button>
                    : <Button id="activity-control-start" onClick={startActivity}>Start</Button>
                )
            }
            {props.edit
                ? <Button id="activity-control-done" onClick={stopEdit}>Done</Button>
                : <Button id="activity-control-edit" onClick={startEdit}><span>✎</span></Button>
            }
        </div>
    );
};

export default ActivityControls;
