import type Activity from "./activity/types/Activity";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import TitleBar from "./components/TitleBar/TitleBar";
import "./App.css";

function App() {
    const activity: Activity = {
        name: "Title",
        applicationId: "123",
        details: "Details",
        state: "State",
        count: {
            current: 1,
            max: 10,
        },
        imageLarge: {
            key: "large",
            text: "Large",
        },
        imageSmall: {
            key: "small",
            text: "Small",
        },
        timestampStart: 0,
        timestampEnd: 1,
        button1: {
            text: "Button 1",
            url: "http://localhost",
        },
        button2: {
            text: "Button 2",
            url: "http://localhost",
        },
    };

    return (
        <div id="main">
            <TitleBar />
            <div id="container">
                <ActivityDisplay
                    activity={activity}
                />
            </div>
        </div>
    );
}

export default App;
