import type ActivityClientId from "../../activity/types/ActivityClientId";
import type AuthInfo from "./AuthInfo";

export type AuthCache = Record<ActivityClientId, AuthInfo>;

export default AuthCache;
