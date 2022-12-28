import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";
import {Studio} from "@/classes/Studio";

export class Movie {
    constructor(screenplay, date, owner, contract, director, popularity = {children: 0, teenager: 0, adult: 0}) {
        this._title = screenplay?.title
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

    createCastHype() {
        let mainPop;
        let supportPop;
        let minorCameoPop;
        this.screenplay.actors.main.forEach((el) => {
            mainPop += el._popularity
        })
        this.screenplay.actors.support.forEach((el) => {
            supportPop += el._popularity
        })
        this.screenplay.actors.minor.forEach((el) => {
            minorCameoPop += el._popularity
        })
        this.screenplay.actors.cameo.forEach((el) => {
            minorCameoPop += el._popularity
        })
        return ((mainPop / this.screenplay.actors.main.length) * 50) +
            ((supportPop / this.screenplay.actors.support.length) * 35) +
            ((minorCameoPop / (this.screenplay.actors.minor.length + this.screenplay.actors.cameo.length)) * 15) / 100
    }

    createTechnicalHype() {
        return (this.director._popularity * 75 + this.screenplay.writer._popularity * 25) / 100
    }

    createBudgetHype() {
        if (this.$store.state.preProduction.budgetPop === 0) {
            return 100;
        } else if (this.$store.state.preProduction.budgetPop === 1) {
            return 50;
        } else if (this.$store.state.preProduction.budgetPop === 2) {
            return 25;
        } else if (this.$store.state.preProduction.budgetPop === 3) {
            return 5;
        }
    }

    createTotal() {
        return (this.createCastHype() * 50 + this.createTechnicalHype() * 35 + this.createBudgetHype() * 15) / 100
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