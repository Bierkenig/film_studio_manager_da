import DataUtil from "@/classes/DataUtil";

export default class ProductionTest {
    constructor(releaseDate, duration = 0) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.duration = duration
        this.startDate = null
        if (this.startDate instanceof Date)this.endDate = this.calcEndDate()
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

    calcEndDate() {
        return this.startDate.setDate(this.startDate.getDate() + this.duration * 7);
    }
}