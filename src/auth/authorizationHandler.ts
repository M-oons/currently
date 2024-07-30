import type AuthorizationMe from "./types/AuthorizationMe";
import type AuthorizationResponse from "./types/AuthorizationResponse";
import { toBase64 } from "../utils/shared";

export const OAUTH_URL = "https://discord.com/api/oauth2";

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

export const me = async (authToken: string): Promise<AuthorizationMe> => {
    const response = await fetch(`${OAUTH_URL}/@me`, {
        headers: {
            "Authorization": `Bearer ${authToken}`,
        },
    });
    return await response.json() as AuthorizationMe;
};
