import { IBaseRespone } from "../../common/model/response"
import Account from "./account.schema"


export class AccountService {
    constructor() {

    }
    public findByKey = (data: any) => {
        return Account.findOne({
            where: {
                username: data
            },
            raw: true
        })
    }
    public findByEmail = (data: any) => {
        return Account.findOne({
            where: {
                email: data
            },
            raw: true
        })
    }

}