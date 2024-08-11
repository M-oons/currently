import { readFileSync } from "fs";
import { join } from "path";

type PackageInfo = {
    productName: string,
    version: string,
    author: {
        name: string,
    },
    repository: {
        url: string,
    },
};

export type AppInfo = {
    name: string,
    version: string,
    author: string,
    url: string,
};

const pkgData = readFileSync(join(__dirname, "../../package.json"), "utf-8");
const pkg = JSON.parse(pkgData) as PackageInfo;

export const appInfo: AppInfo = {
    name: pkg.productName,
    author: pkg.author.name,
    version: pkg.version,
    url: pkg.repository.url,
};

export default appInfo;
