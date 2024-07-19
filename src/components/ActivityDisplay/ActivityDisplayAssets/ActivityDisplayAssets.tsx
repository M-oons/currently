import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type ActivityImage from "../../../activity/types/ActivityImage"
import { getApplicationAssetUrl, getApplicationAssets } from "../../../application/applicationFetcher";
import { type EditPage } from "../../../pages/Edit/Edit";
import "./ActivityDisplayAssets.css";

type ActivityDisplayAssetsProps = {
    clientId: string,
    imageLarge: ActivityImage | null,
    imageSmall: ActivityImage | null,
    edit: boolean,
};

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
                showImageLarge,
                imageLargeTooltip,
                showImageLargeTooltip,
                imageSmall,
                imageSmallSrc,
                showImageSmall,
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

    return (
        <>
            {props.edit
                ? (state.showImageLarge
                    ? (
                        <div id="activity-asset-large" className="edit" onClick={() => goToEditPage("assets")}>
                            <img id="activity-asset-large-image" src={state.imageLargeSrc}></img>
                        </div>
                    )
                    : (
                        <div id="activity-asset-large" className="edit empty" onClick={() => goToEditPage("assets")}></div>
                    )
                )
                : (state.showImageLarge &&
                    <div id="activity-asset-large">
                        <img id="activity-asset-large-image" src={state.imageLargeSrc}></img>
                        {state.showImageLargeTooltip && <span id="activity-asset-large-tooltip" className="activity-asset-tooltip">{state.imageLargeTooltip}</span>}
                    </div>
                )
            }
            {props.edit
                ? (state.showImageSmall
                    ? (
                        <div id="activity-asset-small" className="edit" onClick={() => goToEditPage("assets")}>
                            <div id="activity-asset-small-bg"></div>
                            <img id="activity-asset-small-image" src={state.imageSmallSrc}></img>
                        </div>
                    )
                    : (
                        <div id="activity-asset-small" className="edit empty" onClick={() => goToEditPage("assets")}>
                            <div id="activity-asset-small-bg"></div>
                        </div>
                    )
                )
                : (state.showImageSmall &&
                    <div id="activity-asset-small">
                        <div id="activity-asset-small-bg"></div>
                        <img id="activity-asset-small-image" src={state.imageSmallSrc}></img>
                        {state.showImageSmallTooltip && <span id="activity-asset-small-tooltip" className="activity-asset-tooltip">{state.imageSmallTooltip}</span>}
                    </div>
                )
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

const getImageSource = async (applicationId: string, image: string | null): Promise<string> => {
    if (image === null)
        return "";
    if (image.toLowerCase().startsWith("http://") || image.toLowerCase().startsWith("https://"))
        return image;

    const assets = await getApplicationAssets(applicationId);
    const asset = assets.find(a => a.name === image);
    if (asset === undefined)
        return "";

    const assetSrc = getApplicationAssetUrl(applicationId, asset.id);
    return assetSrc;
};

export default ActivityDisplayAssets;
