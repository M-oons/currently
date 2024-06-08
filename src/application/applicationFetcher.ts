import type Application from "./types/Application";
import type ApplicationAsset from "./types/ApplicationAsset";
import type AuthorizationMe from "../auth/types/AuthorizationMe";
import type AuthorizationResponse from "../auth/types/AuthorizationResponse";
import { OAUTH_URL, authorize, me } from "../auth/authorizationHandler";

const ASSETS_URL = "https://cdn.discordapp.com/app-assets";

export const getApplication = async (clientId: string, clientSecret: string): Promise<Application> => {
    const authResponse: AuthorizationResponse = await authorize(clientId, clientSecret);
    const authToken = authResponse.access_token;
    const meResponse: AuthorizationMe = await me(authToken);
    return meResponse.application;
};

export const getApplicationAssets = async (applicationId: string): Promise<ApplicationAsset[]> => {
    const response = await fetch(`${OAUTH_URL}/applications/${applicationId}/assets`);
    const assets = await response.json() as ApplicationAsset[];
    return assets;
};

export const getApplicationAssetUrl = (applicationId: string, assetId: string, size: number = 160): string => {
    return `${ASSETS_URL}/${applicationId}/${assetId}.png?size=${size}`;
};
