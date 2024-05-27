import type Activity from "./activity/types/Activity";
import { getActivity } from "./activity/activityLoader";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import TitleBar from "./components/TitleBar/TitleBar";
import "./App.css";

function App() {
    const activity: Activity = getActivity();

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
