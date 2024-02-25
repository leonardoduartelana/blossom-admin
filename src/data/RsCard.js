export class RsCard {

    constructor(id, created, name, panStart, panEnd, expiry) {
        this.id = id
        this.created = created
        this.name = name
        this.panStart = panStart
        this.panEnd = panEnd
        this.expiry = expiry
    }

    static fromJSON(json): RsCard {
        return Object.assign(new RsCard(), json)
    }

}