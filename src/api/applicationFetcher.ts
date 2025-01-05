import type Application from "./types/Application";
import type ApplicationAsset from "./types/ApplicationAsset";
import type ApplicationAssetsResponse from "./types/ApplicationAssetsResponse";
import type ApplicationResponse from "./types/ApplicationResponse";
import type ActivityClientId from "../activity/types/ActivityClientId";
import { ExpiryCache } from "../utils/caching";

const ASSETS_URL = "https://cdn.discordapp.com/app-assets";
const OAUTH_URL = "https://discord.com/api/oauth2";
const CACHE_LIFETIME = 60000; // 1 minute

const cachedApplications = new ExpiryCache<ActivityClientId, Application>(CACHE_LIFETIME);
const cachedAssets = new ExpiryCache<ActivityClientId, ApplicationAsset[]>(CACHE_LIFETIME);

export const getApplication = async (applicationId: ActivityClientId, useCache: boolean = true): Promise<Application | null> => {
    return cachedApplications.getAsync(
        applicationId,
        async (applicationId) => {
            const response = await fetch(`${OAUTH_URL}/applications/${applicationId}/rpc`);
            const applicationResponse = await response.json() as ApplicationResponse;
            if (!isApplicationSuccess(applicationResponse))
                return null;
            return applicationResponse;
        },
        useCache);
};

export const getApplicationAssets = async (applicationId: ActivityClientId, useCache: boolean = true): Promise<ApplicationAsset[] | null> => {
    return cachedAssets.getAsync(
        applicationId,
        async (applicationId) => {
            try {
                const response = await fetch(`${OAUTH_URL}/applications/${applicationId}/assets`);
                const assetsResponse = await response.json() as ApplicationAssetsResponse;
                if (!isApplicationAssetsSuccess(assetsResponse))
                    return null;
                assetsResponse.sort((a, b) => a.name.localeCompare(b.name));
                return assetsResponse;
            }
            catch {
                return null;
            }
        },
        useCache);
};

export const getApplicationAssetUrl = (applicationId: ActivityClientId, assetId: string): string => {
    return `${ASSETS_URL}/${applicationId}/${assetId}.png?size=160`;
};

const isApplicationSuccess = (response: ApplicationResponse): response is Application => {
    return (response as Application).id !== undefined;
};

const isApplicationAssetsSuccess = (response: ApplicationAssetsResponse): response is ApplicationAsset[] => {
    return (response as ApplicationAsset[]).length !== undefined;
};
