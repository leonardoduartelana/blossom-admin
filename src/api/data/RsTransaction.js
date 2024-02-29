export default class RsTransaction {

    constructor(id, created, amount, sign, balance, title, adminNote, employeeName) {
        this.id = id
        this.created = created
        this.amount = amount
        this.sign = sign
        this.balance = balance
        this.title = title
        this.adminNote = adminNote
        this.employeeName = employeeName
    }

}