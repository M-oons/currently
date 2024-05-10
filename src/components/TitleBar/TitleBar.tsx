import "./TitleBar.css";

function TitleBar() {
    return (
        <div id="title-bar">
            <div id="title-bar-banner"></div>
            <div id="title-bar-buttons">
                <div className="title-bar-button">─</div>
                <div className="title-bar-button">⨉</div>
            </div>
        </div>
    );
}

export default TitleBar;
