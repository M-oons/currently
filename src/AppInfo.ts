import fs from "fs";
import path from "path";

type PackageInfo = {
    productName: string,
    version: string,
    author: {
        name: string,
    },
    repository: {
        url: string,
    }
};

const pkgData = fs.readFileSync(path.join(__dirname, "../../package.json"), "utf-8");
const pkg = JSON.parse(pkgData) as PackageInfo;

export default {
    name: pkg.productName,
    author: pkg.author,
    version: pkg.version,
    url: pkg.repository.url
};
