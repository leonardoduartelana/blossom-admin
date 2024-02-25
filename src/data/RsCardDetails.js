export class RsCardDetails {

    constructor(id, created, name, number, expiry, cvv) {
        this.id = id
        this.created = created
        this.name = name
        this.number = number
        this.expiry = expiry
        this.cvv = cvv
    }

    static fromJSON(json): RsCardDetails {
        return Object.assign(new RsCardDetails(), json)
    }

}