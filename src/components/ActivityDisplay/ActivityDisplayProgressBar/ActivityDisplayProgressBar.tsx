import { useEffect, useState } from "react";
import type ActivityTimestampEnd from "../../../activity/types/ActivityTimestampEnd";
import type ActivityTimestampStart from "../../../activity/types/ActivityTimestampStart";
import { clamp } from "../../../utils/math";
import { formatTimestamp } from "../../../utils/time";
import "./ActivityDisplayProgressBar.css";

type ActivityDisplayProgressBarProps = {
    timestampStart: ActivityTimestampStart | null,
    timestampEnd: ActivityTimestampEnd | null,
};

type ActivityDisplayProgressBarState = {
    progress: number,
    timeCurrent: string,
    timeMax: string,
    showProgressBar: boolean,
};

const ActivityDisplayProgressBar = (props: ActivityDisplayProgressBarProps) => {
    const [state, setState] = useState<ActivityDisplayProgressBarState>({
        progress: 0,
        timeCurrent: "",
        timeMax: "",
        showProgressBar: false,
    });

    useEffect(() => {
        const [
            progress,
            timeCurrent,
            timeMax,
            showProgressBar,
        ] = displayProgressBar(props.timestampStart, props.timestampEnd);

        setState({
            progress,
            timeCurrent,
            timeMax,
            showProgressBar,
        });
    }, [
        props.timestampStart,
        props.timestampEnd,
    ]);

    return state.showProgressBar
        ? (
            <>
                <div id="activity-progress-bar-outer">
                    <div id="activity-progress-bar-inner" style={{ width: `${state.progress}%` }}></div>
                </div>
                <div id="activity-progress-bar-time">
                    <div id="activity-progress-bar-time-current" className="activity-progress-bar-time-number">{state.timeCurrent}</div>
                    <div id="activity-progress-bar-time-max" className="activity-progress-bar-time-number">{state.timeMax}</div>
                </div>
            </>
        )
        : null;
};

const displayProgressBar = (timestampStart: ActivityTimestampStart | null, timestampEnd: ActivityTimestampEnd | null): [progress: number, timeCurrent: string, timeMax: string, showProgressBar: boolean] => {
    const now = Date.now();
    let progress = 0;
    let timeCurrent = "";
    let timeMax = "";
    const showProgressBar = timestampStart !== null && timestampEnd !== null;
    if (showProgressBar) {
        const start = typeof timestampStart === "boolean" ? now : timestampStart;
        const total = Math.max(0, timestampEnd - start);
        const current = clamp(now - start, 0, total);
        timeCurrent = formatTimestamp(current);
        timeMax = formatTimestamp(total);
        progress = clamp(Math.round((current / total) * 100), 0, 100);
    }
    return [progress, timeCurrent, timeMax, showProgressBar];
};

export default ActivityDisplayProgressBar;
