import {useState} from "react";

import CustomerService from "../../../domain/CustomerService";
import RqSearchForCustomers from "../../../api/data/requests/RqSearchForCustomers";
import _ from "lodash";

export default function CustomersViewModel() {

    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([])
    const [customerBalance, setCustomerBalance] = useState(null)
    const [customerLatestTransaction, setCustomerLatestTransaction] = useState(null)

    function searchCustomers(firstName, lastName, phone, email) {
        CustomerService.searchForCustomers(
            new RqSearchForCustomers(firstName, lastName, phone, email)
        ).then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setCustomers(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function getAll() {
        CustomerService.getAll().then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setCustomers(_.sortBy(result.data, "firstName"))
            } else {
                setError(result.error)
            }
        })
    }

    function getCustomerBalance(customerId) {
        CustomerService.getCustomerBalance(customerId).then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setCustomerBalance(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function getCustomerLatestTransaction(customerId) {
        CustomerService.getCustomerLatestTransaction(customerId).then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setCustomerLatestTransaction(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    return {
        error, customers, searchCustomers, getAll, getCustomerBalance, customerBalance, customerLatestTransaction, getCustomerLatestTransaction
    }
}