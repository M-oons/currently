import { type IpcRenderer, type IpcRendererEvent } from "electron";
import { type AppInfo } from "./src/AppInfo";
import type Activity from "./src/activity/types/Activity";
import type ActivityClientId from "./src/activity/types/ActivityClientId";
import type Application from "./src/api/types/Application";
import type ApplicationAsset from "./src/api/types/ApplicationAsset";
import type Config from "./src/config/types/Config";
import { type UpdateInfo } from "./src/utils/updater";

export { };

declare global {
    // This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Vite
    // plugin that tells the Electron app where to look for the Vite-bundled app code (depending on
    // whether you're running in development or production).
    const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
    const MAIN_WINDOW_VITE_NAME: string;

    namespace NodeJS {
        interface Process {
            // Used for hot reload after preload scripts.
            viteDevServers: Record<string, import("vite").ViteDevServer>,
        }
    }

    type VitePluginConfig = ConstructorParameters<typeof import("@electron-forge/plugin-vite").VitePlugin>[0];

    interface VitePluginRuntimeKeys {
        VITE_DEV_SERVER_URL: `${string}_VITE_DEV_SERVER_URL`,
        VITE_NAME: `${string}_VITE_NAME`,
    }

    // context bridge API
    interface Window {
        info: {
            getAppInfo: () => Promise<AppInfo>,
            platform: NodeJS.Platform,
        },
        flow: {
            getStartupTime: () => Promise<number>,
            getActivityLastUpdateTime: () => Promise<number>,
            isDiscordRunning: () => Promise<boolean>,
            checkForUpdate: () => Promise<boolean>,
            applyUpdate: () => void,
        },
        config: {
            getConfig: () => Promise<Config>,
            setConfig: (config: Config) => void,
        },
        activity: {
            getActivity: () => Promise<Activity>,
            setActivity: (activity: Activity) => void,
            getActiveState: () => Promise<boolean>,
            onSetActiveState: (callback: (event: IpcRendererEvent, active: boolean) => void) => IpcRenderer,
            removeSetActiveStateListeners: () => IpcRenderer,
            startActivity: () => Promise<void>,
            stopActivity: () => Promise<void>,
        },
        api: {
            getApplication: (applicationId: ActivityClientId, useCache: boolean) => Promise<Application | null>,
            getApplicationAssets: (applicationId: ActivityClientId, useCache: boolean) => Promise<ApplicationAsset[] | null>,
            getApplicationAssetUrl: (applicationId: ActivityClientId, assetId: string) => string,
        },
        functions: {
            close: () => void,
            minimize: () => void,
            help: () => void,
        },
        utils: {
            toBase64: (data: string) => string,
        },
    }
}

declare module "vite" {
    interface ConfigEnv<K extends keyof VitePluginConfig = keyof VitePluginConfig> {
        root: string,
        forgeConfig: VitePluginConfig,
        forgeConfigSelf: VitePluginConfig[K][number],
    }
}

declare module "react" {
    interface CSSProperties {
        "--scale"?: number,
    }
}
