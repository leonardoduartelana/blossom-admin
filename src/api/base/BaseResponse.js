import RequestError from "./RequestError";
import ResponseCode from "../../data/ResponseCode";

export default class BaseResponse<T> {

    status = null
    code: ResponseCode = null
    data: T = null
    error = null

    constructor(status, code, data, error) {
        if (error !== null) {
            if(error instanceof RequestError) {
                this.error = error
            } else {
                this.error = new RequestError(500, error)
            }
        } else {
            this.status = status
            this.code = code
            if (data !== undefined && data !== null) {
                this.data = data
            }
        }
    }

    hasUnknownError() {
        return this.error
    }

    isResponseCodeSuccessful() {
        return this.code === ResponseCode.Success
    }

}