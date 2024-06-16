import { useEffect, useState } from "react";
import type ActivityCount from "../../../activity/types/ActivityCount";
import type ActivityDetails from "../../../activity/types/ActivityDetails";
import type ActivityState from "../../../activity/types/ActivityState";
import type ActivityTimestampEnd from "../../../activity/types/ActivityTimestampEnd";
import type ActivityTimestampStart from "../../../activity/types/ActivityTimestampStart";
import { getApplication } from "../../../application/applicationFetcher";
import useInterval from "../../../hooks/useInterval";
import { formatTimestamp } from "../../../utils/time";
import type ActivityDisplayComponentProps from "../types/ActivityDisplayComponentProps";
import "./ActivityDisplayContent.css";

type ActivityDisplayContentProps = {
    clientId: string,
    clientSecret: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    count: ActivityCount | null,
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
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

    useEffect(() => {
        if (props.clientId === "" || props.clientSecret === "")
            return;

        const fetchApplication = async () => {
            const application = await getApplication(props.clientId, props.clientSecret);
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

    useInterval(1000, () => {
        const [details, showDetails] = displayDetails(props.details);
        const [state, showState] = displayState(props.state, props.count);
        const [timestamp, showTimestamp] = displayTimestamp(props.timestampStart, props.timestampEnd);

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
        props.timestampStart,
        props.timestampEnd,
    ]);

    return (
        <>
            {props.edit
                ? <div id="activity-title" className="activity-content-text edit">{state.name}</div>
                : <div id="activity-title" className="activity-content-text">{state.name}</div>
            }
            {props.edit
                ? <div id="activity-details" className="activity-content-text edit">{state.details}</div>
                : state.showDetails && <div id="activity-details" className="activity-content-text">{state.details}</div>
            }
            {props.edit
                ? <div id="activity-state" className="activity-content-text edit">{state.state}</div>
                : state.showState && <div id="activity-state" className="activity-content-text">{state.state}</div>
            }
            {props.edit
                ? <div id="activity-timestamp" className="activity-content-text edit">{state.timestamp}</div>
                : state.showTimestamp && <div id="activity-timestamp" className="activity-content-text">{state.timestamp}</div>}
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

const displayTimestamp = (timestampStart: ActivityTimestampStart | null, timestampEnd: ActivityTimestampEnd | null): [timestamp: string | null, showTimestamp: boolean] => {
    const now = Date.now();
    let timestampNumber = 0;
    let timestampText: string | null = null;
    if (timestampStart !== null && timestampEnd === null) {
        const start = typeof timestampStart === "boolean" ? now : timestampStart;
        timestampNumber = now - start;
        timestampText = "elapsed";
    }
    else if (timestampEnd !== null) {
        timestampNumber = timestampEnd - now;
        timestampText = "left";
    }
    const timestamp = timestampText !== null
        ? `${formatTimestamp(Math.max(0, timestampNumber))} ${timestampText}`
        : null;
    return [timestamp, timestamp !== null];
};

export default ActivityDisplayContent;
