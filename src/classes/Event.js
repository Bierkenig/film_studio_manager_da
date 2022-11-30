export default class Event {
    constructor(title, start, end) {
        this.title = title
        this.start = start
        this.end = end

        //params
        this.causesForBreakdowns = ["event.fire", "event.sets", "event.weather"]
        this.causesForLocation = ["event.unavailable"]
    }

    calcCauseForBreakdowns() {
        //TODO need calc
        return this.causesForBreakdowns[Math.round(Math.random() * 3)]
    }
}