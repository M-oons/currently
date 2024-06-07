import type ApplicationAsset from "./types/ApplicationAsset";

export const getApplicationAssets = async (applicationId: string): Promise<ApplicationAsset[]> => {
    const result = await fetch(`https://discord.com/api/oauth2/applications/${applicationId}/assets`);
    const assets = await result.json() as ApplicationAsset[];
    return assets;
};

export const getApplicationAssetUrl = (applicationId: string, assetId: string): string => {
    return `https://cdn.discordapp.com/app-assets/${applicationId}/${assetId}.png?size=160`;
};
