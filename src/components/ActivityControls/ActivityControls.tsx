import { useState } from "react";
import useActivity from "../../hooks/useActivity";
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
