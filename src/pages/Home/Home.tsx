import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActivityControls from "../../components/ActivityControls/ActivityControls";
import ActivityDisplay from "../../components/ActivityDisplay/ActivityDisplay";
import Alert from "../../components/Alert/Alert";
import useActivity from "../../hooks/useActivity";
import { toBoolean } from "../../utils/conversion";
import Page from "../Page";
import "./Home.css";

const Home = () => {
    const [searchParams] = useSearchParams();
    const { activity } = useActivity();
    const [edit, setEdit] = useState<boolean>(toBoolean(searchParams.get("edit")));
    const [discordRunning, setDiscordRunning] = useState<boolean>(true);

    useEffect(() => {
        const checkDiscordRunning = async () => {
            const isRunning = await window.flow.isDiscordRunning();
            setDiscordRunning(isRunning);
        };

        checkDiscordRunning();
    }, []);

    useEffect(() => {
        if (activity !== null && activity.clientId === null)
            setEdit(true);
    }, [activity]);

    const toggleEdit = useCallback(() => {
        setEdit($state => !$state);
    }, []);

    return (
        <Page name="home">
            {!discordRunning &&
                <div id="discord-running-alert-container">
                    <Alert
                        type="warning"
                        text="Discord is not detected - activity can't be updated."
                    />
                </div>
            }
            {activity !== null && activity.clientId !== null &&
                <ActivityControls
                    edit={edit}
                    disabled={!discordRunning}
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
