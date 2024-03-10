import {useState} from "react";

import _ from "lodash";
import EmployeeService from "../../../domain/EmployeeService";

export default function CalendarViewModel() {

    const [error, setError] = useState(null);
    const [employees, setEmployees] = useState(null)

    function getAll() {
        EmployeeService.getAll().then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setEmployees(_.sortBy(result.data, "firstName"))
            } else {
                setError(result.error)
            }
        })
    }

    return {
        error, employees, getAll
    }
}