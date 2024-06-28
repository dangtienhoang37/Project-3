import jwt from 'jsonwebtoken'
import { logger } from '../helper/logger'
import ErrorObject from '../Error/error'
import { ApiStatusCode } from '../enum/apiStatusCode'

const createTokenPair = async (payload: any, publicKey: any, privateKey: any) => {
    try {
        const accessToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '2d'
        })

        const refreshToken = await jwt.sign(payload, privateKey, {
            algorithm: 'RS256',
            expiresIn: '7d'
        })
        return { accessToken, refreshToken }
    } catch (err) {
        logger.fail('16-auth-util', err);
        throw new ErrorObject('16-auth-util',ApiStatusCode.INTERNAL_SERVER_ERROR,"")
    }
}

const verifyAccessToken = async (payload: string, publicKey: any) => {
    try {
        const accessToken = await jwt.verify(payload, publicKey);
        return accessToken
    } catch(err) {
        throw err
    }
}
export  {
    createTokenPair,
    verifyAccessToken
}