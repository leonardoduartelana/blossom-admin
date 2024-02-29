import EmployeeApi from "../api/EmployeeApi";

export default class EmployeeService {
    static getProfile() {
        return EmployeeApi.instance.getProfile()
    }
}