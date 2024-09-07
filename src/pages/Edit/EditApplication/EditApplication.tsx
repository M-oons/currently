import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";
import { type ActivityClientId, validateClientId, CLIENT_ID_LENGTH_MAX } from "../../../activity/types/ActivityClientId";
import { type ActivityClientSecret, validateClientSecret, CLIENT_SECRET_LENGTH } from "../../../activity/types/ActivityClientSecret";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import { getApplication, getApplicationAssets } from "../../../api/applicationFetcher";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import Button from "../../../components/Button/Button";
import InputText from "../../../components/InputText/InputText";
import Tooltip from "../../../components/Tooltip/Tooltip";
import "./EditApplication.css";

type EditApplicationProps = {
    clientId: ActivityClientId | null,
    clientSecret: ActivityClientSecret | null,
    resetClient: () => void,
    setClientId: Dispatch<SetStateAction<ActivityClientId | null>>,
    setClientSecret: Dispatch<SetStateAction<ActivityClientId | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditApplication = (props: EditApplicationProps) => {
    const [clientId, setClientId] = useState<string>(props.clientId ?? "");
    const [clientSecret, setClientSecret] = useState<string>(props.clientSecret ?? "");
    const [validApplication, setValidApplication] = useState<boolean | null>(null);
    const [errorsClientId, setErrorsClientId] = useState<ActivityValidationError[]>([]);
    const [errorsClientSecret, setErrorsClientSecret] = useState<ActivityValidationError[]>([]);

    useEffect(() => {
        validate();
    }, [
        clientId,
        clientSecret,
        validApplication,
    ]);

    useEffect(() => {
        setValidApplication(null);
    }, [
        clientId,
        clientSecret,
    ]);

    const validate = async () => {
        let isValid = true;

        const clientIdValidation = validateClientId(clientId);
        if (clientIdValidation.valid)
            setErrorsClientId([]);
        else {
            isValid = false;
            setErrorsClientId(clientIdValidation.errors);
        }

        if (clientSecret === "")
            setErrorsClientSecret([]);
        else {
            const clientSecretValidation = validateClientSecret(clientSecret);
            if (clientSecretValidation.valid)
                setErrorsClientSecret([]);
            else {
                isValid = false;
                setErrorsClientSecret(clientSecretValidation.errors);
            }
        }

        if (isValid && validApplication) {
            const validClientId = clientId.trim();
            const validClientSecret: ActivityClientSecret | null = clientSecret.trim() !== ""
                ? clientSecret.trim()
                : null;
            valid(validClientId, validClientSecret);
        }
        else
            props.setValid(false);
    };

    const valid = (clientId: ActivityClientId, clientSecret: ActivityClientSecret | null) => {
        setErrorsClientId([]);
        setErrorsClientSecret([]);
        props.setClientId(clientId);
        props.setClientSecret(clientSecret);
        props.setValid(true);
    };

    const inputClientId = useCallback((clientId: string) => {
        setClientId(clientId);
    }, []);

    const inputClientSecret = useCallback((clientSecret: string) => {
        setClientSecret(clientSecret);
    }, []);

    const validateClient = async () => {
        let isValid = false;

        if (clientSecret !== "") {
            const application = await getApplication(clientId, clientSecret, false);
            isValid = application !== null;
        }
        else if (clientId !== "") {
            const assets = await getApplicationAssets(clientId, false);
            isValid = assets !== null;
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
                <div className="edit-title">
                    Client secret
                    <div id="edit-client-secret-icon">
                        <Tooltip
                            id="edit-client-secret-tooltip"
                            text={"[Optional]\n\nUsed to fetch the name of your application - if not specified, the ID will be displayed in the app instead"}
                            maxWidth={250}
                            x={6}
                            y={21}
                        />
                    </div>
                </div>
                <div className="edit-item">
                    <div id="edit-client-secret">
                        <InputText
                            value={clientSecret}
                            placeholder="Client secret"
                            maxLength={CLIENT_SECRET_LENGTH}
                            counter={true}
                            tabIndex={1}
                            onInput={inputClientSecret}
                        />
                    </div>
                    {errorsClientSecret.length > 0 &&
                        <div className="edit-errors">
                            <ActivityErrors errors={errorsClientSecret} />
                        </div>
                    }
                </div>
            </div>
            <div className="edit-section">
                <div id="edit-client-controls">
                    {validApplication === null
                        ? <Button id="edit-client-validation" color="yellow" onClick={validateClient}>Validate client details</Button>
                        : validApplication
                            ? <Button id="edit-client-validation-valid" color="green">Valid client details</Button>
                            : <Button id="edit-client-validation-invalid" color="red">Invalid client details</Button>
                    }
                    <Button id="edit-reset-client" color="red" onClick={props.resetClient}>↺</Button>
                </div>
            </div>
        </>
    );
};

export default EditApplication;
