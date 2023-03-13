import DataUtil from "@/classes/DataUtil";

export default class Earnings {
    constructor(amount, date, type) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        //TYPE -> Integer
        this.amount = amount
        //TYPE -> Date Type
        this.date = date
        //TYPE -> String
        this.type = type
    }

    getAmount() {
        return this.amount
    }

    getDate() {
        return this.date
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Earnings(DataUtil.skip), jsonObject)
        instance.date = jsonObject.date == null ? null : new Date(jsonObject.date)
        return instance
    }
}