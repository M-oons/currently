import { useCallback, useEffect, useState } from "react";
import { type Activity, defaultActivity } from "../../activity/types/Activity";
import ActivityControls from "../../components/ActivityControls/ActivityControls";
import ActivityDisplay from "../../components/ActivityDisplay/ActivityDisplay";
import Page from "../Page";

type HomeProps = {
    onActivityToggle: (value: boolean) => void,
};

const Home = (props: HomeProps) => {
    const [activity, setActivity] = useState<Activity>(defaultActivity);
    const [edit, setEdit] = useState<boolean>(false);

    useEffect(() => {
        const getActivity = async () => {
            const activity: Activity = await window.api.getActivity();
            setActivity(activity);
        };
        getActivity();
    }, []);

    const toggleEdit = useCallback(() => {
        setEdit(state => !state);
    }, []);

    return (
        <Page name="home">
            <ActivityDisplay
                activity={activity}
                edit={edit}
            />
            <ActivityControls
                onActivityToggle={props.onActivityToggle}
                onEditToggle={toggleEdit}
            />
        </Page>
    );
};

export default Home;
