import { exec } from "child_process";

const DISCORD_PROCESSES_WINDOWS = [
    "discord.exe",
    "discordcanary.exe",
];
const DISCORD_PATHS_WINDOWS = [
    "\\appdata\\local\\discord\\",
    "\\appdata\\local\\discordcanary\\",
    "\\program files\\discord\\",
    "\\program files\\discordcanary\\",
];
const DISCORD_PATHS_OTHER = [
    "/applications/discord.app/",
    "/applications/discord canary.app/",
    "/usr/lib/discord/",
    "/usr/lib/discord-canary/",
];

export const isDiscordRunning = (): Promise<boolean> => {
    return process.platform === "win32"
        ? isDiscordRunningWindows()
        : isDiscordRunningOther();
};

const isDiscordRunningWindows = (): Promise<boolean> => {
    return new Promise((resolve) => {
        exec(`wmic process where "name like '%discord%'" get Caption,ExecutablePath`, (err, stdout, stderr) => {
            if (err !== null || stderr.trim() !== "")
                return resolve(false);

            const processes = stdout
                .split("\n")
                .slice(1)
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => line.split(/\s{2,}/));

            const discordProcesses = processes.filter(process => {
                const name = process[0]!.toLowerCase();
                const path = process[1]!.toLowerCase();
                return DISCORD_PROCESSES_WINDOWS.includes(name) && DISCORD_PATHS_WINDOWS.some(p => path.includes(p));
            })

            resolve(discordProcesses.length > 0);
        });
    });
};

const isDiscordRunningOther = (): Promise<boolean> => {
    return new Promise((resolve) => {
        exec("ps aux", (err, stdout, stderr) => {
            if (err !== null || stderr !== "")
                return resolve(false);

            const processes = stdout
                .split("\n")
                .slice(1)
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => line.split(/\s+/));

            const discordProcesses = processes.filter(process => {
                const command = process[process.length - 1]!.toLowerCase();
                return DISCORD_PATHS_OTHER.some(p => command.includes(p));
            });

            resolve(discordProcesses.length > 0);
        });
    });
};
