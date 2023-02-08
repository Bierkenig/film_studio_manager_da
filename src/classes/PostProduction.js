import DataUtil from "@/classes/DataUtil";
import {Screenplay} from "@/classes/Screenplay";

export default class PostProduction {
    constructor(postProductionLength, screenplay) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.postProductionStart = null
        if (this.postProductionStart instanceof Date) this.postProductionEnd = this.calcEndDate()
        this.postProductionLength = postProductionLength
        this.marketingPrint = null
        this.marketingInternet = null
        this.marketingCommercial = null
        this.earningPotential = null
        this.distributionCosts = null
        this.releaseScope = null
        this.screenplay = screenplay
        this.releaseWeeks = null
        this.openingWeekShareStudio = null
        this.openingWeekShareCinema = null
        this.remainingWeeksShareStudio = null
        this.remainingWeeksShareCinema = null
        this.openingLevel = null
        this.remainingLevel = null
        this.happenedEvents = []
    }

    calcEndDate() {
        return this.postProductionStart.setDate(this.postProductionStart.getDate() + this.postProductionLength * 7);
    }

    calcTestScreeningRating() {
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new PostProduction(DataUtil.skip), jsonObject)
        instance.postProductionStart = new Date(jsonObject.postProductionStart)
        instance.screenplay = Screenplay.fromJSON(jsonObject.screenplay)
        return instance
    }
}