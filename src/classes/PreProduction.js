import {Studio} from "@/classes/Studio";
import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";

export default class PreProduction {
    constructor() {
        this.movie = null
        this.screenplay = null
        this.hiredDirector = null
        this.outgoings = 0
        this.preProductionLength = 0
        this.productionLength = 0
        this.postProductionLength = 0
        this.releaseDate = 0
        this.startDate = new Date()
        this.budget = {
            production: 0,
                extras: 0,
                cinematography: 0,
                sound: 0,
                editing: 0,
                score: 0,
                set: 0,
                stunts: 0,
                costume: 0,
                makeup: 0,
                vfx: 0,
                sfx: 0,
                problemBudget: 0,
        }
        this.budgetPop = 12
    }

    static fromJSON(jsonObject) {
        //TODO modify
        let instance = Object.assign(new PreProduction(), jsonObject)
        instance.owner = Studio.fromJSON(jsonObject.owner)
        instance.screenplay = Screenplay.fromJSON(jsonObject.screenplay)
        instance.date = new Date(jsonObject.date)
        instance.director = Person.fromJSON(jsonObject.director)
        instance.earnings = jsonObject.earnings.map(object => Earnings.fromJSON(object))

        return instance;
    }

    getWholeBudget() {
        return this.budget.production + this.budget.extras +
            this.budget.cinematography + this.budget.sound + this.budget.editing + this.budget.score +
            this.budget.set + this.budget.stunts + this.budget.costume + this.budget.makeup + this.budget.vfx +
            this.budget.sfx
    }
}