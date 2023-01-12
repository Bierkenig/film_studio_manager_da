import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";
import {Studio} from "@/classes/Studio";
import PreProduction from "@/classes/PreProduction";
import Production from "@/classes/Production";
import PostProduction from "@/classes/PostProduction";
import Release from "@/classes/Release";

export class Movie {
    constructor(owner, contract, popularity = {children: 0, teenager: 0, adult: 0}) {
        //TYPE -> String from another Class
        this._title = this._screenplay?.title
        //TYPE -> String
        this._status = null;
        //TYPE -> a preProduction Class Object
        this._preProduction = new PreProduction()
        //TYPE -> a production Class Object
        this._production = null
        //TYPE -> a postProduction Class Object
        this._postProduction = null
        //TYPE -> releaseMovie class object
        this._release = null
        //TYPE -> director Class Object
        this.director = this._preProduction.hiredDirector;
        //TYPE -> screenplay class Object
        this._screenplay = this._preProduction.screenplay;
        //TYPE -> Studio Class Object
        this._owner = owner;
        // null -> no rights bought / 0 -> unlimited rights (created movie)
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
        //TYPE -> String
        this._franchiseType = null;
    }

    setProduction() {
        if (this._status === 'Production' && this._preProduction instanceof PreProduction) {
            this._production = new Production(this._preProduction.releaseDate)
        }
    }

    setPostProduction() {
        if (this._status === 'Postproduction' && this._production instanceof Production) {
            this._postProduction = new PostProduction(this._preProduction.postProductionLength)
        }
    }

    setRelease() {
        if (this.status === 'Release' && this._postProduction instanceof PostProduction) {
            this._release = new Release(this._preProduction.budget.costume)
        }
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

    get franchiseType() {
        return this._franchiseType;
    }

    set franchiseType(value) {
        this._franchiseType = value;
    }


    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    static fromJSON(jsonObject) {
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