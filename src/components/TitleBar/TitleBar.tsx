import { useCallback, useState } from "react";
import Switch from "../Switch/Switch";
import "./TitleBar.css";

const TitleBar = () => {
    const [active, setActive] = useState<boolean>(false);

    const startActivity = async () => {
        const isActive = await window.api.startActivity();
        setActive(isActive);
    };

    const stopActivity = async () => {
        const isActive = await window.api.stopActivity();
        setActive(isActive);
    };

    const toggleActivity = useCallback(async (value: boolean) => {
        if (value)
            await startActivity();
        else
            await stopActivity();
    }, []);

    return (
        <div id="title-bar">
            <div id="title-bar-banner"></div>
            <div id="title-bar-controls">
                <div id="title-bar-button-close" className="title-bar-button" onClick={window.api.close}>⨉</div>
                <div id="title-bar-button-minimize" className="title-bar-button" onClick={window.api.minimize}>─</div>
                <div id="title-bar-button-help" className="title-bar-button" onClick={window.api.help}>?</div>
                <div id="title-bar-switch-activity">
                    <Switch value={active} onChange={toggleActivity} />
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
