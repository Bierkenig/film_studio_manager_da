import DataUtil from "@/classes/DataUtil";

export default class FinancialHistoryEntry {
    constructor(title, description, objectTitle = null, date = null) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.title = title
        this.description = description
        this.objectTitle = objectTitle
        this.date = date
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new FinancialHistoryEntry(DataUtil.skip), jsonObject)
        instance.date = jsonObject.date == null ? null : new Date(jsonObject.date)
        return instance
    }
}