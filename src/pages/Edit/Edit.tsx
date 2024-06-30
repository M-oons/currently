import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ActivityDetails from "../../activity/types/ActivityDetails";
import Button from "../../components/Button/Button";
import useActivity from "../../hooks/useActivity";
import Page from "../Page";
import EditDetails from "./EditDetails";
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
    const [details, setDetails] = useState<ActivityDetails | null>(activity.details);

    const saveActivity = () => {
        setActivity({ ...activity, details });
        navigate("/?edit=true");
    };

    const renderPage = () => {
        switch (page) {
            case "application":

            case "details":
                return <EditDetails
                    details={details}
                    setDetails={setDetails}
                    setValid={setValid}
                />;

            case "state":

            case "timestamp":

            case "assets":

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
