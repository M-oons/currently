import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type ActivityClientId from "../../../activity/types/ActivityClientId";
import { type ActivityImage, ActivityAssetType, getAssetType } from "../../../activity/types/ActivityImage";
import Tooltip from "../../../components/Tooltip/Tooltip";
import { type EditPage } from "../../../pages/Edit/Edit";
import type ActivityDisplayComponentProps from "../types/ActivityDisplayComponentProps";
import "./ActivityDisplayAssets.css";

type ActivityDisplayAssetsProps = {
    clientId: ActivityClientId | null,
    imageLarge: ActivityImage | null,
    imageSmall: ActivityImage | null,
} & ActivityDisplayComponentProps;

type ActivityDisplayAssetsState = {
    imageLarge: string | null,
    imageLargeSrc: string,
    showImageLarge: boolean,
    imageLargeTooltip: string | null,
    showImageLargeTooltip: boolean,
    imageSmall: string | null,
    imageSmallSrc: string,
    showImageSmall: boolean,
    imageSmallTooltip: string | null,
    showImageSmallTooltip: boolean,
};

const ActivityDisplayAssets = (props: ActivityDisplayAssetsProps) => {
    const [state, setState] = useState<ActivityDisplayAssetsState>({
        imageLarge: null,
        imageLargeSrc: "",
        showImageLarge: false,
        imageLargeTooltip: null,
        showImageLargeTooltip: false,
        imageSmall: null,
        imageSmallSrc: "",
        showImageSmall: false,
        imageSmallTooltip: null,
        showImageSmallTooltip: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getState = async () => {
            const [
                imageLarge,
                showImageLarge,
                imageLargeTooltip,
                showImageLargeTooltip,
                imageSmall,
                showImageSmall,
                imageSmallTooltip,
                showImageSmallTooltip
            ] = displayImages(props.imageLarge, props.imageSmall);

            const imageLargeSrc = await getImageSource(props.clientId, imageLarge);
            const imageSmallSrc = await getImageSource(props.clientId, imageSmall);

            setState({
                imageLarge,
                imageLargeSrc,
                showImageLarge: showImageLarge && imageLargeSrc !== "",
                imageLargeTooltip,
                showImageLargeTooltip,
                imageSmall,
                imageSmallSrc,
                showImageSmall: showImageSmall && imageSmallSrc !== "",
                imageSmallTooltip,
                showImageSmallTooltip,
            });
        };
        getState();
    }, [
        props.clientId,
        props.imageLarge,
        props.imageSmall,
    ]);

    const goToEditPage = (page: EditPage) => {
        navigate(`/edit/${page}`);
    };

    return props.edit
        ? (
            <>
                {state.showImageLarge
                    ? (
                        <div id="activity-asset-large" className="edit" onClick={() => goToEditPage("asset-large")}>
                            <img id="activity-asset-large-image" src={state.imageLargeSrc}></img>
                        </div>
                    )
                    : (
                        <div id="activity-asset-large" className="edit empty" onClick={() => goToEditPage("asset-large")}></div>
                    )
                }
                {state.showImageSmall
                    ? (
                        <div id="activity-asset-small" className="edit" onClick={() => goToEditPage("asset-small")}>
                            <div id="activity-asset-small-bg"></div>
                            <img id="activity-asset-small-image" src={state.imageSmallSrc}></img>
                        </div>
                    )
                    : (
                        <div id="activity-asset-small" className="edit empty" onClick={() => goToEditPage("asset-small")}>
                            <div id="activity-asset-small-bg"></div>
                        </div>
                    )
                }
            </>
        )
        : (
            <>
                {state.showImageLarge &&
                    <div id="activity-asset-large">
                        <img id="activity-asset-large-image" src={state.imageLargeSrc}></img>
                        {state.showImageLargeTooltip &&
                            <Tooltip
                                id="activity-asset-large-tooltip"
                                text={state.imageLargeTooltip ?? ""}
                                x={30}
                                y={69}
                            />
                        }
                    </div>
                }
                {state.showImageSmall &&
                    <div id="activity-asset-small">
                        <div id="activity-asset-small-bg"></div>
                        <img id="activity-asset-small-image" src={state.imageSmallSrc}></img>
                        {state.showImageSmallTooltip &&
                            <Tooltip
                                id="activity-asset-small-tooltip"
                                text={state.imageSmallTooltip ?? ""}
                                x={54}
                                y={25}
                            />
                        }
                    </div>
                }
            </>
        );
};

const displayImages = (imageLarge: ActivityImage | null, imageSmall: ActivityImage | null): [imageLarge: string | null, showImageLarge: boolean, imageLargeTooltip: string | null, showImageLargeTooltip: boolean, imageSmall: string | null, showImageSmall: boolean, imageSmallTooltip: string | null, showImageSmallTooltip: boolean] => {
    let large = imageLarge;
    let small = imageSmall;
    if (large === null && small !== null) {
        large = small;
        small = null;
    }
    const showImageLarge = large !== null;
    const showImageLargeTooltip = showImageLarge && large?.text !== undefined;
    const showImageSmall = showImageLarge && small !== null;
    const showImageSmallTooltip = showImageSmall && small?.text !== undefined;
    return [
        large?.key ?? null,
        showImageLarge,
        large?.text ?? null,
        showImageLargeTooltip,
        small?.key ?? null,
        showImageSmall,
        small?.text ?? null,
        showImageSmallTooltip,
    ];
};

const getImageSource = async (applicationId: ActivityClientId | null, image: string | null): Promise<string> => {
    if (!applicationId || !image)
        return "";
    if (getAssetType(image) === ActivityAssetType.URL)
        return image;

    const assets = await window.api.getApplicationAssets(applicationId, true);
    if (assets === null)
        return "";

    const asset = assets.find(a => a.name === image);
    if (asset === undefined)
        return "";

    return window.api.getApplicationAssetUrl(applicationId, asset.id);
};

export default ActivityDisplayAssets;
