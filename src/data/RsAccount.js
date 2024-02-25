export class RsAccount {

    constructor(id, created, businessId, email) {
        this.id = id
        this.created = created
        this.businessId = businessId
        this.email = email
    }

    static fromJSON(json): RsAccount {
        return Object.assign(new RsAccount(), json)
    }

}