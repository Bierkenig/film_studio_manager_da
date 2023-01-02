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
        const random = Math.round(Math.random() * 9)
        if (random <= 1) {
            return this.causesForBreakdowns[0]
        } else if (random > 1 && random <= 5) {
            return  this.causesForBreakdowns[1]
        } else if (random > 5 && random <= 9) {
            return this.causesForBreakdowns[2]
        }
    }

    static fromJSON(jsonObject) {
        let instance = Object.assign(new Event(), jsonObject)
        instance.start = new Date(jsonObject.start)
        instance.end = new Date(jsonObject.end)
        return instance;
    }
}