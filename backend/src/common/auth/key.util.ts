import crypto from 'crypto'
import { logger } from '../helper/logger'

const createKeyPair = async () => {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
    })
    logger.sucess('publickey:: ', publicKey)
    logger.sucess('privateKey:: ', privateKey)

    return { publicKey, privateKey }
}
export default createKeyPair