import DataUtil from "@/classes/DataUtil";

export default class Production {
    constructor(releaseDate, duration = 0) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.duration = duration
        this.startDate = null
        this.releaseDate = releaseDate
        this.haltedStartDate = null
        this.haltedEndDate = null
        this.haltedDuration = 0
        this.happenedEvents = []
    }

    calcHaltedEndDate() {
        if (this.haltedStartDate instanceof Date) this.haltedEndDate.setDate(this.haltedStartDate.getDate() + 7 * this.haltedDuration)
        if (this.releaseDate instanceof Date) this.releaseDate.setDate(this.releaseDate.getDate() + 7 * this.haltedDuration)
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Production(DataUtil.skip), jsonObject)
        instance.startDate = new Date(jsonObject.startDate)
        instance.endDate = new Date(jsonObject.endDate)
        instance.releaseDate = new Date(jsonObject.releaseDate)
        instance.haltedStartDate = new Date(jsonObject.haltedStartDate)
        instance.haltedEndDate = new Date(jsonObject.haltedEndDate)
        return instance
    }
}