// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import BaseRequest from "./base/BaseRequest";

export default class CustomerApi {
    static instance = new CustomerApi()

    // eslint-disable-next-line class-methods-use-this
    searchForCustomers(rqSearchForCustomers)  {
            return new BaseRequest().executeRequest(
                '/api/v1/admin/customer/search',
                'POST',
                rqSearchForCustomers
            )
    }

    // eslint-disable-next-line class-methods-use-this
    getAll() {
        return new BaseRequest().executeRequest(
            '/api/v1/admin/customer',
            'GET'
        )
    }

    // eslint-disable-next-line class-methods-use-this
    getCustomer(customerId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/customer/${customerId}`,
            'GET'
        )
    }

    // eslint-disable-next-line class-methods-use-this
    getCustomerBalance(customerId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/customer/${customerId}/balance`,
            'GET'
        )
    }

    // eslint-disable-next-line class-methods-use-this
    getCustomerTransactions(customerId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/customer/${customerId}/transactions`,
            'GET'
        )
    }

    // eslint-disable-next-line class-methods-use-this
    getCustomerLatestTransaction(customerId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/customer/${customerId}/transactions-latest`,
            'GET'
        )
    }

    // eslint-disable-next-line class-methods-use-this
    executeCustomerTopUp(customerId, title, amount, note) {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/customer/${customerId}/top-up`,
            'POST',
            {
                title: title,
                amount: amount,
                employeeNote: note
            }
        )
    }

    // eslint-disable-next-line class-methods-use-this
    executeCustomerWithdraw(customerId, title, amount, note) {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/customer/${customerId}/withdraw`,
            'POST',
            {
                title: title,
                amount: amount,
                employeeNote: note
            }
        )
    }

}