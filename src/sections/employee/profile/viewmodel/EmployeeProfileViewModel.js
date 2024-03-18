import {useState} from "react";
import EmployeeService from "../../../../domain/EmployeeService";

export default function EmployeeProfileViewModel() {

    const [error, setError] = useState(null);
    const [employee, setEmployee] = useState(null)
    const [appointmentModels, setAppointmentModels] = useState(null)
    const [classesModels, setClassesModels] = useState(null)

    function getEmployee(employeeId) {
        EmployeeService.getEmployee(employeeId).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setEmployee(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function getAppointmentModels(employeeId) {
        EmployeeService.getEmployeeAppointmentModels(employeeId).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setAppointmentModels(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function createAppointmentModel(employeeId, data) {
        EmployeeService.createAppointmentModel(employeeId, data).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                getAppointmentModels()
            } else {
                setError(result.error)
            }
        })
    }

    function getClassModels(employeeId) {
        EmployeeService.getEmployeeClassModels(employeeId).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                setClassesModels(result.data)
            } else {
                setError(result.error)
            }
        })
    }

    function createClassModel(employeeId, data){
        EmployeeService.createClassModel(employeeId, data).then((result) => {
            if (result.isResponseCodeSuccessful()) {
                getClassModels()
            } else {
                setError(result.error)
            }
        })
    }

    return {
        error,
        employee,
        getEmployee,
        getClassesModels: getClassModels,
        classesModels,
        getAppointmentModels,
        appointmentModels,
        createAppointmentModel,
        createClassModel
    }
}