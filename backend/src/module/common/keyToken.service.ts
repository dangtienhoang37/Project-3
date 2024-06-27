

class KeyTokenService {
    constructor() {

    }
    public createKeyToken = async ({ userId, publicKey }: { userId: any, publicKey: any }) => {
        try {
            const publicKeyString = publicKey.toString();
            // const tokens = await 
        } catch (error) {
            return error;
        }
    }
}