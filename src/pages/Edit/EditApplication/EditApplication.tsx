import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";
import { type ActivityClientId, validateClientId, CLIENT_ID_LENGTH_MAX } from "../../../activity/types/ActivityClientId";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import "./EditApplication.css";

type EditApplicationProps = {
    clientId: ActivityClientId | null,
    resetClient: () => void,
    setClientId: Dispatch<SetStateAction<ActivityClientId | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditApplication = (props: EditApplicationProps) => {
    const [clientId, setClientId] = useState<string>(props.clientId ?? "");
    const [validApplication, setValidApplication] = useState<boolean | null>(null);
    const [errorsClientId, setErrorsClientId] = useState<ActivityValidationError[]>([]);

    useEffect(() => {
        validate();
    }, [
        clientId,
        validApplication,
    ]);

    useEffect(() => {
        setValidApplication(null);
    }, [clientId]);

    const validate = async () => {
        let isValid = true;

        const clientIdValidation = validateClientId(clientId);
        if (clientIdValidation.valid)
            setErrorsClientId([]);
        else {
            isValid = false;
            setErrorsClientId(clientIdValidation.errors);
        }

        if (isValid && validApplication) {
            const validClientId = clientId.trim();
            valid(validClientId);
        }
        else
            props.setValid(false);
    };

    const valid = (clientId: ActivityClientId) => {
        setErrorsClientId([]);
        props.setClientId(clientId);
        props.setValid(true);
    };

    const inputClientId = useCallback((clientId: string) => {
        setClientId(clientId);
    }, []);

    const validateClient = async () => {
        let isValid = false;

        if (clientId !== "") {
            const application = await window.api.getApplication(clientId, false);
            isValid = application !== null;
        }

        setValidApplication(isValid);
    };

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">Client ID</div>
                <div className="edit-item">
                    <div id="edit-client-id">
                        <InputText
                            value={clientId}
                            placeholder="Client ID"
                            maxLength={CLIENT_ID_LENGTH_MAX}
                            counter={true}
                            tabIndex={0}
                            onInput={inputClientId}
                        />
                    </div>
                    {errorsClientId.length > 0 &&
                        <div className="edit-errors">
                            <ActivityErrors errors={errorsClientId} />
                        </div>
                    }
                </div>
            </div>
            <div className="edit-section">
                <div id="edit-client-controls">
                    {validApplication === null
                        ? <Button id="edit-client-validation" color="yellow" onClick={validateClient}>Validate client ID</Button>
                        : validApplication
                            ? <Button id="edit-client-validation-valid" color="green">Valid client ID</Button>
                            : <Button id="edit-client-validation-invalid" color="red">Invalid client ID</Button>
                    }
                    <Button id="edit-reset-client" color="red" onClick={props.resetClient}>Reset</Button>
                </div>
            </div>
        </>
    );
};

export default EditApplication;
