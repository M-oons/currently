import { useNavigate } from "react-router-dom";
import useActivity from "../../hooks/useActivity";
import "./TitleBar.css";

const TitleBar = () => {
    const navigate = useNavigate();
    const { active } = useActivity();

    return (
        <div id="title-bar">
            <div id="title-bar-status" className={active ? "title-bar-status-on" : "title-bar-status-off"}>•</div>
            <div id="title-bar-banner"></div>
            <div id="title-bar-controls">
                <div id="title-bar-button-close" className="title-bar-button" onClick={window.functions.close}>⨉</div>
                <div id="title-bar-button-minimize" className="title-bar-button" onClick={window.functions.minimize}>─</div>
                <div id="title-bar-button-help" className="title-bar-button" onClick={window.functions.help}>?</div>
                <div id="title-bar-button-settings" className="title-bar-button" onClick={() => navigate("/settings")}>⚙</div>
            </div>
        </div>
    );
};

export default TitleBar;
