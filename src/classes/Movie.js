import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";
import {Studio} from "@/classes/Studio";

export class Movie {
    constructor(screenplay, date, owner, contract, director, popularity = {children: 0, teenager: 0, adult: 0}) {
        this._title = screenplay.title
        this._earnings = []
        this._screenplay = screenplay;
        this._date = date;
        this._owner = owner;
        // null -> no rights bought, 0, -> unlimited rights (created movie)
        this._contract = contract;
        this.director = director;
        //TYPE -> Object with Integer Attr
        this.popularity = popularity
        this.quality = 100
        this.riskOfFailure = 0
        this.crewMorale = 5
        if (this.director instanceof Person && this._screenplay instanceof Screenplay) this.hype = this.createTotal()
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

    static fromJSON(jsonObject){
        let instance = Object.assign(new Movie(), jsonObject)
        instance.owner = Studio.fromJSON(jsonObject.owner)
        instance.screenplay = Screenplay.fromJSON(jsonObject.screenplay)
        instance.date = new Date(jsonObject.date)
        instance.director = Person.fromJSON(jsonObject.director)
        instance.earnings = jsonObject.earnings.map(object => Earnings.fromJSON(object))

        return instance;
    }
}