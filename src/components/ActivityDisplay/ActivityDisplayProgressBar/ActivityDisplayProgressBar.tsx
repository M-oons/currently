import { useEffect, useState } from "react";
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
        progress: 0,
        timeCurrent: "",
        timeMax: "",
        showProgressBar: false,
    });
    const [timestampStart, setTimestampStart] = useState<ActivityTimestamp | null>(props.timestampStart);

    useInterval(1000, () => {
        const [
            progress,
            timeCurrent,
            timeMax,
            showProgressBar,
        ] = displayProgressBar(props.timestampMode, timestampStart, props.timestampEnd);

        setState({
            progress,
            timeCurrent,
            timeMax,
            showProgressBar,
        });
    }, true, [
        timestampStart,
        props.timestampEnd,
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
        const total = Math.max(0, timestampEnd - timestampStart);
        const current = clamp(now - timestampStart, 0, total);
        timeCurrent = formatTimestamp(current, false);
        timeMax = formatTimestamp(total, false);
        progress = roundToFixed((current / total) * 100, 1);
        progress = clamp(progress, 0, 100);
    }
    return [progress, timeCurrent, timeMax, showProgressBar];
};

export default ActivityDisplayProgressBar;
