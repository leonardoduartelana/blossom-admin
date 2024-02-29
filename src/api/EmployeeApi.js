// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import BaseRequest from "./base/BaseRequest";

export default class EmployeeApi {
    static instance = new EmployeeApi()

    // eslint-disable-next-line class-methods-use-this
    getProfile()  {
            return new BaseRequest().executeRequest(
                '/api/v1/admin/profile',
                'GET'
            )
    }

}