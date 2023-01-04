import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";
import {Studio} from "@/classes/Studio";
import PreProduction from "@/classes/PreProduction";
import Production from "@/classes/Production";
import PostProduction from "@/classes/PostProduction";

export class Movie {
    constructor(owner, contract, popularity = {children: 0, teenager: 0, adult: 0}) {
        //TYPE -> String from another Class
        this._title = this._screenplay.title
        //TYPE -> a preProduction Class Object
        this._preProduction = new PreProduction()
        //TYPE -> a production Class Object
        this._production = new Production(this._preProduction.releaseDate)
        //TYPE -> a postProduction Class Object
        this._postProduction = new PostProduction(this._preProduction.postProductionLength)
        //TYPE -> director Class Object
        this.director = this._preProduction.hiredDirector;
        //TYPE -> screenplay class Object
        this._screenplay = this._preProduction.screenplay;
        //TYPE -> Studio Class Object
        this._owner = owner;
        // null -> no rights bought, 0, -> unlimited rights (created movie)
        this._contract = contract;
        //NOT DONE YET
        this._earnings = []
        //TYPE -> Object with Integer Attr
        this.popularity = popularity
        //TYPE -> Integer
        this.quality = 100
        //TYPE -> Integer
        this.riskOfFailure = 0
        //TYPE -> Integer
        this.crewMorale = 5
        //this._date = date;
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
        //TODO Cannot create Studio from String
        instance._owner = Studio.fromJSON(jsonObject._owner)
        instance._screenplay = Screenplay.fromJSON(jsonObject._screenplay)
        instance._date = new Date(jsonObject._date)
        instance.director = Person.fromJSON(jsonObject.director)
        instance._earnings = jsonObject._earnings.map(object => Earnings.fromJSON(object))
        return instance;
    }
}