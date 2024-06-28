export interface loginReq {
    username: string,
    password: string
};

export interface tokenPair {
    accessToken: string,
    refreshToken: string
}