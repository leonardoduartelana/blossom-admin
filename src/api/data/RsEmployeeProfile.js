export default class RsEmployeeProfile {

    constructor(id, firstName, lastName, email, phoneNumber) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.phoneNumber = phoneNumber
    }

    static fromJSON(json)  {
        return Object.assign(new RsEmployeeProfile(), json)
    }

}