import {useState} from "react";

import EmployeeService from "../../../domain/EmployeeService";

export default function LoginViewModel() {

    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null)

    function getProfile() {
        EmployeeService.getProfile().then((result) => {
            if(result.isResponseCodeSuccessful()) {
                setProfile(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    return {
        error, getProfile, profile
    }
}