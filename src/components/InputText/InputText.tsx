import { type ChangeEvent } from "react";
import "./InputText.css";

const TEXT_MAX_LENGTH = 999;

type InputTextProps = {
    id?: string,
    className?: string,
    placeholder?: string,
    value: string,
    tabIndex?: number,
    maxLength?: number,
    limit?: boolean,
    counter?: boolean,
    onInput?: (value: string) => void,
};

const InputText = (props: InputTextProps) => {
    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        props.onInput?.(e.target.value);
    };

    return (
        <div className="input-text">
            <input
                id={props.id}
                className={props.className}
                style={{ paddingRight: props.counter ? 32 : 8 }}
                type="text"
                maxLength={maxLength(props.maxLength, props.limit)}
                placeholder={props.placeholder}
                tabIndex={props.tabIndex ?? -1}
                value={props.value}
                onInput={onInput}
            />
            {props.counter &&
                <div className={`input-counter ${counterValid(props.value, props.maxLength) ? "input-counter-valid" : "input-counter-invalid"}`}>
                    {counterCount(props.value, props.maxLength)}
                </div>
            }
        </div>
    );
};

const maxLength = (maxLength: number = TEXT_MAX_LENGTH, limit: boolean = false): number => {
    return limit && maxLength > 0
        ? maxLength
        : TEXT_MAX_LENGTH;
};

const counterCount = (value: string, max?: number): number => {
    if (max === undefined || max <= 0)
        return value.length;

    return Math.min(max, TEXT_MAX_LENGTH) - value.length;
};

const counterValid = (value: string, max?: number): boolean => {
    if (max === undefined || max <= 0)
        return true;

    return value.length <= max;
};

export default InputText;
