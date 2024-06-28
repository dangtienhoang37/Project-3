import { where } from "sequelize"
import { IBaseRespone } from "../../common/model/response"
import Account from "./account.schema"
import User from "../user/user.schema"


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
    public findById = (data: unknown) => {
        return Account.findOne ({
            where: {
                accountId: data
            }
        })
    }
    public updateById = (userId: any, passwordHashed: any) => {
        return Account.update({password: passwordHashed},{
            where: {
                accountId: userId
            }
        })
    }
    public findAll = (permissions: any) => {
        return Account.findAll({
            where: {
                permissions: permissions
            },
            include: [{
                model: User,
                required: true,
                attributes:['fullName','gender','phoneNumber','idNumber','email','address','dateOfBirth','portraitImage']
            }],
            attributes:['accountId','username','password','status','permissions','userId',]
        });
    }
    public joinById = (id: any) => {
        return Account.findOne ({
            where: {
                accountId: id
            },
            include: [{
                model: User,
                required: true,
                attributes:['fullName','gender','phoneNumber','idNumber','email','address','dateOfBirth','portraitImage']
            }],
            attributes:['accountId','username','password','status','permissions','userId',]
        })
    }
}