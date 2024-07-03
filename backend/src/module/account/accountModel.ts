export interface loginReq {
    username: string,
    password: string
};

export interface tokenPair {
    accessToken: string,
    refreshToken: string
}
export interface decodeUser {
    username: string,
    id: string,
    permission: string,
    status: boolean

}