import { type ComponentProps } from "react";
import "./Button.css";

interface ButtonProps extends Omit<ComponentProps<"button">, OmitButtonProps> {
    color?: ButtonColor,
};

type ButtonColor =
    | "grey"
    | "blurple"
    | "green"
    | "red"
    | "yellow"
    | "transparent";

type OmitButtonProps =
    | "type"
    | "tabIndex";

const Button = (props: ButtonProps) => {
    const { className, ...rest } = props;

    return (
        <button
            className={`button ${props.color !== undefined ? `button-${props.color}` : ""} ${className || ""}`.trim()}
            type="button"
            tabIndex={-1}
            {...rest}
        />
    );
};

export default Button;
