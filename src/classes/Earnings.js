export default class Earnings {
    constructor(amount, date) {
        //Type = Integer
        this.amount = amount
        //Type = Date Type
        this.date = date
    }

    getAmount() {
        return this.amount
    }

    getDate() {
        return this.date
    }
}