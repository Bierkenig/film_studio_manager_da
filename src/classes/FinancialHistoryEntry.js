import DataUtil from "@/classes/DataUtil";

export default class FinancialHistoryEntry {
    constructor(title, description, iconType) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.title = title
        this.description = description
        this.iconType = iconType
    }

    static fromJSON(jsonObject){
        return Object.assign(new FinancialHistoryEntry(DataUtil.skip), jsonObject)
    }
}