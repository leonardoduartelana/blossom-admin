export class RsWalletBalance {

    constructor(balance) {
        this.balance = balance
    }

    static fromJSON(json): RsWalletBalance {
        return Object.assign(new RsWalletBalance(), json)
    }

}