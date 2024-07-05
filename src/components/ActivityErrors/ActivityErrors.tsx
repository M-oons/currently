import type ActivityValidationError from "../../activity/types/validation/ActivityValidationError";
import "./ActivityErrors.css";

type ActivityErrorsProps = {
    errors: ActivityValidationError[],
};

const ActivityErrors = (props: ActivityErrorsProps) => {
    return (
        <div id="activity-errors">
            {props.errors.map((error, index) => {
                return error.property !== undefined
                    ? <div className="activity-error" key={index}>• <span className="activity-error-property">{error.property}</span> - {error.error}</div>
                    : <div className="activity-error" key={index}>• {error.error}</div>;
            })}
        </div>
    );
};

export default ActivityErrors;
