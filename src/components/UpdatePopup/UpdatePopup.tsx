import { useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import "./UpdatePopup.css";

type UpdatePopupProps = {
    update: boolean,
};

const UpdatePopup = (props: UpdatePopupProps) => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        setOpen(props.update);
    }, [props.update]);

    const updateAndRestart = () => {
        window.flow.applyUpdate();
    };

    const openRepository = () => {
        window.functions.help();
    };

    const closePopup = () => {
        setOpen(false);
    };

    return (
        <Popup
            open={open}
            content={
                <Alert
                    type="info"
                    text="An update is available."
                />
            }
            footer={
                <>
                    {window.info.platform === "win32" 
                        ? <Button id="update-popup-update" color="blurple" onClick={updateAndRestart}>Update</Button>
                        : <Button id="update-popup-repository" color="blurple" onClick={openRepository}>Show</Button>
                    }
                    <Button id="update-popup-close" color="grey" onClick={closePopup}>Close</Button>
                </>
            }
        />
    );
};

export default UpdatePopup;
