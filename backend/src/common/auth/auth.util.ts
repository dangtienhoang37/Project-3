import jwt from 'jsonwebtoken'
import { logger } from '../helper/logger'
import ErrorObject from '../Error/error'
import { ApiStatusCode } from '../enum/apiStatusCode'
import { NextFunction } from 'express'
import { HEADER } from '../constant/header'
import { KeyTokenService } from '../../module/KeyTokens/keyToken.service'
import { asyncHandler } from '../helper/asyncHandler'

const createTokenPair = async (payload: any, publicKey: any, privateKey: any) => {
    try {
        console.log(privateKey);

        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2d'
        })

        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })
        return { accessToken: accessToken, refreshToken: refreshToken }
    } catch (err) {
        logger.fail('16-auth-util', err);
        throw new ErrorObject('16-auth-util', ApiStatusCode.INTERNAL_SERVER_ERROR, "")
    }
}

const verifyToken = async (payload: string, publicKey: any) => {
    try {
        const decodeToken = await jwt.verify(payload, publicKey);
        return decodeToken
    } catch (err) {
        console.log("verify");

        throw err
    }
}
const authenticaton = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const _keyTokenService = new KeyTokenService();

    //check userid missing
    const accountId = req.headers[HEADER.CLIENT_ID];
    if (!accountId) {
        throw new ErrorObject('Invalid Request clientID', ApiStatusCode.FORBIDDEN, '');
    }
    // get keyStore by userID
    const keyStore = await _keyTokenService.findbyId(accountId);
    console.log(keyStore?.publicKey);

    if (!keyStore) {
        throw new ErrorObject('not found key store auth- chua login', ApiStatusCode.NOT_FOUND, '');

    }
    // get access Token
    const _accesstoken = req.headers[HEADER.AUTHORIZATION];
    console.log(_accesstoken);
    if (!_accesstoken) {
        throw new ErrorObject('Invalid Request Token', ApiStatusCode.FORBIDDEN, '');

    }
    // verify token
    try {
        const decodeToken = await verifyToken(_accesstoken, keyStore.publicKey) // keystore o day
        if (typeof decodeToken === 'object' && decodeToken !== null && 'id' in decodeToken) {
            const _accountId = decodeToken.id; // TypeScript hiểu được đây là một thuộc tính 'id' của JwtPayload
            if (_accountId !== accountId) {
                throw new ErrorObject('invalid userId', ApiStatusCode.BAD_REQUEST, '')
            }
            req.keyStore = keyStore;
            return next();

        } else {
            throw new ErrorObject('decode is not valid', ApiStatusCode.INTERNAL_SERVER_ERROR, "")
        }
    } catch (error) {
        console.log(error);


        throw new ErrorObject("authen fail", ApiStatusCode.FORBIDDEN, `${error}`)
    }
    // check user in db
    // check keystore with userid
    //  ok => next()

})
export {
    createTokenPair,
    verifyToken,
    authenticaton
}