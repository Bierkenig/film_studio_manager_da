import DataUtil from "@/classes/DataUtil";

export default class Loan {
    constructor(id, value, date) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.id = id
        this.value = value
        this.date = date
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Loan(DataUtil.skip), jsonObject)
        instance.date = jsonObject.date == null ? null : new Date(jsonObject.date)
        return instance
    }
}