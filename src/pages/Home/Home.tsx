import { useCallback, useState } from "react";
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

    const toggleEdit = useCallback(() => {
        setEdit($state => !$state);
    }, []);

    return (
        <Page name="home">
            <ActivityControls
                edit={edit}
                onEditToggle={toggleEdit}
            />
            <ActivityDisplay
                activity={activity}
                edit={edit}
            />
        </Page>
    );
};

export default Home;
