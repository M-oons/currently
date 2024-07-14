import { type Dispatch, type SetStateAction, useCallback, useState, useEffect, } from "react";
import { type ActivityDetails, validateDetails, DETAILS_LENGTH_MAX } from "../../../activity/types/ActivityDetails";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import InputText from "../../../components/InputText/InputText";
import "./EditDetails.css";

type EditDetailsProps = {
    details: ActivityDetails | null,
    setDetails: Dispatch<SetStateAction<ActivityDetails | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditDetails = (props: EditDetailsProps) => {
    const [details, setDetails] = useState<string>(props.details ?? "");
    const [errors, setErrors] = useState<ActivityValidationError[]>([]);

    useEffect(() => {
        validate();
    }, [details]);

    const validate = () => {
        let isValid = true;

        if (details === "")
            setErrors([]);
        else {
            const validation = validateDetails(details);
            if (validation.valid) {
                setErrors([]);
            }
            else {
                isValid = false;
                setErrors(validation.errors);
            }

        }

        if (isValid) {
            const validDetails = details !== ""
                ? details
                : null;
            valid(validDetails);
        }
        else
            props.setValid(false);
    };

    const valid = (details: ActivityDetails | null) => {
        setErrors([]);
        props.setDetails(details);
        props.setValid(true);
    };

    const inputDetails = useCallback((details: string) => {
        setDetails(details);
    }, []);

    return (
        <>
            <div className="edit-title">Details</div>
            <div className="edit-item">
                <div id="edit-details">
                    <InputText
                        value={details}
                        placeholder="Details"
                        maxLength={DETAILS_LENGTH_MAX}
                        counter={true}
                        tabIndex={0}
                        onInput={inputDetails}
                    />
                </div>
                {errors.length > 0 &&
                    <div className="edit-errors">
                        <ActivityErrors errors={errors} />
                    </div>
                }
            </div>
        </>
    );
};

export default EditDetails;
