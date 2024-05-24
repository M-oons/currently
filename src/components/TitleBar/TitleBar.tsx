import "./TitleBar.css";

function TitleBar() {
    return (
        <div id="title-bar">
            <div id="title-bar-banner"></div>
            <div id="title-bar-buttons">
                <div id="title-bar-button-close" className="title-bar-button" onClick={window.api.close}>⨉</div>
                <div id="title-bar-button-minimize" className="title-bar-button" onClick={window.api.minimize}>─</div>
                <div id="title-bar-button-help" className="title-bar-button" onClick={window.api.help}>?</div>
                <div id="title-bar-button-label"></div>
            </div>
        </div>
    );
}

export default TitleBar;
