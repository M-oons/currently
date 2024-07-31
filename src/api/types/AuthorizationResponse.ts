import type ApiError from "./ApiError";
import type Authorization from "./Authorization";

export type AuthorizationResponse = Authorization | ApiError;

export default AuthorizationResponse;
