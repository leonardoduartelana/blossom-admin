export class RsBusinessRole {

    constructor(businessId, created, role) {
        this.businessId = businessId
        this.created = created
        this.role = role
    }

    static fromJSON(json): RsBusinessRole {
        return Object.assign(new RsBusinessRole(), json)
    }

}