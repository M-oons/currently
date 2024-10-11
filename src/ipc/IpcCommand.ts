export const IpcCommand = {
    info: {
        GetAppInfo: "get-app-info",
    },
    flow: {
        GetStartupTime: "get-startup-time",
        GetActivityLastUpdateTime: "get-activity-last-update-time",
        IsDiscordRunning: "is-discord-running",
        CheckForUpdate: "check-for-update",
    },
    config: {
        GetConfig: "get-config",
        SetConfig: "set-config",
    },
    activity: {
        GetActivity: "get-activity",
        SetActivity: "set-activity",
        GetActiveState: "get-active-state",
        SetActiveState: "set-active-state",
        StartActivity: "start-activity",
        StopActivity: "stop-activity",
    },
    functions: {
        Close: "close",
        Minimize: "minimize",
        Help: "help",
    },
} as const;

export default IpcCommand;
