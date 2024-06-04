import { useEffect, useState } from "react";
import { type Activity, defaultActivity } from "./activity/types/Activity";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import TitleBar from "./components/TitleBar/TitleBar";
import "./App.css";

const App = () => {
    const [activity, setActivity] = useState<Activity>(defaultActivity);

    useEffect(() => {
        const getActivity = async (): Promise<void> => {
            const activity: Activity = await window.api.getActivity();
            setActivity(activity);
        };
        getActivity();
    }, []);

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
};

export default App;
