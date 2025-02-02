import { type Dispatch, type SetStateAction, useCallback, useState, useEffect, } from "react";
import type ActivityClientId from "../../../activity/types/ActivityClientId";
import { type ActivityImage, ActivityAssetType, getAssetType, validateImage, IMAGE_KEY_LENGTH_MAX, IMAGE_TEXT_LENGTH_MAX } from "../../../activity/types/ActivityImage";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import type ApplicationAsset from "../../../api/types/ApplicationAsset";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import InputText from "../../../components/InputText/InputText";
import { Select, type Option } from "../../../components/Select/Select";
import Switch from "../../../components/Switch/Switch";
import "./EditAssets.css";

type EditAssetLargeProps = {
    clientId: ActivityClientId | null,
    imageLarge: ActivityImage | null,
    setImageLarge: Dispatch<SetStateAction<ActivityImage | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditAssetLarge = (props: EditAssetLargeProps) => {
    const [assets, setAssets] = useState<ApplicationAsset[] | null>([]);
    const [assetType, setAssetType] = useState<ActivityAssetType>(getAssetType(props.imageLarge?.key ?? ""));
    const [imageLarge, setImageLarge] = useState<string>(props.imageLarge?.key ?? "");
    const [imageLargeTooltip, setImageLargeTooltip] = useState<string>(props.imageLarge?.text ?? "");
    const [useImageLarge, setUseImageLarge] = useState<boolean>(props.imageLarge !== null);
    const [errors, setErrors] = useState<ActivityValidationError[]>([]);

    useEffect(() => {
        validate();
    }, [
        assetType,
        imageLarge,
        imageLargeTooltip,
        useImageLarge,
    ]);

    useEffect(() => {
        const getAssets = async () => {
            if (!props.clientId)
                return;

            setAssets(null);
            const assets = await window.api.getApplicationAssets(props.clientId, true);
            setAssets(assets);
        };

        if (assetType === ActivityAssetType.Asset)
            getAssets();
    }, [assetType]);

    const validate = () => {
        let isValid = true;

        if (!useImageLarge)
            valid(null);
        else {
            const image = imageLarge.trim();
            const tooltip = imageLargeTooltip.trim();
            const validation = validateImage({ key: image, text: tooltip !== "" ? tooltip : undefined }, assetType);
            if (validation.valid)
                setErrors([]);
            else {
                isValid = false;
                setErrors(validation.errors);
            }

            if (isValid) {
                const validImage: ActivityImage | null = useImageLarge
                    ? {
                        key: image,
                        text: tooltip !== "" ? tooltip : undefined,
                    }
                    : null;
                valid(validImage);
            }
            else
                props.setValid(false);
        }
    };

    const valid = (image: ActivityImage | null) => {
        setErrors([]);
        props.setImageLarge(image);
        props.setValid(true);
    };

    const changeAssetType = useCallback((assetType: ActivityAssetType) => {
        setAssetType(assetType);
        setImageLarge("");
    }, []);

    const inputImage = useCallback((image: string) => {
        setImageLarge(image);
    }, []);

    const changeImage = useCallback((image: string) => {
        setImageLarge(image);
    }, []);

    const inputImageTooltip = useCallback((tooltip: string) => {
        setImageLargeTooltip(tooltip);
    }, []);

    const toggleImage = useCallback((value: boolean) => {
        setUseImageLarge(value);
    }, []);

    const errorsImage = errors.filter(f => f.property === "image");
    const errorsTooltip = errors.filter(f => f.property === "tooltip");

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">
                    Large Image
                    <div id="edit-image-toggle">
                        <Switch
                            value={useImageLarge}
                            onChange={toggleImage}
                        />
                    </div>
                </div>
                {useImageLarge &&
                    <div className="edit-item">
                        <div id="edit-asset-type">
                            <Select
                                options={[
                                    { label: "Asset", value: ActivityAssetType.Asset },
                                    { label: "URL", value: ActivityAssetType.URL },
                                ]}
                                value={assetType}
                                label="- Select Type -"
                                onChange={changeAssetType}
                            />
                        </div>
                    </div>
                }
            </div>
            {useImageLarge &&
                <>
                    <div className="edit-section">
                        <div className="edit-title">Image</div>
                        <div className="edit-item">
                            <div id="edit-asset-image">
                                {assetType === ActivityAssetType.Asset
                                    ? (
                                        <Select
                                            options={assets?.map((asset): Option<string> => ({
                                                label: asset.name,
                                                value: asset.name,
                                                image: props.clientId ? window.api.getApplicationAssetUrl(props.clientId, asset.id) : undefined,
                                            })) ?? []}
                                            value={imageLarge}
                                            label="- Select Asset -"
                                            onChange={changeImage}
                                        />
                                    )
                                    : (
                                        <InputText
                                            value={imageLarge}
                                            placeholder="Image URL"
                                            maxLength={IMAGE_KEY_LENGTH_MAX}
                                            counter={true}
                                            tabIndex={6}
                                            onInput={inputImage}
                                        />
                                    )
                                }

                            </div>
                            {errorsImage.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsImage} />
                                </div>
                            }
                        </div>
                    </div>
                    <div className="edit-section">
                        <div className="edit-title">Tooltip</div>
                        <div className="edit-item">
                            <div id="edit-asset-tooltip">
                                <InputText
                                    value={imageLargeTooltip}
                                    placeholder="Tooltip"
                                    maxLength={IMAGE_TEXT_LENGTH_MAX}
                                    counter={true}
                                    tabIndex={7}
                                    onInput={inputImageTooltip}
                                />
                            </div>
                            {errorsTooltip.length > 0 &&
                                <div className="edit-errors">
                                    <ActivityErrors errors={errorsTooltip} />
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
};

export default EditAssetLarge;
