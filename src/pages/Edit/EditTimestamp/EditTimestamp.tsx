import { type Dispatch, type SetStateAction, useCallback, useState, useEffect } from "react";
import { type ActivityTimestamp, ActivityTimestampMode, validateTimestamp, TIMESTAMP_MIN } from "../../../activity/types/ActivityTimestamp";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import InputDateTime from "../../../components/InputDateTime/InputDateTime";
import Select from "../../../components/Select/Select";
import Switch from "../../../components/Switch/Switch";
import "./EditTimestamp.css";

type EditTimestampProps = {
    timestampMode: ActivityTimestampMode,
    timestampStart: ActivityTimestamp | null,
    timestampEnd: ActivityTimestamp | null,
    setTimestampMode: Dispatch<SetStateAction<ActivityTimestampMode>>,
    setTimestampStart: Dispatch<SetStateAction<ActivityTimestamp | null>>,
    setTimestampEnd: Dispatch<SetStateAction<ActivityTimestamp | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditTimestamp = (props: EditTimestampProps) => {
    const [timestampMode, setTimestampMode] = useState<ActivityTimestampMode>(props.timestampMode);
    const [timestampStart, setTimestampStart] = useState<number>(props.timestampStart ?? 0);
    const [timestampEnd, setTimestampEnd] = useState<number>(props.timestampEnd ?? 0);
    const [errorsTimestampStart, setErrorsTimestampStart] = useState<ActivityValidationError[]>([]);
    const [errorsTimestampEnd, setErrorsTimestampEnd] = useState<ActivityValidationError[]>([]);
    const [useTimestampStart, setUseTimestampStart] = useState<boolean>(props.timestampMode !== ActivityTimestampMode.None && props.timestampStart !== null);
    const [useTimestampEnd, setUseTimestampEnd] = useState<boolean>(props.timestampMode !== ActivityTimestampMode.None && props.timestampEnd !== null);

    useEffect(() => {
        validateAll();
    }, [
        timestampMode,
        timestampStart,
        timestampEnd,
        useTimestampStart,
        useTimestampEnd,
    ]);

    const validateAll = async () => {
        switch (timestampMode) {
            case ActivityTimestampMode.None:
                valid(timestampMode, null, null);
                break;
            case ActivityTimestampMode.AppStart:
                validate(await window.api.getStartupTime(), timestampEnd);
                break;
            case ActivityTimestampMode.ActivityUpdate:
                validate(await window.api.getActivityLastUpdateTime(), timestampEnd);
                break;
            case ActivityTimestampMode.Custom:
                validate(timestampStart, timestampEnd);
                break;
        }
    };

    const validate = (timestampStart: number | null, timestampEnd: number | null) => {
        let isValid = true;

        if (timestampStart !== null && useTimestampStart) {
            const timestampStartValidation = validateTimestamp(timestampStart);
            if (timestampStartValidation.valid)
                setErrorsTimestampStart([]);
            else {
                setErrorsTimestampStart(timestampStartValidation.errors);
                isValid = false;
            }
        }
        if (timestampEnd !== null && useTimestampEnd) {
            const timestampEndValidation = validateTimestamp(timestampEnd);
            if (timestampEndValidation.valid)
                setErrorsTimestampEnd([]);
            else {
                setErrorsTimestampEnd(timestampEndValidation.errors);
                isValid = false;
            }
        }

        if (isValid) {
            const validTimestampStart: ActivityTimestamp | null = useTimestampStart
                ? timestampStart
                : null;
            const validTimestampEnd: ActivityTimestamp | null = useTimestampEnd
                ? timestampEnd
                : null;
            valid(timestampMode, validTimestampStart, validTimestampEnd);
        }
        else
            props.setValid(false);
    };

    const valid = (timestampMode: ActivityTimestampMode, timestampStart: ActivityTimestamp | null, timestampEnd: ActivityTimestamp | null) => {
        setErrorsTimestampStart([]);
        setErrorsTimestampEnd([]);
        props.setTimestampMode(timestampMode);
        props.setTimestampStart(timestampStart);
        props.setTimestampEnd(timestampEnd);
        props.setValid(true);
    };

    const changeTimestampMode = useCallback((timestampMode: ActivityTimestampMode) => {
        setTimestampMode(timestampMode);
        switch (timestampMode) {
            case ActivityTimestampMode.None:
                setUseTimestampStart(false);
                setUseTimestampEnd(false);
                break;
            case ActivityTimestampMode.AppStart:
            case ActivityTimestampMode.ActivityUpdate:
                setUseTimestampStart(true);
        }
    }, []);

    const inputTimestampStart = useCallback((timestampStart: number) => {
        setTimestampStart(timestampStart);
    }, []);

    const inputTimestampEnd = useCallback((timestampEnd: number) => {
        setTimestampEnd(timestampEnd);
    }, []);

    const toggleTimestampStart = useCallback((value: boolean) => {
        setUseTimestampStart(value);
    }, []);

    const toggleTimestampEnd = useCallback((value: boolean) => {
        setUseTimestampEnd(value);
    }, []);

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">Timestamp</div>
                <div className="edit-item">
                    <div id="edit-timestamp-mode">
                        <Select
                            options={[
                                { label: "None", value: ActivityTimestampMode.None },
                                { label: "Since app start", value: ActivityTimestampMode.AppStart },
                                { label: "Since activity update", value: ActivityTimestampMode.ActivityUpdate },
                                { label: "Custom", value: ActivityTimestampMode.Custom },
                            ]}
                            value={props.timestampMode}
                            label="Mode"
                            onChange={changeTimestampMode}
                        />
                    </div>
                </div>
            </div>
            {timestampMode === ActivityTimestampMode.Custom &&
                <div className="edit-section">
                    <div className="edit-title">
                        Start
                        <div id="edit-timestamp-start-toggle">
                            <Switch
                                value={useTimestampStart}
                                onChange={toggleTimestampStart}
                            />
                        </div>
                    </div>
                    {useTimestampStart &&
                        <div className="edit-item">
                            <div id="edit-timestamp-start">
                                <InputDateTime
                                    value={timestampStart}
                                    min={TIMESTAMP_MIN}
                                    tabIndex={0}
                                    onInput={inputTimestampStart}
                                />
                            </div>
                            {errorsTimestampStart.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsTimestampStart} />
                                </div>
                            }
                        </div>
                    }
                </div>
            }
            {timestampMode !== ActivityTimestampMode.None &&
                <div className="edit-section">
                    <div className="edit-title">
                        End
                        <div id="edit-timestamp-end-toggle">
                            <Switch
                                value={useTimestampEnd}
                                onChange={toggleTimestampEnd}
                            />
                        </div>
                    </div>
                    {useTimestampEnd &&
                        <div className="edit-item">
                            <div id="edit-timestamp-end">
                                <InputDateTime
                                    value={timestampEnd}
                                    min={TIMESTAMP_MIN}
                                    tabIndex={1}
                                    onInput={inputTimestampEnd}
                                />
                            </div>
                            {errorsTimestampEnd.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsTimestampEnd} />
                                </div>
                            }
                        </div>
                    }
                </div>
            }
        </>
    );
};

export default EditTimestamp;
