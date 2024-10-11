import { appInfo, type PackageInfo } from "../AppInfo";
import { gt } from "semver";

export type UpdateInfo = {
    update: boolean,
    local: string,
    remote: string,
};

export const checkForUpdate = async (): Promise<UpdateInfo> => {
    const response = await fetch(`${appInfo.url}/blob/main/package.json?raw=true`);
    const pkg = await response.json() as PackageInfo;
    const local = appInfo.version;
    const remote = pkg.version;
    return {
        update: gt(remote, local),
        local,
        remote,
    };
};
