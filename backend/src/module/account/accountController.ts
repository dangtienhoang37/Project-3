import { UUIDV4 } from "sequelize";
import ErrorObject from "../../common/Error/error";
import { ApiStatus, ApiStatusCode } from "../../common/enum/apiStatusCode";
import { logger } from "../../common/helper/logger";
import { IBaseRespone } from "../../common/model/response";
import Account from "./account.schema";
import { AccountService } from "./account.service";
import { loginReq, tokenPair } from "./accountModel";
import bcrypt from 'bcrypt'
import User from "../user/user.schema";
import { UserService } from "../user/user.service";
import createKeyPair from "../../common/auth/key.util";
import {createTokenPair, verifyAccessToken} from "../../common/auth/auth.util";
import { v4 } from 'uuid'
import { NextFunction, Request, Response } from "express";
import { HEADER } from "../../common/constant/header";


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

        const account = await this._accountService.findByKey(data.username);
        
        if (!account) {
            const err: any = new ErrorObject('Wrong username or Password', ApiStatusCode.BAD_REQUEST, "22-controller-err")
            return next(err);
        }
        if (account !== null){
            const safeAccount: Account = account;

            if (bcrypt.compareSync(password, account.password)) {
                // check password ok => check token tu client=> 
                const TokenPair = await createTokenPair(
                    {   
                        username: safeAccount.username, 
                        id: safeAccount.accountId,
                        permission : safeAccount.permissions,
                        status: safeAccount.status
                    
                    },
                    safeAccount.publicKey, safeAccount.privateKey)
    
                const _res: IBaseRespone = {
                    status: ApiStatus.succes,
                    isSuccess: true,
                    statusCode: ApiStatusCode.OK,
                    message: "Login sucessfully! ",
                    data: {
                        accessToken: TokenPair?.accessToken,
                        refreshToken: TokenPair?.refreshToken,
                        // decode: await verifyAccessToken(TokenPair.accessToken, safeAccount.publicKey)
                    }
                }

                res.status(ApiStatusCode.OK).json(_res)
                // return res
    
            } else {
                // const _res: IBaseRespone = {
                //     status: ApiStatus.fail,
                //     isSuccess: false,
                //     statusCode: ApiStatusCode.UNAUTHORIZED,
                //     message: "Wrong userName or password!",
                //     data: {}

                // }
                throw new ErrorObject('wrong username or password!',ApiStatusCode.UNAUTHORIZED, "")
            }
        }

        
        // catch err => throw



    }
    public signUp = async (req: any, res: any, next: any) => {
        // return res


        const data = req.body;
        const email = data.email;
        const existAcc = await this._userService.findByEmail(email)
        if (existAcc) {
            // logger.fail('Email already used', email);
            const err: any = new ErrorObject('Email already used', ApiStatusCode.BAD_REQUEST, email)
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
    public logout = async (req: Request, res: Response, next : NextFunction) => {
        
        //check userid missing
        const userId = req.headers[HEADER.CLIENT_ID];
        if(!userId) {
            throw new ErrorObject('Invalid Request',ApiStatusCode.FORBIDDEN,'');
        }

        // get access Token
        const _accesstoken = req.headers[HEADER.AUTHORIZATION];
        console.log(_accesstoken);
        if(!_accesstoken) {
            throw new ErrorObject('Invalid Request',ApiStatusCode.FORBIDDEN,'');

        }
        // verify token
        // check user in db
        // check keystore with userid
        //  ok => next()
        
    }
}