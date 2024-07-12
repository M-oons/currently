import { useState } from "react";
import { type ActivityTimestamp, ActivityTimestampMode } from "../../../activity/types/ActivityTimestamp";
import useInterval from "../../../hooks/useInterval";
import { clamp, roundToFixed } from "../../../utils/math";
import { formatTimestamp } from "../../../utils/time";
import "./ActivityDisplayProgressBar.css";

type ActivityDisplayProgressBarProps = {
    timestampMode: ActivityTimestampMode,
    timestampStart: ActivityTimestamp | null,
    timestampEnd: ActivityTimestamp | null,
};

type ActivityDisplayProgressBarState = {
    progress: number,
    timeCurrent: string,
    timeMax: string,
    showProgressBar: boolean,
};

const ActivityDisplayProgressBar = (props: ActivityDisplayProgressBarProps) => {
    const [state, setState] = useState<ActivityDisplayProgressBarState>({
        progress: 100,
        timeCurrent: "00:00",
        timeMax: "00:00",
        showProgressBar: true,
    });

    useInterval(1000, () => {
        const [
            progress,
            timeCurrent,
            timeMax,
            showProgressBar,
        ] = displayProgressBar(props.timestampMode, props.timestampStart, props.timestampEnd);

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

const displayProgressBar = (timestampMode: ActivityTimestampMode, timestampStart: ActivityTimestamp | null, timestampEnd: ActivityTimestamp | null): [progress: number, timeCurrent: string, timeMax: string, showProgressBar: boolean] => {
    const now = Date.now();
    let progress = 0;
    let timeCurrent = "";
    let timeMax = "";
    const showProgressBar = timestampMode !== ActivityTimestampMode.None && timestampStart !== null && timestampEnd !== null;
    if (showProgressBar) {
        const start = typeof timestampStart === "boolean" ? now : timestampStart;
        const total = Math.max(0, timestampEnd - start);
        const current = clamp(now - start, 0, total);
        timeCurrent = formatTimestamp(current, false);
        timeMax = formatTimestamp(total, false);
        progress = roundToFixed((current / total) * 100, 1);
        progress = clamp(progress, 0, 100);
    }
    return [progress, timeCurrent, timeMax, showProgressBar];
};

export default ActivityDisplayProgressBar;
