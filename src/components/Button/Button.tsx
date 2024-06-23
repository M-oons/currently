import { type ComponentProps } from "react";
import "./Button.css";

const Button = (props: ComponentProps<"button">) => {
    return (
        <button
            className={`button ${props.className || ""}`.trim()}
            type="button"
            tabIndex={-1}
            {...props}
        />
    );
};

export default Button;
