import "./TitleBar.css";

function TitleBar() {
    return (
        <div id="title-bar">
            <div id="title-bar-banner"></div>
            <div id="title-bar-buttons">
                <div className="title-bar-button" onClick={window.api.close}>⨉</div>
                <div className="title-bar-button" onClick={window.api.minimize}>─</div>
                <div className="title-bar-button" onClick={window.api.help}>?</div>
            </div>
        </div>
    );
}

export default TitleBar;
