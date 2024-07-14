import { type Dispatch, type SetStateAction, useCallback, useState, useEffect, } from "react";
import { type ActivityState, validateState, STATE_LENGTH_MAX } from "../../../activity/types/ActivityState";
import { type ActivityCount, validateCount, COUNT_CURRENT_MIN, COUNT_MAX_MIN } from "../../../activity/types/ActivityCount";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import InputNumber from "../../../components/InputNumber/InputNumber";
import InputText from "../../../components/InputText/InputText";
import Switch from "../../../components/Switch/Switch";
import "./EditState.css";

type EditStateProps = {
    state: ActivityState | null,
    count: ActivityCount | null,
    setState: Dispatch<SetStateAction<ActivityState | null>>,
    setCount: Dispatch<SetStateAction<ActivityCount | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditState = (props: EditStateProps) => {
    const [state, setState] = useState<string>(props.state ?? "");
    const [countCurrent, setCountCurrent] = useState<number>(props.count?.current ?? 0);
    const [countMax, setCountMax] = useState<number>(props.count?.max ?? 0);
    const [errorsState, setErrorsState] = useState<ActivityValidationError[]>([]);
    const [errorsCount, setErrorsCount] = useState<ActivityValidationError[]>([]);
    const [useCount, setUseCount] = useState<boolean>(props.count !== null);

    useEffect(() => {
        validate();
    }, [
        state,
        countCurrent,
        countMax,
        useCount,
    ]);

    const validate = () => {
        let isValid = true;

        if (state === "")
            setErrorsState([]);
        else {
            const stateValidation = validateState(state);
            if (stateValidation.valid) {
                setErrorsState([]);
            }
            else {
                isValid = false;
                setErrorsState(stateValidation.errors);
            }
        }

        if (!useCount)
            setErrorsCount([]);
        else {
            const countValidation = validateCount({ current: countCurrent, max: countMax });
            if (countValidation.valid) {
                setErrorsCount([]);
            }
            else {
                isValid = false;
                setErrorsCount(countValidation.errors);
            }
        }

        if (isValid) {
            const validState = state !== ""
                ? state
                : null;
            const validCount = useCount
                ? {
                    current: countCurrent,
                    max: countMax,
                }
                : null;
            valid(validState, validCount);
        }
        else
            props.setValid(false);
    };

    const valid = (state: ActivityState | null, count: ActivityCount | null) => {
        setErrorsState([]);
        setErrorsCount([]);
        props.setState(state);
        props.setCount(count);
        props.setValid(true);
    };

    const inputState = useCallback((state: string) => {
        setState(state);
    }, []);

    const inputCountCurrent = useCallback((countCurrent: number) => {
        setCountCurrent(countCurrent);
    }, []);

    const inputCountMax = useCallback((countMax: number) => {
        setCountMax(countMax);
    }, []);

    const toggleCount = useCallback((value: boolean) => {
        setUseCount(value);
    }, []);

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">State</div>
                <div className="edit-item">
                    <div id="edit-state">
                        <InputText
                            value={state}
                            placeholder="State"
                            maxLength={STATE_LENGTH_MAX}
                            counter={true}
                            tabIndex={0}
                            onInput={inputState}
                        />
                    </div>
                    {errorsState.length > 0 &&
                        <div className="edit-errors">
                            <ActivityErrors errors={errorsState} />
                        </div>
                    }
                </div>
            </div>
            <div className="edit-section">
                <div className="edit-title">
                    Count
                    <div id="edit-count-toggle">
                        <Switch
                            value={useCount}
                            onChange={toggleCount}
                        />
                    </div>
                </div>
                {useCount &&
                    <div className="edit-item">
                        <div id="edit-counts">
                            <div id="edit-count-current">
                                <InputNumber
                                    value={countCurrent}
                                    min={COUNT_CURRENT_MIN}
                                    tabIndex={1}
                                    onInput={inputCountCurrent}
                                />
                            </div>
                            <div id="edit-count-divider">of</div>
                            <div id="edit-count-max">
                                <InputNumber
                                    value={countMax}
                                    min={COUNT_MAX_MIN}
                                    tabIndex={2}
                                    onInput={inputCountMax}
                                />
                            </div>
                        </div>
                        {errorsCount.length > 0 &&
                            <div className="edit-errors">
                                <ActivityErrors errors={errorsCount} />
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default EditState;
