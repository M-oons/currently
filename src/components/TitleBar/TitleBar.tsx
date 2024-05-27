import { useState } from "react";
import "./TitleBar.css";

function TitleBar() {
    const [active, setActive] = useState<boolean>(false);

    const startActivity = async () => {
        const isActive = await window.api.startActivity();
        setActive(isActive);
    };

    const stopActivity = async () => {
        const isActive = await window.api.stopActivity();
        setActive(isActive);
    };

    return (
        <div id="title-bar">
            <div id="title-bar-banner"></div>
            <div id="title-bar-buttons">
                <div id="title-bar-button-close" className="title-bar-button" onClick={window.api.close}>⨉</div>
                <div id="title-bar-button-minimize" className="title-bar-button" onClick={window.api.minimize}>─</div>
                <div id="title-bar-button-help" className="title-bar-button" onClick={window.api.help}>?</div>
                {active
                    ? <div id="title-bar-button-stop" className="title-bar-button" onClick={stopActivity}>⬤</div>
                    : <div id="title-bar-button-start" className="title-bar-button" onClick={startActivity}>⬤</div>
                }
                <div id="title-bar-button-label"></div>
            </div>
        </div>
    );
}

export default TitleBar;
