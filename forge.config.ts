import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from "@electron-forge/plugin-vite";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { PublisherGithub } from "@electron-forge/publisher-github";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { getAssetPath } from "./src/utils/assetLoader";
import "dotenv/config";

const config: ForgeConfig = {
    packagerConfig: {
        asar: true,
        icon: getAssetPath("packager", true),
    },
    rebuildConfig: {},
    makers: [
        new MakerSquirrel({
            iconUrl: "https://github.com/M-oons/currently/blob/main/public/images/image.png?raw=true",
            setupIcon: getAssetPath("app", true),
        }),
        new MakerDMG({
            background: getAssetPath("installer", true),
            icon: getAssetPath("app", true),
            format: "ULFO",
        }),
    ],
    publishers: [
        new PublisherGithub({
            repository: {
                owner: "M-oons",
                name: "currently",
            },
            prerelease: false,
            draft: false,
        }),
    ],
    plugins: [
        new VitePlugin({
            // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
            // If you are familiar with Vite configuration, it will look really familiar.
            build: [
                {
                    // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
                    entry: "src/core/main.ts",
                    config: "vite.main.config.ts",
                },
                {
                    entry: "src/core/preload.ts",
                    config: "vite.preload.config.ts",
                },
            ],
            renderer: [
                {
                    name: "main_window",
                    config: "vite.renderer.config.ts",
                },
            ],
        }),
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};

export default config;
