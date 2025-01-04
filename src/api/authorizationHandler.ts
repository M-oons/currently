import type AuthCache from "./types/AuthCache";
import type Authorization from "./types/Authorization";
import type AuthorizationMe from "./types/AuthorizationMe";
import type AuthorizationMeResponse from "./types/AuthorizationMeResponse";
import type AuthorizationResponse from "./types/AuthorizationResponse";
import { loadAuth, saveAuth } from "./authorizationLoader";
import type ActivityClientSecret from "../activity/types/ActivityClientSecret";
import type ActivityClientId from "../activity/types/ActivityClientId";
import { toBase64 } from "../utils/shared";

export const OAUTH_URL = "https://discord.com/api/oauth2";
const AUTH_REFRESH_BUFFER = 300; // 5 minutes

let authCache: AuthCache = loadAuth() ?? {};
let authTask: Promise<string | null> | null = null;

export const getAuthToken = (clientId: ActivityClientId, clientSecret: ActivityClientSecret): Promise<string | null> => {
    return authTask ??= (async () => {
        try {
            const auth = authCache[clientId];
            if (auth && auth.expiresAt > Math.floor(Date.now() / 1000) + AUTH_REFRESH_BUFFER)
                return auth.token;

            delete authCache[clientId];

            const authResponse = await authorize(clientId, clientSecret);
            if (!isAuthorizeSuccess(authResponse))
                return null;

            const token = authResponse.access_token;
            authCache[clientId] = {
                token,
                expiresAt: Math.floor(Date.now() / 1000) + authResponse.expires_in,
            };
            saveAuth(authCache);

            return token;
        }
        finally {
            authTask = null;
        }
    })();
};

export const me = async (authToken: string): Promise<AuthorizationMeResponse | null> => {
    try {
        const response = await fetch(`${OAUTH_URL}/@me`, {
            headers: {
                "Authorization": `Bearer ${authToken}`,
            },
        });
        return await response.json() as AuthorizationMeResponse;
    }
    catch {
        return null;
    }
};

export const isMeSuccess = (response: AuthorizationMeResponse | null): response is AuthorizationMe => {
    return response !== null && (response as AuthorizationMe).application !== undefined;
};

const authorize = async (clientId: ActivityClientId, clientSecret: ActivityClientSecret): Promise<AuthorizationResponse | null> => {
    const params = new URLSearchParams({
        "grant_type": "client_credentials",
        "scope": "identify",
    });
    try {
        const response = await fetch(`${OAUTH_URL}/token`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${toBase64(`${clientId}:${clientSecret}`)}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });
        return await response.json() as AuthorizationResponse;
    }
    catch {
        return null;
    }
};

const isAuthorizeSuccess = (response: AuthorizationResponse | null): response is Authorization => {
    return response !== null && (response as Authorization).access_token !== undefined;
};
