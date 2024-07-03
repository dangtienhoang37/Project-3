import { IBaseRespone } from '../common/model/response';
import { logger } from '../common/helper/logger';
import { ApiStatus, ApiStatusCode } from './../common/enum/apiStatusCode';
export const errorHandler = async (err: any, req: any, res: any, next: any) => {
    err.statusCode = err.statusCode || ApiStatusCode.INTERNAL_SERVER_ERROR;

    const _res: IBaseRespone = {
        status: ApiStatus.fail,
        isSuccess: false,
        statusCode: err.statusCode,
        message: err.message,
        data: ''
    }
    // logger
    logger.fail("", err.message);
    res.status(err.statusCode).json(_res)

}