export default class Earnings {
    constructor(amount, date) {
        this.amount = amount
        this.date = date
    }

    getAmount() {
        return this.amount
    }

    getDate() {
        return this.date
    }
}