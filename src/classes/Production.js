import DataUtil from "@/classes/DataUtil";

export default class Production {
    constructor(releaseDate, duration = 0) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.duration = duration
        this.startDate = null
        this.happenedEvents = []
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Production(DataUtil.skip), jsonObject)
        instance.startDate = jsonObject.startDate == null ? null : new Date(jsonObject.startDate)
        return instance
    }
}