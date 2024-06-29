import { NextFunction, Request, Response } from "express";
import { AccountService } from "../account/account.service";
import { UserService } from "../user/user.service";
import { IBaseRespone } from "../../common/model/response";
import { ApiStatus, ApiStatusCode } from "../../common/enum/apiStatusCode";
import ErrorObject from "../../common/Error/error";



export default class AdminController{
    private _accountService;
    private _userService;
    constructor() {
        this._accountService = new AccountService();
        this._userService = new UserService();
    }

    public getAllStaff = async (req: Request, res: Response, next: NextFunction) => {
        // lay danh sach tat ca user co permissions la staff

        const listAccStaff = await this._accountService.findAll('staff');
        

        const _res: IBaseRespone = {
            status: ApiStatus.succes,
            isSuccess: true,
            statusCode: ApiStatusCode.OK,
            message: "get all staff sucessfully!",
            data:{
                listStaff: listAccStaff
            }
        }
        return res.status(ApiStatusCode.OK).json(_res);
    }   
    public staffProfile = async (req: Request, res: Response, next: NextFunction) => {
        const staffId = req.params.id;
        const result = await this._accountService.joinById(staffId);
        if(!result) {
            throw new ErrorObject('bad Request',ApiStatusCode.FORBIDDEN,'')
        }
        const _res: IBaseRespone = {
            status: ApiStatus.succes,
            isSuccess: true,
            statusCode: ApiStatusCode.OK,
            message: "get staff profile sucessfully!",
            data:{
                staff: result
            }
        }
        return res.status(ApiStatusCode.OK).json(_res);

    }
    public findStaff = async (req: Request, res: Response, next: NextFunction) => {
        let searchTerm = req.query.name;
        if(Array.isArray(searchTerm)){
            searchTerm = searchTerm[0];
        }
        if(typeof searchTerm !== 'string'){
            throw new ErrorObject('invalid search term',ApiStatusCode.BAD_REQUEST,"")
        }
        searchTerm = searchTerm.toLowerCase();
        const user = await this._userService.findAllByName(searchTerm);
        console.log("user: ",user);
        
        if(!user) {
            throw new ErrorObject("cant find this staff!", ApiStatusCode.NOT_FOUND,"");
        }
        if(user) {
            let resultSearch : any[] = []
            // user.forEach( async element => {
            //     const userId = element.userId;
            //     const resultSearch1 = await this._accountService.joinByUserId(userId);
            //     resultSearch += resultSearch1;
            // })
            for (const element of user) {
                const userId = element.userId;
                const resultSearch1 = await this._accountService.joinByUserId(userId);
                resultSearch.push(resultSearch1);
            }
            
            
            const _res: IBaseRespone = {
                status: ApiStatus.succes,
                isSuccess: true,
                statusCode: ApiStatusCode.OK,
                message: "find staff sucessfully!",
                data: {
                    staff: resultSearch
                }
            }
            return res.status(ApiStatusCode.OK).json(_res);
        }

    }
}