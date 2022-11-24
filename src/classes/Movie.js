export class Movie {
    constructor(screenplay, date, owner, contract, director) {
        this._title = screenplay.title
        this._earnings = []
        this._screenplay = screenplay;
        this._date = date;
        this._owner = owner;
        // null -> no rights bought, 0, -> unlimited rights (created movie)
        this._contract = contract;
        this.director = director
    }


    get screenplay() {
        return this._screenplay;
    }

    set screenplay(value) {
        this._screenplay = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get owner() {
        return this._owner;
    }

    set owner(value) {
        this._owner = value;
    }

    get contract() {
        return this._contract;
    }

    set contract(value) {
        this._contract = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get earnings() {
        return this._earnings;
    }

    set earnings(value) {
        this._earnings = value;
    }
}