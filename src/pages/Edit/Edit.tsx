import { useNavigate, useParams } from "react-router-dom";
import type Activity from "../../activity/types/Activity";
import Button from "../../components/Button/Button";
import useActivity from "../../hooks/useActivity";
import Page from "../Page";
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
    const { activity } = useActivity();

    const goBack = () => {
        navigate("/?edit=true");
    };

    return (
        <Page name="edit">
            <div id="edit-form">
                {renderPage(activity, page)}
            </div>
            <div id="edit-controls">
                <Button id="edit-done" onClick={goBack}>Done</Button>
            </div>
        </Page>
    );
};

const renderPage = (activity: Activity, page?: EditPage) => {
    switch (page) {
        case "application":

        case "details":

        case "state":

        case "timestamp":

        case "assets":

        default:
            return null;
    }
};

export default Edit;
