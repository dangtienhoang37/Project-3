import { createTokenPair } from "../../common/auth/auth.util";
import { permission } from "../../common/auth/checkAuth";
import { KeyTokenService } from "../KeyTokens/keyToken.service";
import { ITokenPair } from "../KeyTokens/keytoken.model";
import KeyToken from "../KeyTokens/keytoken.schema";



class KeyTokenServicecommon {
    private _keyTokenService
    constructor() {
        this._keyTokenService = new KeyTokenService()
    }
    public createKeyToken = async (payload: any, KeyPair: any): Promise<ITokenPair> => {
        try {
            // console.log("key Token", keyToken);

            // const publicKeyString = publicKey.toString();
            // const keyPair = await this._keyTokenService.findbyId(payload.accountId)
            const tokens: ITokenPair = await createTokenPair(
                {
                    username: payload.username,
                    id: payload.accountId,
                    permission: payload.permissions,
                    status: payload.status
                },
                KeyPair.publicKey, KeyPair.privateKey
            )
            return tokens


        } catch (error) {
            throw error;
        }
    }
}
export default KeyTokenServicecommon