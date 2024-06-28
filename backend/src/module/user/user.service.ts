import { IBaseRespone } from "../../common/model/response"
import User from "../user/user.schema"
// import Account from "./account.schema"


export class UserService {
    constructor() {

    }
    public findByKey = (data: any) => {
        return User.findOne({
            where: {
                username: data
            },
            raw: true
        })
    }
    public findByEmail = (data: any) => {
        return User.findOne({
            where: {
                email: data
            },
            raw: true
        })
    }
    public findById = (data: string) => {
        return User.findOne({
            where: {
                userId: data
            }
        })
    }

}