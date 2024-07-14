export const IpcCommand = {
    Close: "close",
    Minimize: "minimize",
    Help: "help",
    GetStartupTime: "get-startup-time",
    GetActivityLastUpdateTime: "get-activity-last-update-time",
    GetActivity: "get-activity",
    SetActivity: "set-activity",
    StartActivity: "start-activity",
    StopActivity: "stop-activity",
} as const;

export default IpcCommand;
