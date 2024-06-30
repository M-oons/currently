import { type Dispatch, type SetStateAction, useCallback, useState, } from "react";
import { type ActivityDetails, validateDetails, DETAILS_LENGTH_MAX } from "../../activity/types/ActivityDetails";
import type ActivityValidationError from "../../activity/types/validation/ActivityValidationError";
import ActivityError from "../../components/ActivityError/ActivityError";
import InputText from "../../components/InputText/InputText";

type EditDetailsProps = {
    details: ActivityDetails | null,
    setDetails: Dispatch<SetStateAction<ActivityDetails | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditDetails = (props: EditDetailsProps) => {
    const [details, setDetails] = useState<ActivityDetails | null>(props.details);
    const [errors, setErrors] = useState<ActivityValidationError[]>([]);

    const validDetails = (details: ActivityDetails | null) => {
        setErrors([]);
        props.setDetails(details);
        props.setValid(true);
    };

    const inputDetails = useCallback((details: string) => {
        setDetails(details);

        if (details === "") {
            validDetails(null);
            return;
        }

        const validation = validateDetails(details);
        if (!validation.valid) {
            setErrors(validation.errors);
            props.setValid(false);
            return;
        }

        validDetails(details);
    }, []);

    return (
        <>
            <div className="edit-title">Edit Details</div>
            <div className="edit-item">
                <InputText
                    value={details ?? ""}
                    placeholder="Details"
                    maxLength={DETAILS_LENGTH_MAX}
                    counter={true}
                    tabIndex={0}
                    onInput={inputDetails}
                />
                <ActivityError errors={errors} />
            </div>
        </>
    );
};

export default EditDetails;
