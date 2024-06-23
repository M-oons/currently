import { useState } from "react";
import useActivity from "../../hooks/useActivity";
import Button from "../Button/Button";
import "./ActivityControls.css";

type ActivityControlsProps = {
    onEditToggle: (value: boolean) => void,
};

const ActivityControls = (props: ActivityControlsProps) => {
    const { startActivity, stopActivity, active } = useActivity();
    const [edit, setEdit] = useState<boolean>(false);

    const startEdit = () => {
        setEdit(true);
        props.onEditToggle(true);
    };

    const stopEdit = () => {
        setEdit(false);
        props.onEditToggle(false);
    };

    return (
        <div id="activity-controls">
            {!edit &&
                (active
                    ? <Button id="activity-control-stop" onClick={stopActivity}>Stop</Button>
                    : <Button id="activity-control-start" onClick={startActivity}>Start</Button>
                )
            }
            {edit
                ? <Button id="activity-control-done" onClick={stopEdit}>Done</Button>
                : <Button id="activity-control-edit" onClick={startEdit}>Edit</Button>
            }
        </div>
    );
};

export default ActivityControls;
