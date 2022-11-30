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

    static fromJSON(jsonObject){
        let instance = Object.assign(new Earnings(), jsonObject)
        instance.date = new Date(jsonObject.date)
        return instance
    }
}