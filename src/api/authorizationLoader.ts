import { app } from "electron";
import { readFileSync, writeFileSync } from "fs";
import type AuthCache from "./types/AuthCache";

const AUTH_FILE = `${app.getPath("userData")}/.auth`;

export const loadAuth = (): AuthCache | null => {
    try {
        const authContent = readFileSync(AUTH_FILE, { encoding: "utf-8" });
        const auth = JSON.parse(authContent) as AuthCache;
        return auth;
    }
    catch {
        // error reading file
        return null;
    }
};

export const saveAuth = (auth: AuthCache) => {
    try {
        const authContent = JSON.stringify(auth, null, 4);
        writeFileSync(AUTH_FILE, authContent, { encoding: "utf-8" });
    }
    catch {
        // error writing file
    }
};
