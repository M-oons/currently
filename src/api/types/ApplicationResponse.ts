import type Application from "./Application";
import type OauthError from "./OauthError";

export type ApplicationResponse = Application | OauthError;

export default ApplicationResponse;
