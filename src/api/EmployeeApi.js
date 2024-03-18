// eslint-disable-next-line import/no-named-as-default,import/no-named-as-default-member
import BaseRequest from "./base/BaseRequest";

export default class EmployeeApi {
    static instance = new EmployeeApi()

    // eslint-disable-next-line class-methods-use-this
    getProfile()  {
            return new BaseRequest().executeRequest(
                '/api/v1/admin/profile',
                'GET'
            )
    }

    getEmployee(employeeId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/employee/${employeeId}`,
            'GET'
        )
    }

    getEmployeeAppointmentModels(employeeId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/employee/${employeeId}/appointment-models`,
            'GET'
        )
    }

    createAppointmentModel(employeeId, data) {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/employee/${employeeId}/appointment-models`,
            'POST',
            data
        )
    }

    getEmployeeClassModels(employeeId)  {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/employee/${employeeId}/class-models`,
            'GET'
        )
    }

    createClassModel(employeeId, data) {
        return new BaseRequest().executeRequest(
            `/api/v1/admin/employee/${employeeId}/class-models`,
            'POST',
            data
        )
    }

    getAll()  {
        return new BaseRequest().executeRequest(
            '/api/v1/admin/employee',
            'GET',
            {
                includeTrainers: true,
                includeAdmins: true
            }
        )
    }

    getTrainers()  {
        return new BaseRequest().executeRequest(
            '/api/v1/admin/employee',
            'GET',
            {
                includeTrainers: true,
                includeAdmins: false
            }
        )
    }

}