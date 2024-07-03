import KeyToken from "./keytoken.schema"



export class KeyTokenService {
    constructor() {

    }
    public findbyId = async (data: any) => {
        return KeyToken.findOne({
            where: {
                accountId: data
            },
            raw: true
        })
    }
    public removeKeyById = async (id: any) => {
        return KeyToken.destroy({
            where: {
                accountId: id
            }
        })
    }
}