import { type Dispatch, type SetStateAction, useCallback, useState, useEffect, } from "react";
import { type ActivityImage, ActivityAssetType, getAssetType, validateImage, IMAGE_KEY_LENGTH_MAX, IMAGE_TEXT_LENGTH_MAX } from "../../../activity/types/ActivityImage";
import type ActivityValidationError from "../../../activity/types/validation/ActivityValidationError";
import type ApplicationAsset from "../../../application/types/ApplicationAsset";
import { getApplicationAssets } from "../../../application/applicationFetcher";
import ActivityErrors from "../../../components/ActivityErrors/ActivityErrors";
import InputText from "../../../components/InputText/InputText";
import Select from "../../../components/Select/Select";
import Switch from "../../../components/Switch/Switch";
import "./EditAssets.css";

type EditAssetSmallProps = {
    clientId: string,
    imageSmall: ActivityImage | null,
    setImageSmall: Dispatch<SetStateAction<ActivityImage | null>>,
    setValid: Dispatch<SetStateAction<boolean>>,
};

const EditAssetSmall = (props: EditAssetSmallProps) => {
    const [assets, setAssets] = useState<ApplicationAsset[] | null>([]);
    const [assetType, setAssetType] = useState<ActivityAssetType>(getAssetType(props.imageSmall?.key ?? ""));
    const [imageSmall, setImageSmall] = useState<string>(props.imageSmall?.key ?? "");
    const [imageSmallTooltip, setImageSmallTooltip] = useState<string>(props.imageSmall?.text ?? "");
    const [errors, setErrors] = useState<ActivityValidationError[]>([]);
    const [useImageSmall, setUseImageSmall] = useState<boolean>(props.imageSmall !== null);

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
            setAssets(null);
            const assets = await getApplicationAssets(props.clientId);
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
            const validation = validateImage({ key: imageSmall, text: imageSmallTooltip === "" ? undefined : imageSmallTooltip }, assetType);
            if (validation.valid) {
                setErrors([]);
            }
            else {
                isValid = false;
                setErrors(validation.errors);
            }

            if (isValid) {
                const validImage: ActivityImage | null = useImageSmall
                    ? {
                        key: imageSmall.trim(),
                        text: imageSmallTooltip.trim() === "" ? undefined : imageSmallTooltip.trim(),
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
                                label="Type"
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
                                            options={assets?.map(asset => ({
                                                label: asset.name,
                                                value: asset.name,
                                            })) ?? []}
                                            value={imageSmall}
                                            label={assets === null ? "Loading assets..." : "Asset"}
                                            onChange={changeImage}
                                        />
                                    )
                                    : (
                                        <InputText
                                            value={imageSmall}
                                            placeholder="Image URL"
                                            maxLength={IMAGE_KEY_LENGTH_MAX}
                                            counter={true}
                                            tabIndex={0}
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
                                    tabIndex={1}
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
