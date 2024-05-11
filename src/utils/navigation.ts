import { shell } from "electron";

export const openURL = async (url: string): Promise<void> => {
    return await shell.openExternal(url);
}
