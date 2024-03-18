export default class RsClassModel {

    constructor(id, created, name, pictureUrl, duration, preDuration, postDuration, creditPrice, capacity, employeeId) {
        this.id = id
        this.created = created
        this.name = name
        this.pictureUrl = pictureUrl
        this.duration = duration
        this.preDuration = preDuration
        this.postDuration = postDuration
        this.creditPrice = creditPrice
        this.capacity = capacity
        this.employeeId = employeeId
    }

    static fromJSON(json)  {
        return Object.assign(new RsClassModel(), json)
    }

}