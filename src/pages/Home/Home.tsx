import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ActivityControls from "../../components/ActivityControls/ActivityControls";
import ActivityDisplay from "../../components/ActivityDisplay/ActivityDisplay";
import Alert from "../../components/Alert/Alert";
import useActivity from "../../hooks/useActivity";
import useInterval from "../../hooks/useInterval";
import { toBoolean } from "../../utils/conversion";
import Page from "../Page";
import "./Home.css";

const Home = () => {
    const [searchParams] = useSearchParams();
    const { activity, active, startActivity } = useActivity();
    const [edit, setEdit] = useState<boolean>(toBoolean(searchParams.get("edit")));
    const [discordRunning, setDiscordRunning] = useState<boolean | null>(null);

    useInterval(5000, async () => {
        if (discordRunning)
            return;

        const isRunning = await window.flow.isDiscordRunning();
        setDiscordRunning(isRunning);
    }, true, [discordRunning]);

    useEffect(() => {
        if (activity !== null && activity.clientId === null)
            setEdit(true);
    }, [activity]);

    const toggleEdit = useCallback(async (value: boolean) => {
        setEdit(value);

        if (!value && active)
            await startActivity();
    }, [activity]);

    return (
        <Page name="home">
            {discordRunning === false &&
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
