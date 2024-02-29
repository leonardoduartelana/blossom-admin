import CustomerApi from "../api/CustomerApi";

export default class CustomerService {
    static searchForCustomers(rqSearchForCustomers) {
        return CustomerApi.instance.searchForCustomers(rqSearchForCustomers)
    }

    static getCustomer(customerId) {
        return CustomerApi.instance.getCustomer(customerId)
    }

    static getCustomerBalance(customerId) {
        return CustomerApi.instance.getCustomerBalance(customerId)
    }

    static getCustomerTransactions(customerId) {
        return CustomerApi.instance.getCustomerTransactions(customerId)
    }

    static executeCustomerTopUp(customerId, title, amount, note) {
        return CustomerApi.instance.executeCustomerTopUp(customerId, title, amount, note)
    }

    static executeCustomerWithdraw(customerId, title, amount, note) {
        return CustomerApi.instance.executeCustomerWithdraw(customerId, title, amount, note)
    }
}