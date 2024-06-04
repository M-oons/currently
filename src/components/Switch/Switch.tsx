import { ChangeEvent, useState } from "react";
import "./Switch.css";

type SwitchProps = {
    value: boolean,
    scale?: number,
    onChange: (value: boolean) => void,
};

const Switch = (props: SwitchProps) => {
    const [state, setState] = useState<boolean>(props.value);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setState(value);
        props.onChange(value);
    };

    return (
        <div className={`switch ${state ? "switch-on" : "switch-off"}`} style={{ "--scale": props.scale }}>
            <div className="switch-thumb"></div>
            <input className="switch-input" type="checkbox" checked={state} onChange={onChange} />
        </div>
    );
};

export default Switch;
