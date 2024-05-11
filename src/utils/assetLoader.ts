import { NativeImage, nativeImage } from "electron";
import path from "path";

const cachedImages = new Map<string, NativeImage>();

export const getIcon = (name: string): NativeImage => {
    const cachedImage = cachedImages.get(name);
    if (cachedImage)
        return cachedImage;

    const image = nativeImage.createFromPath(path.join(__dirname, `icons/${name}_Template.ico`));
    image.setTemplateImage(true);
    cachedImages.set(name, image);

    return image;
};
