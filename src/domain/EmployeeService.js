import EmployeeApi from "../api/EmployeeApi";

export default class EmployeeService {
    static getProfile() {
        return EmployeeApi.instance.getProfile()
    }

    static getEmployee(employeeId) {
        return EmployeeApi.instance.getEmployee(employeeId)
    }

    static getEmployeeAppointmentModels(employedId) {
        return EmployeeApi.instance.getEmployeeAppointmentModels(employedId)
    }

    static createAppointmentModel(employeeId, data) {
        return EmployeeApi.instance.createAppointmentModel(employeeId, data)
    }

    static getEmployeeClassModels(employedId) {
        return EmployeeApi.instance.getEmployeeClassModels(employedId)
    }

    static createClassModel(employeeId, data) {
        return EmployeeApi.instance.createClassModel(employeeId, data)
    }

    static getAll() {
        return EmployeeApi.instance.getAll()
    }

    static getTrainers() {
        return EmployeeApi.instance.getTrainers()
    }

    static getEmployeeCalendar(trainersId) {
        return EmployeeApi.instance.getCalendars(trainersId)
    }
}