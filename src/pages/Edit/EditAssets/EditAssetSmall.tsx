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

type EditAssetSmallProps = {
    clientId: ActivityClientId | null,
    imageSmall: ActivityImage | null,
    setImageSmall: Dispatch<SetStateAction<ActivityImage | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditAssetSmall = (props: EditAssetSmallProps) => {
    const [assets, setAssets] = useState<ApplicationAsset[] | null>([]);
    const [assetType, setAssetType] = useState<ActivityAssetType>(getAssetType(props.imageSmall?.key ?? ""));
    const [imageSmall, setImageSmall] = useState<string>(props.imageSmall?.key ?? "");
    const [imageSmallTooltip, setImageSmallTooltip] = useState<string>(props.imageSmall?.text ?? "");
    const [useImageSmall, setUseImageSmall] = useState<boolean>(props.imageSmall !== null);
    const [errors, setErrors] = useState<ActivityValidationError[]>([]);

    useEffect(() => {
        validate();
    }, [
        assetType,
        imageSmall,
        imageSmallTooltip,
        useImageSmall,
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

        if (!useImageSmall)
            valid(null);
        else {
            const image = imageSmall.trim();
            const tooltip = imageSmallTooltip.trim();
            const validation = validateImage({ key: image, text: tooltip !== "" ? tooltip : undefined }, assetType);
            if (validation.valid)
                setErrors([]);
            else {
                isValid = false;
                setErrors(validation.errors);
            }

            if (isValid) {
                const validImage: ActivityImage | null = useImageSmall
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
        props.setImageSmall(image);
        props.setValid(true);
    };

    const changeAssetType = useCallback((assetType: ActivityAssetType) => {
        setAssetType(assetType);
        setImageSmall("");
    }, []);

    const inputImage = useCallback((image: string) => {
        setImageSmall(image);
    }, []);

    const changeImage = useCallback((image: string) => {
        setImageSmall(image);
    }, []);

    const inputImageTooltip = useCallback((tooltip: string) => {
        setImageSmallTooltip(tooltip);
    }, []);

    const toggleImage = useCallback((value: boolean) => {
        setUseImageSmall(value);
    }, []);

    const errorsImage = errors.filter(f => f.property === "image");
    const errorsTooltip = errors.filter(f => f.property === "tooltip");

    return (
        <>
            <div className="edit-section">
                <div className="edit-title">
                    Small Image
                    <div id="edit-image-toggle">
                        <Switch
                            value={useImageSmall}
                            onChange={toggleImage}
                        />
                    </div>
                </div>
                {useImageSmall &&
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
            {useImageSmall &&
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
                                            value={imageSmall}
                                            label="- Select Asset -"
                                            onChange={changeImage}
                                        />
                                    )
                                    : (
                                        <InputText
                                            value={imageSmall}
                                            placeholder="Image URL"
                                            maxLength={IMAGE_KEY_LENGTH_MAX}
                                            counter={true}
                                            tabIndex={8}
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
                                    value={imageSmallTooltip}
                                    placeholder="Tooltip"
                                    maxLength={IMAGE_TEXT_LENGTH_MAX}
                                    counter={true}
                                    tabIndex={9}
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

export default EditAssetSmall;
