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
        return Object.assign(new FinancialHistoryEntry(DataUtil.skip), jsonObject)
    }
}