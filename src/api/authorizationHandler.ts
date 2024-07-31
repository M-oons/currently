import type Authorization from "./types/Authorization";
import type AuthorizationMe from "./types/AuthorizationMe";
import type AuthorizationMeResponse from "./types/AuthorizationMeResponse";
import type AuthorizationResponse from "./types/AuthorizationResponse";
import { toBase64 } from "../utils/shared";

export const OAUTH_URL = "https://discord.com/api/oauth2";

export const isAuthorizeSuccess = (response: AuthorizationResponse): response is Authorization => {
    return (response as Authorization).access_token !== undefined;
};

export const isMeSuccess = (response: AuthorizationMeResponse): response is AuthorizationMe => {
    return (response as AuthorizationMe).application !== undefined;
};

export const authorize = async (clientId: string, clientSecret: string): Promise<AuthorizationResponse | null> => {
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
