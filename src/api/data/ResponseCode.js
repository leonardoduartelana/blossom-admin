
export default class ResponseCode {

    // Server
    static Success = new ResponseCode(2000)

    static InvalidPhoneNumber = new ResponseCode(4001)

    constructor(code) {
        this.code = code
    }

    static fromCode(code) {
        const key = Object.keys(ResponseCode).find((it) => ResponseCode[it].code.toString() === code)
        return ResponseCode[key]
    }
}