import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import DataUtil from "@/classes/DataUtil";

export default class PreProduction {
    constructor() {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.screenplay = null
        this.hiredDirector = null
        this.outgoings = this.getTotalBudget()
        if (this.hiredDirector instanceof Person) this.crewMorale = this.calcCrewMorale() && this.calcCastMorale()
        if (this.hiredDirector instanceof Person && this.screenplay instanceof Screenplay)
        this.hype = this.createTotal()
        this.preProductionLength = 0
        this.productionLength = 0
        this.postProductionLength = 0
        this.releaseDate = null
        this.startDate = null
        if (this.startDate instanceof Date)this.endDate = this.calcEndDate()
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
            directorSalary: 0,
            actorSalary: 0,
        }
        this.budgetPop = 12
        this.happenedEvents = []
    }

    static fromJSON(jsonObject) {
        let instance = Object.assign(new PreProduction(DataUtil.skip), jsonObject)
        instance.screenplay = Screenplay.fromJSON(jsonObject.screenplay)
        instance.director = Person.fromJSON(jsonObject.director)
        instance.releaseDate = new Date(jsonObject.releaseDate)
        instance.startDate = new Date(jsonObject.startDate)

        return instance;
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
        return (this.hiredDirector._popularity * 75 + this.screenplay.writer._popularity * 25) / 100
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
            this.budget.sfx + this.budget.problemBudget + this.budget.directorSalary + this.budget.actorSalary)
    }

    calcEndDate() {
        return this.startDate.setDate(this.startDate.getDate() + this.preProductionLength * 7);
    }
}