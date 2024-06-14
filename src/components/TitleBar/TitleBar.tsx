import "./TitleBar.css";

type TitleBarProps = {
    active: boolean,
};

const TitleBar = (props: TitleBarProps) => {
    return (
        <div id="title-bar">
            <div id="title-bar-status" className={props.active ? "title-bar-status-on" : "title-bar-status-off"}>•</div>
            <div id="title-bar-banner"></div>
            <div id="title-bar-controls">
                <div id="title-bar-button-close" className="title-bar-button" onClick={window.api.close}>⨉</div>
                <div id="title-bar-button-minimize" className="title-bar-button" onClick={window.api.minimize}>─</div>
                <div id="title-bar-button-help" className="title-bar-button" onClick={window.api.help}>?</div>
            </div>
        </div>
    );
};

export default TitleBar;
