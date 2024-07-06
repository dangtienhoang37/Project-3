import { UUIDV4 } from "sequelize";
import ErrorObject from "../../common/Error/error";
import { ApiStatus, ApiStatusCode } from "../../common/enum/apiStatusCode";
import { logger } from "../../common/helper/logger";
import { IBaseRespone } from "../../common/model/response";
import Account from "./account.schema";
import { AccountService } from "./account.service";
import { decodeUser, loginReq, tokenPair } from "./accountModel";
import bcrypt from 'bcrypt'
import User from "../user/user.schema";
import { UserService } from "../user/user.service";
import createKeyPair from "../../common/auth/key.util";
import { createTokenPair, verifyToken } from "../../common/auth/auth.util";
import { v4 } from 'uuid'
import { NextFunction, Request, Response } from "express";
import { HEADER } from "../../common/constant/header";
import jwt from "jsonwebtoken"
import { KeyTokenService } from "../KeyTokens/keyToken.service";
import KeyToken from "../KeyTokens/keytoken.schema";
import KeyTokenServicecommon from "../common/keyTokencommon.service";
import { ITokenPair } from "../KeyTokens/keytoken.model";
import { sequelize } from "../../config/db";

export default class AccountController {
    private _accountService;
    private _userService;
    private _keyTokenService;
    private _keyTokenServiceCommon
    constructor() {
        this._accountService = new AccountService();
        this._userService = new UserService();
        this._keyTokenService = new KeyTokenService();
        this._keyTokenServiceCommon = new KeyTokenServicecommon();
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
        if (account !== null) {
            if (account.status == 'inactive') throw new ErrorObject("Account has been locked!", ApiStatusCode.FORBIDDEN, "")
            const safeAccount: Account = account;

            if (bcrypt.compareSync(password, account.password)) {
                // check password ok => check token tu client=> 

                // const TokenPair = await createTokenPair(
                //     {
                //         username: safeAccount.username,
                //         id: safeAccount.accountId,
                //         permission: safeAccount.permissions,
                //         status: safeAccount.status

                //     },
                //     safeAccount.publicKey, safeAccount.privateKey)
                // tao key pair
                const keyPair = await createKeyPair();
                // tao ban ghi trong keytoken
                const keyToken = await KeyToken.findOrCreate({
                    where: { accountId: account.accountId }, // Điều kiện tìm kiếm
                    defaults: {
                        refreshToken: '',
                        publicKey: keyPair.publicKey,
                        privateKey: keyPair.privateKey
                    }, raw: true
                });
                const PPKeyPair = {
                    publicKey: keyToken[0].publicKey,
                    privateKey: keyToken[0].privateKey
                }
                const TokenPair: ITokenPair = await this._keyTokenServiceCommon.createKeyToken(safeAccount, PPKeyPair)

                const _res: IBaseRespone = {
                    status: ApiStatus.succes,
                    isSuccess: true,
                    statusCode: ApiStatusCode.OK,
                    message: "Login sucessfully! ",
                    data: {
                        accessToken: TokenPair.accessToken,
                        refreshToken: TokenPair.refreshToken
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
                throw new ErrorObject('wrong username or password!', ApiStatusCode.UNAUTHORIZED, "")
            }
        }


        // catch err => throw



    }
    public signUp = async (req: any, res: any, next: any) => {
        // return res
        const t = await sequelize.transaction();


        const data = req.body;
        const email = data.email;
        const username = data.username;
        const existAcc = await this._userService.findByEmail(email)
        const existUsername = await this._accountService.findByKey(username);
        if (existAcc || existUsername) {
            // logger.fail('Email already used', email);
            const err: any = new ErrorObject('Account already used', ApiStatusCode.BAD_REQUEST, email)
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
            portraitImage: 'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1719567139~exp=1719570739~hmac=e1b8e6507a800e2bac91ce4fc3214392d3a04204dbbd0abb72b2d26fe2b47126&w=740'
        }, {
            transaction: t
        })
        if (!newUser) {
            await t.rollback()
        }
        const keyPair = await createKeyPair();
        const _accountId = v4();

        const newAccount = await Account.create({
            accountId: _accountId,
            username: data.username,
            password: passwordHashed,
            status: 'active',
            permissions: 'user',
            userId: newUser.userId,


        },
            {
                transaction: t
            })
        const keyToken = await KeyToken.create({
            accountId: _accountId,
            refeshToken: '',
            publicKey: keyPair.publicKey,
            privateKey: keyPair.privateKey
        }, {
            transaction: t
        })
        if (!keyToken) {
            await t.rollback();
        }

        await t.commit();
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
    public logout = async (req: any, res: Response, next: NextFunction) => {
        console.log(req.keyStore.accountId);

        const delKey = await this._keyTokenService.removeKeyById(req.keyStore.accountId)
        return res.status(ApiStatusCode.OK).json({ message: "logout sucessfully!" })
    }
    public getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers[HEADER.CLIENT_ID];
        if (!userId) {
            throw new ErrorObject('Invalid Request', ApiStatusCode.FORBIDDEN, '');
        }
        const _account = await this._accountService.findById(userId);
        if (!_account) {
            throw new ErrorObject('invalid Requeset', ApiStatusCode.BAD_REQUEST, '');
        }

        // console.log(_account);
        if (_account) {
            const _user = await this._userService.findById(_account?.userId)
            const _res: IBaseRespone = {
                status: ApiStatus.succes,
                isSuccess: true,
                statusCode: ApiStatusCode.OK,
                message: "get profile sucessfully!",
                data: {
                    user: _user
                }
            }
            res.status(ApiStatusCode.OK).json(_res);
        }


    }
    public updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers[HEADER.CLIENT_ID];
        // const img = req

        if (!userId) {
            throw new ErrorObject('Invalid Request', ApiStatusCode.FORBIDDEN, '');
        }
        const _account = await this._accountService.findById(userId);

        if (!_account) {
            throw new ErrorObject('invalid Requeset', ApiStatusCode.BAD_REQUEST, '');
        }
        if (_account) {
            const _user = await this._userService.findById(_account?.userId)
            // const img = 
            // img = img from req
            // query update
            const _res: IBaseRespone = {
                status: ApiStatus.succes,
                isSuccess: true,
                statusCode: ApiStatusCode.OK,
                message: "update avatar sucessfully!",
                data: {

                }
            }
            res.status(ApiStatusCode.OK).json(_res);
        }
    }
    public updatePassword = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.headers[HEADER.CLIENT_ID];
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        if (!oldPassword || !newPassword) {
            throw new ErrorObject('enter old/new password', ApiStatusCode.BAD_REQUEST, "");
        }

        if (!userId) {
            throw new ErrorObject('Invalid Request', ApiStatusCode.FORBIDDEN, '');
        }
        const _user = await this._accountService.findById(userId);
        console.log(_user?.password);

        if (!_user) {
            throw new ErrorObject('BAD REQUEST', ApiStatusCode.BAD_REQUEST, '');

        }

        const isTruePassword = await bcrypt.compareSync(oldPassword, _user.password);
        console.log("test pass", isTruePassword);

        if (isTruePassword == false) {
            throw new ErrorObject("wrong password", ApiStatusCode.BAD_REQUEST, "");
        }
        if (isTruePassword == true) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            await this._accountService.updateById(userId, hashedPassword)
                .then(() => {

                    const _res: IBaseRespone = {
                        status: ApiStatus.succes,
                        isSuccess: true,
                        statusCode: ApiStatusCode.CREATED,
                        message: "update Password Sucessfully!",
                        data: {}
                    }
                    return res.status(ApiStatusCode.CREATED).json(_res);
                })

        }

    }
}