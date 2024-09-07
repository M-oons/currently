import "./Alert.css";

type AlertProps = {
    type: AlertType,
    text: string,
};

type AlertType =
    | "info"
    | "warning"
    | "error";

const Alert = (props: AlertProps) => {
    return (
        <div className={`alert alert-${props.type}`}>
            <div className="alert-icon"></div>
            <div className="alert-text">{props.text}</div>
        </div>
    );
};

export default Alert;
