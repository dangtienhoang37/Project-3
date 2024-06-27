import { UUIDV4 } from "sequelize";
import ErrorObject from "../../common/Error/error";
import { ApiStatus, ApiStatusCode } from "../../common/enum/apiStatusCode";
import { logger } from "../../common/helper/logger";
import { IBaseRespone } from "../../common/model/response";
import Account from "./account.schema";
import { AccountService } from "./account.service";
import { loginReq } from "./accountModel";
import bcrypt from 'bcrypt'
import User from "../user/user.schema";
import { UserService } from "../user/user.service";
import createKeyPair from "../../common/auth/key.util";
import createTokenPair from "../../common/auth/auth.util";
import { v4 } from 'uuid'


export default class AccountController {
    private _accountService;
    private _userService;
    constructor() {
        this._accountService = new AccountService();
        this._userService = new UserService();
    }

    public login = async (req: any, res: any, next: any) => {
        const username: string = req.body.username;
        const password: string = req.body.password;

        const data: loginReq = { username, password };

        const account = await this._accountService.findByKey(data.username)
        if (!account) {
            const err: any = new ErrorObject('Wrong username or Password', ApiStatusCode.BAD_REQUEST, "22-controller-err")
            return next(err);
        }

        if (bcrypt.compareSync(password, account.password)) {
            // check password ok => check token tu client=> 
            const TokenPair = await createTokenPair({ username, }, '', account.privateKey)
            res.status(ApiStatusCode.OK).json({
                trang: "ok"
            })
            // return res

        }
        // catch err => throw



    }
    public signUp = async (req: any, res: any, next: any) => {
        // return res


        const data = req.body;
        const email = data.email;
        const existAcc = await this._userService.findByEmail(email)
        if (existAcc) {
            logger.fail('Email already used', email);
            const err: any = new ErrorObject('Email already used', ApiStatusCode.BAD_REQUEST, "")
            return next(err);
        }
        // xu li upload anh
        // tao publickey- privatekey
        const passwordHashed = await bcrypt.hash(data.password, 10);
        const _userId = v4();
        const newUser = await User.create({
            userId: _userId,
            fullName: data.fullName,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            idNumber: data.idNumber,
            email: data.email,
            address: data.address,
            dateOfBirth: data.dateOfBirth,
            portraitImage: 'test'
        })
        const keyPair = await createKeyPair();
        const _accountId = v4();

        const newAccount = await Account.create({
            accountId: _accountId,
            username: data.username,
            password: passwordHashed,
            status: 'active',
            permissions: 'user',
            userId: newUser.userId,
            // userId: await this._userService.findByEmail(email).then(user => {
            //     if (user) {
            //         return user.userId;
            //     } else {
            //         throw new ErrorObject('fail to find email- 71- acc-controller', ApiStatusCode.CONFLICT, '')
            //     }
            // })
            //     .catch(err => {
            //         throw new ErrorObject(err.toString(), ApiStatusCode.FAILED_DEPENDENCY, '')
            //     })
            refreshToken: '',
            publicKey: keyPair.privateKey,
            privateKey: keyPair.privateKey,
        })
        const _res: IBaseRespone = {
            status: ApiStatus.succes,
            isSuccess: true,
            statusCode: ApiStatusCode.CREATED,
            message: "Creted Account sucessfully!",
            data: {
                newUser: newUser,
                newAccount: newAccount
            }
        }
        return res.status(ApiStatusCode.OK).json(_res);




    }
}