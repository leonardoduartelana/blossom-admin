import {useState} from "react";

import CustomerService from "../../../../domain/CustomerService";

export default function CustomerProfileViewModel() {

    const [error, setError] = useState(null);
    const [customer, setCustomer] = useState(null)
    const [balance, setBalance] = useState(null)
    const [transactions, setTransactions] = useState(null)
    const [topUpResult, setTopUpResult] = useState(null)
    const [withdrawResult, setWithdrawResult] = useState(null)

    function getCustomer(customerId) {
        CustomerService.getCustomer(customerId).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setCustomer(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function getCustomerBalance(customerId) {
        CustomerService.getCustomerBalance(customerId).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setBalance(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function getCustomerTransactions(customerId) {
        CustomerService.getCustomerTransactions(customerId).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setTransactions(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function executeCustomerTopUp(customerId, title, amount, note) {
        CustomerService.executeCustomerTopUp(customerId, title, amount, note).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setTopUpResult(true)
            } else {
                setError(result.error)
            }
        })
    }

    function executeCustomerWithdraw(customerId, title, amount, note) {
        CustomerService.executeCustomerWithdraw(customerId, title, amount, note).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setWithdrawResult(true)
            } else {
                setError(result.error)
            }
        })
    }

    return {
        error,
        getCustomer,
        customer,
        getCustomerBalance,
        balance,
        getCustomerTransactions,
        transactions,
        executeCustomerTopUp,
        topUpResult,
        executeCustomerWithdraw,
        withdrawResult
    }
}