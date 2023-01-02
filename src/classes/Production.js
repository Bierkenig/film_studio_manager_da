export default class Production {
    constructor(duration) {
        this.duration = duration
        this.startDate = null
        this.endDate = null
        this.haltedStartDate = null
        this.haltedDuration = 0
    }

    calcHaltedEndDate() {
        if (this.haltedStartDate instanceof Date) this.haltedStartDate.setDate(this.haltedStartDate.getDate() + 7 * this.haltedDuration)
    }
}