import DataUtil from "@/classes/DataUtil";

export default class Earnings {
    constructor(amount, date) {
        if(arguments[0] === DataUtil.skip){
            return
        }
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
        let instance = Object.assign(new Earnings(DataUtil.skip), jsonObject)
        instance.date = new Date(jsonObject.date)
        return instance
    }
}