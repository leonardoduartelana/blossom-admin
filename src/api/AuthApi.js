import BaseResponse from "./base/BaseResponse";
import BaseRequest from "./base/BaseRequest";
import {RsVerifyPhone} from "../data/RsVerifyPhone";
import {getUserToken} from "../presentation/login/Firebase";
import RqCustomerSignUp from "../data/requests/RqCustomerSignUp";
import RqBusinessSignUp from "../data/requests/RqBusinessSignUp";

export default class AuthApi {
    static instance = new AuthApi()

    login(): Promise<BaseResponse> {
        return new BaseRequest().executeRequest(
            '/api/v1/admin/auth/login',
            'POST'
        )
    }

}