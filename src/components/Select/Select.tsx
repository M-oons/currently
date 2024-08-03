import { useEffect, useRef, useState } from "react";
import "./Select.css";

type SelectValueType = string | number;

export type Option<T extends SelectValueType> = {
    label: string,
    value: T,
    image?: string,
};

type SelectProps<T extends SelectValueType> = {
    options: Option<T>[],
    value: T | null,
    label?: string,
    onChange: (value: T) => void,
};

export const Select = <T extends SelectValueType>(props: SelectProps<T>) => {
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<Option<T> | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (props.options.length === 0)
            setSelected(null);
        else {
            let selected = props.options.find(option => option.value === props.value) ?? props.options[0];
            setSelected(selected);
            if (selected.value !== props.value)
                props.onChange(selected.value);
        }
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
        if (option !== selected) {
            setSelected(option);
            props.onChange(option.value);
        }
        setOpen(false);
    };

    const clickOutside = (e: MouseEvent) => {
        if (selectRef.current !== null && !selectRef.current.contains(e.target as Node))
            setOpen(false);
    };

    return (
        <div className="select" ref={selectRef}>
            <div className={`select-input ${open ? "select-input-open" : ""}`.trim()} onClick={clickDropdown}>
                {selected !== null
                    ? (
                        <>
                            {selected.image !== undefined && <img className="option-selected-image" src={selected.image}></img>}
                            <span>{selected.label}</span>
                        </>
                    )
                    : <span>{props.label}</span>
                }
                <span className={open ? "select-arrow-up" : "select-arrow"}>⌵</span>
            </div>
            {open &&
                <div className="options">
                    {props.options.length > 0
                        ? props.options.map(option => (
                            <div
                                className={`option ${option === selected ? "option-selected" : ""}`.trim()}
                                onClick={() => clickOption(option)}
                                key={option.value}
                            >
                                {option.image !== undefined && <img className="option-image" src={option.image}></img>}
                                <span>{option.label}</span>
                                {option === selected && <span className="option-selected-icon">✓</span>}
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
