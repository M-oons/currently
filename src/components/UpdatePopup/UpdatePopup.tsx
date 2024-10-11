import { useEffect, useState } from "react";
import Alert from "../Alert/Alert";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import { type UpdateInfo } from "../../utils/updater";
import "./UpdatePopup.css";

type UpdatePopupProps = {
    updateInfo: UpdateInfo | null,
};

const UpdatePopup = (props: UpdatePopupProps) => {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (props.updateInfo === null)
            return;

        setOpen(props.updateInfo.update);
    }, [props.updateInfo]);

    const getAlertText = (): string => {
        let alert = "An update is available.";
        if (props.updateInfo !== null)
            alert += `\n[${props.updateInfo.local} -> ${props.updateInfo.remote}]`;
        return alert;
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
                <>
                    <Alert
                        type="info"
                        text={getAlertText()}
                    />
                </>
            }
            footer={
                <>
                    <Button id="update-popup-repository" color="blurple" onClick={openRepository}>Show</Button>
                    <Button id="update-popup-close" color="grey" onClick={closePopup}>Close</Button>
                </>
            }
        />
    );
};

export default UpdatePopup;
