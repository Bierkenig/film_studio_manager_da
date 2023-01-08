export default class financialPerformance {
    constructor(month) {
        this.month= month
        //incoming & outgoing can be an integer or null
        this.production = {incoming: 0, outgoing: 0}
        this.marketing = {incoming: 0, outgoing: 0}
        this.loan = {incoming: 0, outgoing: 0}
        this.cinema = {incoming: 0, outgoing: 0}
        this.streaming = {incoming: 0, outgoing: 0}
    }
}