export class RsBusiness {

    constructor(id, name, address) {
        this.id = id
        this.name = name
        this.address = address
    }

    static fromJSON(json): RsBusiness {
        return Object.assign(new RsBusiness(), json)
    }

}