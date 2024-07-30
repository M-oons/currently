import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type ActivityCount from "../../../activity/types/ActivityCount";
import type ActivityDetails from "../../../activity/types/ActivityDetails";
import type ActivityState from "../../../activity/types/ActivityState";
import { type ActivityTimestamp, ActivityTimestampMode } from "../../../activity/types/ActivityTimestamp";
import { getApplication } from "../../../application/applicationFetcher";
import useInterval from "../../../hooks/useInterval";
import { type EditPage } from "../../../pages/Edit/Edit";
import { formatTimestamp } from "../../../utils/time";
import type ActivityDisplayComponentProps from "../types/ActivityDisplayComponentProps";
import "./ActivityDisplayContent.css";

type ActivityDisplayContentProps = {
    clientId: string,
    clientSecret: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    count: ActivityCount | null,
    timestampMode: ActivityTimestampMode,
    timestampStart: ActivityTimestamp | null,
    timestampEnd: ActivityTimestamp | null,
} & ActivityDisplayComponentProps;

type ActivityDisplayContentState = {
    name: string,
    details: string | null,
    showDetails: boolean,
    state: string | null,
    showState: boolean,
    timestamp: string | null,
    showTimestamp: boolean,
};

const ActivityDisplayContent = (props: ActivityDisplayContentProps) => {
    const [state, setState] = useState<ActivityDisplayContentState>({
        name: "Name",
        details: "Details",
        showDetails: true,
        state: "State (0 of 0)",
        showState: true,
        timestamp: "00:00 left",
        showTimestamp: true,
    });
    const [timestampStart, setTimestampStart] = useState<ActivityTimestamp | null>(props.timestampStart);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.clientId === "" || props.clientSecret === "")
            return;

        const fetchApplication = async () => {
            const application = await getApplication(props.clientId, props.clientSecret);
            if (application === null)
                return props.clientId;

            const name = application.name;
            setState($state => ({
                ...$state,
                name,
            }));
        };
        fetchApplication();
    }, [
        props.clientId,
        props.clientSecret,
    ]);

    useEffect(() => {
        const changeTimestampStart = async () => {
            if (props.timestampMode === ActivityTimestampMode.AppStart)
                setTimestampStart(await window.api.getStartupTime());
            else if (props.timestampMode === ActivityTimestampMode.ActivityUpdate)
                setTimestampStart(await window.api.getActivityLastUpdateTime());
        };
        changeTimestampStart();
    }, [props.timestampMode]);

    useInterval(1000, () => {
        const [details, showDetails] = displayDetails(props.details);
        const [state, showState] = displayState(props.state, props.count);
        const [timestamp, showTimestamp] = displayTimestamp(props.timestampMode, timestampStart, props.timestampEnd);

        setState($state => ({
            ...$state,
            details,
            showDetails,
            state,
            showState,
            timestamp,
            showTimestamp,
        }));
    }, [
        props.details,
        props.state,
        props.count,
        timestampStart,
        props.timestampEnd,
    ]);

    const goToEditPage = (page: EditPage) => {
        navigate(`/edit/${page}`);
    };

    return props.edit
        ? (
            <>
                <div id="activity-title" className="activity-content-text edit" onClick={() => goToEditPage("application")}>{state.name}</div>
                {state.details !== null
                    ? <div id="activity-details" className="activity-content-text edit" onClick={() => goToEditPage("details")}>{state.details}</div>
                    : <div id="activity-details" className="activity-content-text edit empty" onClick={() => goToEditPage("details")}>Details</div>
                }
                {state.state !== null
                    ? <div id="activity-state" className="activity-content-text edit" onClick={() => goToEditPage("state")}>{state.state}</div>
                    : <div id="activity-state" className="activity-content-text edit empty" onClick={() => goToEditPage("state")}>State</div>
                }
                {state.timestamp !== null
                    ? <div id="activity-timestamp" className="activity-content-text edit" onClick={() => goToEditPage("timestamp")}>{state.timestamp}</div>
                    : <div id="activity-timestamp" className="activity-content-text edit empty" onClick={() => goToEditPage("timestamp")}>Timestamp</div>
                }
            </>
        )
        : (
            <>
                <div id="activity-title" className="activity-content-text">{state.name}</div>
                {state.showDetails &&
                    <div id="activity-details" className="activity-content-text">{state.details}</div>
                }
                {state.showState &&
                    <div id="activity-state" className="activity-content-text">{state.state}</div>
                }
                {state.showTimestamp &&
                    <div id="activity-timestamp" className="activity-content-text">{state.timestamp}</div>
                }
            </>
        );
};

const displayDetails = (details: ActivityDetails | null): [details: string | null, showDetails: boolean] => {
    return [details, details !== null];
};

const displayState = (state: ActivityState | null, count: ActivityCount | null): [state: string | null, showState: boolean] => {
    let s = state;
    if (s !== null && count !== null)
        s += ` (${count.current} of ${count.max})`;
    return [s, s !== null];
};

const displayTimestamp = (timestampMode: ActivityTimestampMode, timestampStart: ActivityTimestamp | null, timestampEnd: ActivityTimestamp | null): [timestamp: string | null, showTimestamp: boolean] => {
    const now = Date.now();
    let timestampNumber = 0;
    let timestampText: string | null = null;
    if (timestampMode !== ActivityTimestampMode.None) {
        if (timestampStart !== null && timestampEnd === null) {
            const start = typeof timestampStart === "boolean" ? now : timestampStart;
            timestampNumber = now - start;
            timestampText = "elapsed";
        }
        else if (timestampEnd !== null) {
            timestampNumber = timestampEnd - now;
            timestampText = "left";
        }
    }
    const timestamp = timestampText !== null
        ? `${formatTimestamp(Math.max(0, timestampNumber))} ${timestampText}`
        : null;
    return [timestamp, timestamp !== null];
};

export default ActivityDisplayContent;
