import { ApiStatusCode } from "../enum/apiStatusCode";

export default class ErrorObject extends Error {

    public message: string;
    public statusCode: ApiStatusCode;
    public actionError: string;

    constructor(message: string, statusCode: ApiStatusCode, actionError: string) {
        super();
        this.message = message;
        this.actionError = actionError;
        this.statusCode = statusCode
    }
}