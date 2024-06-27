import { type ComponentProps } from "react";
import "./Button.css";

type OmitButtonProps =
    | "type"
    | "tabIndex";

const Button = (props: Omit<ComponentProps<"button">, OmitButtonProps>) => {
    const { className, ...rest } = props;

    return (
        <button
            className={`button ${className || ""}`.trim()}
            type="button"
            tabIndex={-1}
            {...rest}
        />
    );
};

export default Button;
