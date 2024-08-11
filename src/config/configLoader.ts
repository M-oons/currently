import { app } from "electron";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { type Config, defaultConfig } from "./types/Config";
import { parseConfig } from "./configParser";

const CONFIG_FILE = `${app.getPath("userData")}/config.json`;

export const loadConfig = (): Config | null => {
    try {
        if (!existsSync(CONFIG_FILE)) {
            saveConfig(defaultConfig);
            return defaultConfig;
        }
        const configContent = readFileSync(CONFIG_FILE, { encoding: "utf-8" });
        const config = parseConfig(configContent);
        return config;
    }
    catch {
        // error reading file
        return null;
    }
};

export const saveConfig = (config: Config) => {
    try {
        const configContent = JSON.stringify(config, null, 4);
        writeFileSync(CONFIG_FILE, configContent, { encoding: "utf-8" });
    }
    catch {
        // error writing file
    }
};
