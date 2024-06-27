import { findbyId } from "../../module/apikey/apikey.service"
import { ApiStatus, ApiStatusCode } from "../enum/apiStatusCode"
import { IBaseRespone } from "../model/response"

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req: any, res: any, next: any) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        console.log(key);

        if (!key) {
            const _res: IBaseRespone = {
                status: ApiStatus.fail,
                isSuccess: false,
                statusCode: ApiStatusCode.FORBIDDEN,
                message: "FORBIDEN Error",
                data: {
                }
            }
            return res.status(403).json(_res)
        }
        const ObjKey = await findbyId(key);
        if (!ObjKey) {
            const _res: IBaseRespone = {
                status: ApiStatus.fail,
                isSuccess: false,
                statusCode: ApiStatusCode.FORBIDDEN,
                message: "FORBIDEN Error",
                data: {
                }
            }
            return res.status(403).json(_res)
        }
        req.objKey = ObjKey
        console.log(ObjKey);

        return next();
    } catch (err) {
        next(err);
    }
}
const permission = (permission: any) => {
    return (req: any, res: any, next: any) => {
        if (!req.objKey.permissions) {
            const _res: IBaseRespone = {
                status: ApiStatus.fail,
                isSuccess: false,
                statusCode: ApiStatusCode.FORBIDDEN,
                message: "PERMISSION DENINED!",
                data: {
                }
            }
            return res.status(403).json(_res)
        }
        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            const _res: IBaseRespone = {
                status: ApiStatus.fail,
                isSuccess: false,
                statusCode: ApiStatusCode.FORBIDDEN,
                message: "PERMISSION DENINED!",
                data: {
                }
            }
            return res.status(403).json(_res)
        }
        return next()
    }
}

export {
    permission,
    apiKey
}