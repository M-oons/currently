import { type NativeImage, nativeImage } from "electron";
import { join } from "path";

type AssetType =
    | "app"
    | "tray"
    | "installer"
    | "packager";

export const getAsset = (type: AssetType): NativeImage => {
    const image = nativeImage.createFromPath(getAssetPath(type));

    if (process.platform === "darwin")
        image.setTemplateImage(true);

    return image;
};

export const getAssetPath = (type: AssetType, relative: boolean = false): string => {
    let name = "";

    if (process.platform === "darwin") {
        switch (type) {
            default:
            case "app":
                name = "app.icns";
                break;
            case "tray":
                name = "app-Template.icns";
                break;
            case "installer":
                name = "installer.png";
                break;
            case "packager":
                name = "app";
                break;
        }
    }
    else {
        switch (type) {
            default:
            case "app":
            case "tray":
                name = "app.ico";
                break;
            case "packager":
                name = "app";
                break;
        }
    }

    name = `assets/${name}`;

    return relative
        ? name
        : join(__dirname, name);
};
