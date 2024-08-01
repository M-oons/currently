import { useEffect, useRef, useState } from "react";
import "./Select.css";

type SelectValueType = string | number;

type Option<T extends SelectValueType> = {
    label: string,
    value: T,
};

type SelectProps<T extends SelectValueType> = {
    options: Option<T>[],
    value: T | null,
    label?: string,
    onChange: (value: T) => void,
};

const Select = <T extends SelectValueType>(props: SelectProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<T | null>(props.value);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // check if props.value is a valid option, otherwise select the first option
        if (props.options.length > 0 && !props.options.find(option => option.value === props.value)) {
            const defaultValue = props.options[0].value;
            setSelected(defaultValue);
            props.onChange(defaultValue);
        }
        else if (props.options.length === 0)
            setSelected(null);
    }, [
        props.options,
        props.value,
    ]);

    useEffect(() => {
        if (open)
            document.addEventListener("mousedown", clickOutside);
        else
            document.removeEventListener("mousedown", clickOutside);

        return () => document.removeEventListener("mousedown", clickOutside);
    }, [open]);

    const clickDropdown = () => {
        setOpen($state => !$state);
    };

    const clickOption = (option: Option<T>) => {
        setSelected(option.value);
        props.onChange(option.value);
        setOpen(false);
    };

    const clickOutside = (e: MouseEvent) => {
        if (selectRef.current !== null && !selectRef.current.contains(e.target as Node))
            setOpen(false);
    };

    return (
        <div className="select" ref={selectRef}>
            <div className={`select-input ${open ? "select-input-open" : ""}`.trim()} onClick={clickDropdown}>
                <span>
                    {selected !== null
                        ? props.options.find(option => option.value === selected)?.label
                        : props.label
                    }
                </span>
                <span className={open ? "select-arrow-up" : "select-arrow"}>⌵</span>
            </div>
            {open &&
                <div className="options">
                    {props.options.length > 0
                        ? props.options.map(option => (
                            <div
                                className={`option ${option.value === selected ? "option-selected" : ""}`.trim()}
                                onClick={() => clickOption(option)}
                                key={option.value}
                            >
                                <span>{option.label}</span>
                                {option.value === selected && <span className="option-selected-icon">✓</span>}
                            </div>
                        ))
                        : (
                            <div className="option option-disabled">
                                <span>Empty</span>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default Select;
