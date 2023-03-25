import DataUtil from "@/classes/DataUtil";

export default class FinancialPerformance {
    constructor(date, production = {incoming: 0, outgoing: 0},
                marketing = {incoming: 0, outgoing: 0},
                loan = {incoming: 0, outgoing: 0},
                cinema = {incoming: 0, outgoing: 0},
                streaming = {incoming: 0, outgoing: 0}) {
        //incoming & outgoing can be an integer or null
        if(arguments[0] === DataUtil.skip){
            return
        }
        this._production = {incoming: production.incoming, outgoing: production.outgoing}
        this._marketing = {incoming: marketing.incoming, outgoing: marketing.outgoing}
        this._loan = {incoming: loan.incoming, outgoing: loan.outgoing}
        this._cinema = {incoming: cinema.incoming, outgoing: cinema.outgoing}
        this._streaming = {incoming: streaming.incoming, outgoing: streaming.outgoing}
        this._date = date;
    }

    get month() {
        return this._date;
    }

    get year() {
        return this._date.getFullYear();
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

    static fromJSON(jsonObject){
        let instance = Object.assign(new FinancialPerformance(DataUtil.skip), jsonObject)
        instance._date = jsonObject._date == null ? null : new Date(jsonObject._date)
        return instance
    }
}