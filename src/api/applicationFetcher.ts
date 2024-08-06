import type Application from "./types/Application";
import type ApplicationAsset from "./types/ApplicationAsset";
import type ApplicationAssetsResponse from "./types/ApplicationAssetsResponse";
import { authorize, isAuthorizeSuccess, isMeSuccess, me, OAUTH_URL } from "./authorizationHandler";
import type ActivityClientId from "../activity/types/ActivityClientId";
import type ActivityClientSecret from "../activity/types/ActivityClientSecret";
import { ExpiryCache } from "../utils/caching";

const ASSETS_URL = "https://cdn.discordapp.com/app-assets";
const CACHE_LIFETIME = 60000; // 1 minute

const cachedApplications = new ExpiryCache<ActivityClientId, Application>(CACHE_LIFETIME);
const cachedAssets = new ExpiryCache<ActivityClientId, ApplicationAsset[]>(CACHE_LIFETIME);

const isApplicationAssetsSuccess = (response: ApplicationAssetsResponse): response is ApplicationAsset[] => {
    return (response as ApplicationAsset[]).length !== undefined;
};

export const getApplication = async (clientId: ActivityClientId, clientSecret: ActivityClientSecret, useCache: boolean = true): Promise<Application | null> => {
    return cachedApplications.getAsync(
        clientId,
        async (clientId) => {
            const authResponse = await authorize(clientId, clientSecret);
            if (authResponse === null || !isAuthorizeSuccess(authResponse))
                return null;
            const authToken = authResponse.access_token;
            const meResponse = await me(authToken);
            if (meResponse === null || !isMeSuccess(meResponse))
                return null;
            return meResponse.application;
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

export const getApplicationAssetUrl = (applicationId: ActivityClientId, assetId: string, size: number = 160): string => {
    return `${ASSETS_URL}/${applicationId}/${assetId}.png?size=${size}`;
};
