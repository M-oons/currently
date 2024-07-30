import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type ActivityButton from "../../activity/types/ActivityButton";
import type ActivityClientId from "../../activity/types/ActivityClientId";
import type ActivityClientSecret from "../../activity/types/ActivityClientSecret";
import type ActivityCount from "../../activity/types/ActivityCount";
import type ActivityDetails from "../../activity/types/ActivityDetails";
import type ActivityState from "../../activity/types/ActivityState";
import type ActivityImage from "../../activity/types/ActivityImage";
import { type ActivityTimestamp, ActivityTimestampMode } from "../../activity/types/ActivityTimestamp";
import Button from "../../components/Button/Button";
import useActivity from "../../hooks/useActivity";
import Page from "../Page";
import EditApplication from "./EditApplication/EditApplication";
import EditAssetLarge from "./EditAssets/EditAssetLarge";
import EditAssetSmall from "./EditAssets/EditAssetSmall";
import EditButtons from "./EditButtons/EditButtons";
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
    | "timestamp"
    | "buttons";

export const Edit = () => {
    const { page } = useParams<EditParams>();
    const navigate = useNavigate();
    const { activity, setActivity } = useActivity();
    const [clientId, setClientId] = useState<ActivityClientId>(activity.clientId);
    const [clientSecret, setClientSecret] = useState<ActivityClientSecret | null>(activity.clientSecret);
    const [count, setCount] = useState<ActivityCount | null>(activity.count);
    const [details, setDetails] = useState<ActivityDetails | null>(activity.details);
    const [state, setState] = useState<ActivityState | null>(activity.state);
    const [imageLarge, setImageLarge] = useState<ActivityImage | null>(activity.imageLarge);
    const [imageSmall, setImageSmall] = useState<ActivityImage | null>(activity.imageSmall);
    const [timestampMode, setTimestampMode] = useState<ActivityTimestampMode>(activity.timestampMode);
    const [timestampStart, setTimestampStart] = useState<ActivityTimestamp | null>(activity.timestampStart);
    const [timestampEnd, setTimestampEnd] = useState<ActivityTimestamp | null>(activity.timestampEnd);
    const [button1, setButton1] = useState<ActivityButton | null>(activity.button1);
    const [button2, setButton2] = useState<ActivityButton | null>(activity.button2);
    const [valid, setValid] = useState<boolean>(true);

    const saveActivity = () => {
        setActivity({
            ...activity,
            clientId,
            clientSecret,
            details,
            state,
            count,
            imageLarge,
            imageSmall,
            timestampMode,
            timestampStart,
            timestampEnd,
            button1,
            button2,
        });
        goBack();
    };

    const goBack = () => {
        navigate("/?edit=true");
    };

    const renderPage = () => {
        switch (page) {
            case "application":
                return <EditApplication
                    clientId={clientId}
                    clientSecret={clientSecret}
                    setClientId={setClientId}
                    setClientSecret={setClientSecret}
                    setValid={setValid}
                />;

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

            case "buttons":
                return <EditButtons
                    button1={button1}
                    button2={button2}
                    setButton1={setButton1}
                    setButton2={setButton2}
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
