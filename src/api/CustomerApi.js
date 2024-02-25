import RqSearchForCustomers from "../data/requests/RqSearchForCustomers";
import BaseResponse from "./base/BaseResponse";
import BaseRequest from "./base/BaseRequest";
import type RsCustomer from "../data/RsCustomer";

export default class CustomerApi {
    static instance = new CustomerApi()

    searchForCustomers(rqSearchForCustomers: RqSearchForCustomers) : Promise<BaseResponse<RsCustomer[]>> {
            return new BaseRequest().executeRequest(
                '/api/v1/admin/customer/search',
                'POST',
                rqSearchForCustomers
            )
    }

}