import type ApplicationAsset from "./ApplicationAsset";
import type OauthError from "./OauthError";

export type ApplicationAssetsResponse = ApplicationAsset[] | OauthError;

export default ApplicationAssetsResponse;
