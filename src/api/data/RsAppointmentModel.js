export default class RsAppointmentModel {

    constructor(id, created, name, pictureUrl, duration, preDuration, postDuration, creditPrice, employeeId) {
        this.id = id
        this.created = created
        this.name = name
        this.pictureUrl = pictureUrl
        this.duration = duration
        this.preDuration = preDuration
        this.postDuration = postDuration
        this.creditPrice = creditPrice
        this.employeeId = employeeId
    }

    static fromJSON(json)  {
        return Object.assign(new RsAppointmentModel(), json)
    }

}