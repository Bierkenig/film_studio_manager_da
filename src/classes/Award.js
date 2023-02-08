import DataUtil from "@/classes/DataUtil";

export default class Award {
    constructor(desc, type, year) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.desc = desc
        this.type = type
        this.year = year
    }

    getDesc() {
        return this.desc
    }

    getType() {
        return this.type
    }

    getYear() {
        return this.year
    }

    static fromJSON(jsonObject){
        return Object.assign(new Award(DataUtil.skip) ,jsonObject)
    }
}