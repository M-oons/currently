import type Application from "./types/Application";
import type ApplicationAsset from "./types/ApplicationAsset";
import { authorize, me, OAUTH_URL } from "../auth/authorizationHandler";
import { ExpiryCache } from "../utils/caching";

const ASSETS_URL = "https://cdn.discordapp.com/app-assets";
const CACHE_LIFETIME = 60000; // 1 minute

const cachedApplications = new ExpiryCache<string, Application>(CACHE_LIFETIME);
const cachedAssets = new ExpiryCache<string, ApplicationAsset[]>(CACHE_LIFETIME);

export const getApplication = async (clientId: string, clientSecret: string): Promise<Application | null> => {
    return cachedApplications.getAsync(clientId, async (clientId) => {
        const authResponse = await authorize(clientId, clientSecret);
        if (authResponse === null)
            return null;
        const authToken = authResponse.access_token;
        const meResponse = await me(authToken);
        return meResponse.application;
    });
};

export const getApplicationAssets = async (applicationId: string): Promise<ApplicationAsset[] | null> => {
    return cachedAssets.getAsync(applicationId, async (applicationId) => {
        try {
            const response = await fetch(`${OAUTH_URL}/applications/${applicationId}/assets`);
            const assets = await response.json() as ApplicationAsset[];
            assets.sort((a, b) => a.name.localeCompare(b.name));
            return assets;
        }
        catch {
            return null;
        }
    });
};

export const getApplicationAssetUrl = (applicationId: string, assetId: string, size: number = 160): string => {
    return `${ASSETS_URL}/${applicationId}/${assetId}.png?size=${size}`;
};
