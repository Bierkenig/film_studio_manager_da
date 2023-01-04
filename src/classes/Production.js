export default class Production {
    constructor(releaseDate, duration = 0) {
        this.duration = duration
        this.startDate = null
        this.endDate = null
        this.releaseDate = releaseDate
        this.haltedStartDate = null
        this.haltedEndDate = null
        this.haltedDuration = 0
    }

    calcHaltedEndDate() {
        if (this.haltedStartDate instanceof Date) this.haltedEndDate.setDate(this.haltedStartDate.getDate() + 7 * this.haltedDuration)
        if (this.releaseDate instanceof Date) this.releaseDate.setDate(this.releaseDate.getDate() + 7 * this.haltedDuration)
    }
}