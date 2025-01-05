import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type ActivityButton from "../../activity/types/ActivityButton";
import type ActivityClientId from "../../activity/types/ActivityClientId";
import type ActivityCount from "../../activity/types/ActivityCount";
import type ActivityDetails from "../../activity/types/ActivityDetails";
import type ActivityImage from "../../activity/types/ActivityImage";
import type ActivityState from "../../activity/types/ActivityState";
import ActivityType from "../../activity/types/ActivityType";
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
import EditType from "./EditType/EditType";
import "./Edit.css";

type EditParams = {
    page: EditPage,
};

export type EditPage =
    | "application"
    | "type"
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
    const [clientId, setClientId] = useState<ActivityClientId | null>(activity?.clientId ?? null);
    const [type, setType] = useState<ActivityType>(activity?.type ?? ActivityType.Playing);
    const [count, setCount] = useState<ActivityCount | null>(activity?.count ?? null);
    const [details, setDetails] = useState<ActivityDetails | null>(activity?.details ?? null);
    const [state, setState] = useState<ActivityState | null>(activity?.state ?? null);
    const [imageLarge, setImageLarge] = useState<ActivityImage | null>(activity?.imageLarge ?? null);
    const [imageSmall, setImageSmall] = useState<ActivityImage | null>(activity?.imageSmall ?? null);
    const [timestampMode, setTimestampMode] = useState<ActivityTimestampMode>(activity?.timestampMode ?? ActivityTimestampMode.None);
    const [timestampStart, setTimestampStart] = useState<ActivityTimestamp | null>(activity?.timestampStart ?? null);
    const [timestampEnd, setTimestampEnd] = useState<ActivityTimestamp | null>(activity?.timestampEnd ?? null);
    const [button1, setButton1] = useState<ActivityButton | null>(activity?.button1 ?? null);
    const [button2, setButton2] = useState<ActivityButton | null>(activity?.button2 ?? null);
    const [valid, setValid] = useState<boolean>(true);

    const saveActivity = () => {
        if (activity === null)
            return;

        setActivity({
            ...activity,
            clientId,
            type,
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

    const resetClient = () => {
        if (activity === null)
            return;

        setActivity({
            ...activity,
            clientId: null,
        });
        goBack();
    };

    const goBack = () => {
        navigate("/?edit=true");
    };

    const renderPage = () => {
        if (activity === null)
            return;

        switch (page) {
            case "application":
                return <EditApplication
                    clientId={clientId}
                    resetClient={resetClient}
                    setClientId={setClientId}
                    setValid={setValid}
                />;

            case "type":
                return <EditType
                    type={type}
                    setType={setType}
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
                <Button id="edit-done" color="blurple" disabled={!valid} onClick={saveActivity}>Done</Button>
                <Button id="edit-cancel" color="grey" onClick={goBack}>Cancel</Button>
            </div>
        </Page>
    );
};

export default Edit;
