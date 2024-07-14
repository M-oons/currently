import { type ChangeEvent, useState } from "react";
import { clamp, INT32_MAX_VALUE, INT32_MIN_VALUE } from "../../utils/math";
import "./InputNumber.css";

const NUMBER_REGEX = /^(?!-?0\d)(?!-0$)-?\d*$/;
/*
    • (?!-?0\d): Negative lookahead to disallow numbers with leading zeros except "0"
        • -?: Optional minus sign
        • 0\d: Zero followed by any digit, indicating leading zeros
    • (?!-0$): Negative lookahead to disallow "-0"
    • -?: Allow negative numbers
    • \d*: Zero or more digits (+ empty string)
*/

type InputNumberProps = {
    id?: string,
    className?: string,
    value: number,
    tabIndex?: number,
    max?: number,
    min?: number,
    onInput?: (value: number) => void,
};

const InputNumber = (props: InputNumberProps) => {
    const [value, setValue] = useState<string>(props.value.toString());

    const onInput = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (NUMBER_REGEX.test(value))
            setValue(value);

        let num = parseInt(value);
        if (!isNaN(num)) {
            num = clamp(num, props.min ?? INT32_MIN_VALUE * 1000, props.max ?? INT32_MAX_VALUE * 1000);
            setValue(num.toString());
            props.onInput?.(num);
        }
    };

    return (
        <div className="input-number">
            <input
                id={props.id}
                className={props.className}
                type="text"
                placeholder={(props.min ?? 0).toString()}
                tabIndex={props.tabIndex ?? -1}
                value={value}
                onInput={onInput}
            />
        </div>
    );
};

export default InputNumber;
