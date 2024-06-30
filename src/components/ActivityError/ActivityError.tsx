import type ActivityValidationError from "../../activity/types/validation/ActivityValidationError";
import "./ActivityError.css";

type ActivityErrorProps = {
    errors: ActivityValidationError[],
};

const ActivityError = (props: ActivityErrorProps) => {
    return props.errors.length > 0
        ? (
            <div id="activity-errors">
                {props.errors.map((error, index) => {
                    return <div className="activity-error" key={index}>• {error.error}</div>;
                })}
            </div>
        )
        : null;
};

export default ActivityError;
