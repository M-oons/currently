import { useCallback, useEffect, useState } from "react";
import { type Activity, defaultActivity } from "./activity/types/Activity";
import ActivityControls from "./components/ActivityControls/ActivityControls";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import TitleBar from "./components/TitleBar/TitleBar";
import "./App.css";

const App = () => {
    const [activity, setActivity] = useState<Activity>(defaultActivity);
    const [active, setActive] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        const getActivity = async () => {
            const activity: Activity = await window.api.getActivity();
            setActivity(activity);
        };
        getActivity();
    }, []);

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

    const toggleEdit = useCallback(() => {
        setEdit(state => !state);
    }, []);

    return (
        <div id="main">
            <TitleBar />
            <div id="activity-display-container">
                <ActivityDisplay
                    activity={activity}
                    edit={edit}
                />
            </div>
            <ActivityControls
                onActivityToggle={toggleActivity}
                onEditToggle={toggleEdit}
            />
        </div>
    );
};

export default App;
