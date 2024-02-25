export class RsWallet {

    constructor(id, name) {
        this.id = id
        this.name = name
    }

    static fromJSON(json): RsWallet {
        return Object.assign(new RsWallet(), json)
    }

}