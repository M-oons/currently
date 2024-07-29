import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";
import { type ActivityButton, validateButton, BUTTON_TEXT_LENGTH_MAX } from "../../../activity/types/ActivityButton";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import InputText from "../../../components/InputText/InputText";
import Switch from "../../../components/Switch/Switch";
import "./EditButtons.css";

type EditButtonsProps = {
    button1: ActivityButton | null,
    button2: ActivityButton | null,
    setButton1: Dispatch<SetStateAction<ActivityButton | null>>,
    setButton2: Dispatch<SetStateAction<ActivityButton | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditButtons = (props: EditButtonsProps) => {
    const [button1Text, setButton1Text] = useState<string>(props.button1?.text ?? "");
    const [button1Url, setButton1Url] = useState<string>(props.button1?.url ?? "");
    const [button2Text, setButton2Text] = useState<string>(props.button2?.text ?? "");
    const [button2Url, setButton2Url] = useState<string>(props.button2?.url ?? "");
    const [useButton1, setUseButton1] = useState<boolean>(props.button1 !== null);
    const [useButton2, setUseButton2] = useState<boolean>(props.button2 !== null);
    const [errorsButton1, setErrorsButton1] = useState<ActivityValidationError[]>([]);
    const [errorsButton2, setErrorsButton2] = useState<ActivityValidationError[]>([]);

    useEffect(() => {
        validate();
    }, [
        button1Text,
        button1Url,
        button2Text,
        button2Url,
        useButton1,
        useButton2,
    ]);

    const validate = () => {
        let isValid = true;

        if (!useButton1)
            setErrorsButton1([]);
        else {
            const button1Validation = validateButton({ text: button1Text, url: button1Url });
            if (button1Validation.valid)
                setErrorsButton1([]);
            else {
                isValid = false;
                setErrorsButton1(button1Validation.errors);
            }
        }

        if (!useButton2)
            setErrorsButton2([]);
        else {
            const button2Validation = validateButton({ text: button2Text, url: button2Url });
            if (button2Validation.valid)
                setErrorsButton2([]);
            else {
                isValid = false;
                setErrorsButton2(button2Validation.errors);
            }
        }

        if (isValid) {
            const validButton1: ActivityButton | null = useButton1
                ? {
                    text: button1Text,
                    url: button1Url,
                }
                : null;
            const validButton2: ActivityButton | null = useButton2
                ? {
                    text: button2Text,
                    url: button2Url,
                }
                : null;
            valid(validButton1, validButton2);
        }
        else
            props.setValid(false);
    };

    const valid = (button1: ActivityButton | null, button2: ActivityButton | null) => {
        setErrorsButton1([]);
        setErrorsButton2([]);
        props.setButton1(button1);
        props.setButton2(button2);
        props.setValid(true);
    };

    const inputButton1Text = useCallback((text: string) => {
        setButton1Text(text);
    }, []);

    const inputButton1Url = useCallback((url: string) => {
        setButton1Url(url);
    }, []);

    const inputButton2Text = useCallback((text: string) => {
        setButton2Text(text);
    }, []);

    const inputButton2Url = useCallback((url: string) => {
        setButton2Url(url);
    }, []);

    const toggleButton1 = useCallback((value: boolean) => {
        setUseButton1(value);
    }, []);

    const toggleButton2 = useCallback((value: boolean) => {
        setUseButton2(value);
    }, []);

    const errorsButton1Text = errorsButton1.filter(f => f.property === "text");
    const errorsButton1Url = errorsButton1.filter(f => f.property === "url");
    const errorsButton2Text = errorsButton2.filter(f => f.property === "text");
    const errorsButton2Url = errorsButton2.filter(f => f.property === "url");

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">
                    Button 1
                    <div id="edit-button1-toggle">
                        <Switch
                            value={useButton1}
                            onChange={toggleButton1}
                        />
                    </div>
                </div>
                {useButton1 &&
                    <>
                        <div className="edit-item">
                            <div id="edit-button1-text">
                                <InputText
                                    value={button1Text}
                                    placeholder="Text"
                                    maxLength={BUTTON_TEXT_LENGTH_MAX}
                                    counter={true}
                                    tabIndex={10}
                                    onInput={inputButton1Text}
                                />
                            </div>
                            {errorsButton1Text.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsButton1Text} />
                                </div>
                            }
                        </div>
                        <div className="edit-item">
                            <div id="edit-button1-url">
                                <InputText
                                    value={button1Url}
                                    placeholder="URL"
                                    tabIndex={11}
                                    onInput={inputButton1Url}
                                />
                            </div>
                            {errorsButton1Url.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsButton1Url} />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
            <div className="edit-section">
                <div className="edit-title">
                    Button 2
                    <div id="edit-button2-toggle">
                        <Switch
                            value={useButton2}
                            onChange={toggleButton2}
                        />
                    </div>
                </div>
                {useButton2 &&
                    <>
                        <div className="edit-item">
                            <div id="edit-button2-text">
                                <InputText
                                    value={button2Text}
                                    placeholder="Text"
                                    maxLength={BUTTON_TEXT_LENGTH_MAX}
                                    counter={true}
                                    tabIndex={12}
                                    onInput={inputButton2Text}
                                />
                            </div>
                            {errorsButton2Text.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsButton2Text} />
                                </div>
                            }
                        </div>
                        <div className="edit-item">
                            <div id="edit-button2-url">
                                <InputText
                                    value={button2Url}
                                    placeholder="URL"
                                    tabIndex={13}
                                    onInput={inputButton2Url}
                                />
                            </div>
                            {errorsButton2Url.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsButton2Url} />
                                </div>
                            }
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default EditButtons;
