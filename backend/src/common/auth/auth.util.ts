import jwt from 'jsonwebtoken'
import { logger } from '../helper/logger'

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
    }
}
export default createTokenPair