import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActivityControls from "../../components/ActivityControls/ActivityControls";
import ActivityDisplay from "../../components/ActivityDisplay/ActivityDisplay";
import useActivity from "../../hooks/useActivity";
import { toBoolean } from "../../utils/conversion";
import Page from "../Page";

const Home = () => {
    const [searchParams] = useSearchParams();
    const { activity } = useActivity();
    const [edit, setEdit] = useState<boolean>(toBoolean(searchParams.get("edit")));

    useEffect(() => {
        if (activity !== null && activity.clientId === null)
            setEdit(true);
    }, [activity]);

    const toggleEdit = useCallback(() => {
        setEdit($state => !$state);
    }, []);

    return (
        <Page name="home">
            {activity !== null && activity.clientId !== null &&
                <ActivityControls
                    edit={edit}
                    onEditToggle={toggleEdit}
                />
            }
            <ActivityDisplay
                activity={activity}
                edit={edit}
            />
        </Page>
    );
};

export default Home;
