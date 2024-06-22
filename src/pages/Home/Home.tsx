import { useCallback, useState } from "react";
import ActivityControls from "../../components/ActivityControls/ActivityControls";
import ActivityDisplay from "../../components/ActivityDisplay/ActivityDisplay";
import useActivity from "../../hooks/useActivity";
import Page from "../Page";

const Home = () => {
    const { activity } = useActivity();
    const [edit, setEdit] = useState<boolean>(false);

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
                onEditToggle={toggleEdit}
            />
        </Page>
    );
};

export default Home;
