import { type ChangeEvent, useState } from "react";
import { clamp, INT32_MAX_VALUE } from "../../utils/math";
import "./InputDateTime.css";

type InputDateTimeProps = {
    id?: string,
    className?: string,
    value: number,
    tabIndex?: number,
    max?: number,
    min?: number,
    onInput?: (value: number) => void,
};

const InputDateTime = (props: InputDateTimeProps) => {
    const [value, setValue] = useState<string>(formatDateTime(adjustTimestamp(props.value)));

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const localDate = new Date(value);
        setValue(value);

        let utcTimestamp = localDate.getTime();
        if (!isNaN(utcTimestamp)) {
            utcTimestamp = clamp(utcTimestamp, Math.max(props.min ?? 0, 0), props.max ?? INT32_MAX_VALUE * 1000);
            setValue(formatDateTime(adjustTimestamp(utcTimestamp)));
            props.onInput?.(utcTimestamp);
        }
    };

    return (
        <div className="input-datetime">
            <input
                id={props.id}
                className={props.className}
                type="datetime-local"
                tabIndex={props.tabIndex ?? -1}
                value={value}
                onInput={onInput}
            />
        </div>
    );
};

const formatDateTime = (value: number): string => {
    const date = new Date(value);
    return date.toISOString().substring(0, 16);
};

const adjustTimestamp = (value: number): number => {
    const date = new Date(value);
    return date.getTime() - (date.getTimezoneOffset() * 60000);
};

export default InputDateTime;
