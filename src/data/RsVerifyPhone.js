export class RsVerifyPhone {

    constructor(signInToken) {
        this.signInToken = signInToken
    }

    static fromJSON(json) : RsVerifyPhone {
        return Object.assign(new RsVerifyPhone(), json)
    }

}