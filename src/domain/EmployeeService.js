import EmployeeApi from "../api/EmployeeApi";

export default class EmployeeService {
    static getProfile() {
        return EmployeeApi.instance.getProfile()
    }

    static getAll() {
        return EmployeeApi.instance.getAll()
    }
}