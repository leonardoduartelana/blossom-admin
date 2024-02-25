import BaseResponse from "../api/base/BaseResponse";
import CustomerApi from "../api/CustomerApi";
import type RsCustomer from "../data/RsCustomer";
import type RqSearchForCustomers from "../data/requests/RqSearchForCustomers";

export default class CustomerService {
    static instance = new CustomerService()

    searchForCustomers(rqSearchForCustomers: RqSearchForCustomers): Promise<BaseResponse<RsCustomer[]>> {
        return CustomerApi.instance.searchForCustomers(rqSearchForCustomers)
    }
}