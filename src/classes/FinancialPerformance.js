export default class financialPerformance {
    constructor(date) {
        //incoming & outgoing can be an integer or null
        this._production = {incoming: 0, outgoing: 0}
        this._marketing = {incoming: 0, outgoing: 0}
        this._loan = {incoming: 0, outgoing: 0}
        this._cinema = {incoming: 0, outgoing: 0}
        this._streaming = {incoming: 0, outgoing: 0}
        this._date = date;
    }

    get month() {
        return this._date;
    }

    get year() {
        return this._year;
    }

    get production() {
        return this._production;
    }

    get marketing() {
        return this._marketing;
    }

    get loan() {
        return this._loan;
    }

    get cinema() {
        return this._cinema;
    }

    get streaming() {
        return this._streaming;
    }
}