import { Op } from "sequelize"
import { IBaseRespone } from "../../common/model/response"
import User from "../user/user.schema"
// import Account from "./account.schema"


export class UserService {
    constructor() {

    }
    public findByName = (data: any) => {
        return User.findOne({
            where: {
                fullName: data
            },
            raw: true
        })
    }
    public findAllByName = (data: string) => {
        const searchString = `%${data}%`
        return User.findAll({
            where: {
                fullName: {
                    [Op.like]: searchString
                },
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