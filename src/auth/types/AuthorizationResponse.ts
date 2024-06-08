export type AuthorizationResponse = {
    token_type: string,
    access_token: string,
    expires_in: number,
    scope: string,
};

export default AuthorizationResponse;
