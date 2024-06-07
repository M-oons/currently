import { useEffect, useState } from "react";
import type ActivityCount from "../../../activity/types/ActivityCount";
import type ActivityDetails from "../../../activity/types/ActivityDetails";
import type ActivityState from "../../../activity/types/ActivityState";
import type ActivityTimestampEnd from "../../../activity/types/ActivityTimestampEnd";
import type ActivityTimestampStart from "../../../activity/types/ActivityTimestampStart";
import { formatTimestamp } from "../../../utils/time";
import "./ActivityDisplayContent.css";

type ActivityDisplayContentProps = {
    title: string,
    details: ActivityDetails | null,
    state: ActivityState | null,
    count: ActivityCount | null,
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
};

type ActivityDisplayContentState = {
    title: string,
    details: string | null,
    showDetails: boolean,
    state: string | null,
    showState: boolean,
    timestamp: string | null,
    showTimestamp: boolean,
};

const ActivityDisplayContent = (props: ActivityDisplayContentProps) => {
    const [state, setState] = useState<ActivityDisplayContentState>({
        title: "",
        details: null,
        showDetails: false,
        state: null,
        showState: false,
        timestamp: null,
        showTimestamp: false,
    });

    useEffect(() => {
        const title = props.title;
        const [details, showDetails] = displayDetails(props.details);
        const [state, showState] = displayState(props.state, props.count);
        const [timestamp, showTimestamp] = displayTimestamp(props.timestampStart, props.timestampEnd);

        setState({
            title,
            details,
            showDetails,
            state,
            showState,
            timestamp,
            showTimestamp,
        });
    }, [
        props.title,
        props.details,
        props.state,
        props.count,
        props.timestampStart,
        props.timestampEnd,
    ]);


    return (
        <>
            <div id="activity-title" className="activity-content-text">{state.title}</div>
            {state.showDetails && <div id="activity-details" className="activity-content-text">{state.details}</div>}
            {state.showState && <div id="activity-state" className="activity-content-text">{state.state}</div>}
            {state.showTimestamp && <div id="activity-timestamp" className="activity-content-text">{state.timestamp}</div>}
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
    if (timestampStart !== null && timestampEnd === null) { // elapsed
        const start = typeof timestampStart === "boolean" ? now : timestampStart;
        timestampNumber = now - start;
        timestampText = "elapsed";
    }
    else if (timestampEnd !== null) { // left
        timestampNumber = timestampEnd - now;
        timestampText = "left";
    }
    const timestamp = timestampText !== null
        ? `${formatTimestamp(Math.max(0, timestampNumber))} ${timestampText}`
        : null;
    return [timestamp, timestamp !== null];
};

export default ActivityDisplayContent;
