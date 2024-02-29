import {useState} from "react";

import CustomerService from "../../../domain/CustomerService";
import RqSearchForCustomers from "../../../api/data/requests/RqSearchForCustomers";

export default function CustomersViewModel() {

    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([])

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

    return {
        error, customers, searchCustomers
    }
}