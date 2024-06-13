import { useState } from "react";
import "./ActivityControls.css";

type ActivityControlsProps = {
    onActivityToggle: (value: boolean) => void,
    onEditToggle: (value: boolean) => void,
};

const ActivityControls = (props: ActivityControlsProps) => {
    const [active, setActive] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    const startActivity = () => {
        setActive(true);
        props.onActivityToggle(true);
    };

    const stopActivity = () => {
        setActive(false);
        props.onActivityToggle(false);
    };

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
                    ? <button id="activity-control-stop" type="button" tabIndex={-1} onClick={stopActivity}>Stop</button>
                    : <button id="activity-control-start" type="button" tabIndex={-1} onClick={startActivity}>Start</button>
                )
            }
            {edit
                ? <button id="activity-control-done" type="button" tabIndex={-1} onClick={stopEdit}>Done</button>
                : <button id="activity-control-edit" type="button" tabIndex={-1} onClick={startEdit}>Edit</button>
            }
        </div>
    );
};

export default ActivityControls;
