import { act, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type ActivityCount from "../../activity/types/ActivityCount";
import type ActivityDetails from "../../activity/types/ActivityDetails";
import type ActivityState from "../../activity/types/ActivityState";
import type ActivityImage from "../../activity/types/ActivityImage";
import { type ActivityTimestamp, ActivityTimestampMode } from "../../activity/types/ActivityTimestamp";
import Button from "../../components/Button/Button";
import useActivity from "../../hooks/useActivity";
import Page from "../Page";
import EditAssetLarge from "./EditAssets/EditAssetLarge";
import EditAssetSmall from "./EditAssets/EditAssetSmall";
import EditDetails from "./EditDetails/EditDetails";
import EditState from "./EditState/EditState";
import EditTimestamp from "./EditTimestamp/EditTimestamp";
import "./Edit.css";

type EditParams = {
    page: EditPage,
};

export type EditPage =
    | "application"
    | "details"
    | "state"
    | "asset-large"
    | "asset-small"
    | "timestamp";

export const Edit = () => {
    const { page } = useParams<EditParams>();
    const navigate = useNavigate();
    const { activity, setActivity } = useActivity();
    const [valid, setValid] = useState<boolean>(true);
    const [count, setCount] = useState<ActivityCount | null>(activity.count);
    const [details, setDetails] = useState<ActivityDetails | null>(activity.details);
    const [state, setState] = useState<ActivityState | null>(activity.state);
    const [imageLarge, setImageLarge] = useState<ActivityImage | null>(activity.imageLarge);
    const [imageSmall, setImageSmall] = useState<ActivityImage | null>(activity.imageSmall);
    const [timestampMode, setTimestampMode] = useState<ActivityTimestampMode>(activity.timestampMode);
    const [timestampStart, setTimestampStart] = useState<ActivityTimestamp | null>(activity.timestampStart);
    const [timestampEnd, setTimestampEnd] = useState<ActivityTimestamp | null>(activity.timestampEnd);

    const saveActivity = () => {
        setActivity({
            ...activity,
            details,
            state,
            count,
            imageLarge,
            imageSmall,
            timestampMode,
            timestampStart,
            timestampEnd,
        });
        goBack();
    };

    const goBack = () => {
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

            case "asset-large":
                return <EditAssetLarge
                    clientId={activity.clientId}
                    imageLarge={imageLarge}
                    setImageLarge={setImageLarge}
                    setValid={setValid}
                />;

            case "asset-small":
                return <EditAssetSmall
                    clientId={activity.clientId}
                    imageSmall={imageSmall}
                    setImageSmall={setImageSmall}
                    setValid={setValid}
                />;

            case "timestamp":
                return <EditTimestamp
                    timestampMode={timestampMode}
                    timestampStart={timestampStart}
                    timestampEnd={timestampEnd}
                    setTimestampMode={setTimestampMode}
                    setTimestampStart={setTimestampStart}
                    setTimestampEnd={setTimestampEnd}
                    setValid={setValid}
                />;

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
                <Button id="edit-cancel" onClick={goBack}>Cancel</Button>
            </div>
        </Page>
    );
};

export default Edit;
