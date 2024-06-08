/*
    Shared utility functions requiring different implementations
    for the main and renderer processes
*/

export const toBase64 = (data: string): string => {
    try {
        return Buffer.from(data).toString("base64"); // main
    }
    catch {
        return window.utils.toBase64(data); // renderer
    }
};
