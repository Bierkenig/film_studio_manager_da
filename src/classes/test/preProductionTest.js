import {Studio} from "@/classes/Studio";
import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";

export default class PreProductionTest {
    constructor() {
        this.screenplay = new Screenplay(0, 'Benni Test', 'Indie', 'Action', 'Animation', 'G', null, 'Benni is cool', 69, 250000, {firstTopic: 'Animals', secondTopic: null, thirdTopic: 'Baseball'})
        this.hiredDirector = new Person(0, null, 'Benni', 'Franklin', 23, 'male', 'Austria', 'caucasian', 23, 23, 23, 23, 23, 23, 23, '1.000', true, true, true)
        this.outgoings = 0
        if (this.hiredDirector instanceof Person) this.crewMorale = this.calcCrewMorale() && this.calcCastMorale()
        if (this.hiredDirector instanceof Person && this.screenplay instanceof Screenplay)
            this.hype = this.createTotal()
        this.preProductionLength = 12
        this.productionLength = 60
        this.postProductionLength = 20
        this.releaseDate = new Date(2025, 2, 26)
        this.startDate = new Date()
        this.budget = {
            production: 100,
            extras: 2903840,
            cinematography: 90274024,
            sound: 10000000,
            editing: 100000000,
            score: 100000,
            set: 9872924,
            stunts: 2,
            costume: 2,
            makeup: 9826498247,
            vfx: 209284098274,
            sfx: 2864874,
            problemBudget: 0,
            directorSalary: 0,
            actorSalary: 0,
        }
        this.budgetPop = 12
        this.happenedEvents = ["dropOut", "recast"]
    }

    static fromJSON(jsonObject) {
        //TODO modify
        let instance = Object.assign(new PreProductionTest(), jsonObject)
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

    calcCrewMorale() {
        let count = 5
        if (this.hiredDirector._rating <= 75 && this.hiredDirector._rating > 50) count -= 1
        else if (this.hiredDirector._rating <= 50) count -= 2

        return count
    }

    calcCastMorale() {
        if (this.hiredDirector._rating <= 50) {
            this.downgradeCastPoints(2)
        } else if (this.hiredDirector._rating > 50 && this.hiredDirector._rating <= 75) {
            this.downgradeCastPoints(1)
        } else if (this.screenplay.rating <= 50) {
            this.downgradeCastPoints(2)
        } else if (this.screenplay.rating <= 75 && this.screenplay.rating > 50) {
            this.downgradeCastPoints(1)
        } else if (this.preProductionLength < 12) {
            this.downgradeCastPoints(2)
        }
    }

    downgradeCastPoints(amount) {
        this.screenplay.actors.main.forEach((el) => {
            el.actorMorale -= amount
        })
        this.screenplay.actors.minor.forEach((el) => {
            el.actorMorale -= amount
        })
        this.screenplay.actors.support.forEach((el) => {
            el.actorMorale -= amount
        })
        this.screenplay.actors.cameo.forEach((el) => {
            el.actorMorale -= amount
        })
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
        return (this.hiredDirector._popularity * 75 + 25) / 100
    }

    createBudgetHype() {
        if (this.budgetPop === 0) {
            return 100;
        } else if (this.budgetPop === 1) {
            return 50;
        } else if (this.budgetPop === 2) {
            return 25;
        } else if (this.budgetPop === 3) {
            return 5;
        }
    }

    createTotal() {
        return (this.createCastHype() * 50 + this.createTechnicalHype() * 35 + this.createBudgetHype() * 15) / 100
    }

    getTotalBudget() {
        return (this.budget.production + this.budget.extras + this.budget.cinematography +
            this.budget.sound + this.budget.editing + this.budget.score + this.budget.set +
            this.budget.stunts + this.budget.costume + this.budget.makeup + this.budget.vfx +
            this.budget.sfx + this.budget.problemBudget)
    }
}