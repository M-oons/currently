import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type ActivityCount from "../../activity/types/ActivityCount";
import type ActivityDetails from "../../activity/types/ActivityDetails";
import type ActivityState from "../../activity/types/ActivityState";
import Button from "../../components/Button/Button";
import useActivity from "../../hooks/useActivity";
import Page from "../Page";
import EditDetails from "./EditDetails/EditDetails";
import EditState from "./EditState/EditState";
import "./Edit.css";

type EditParams = {
    page: EditPage,
};

export type EditPage =
    | "application"
    | "details"
    | "state"
    | "timestamp"
    | "assets";

export const Edit = () => {
    const { page } = useParams<EditParams>();
    const navigate = useNavigate();
    const { activity, setActivity } = useActivity();
    const [valid, setValid] = useState<boolean>(true);
    const [count, setCount] = useState<ActivityCount | null>(activity.count);
    const [details, setDetails] = useState<ActivityDetails | null>(activity.details);
    const [state, setState] = useState<ActivityState | null>(activity.state);

    const saveActivity = () => {
        setActivity({
            ...activity,
            details,
            state,
            count,
        });
        navigate("/?edit=true");
    };

    const renderPage = () => {
        switch (page) {
            case "application":
                return null;

            case "details":
                return <EditDetails
                    details={details}
                    setDetails={setDetails}
                    setValid={setValid}
                />;

            case "state":
                return <EditState
                    state={state}
                    count={count}
                    setState={setState}
                    setCount={setCount}
                    setValid={setValid}
                />;

            case "timestamp":
                return null;

            case "assets":
                return null;

            default:
                return null;
        }
    };

    return (
        <Page name="edit">
            <div id="edit-form">
                {renderPage()}
            </div>
            <div id="edit-controls">
                <Button id="edit-done" disabled={!valid} onClick={saveActivity}>Done</Button>
            </div>
        </Page>
    );
};

export default Edit;
