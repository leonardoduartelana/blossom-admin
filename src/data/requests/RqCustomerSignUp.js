export default class RqCustomerSignUp {

    constructor(authToken, firstName, lastName, birthday, email, address) {
        this.authToken = authToken
        this.firstName = firstName
        this.lastName = lastName
        this.birthday = birthday
        this.email = email
        this.address = address
    }

}