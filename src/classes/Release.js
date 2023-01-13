export default class Release {
    constructor(preProduction, crewMorale, genrePopularity, subgenrePopularity, topicPopularity, owner) {
        this.budget = preProduction.budget
        this.screenplay = preProduction.screenplay
        this.genrePopularity = genrePopularity
        this.subgenrePopularity = subgenrePopularity
        //Example -> {topic1: {children: 0, teenager: 1, adult: 2}, }
        this.topicPopularity = topicPopularity
        this.owner = owner
        this.productionBudgetRating = this.calcBudgetRating(preProduction.budgetPop)
        this.productionPhasesRating = this.calcPhasesRating(crewMorale)

        //Equations
        //QUALITY
            //Production Budget
            this.productionBudget = (this.budget.production * 15 + this.budget.extras * 5 + this.budget.cinematography * 7 +
                this.budget.sound * 7 + this.budget.editing * 10 + this.budget.score * 7 + this.budget.set * 10 + this.budget.stunts * 5 +
                this.budget.costume * 7 + this.budget.makeup * 5 + this.budget.sfx * 7 + this.budget.vfx * 15) / 100

            //Production Phases
            this.productionPhases = (preProduction.preProductionLength * 15 + preProduction.productionLength * 45 +
                preProduction.postProductionLength * 25 + crewMorale * 15) / 100

            //Director
            this.director = preProduction.hiredDirector
            this.directorTalent = this.calcMinMaxDir(this.director)[0] + ( ( this.calcMinMaxDir(this.director)[1] - this.calcMinMaxDir(this.director)[0] ) / preProduction.hiredDirector.dirMorale )

            this.directorFormula = ( this.directorTalent * 65 + this.objectByString(preProduction.hiredDirector._genre, this.screenplay.genre) * 35 ) / 100

            //Cast
            //IndividualCastMember function below
            this.mainCast = this.getSingleCastMember('main')
            this.supportCast = this.getSingleCastMember('support')
            this.minorCameoCast = this.getSingleCastMember('minor')

            this.castFormula = (this.mainCast * 50 + this.supportCast * 25 + this.minorCameoCast * 15) / 100

            //Screenplay
            this.screenplayFormula = this.screenplay.rating

            //FINAL FORMULA
            this.qualityFormula = (this.productionBudget * 20 + this.productionPhases * 10 + this.directorFormula * 20 + this.castFormula * 20 + this.screenplayFormula * 30) / 100

        //Popularity
            //Genre
            this.childrenGenrePopularity = (this.genrePopularity.children * 65 + this.subgenrePopularity.children * 35) / 100
            this.teenagersGenrePopularity = (this.genrePopularity.teenager * 65 + this.subgenrePopularity.teenager * 35) / 100
            this.adultsGenrePopularity = (this.genrePopularity.adult * 65 + this.subgenrePopularity.adult * 35) / 100

            //Topics
            this.childrenTopicsPopularity = this.calcChildrenTopicPopularity()
            this.teenagersTopicsPopularity = this.calcTeenagerTopicPopularity()
            this.adultsTopicsPopularity = this.calcAdultTopicPopularity()

            //Studio Popularity
            this.studioPopularityFormula = this.owner.popularity

            //Cast
            this.mainCastPopularity = this.getSingleCastPopularity('main')
            this.supportCastPopularity = this.getSingleCastPopularity('support')
            this.minorCameoCastPopularity = this.getSingleCastPopularity('minor')

            this.castPopularityFormula = (this.mainCastPopularity * 50 + this.supportCastPopularity * 25 + this.minorCameoCastPopularity * 15) / 100

            //Director
            this.directorPopularityFormula = preProduction.hiredDirector

            //Writer
            this.writerPopularityFormula = this.screenplay.writer._popularity

            //FINAL FORMULA
            this.popularityFormula = (this.studioPopularityFormula * 15 + this.castPopularityFormula * 50 + this.directorPopularityFormula * 20 + this.writerPopularityFormula * 15) / 100

            this.childrenMoviePopularity = (this.childrenTopicsPopularity * 20 + this.childrenGenrePopularity * 30 + this.qualityFormula * 20 + this.popularityFormula * 40) / 100
            this.teenagersMoviePopularity = (this.teenagersTopicsPopularity * 25 + this.teenagersGenrePopularity * 25 + this.qualityFormula * 25 + this.popularityFormula * 35) / 100
            this.adultsMoviePopularity = (this.adultsTopicsPopularity * 30 + this.adultsGenrePopularity * 20 + this.qualityFormula * 30 + this.popularityFormula * 30) / 100

        //Hype
    }

    calcBudgetRating(budgetPop) {
        if (budgetPop === 0) {
            return 100
        } else if (budgetPop === 1) {
            return 60
        } else if (budgetPop === 2) {
            return 20
        } else {
            return 0
        }
    }

    calcPhasesRating(crewMorale) {
        if (crewMorale === 5) {
            return 100
        } else if (crewMorale === 4) {
            return 80
        } else if (crewMorale === 3) {
            return 60
        } else if (crewMorale === 2) {
            return 40
        } else if (crewMorale === 1) {
            return 20
        } else {
            return 0
        }
    }

    /**
     *
     * @param castMember -> needs to be Person class object
     * @returns {number}
     */
    getIndividualCastMember(castMember) {
        return (castMember._talent * 65 + this.objectByString(castMember._genre, this.screenplay.genre) * 35) / 100
    }

    /**
     *
     * @param castMember -> needs to be Person class Object
     * @returns {*}
     */
    getIndividualCastMemberTalent(castMember) {
        let min = 0
        let max = 0
        if (castMember._experience <= 50) {
            min = -15
            max = 5
        } else if (castMember._experience >= 51 && castMember._experience <= 75) {
            min = -10
            max = 5
        } else if (castMember._experience >= 76 && castMember._experience <= 100) {
            min = -5
            max = 5
        }
        return min + ((max - min) / castMember.actorMorale)
    }

    getSingleCastMember(type) {
        let count = 0
        switch (type) {
            case 'main':
                this.screenplay.actors.main.forEach((el) => {
                    count += el._talent
                })
                return count / this.screenplay.actors.main.length
            case 'minor':
                this.screenplay.actors.minor.forEach((el) => {
                    count += el._talent
                })
                this.screenplay.actors.cameo.forEach((el) => {
                    count += el._talent
                })
                return count / (this.screenplay.actors.minor.length + this.screenplay.actors.cameo.length)
            case 'support':
                this.screenplay.actors.support.forEach((el) => {
                    count += el._talent
                })
                return count / this.screenplay.actors.support.length
        }
    }

    calcMinMaxDir(director) {
        let min = 0
        let max = 0
        if (director._experience <= 50) {
            min = -15
            max = 5
        } else if (director._experience >= 51 && director._experience <= 75) {
            min = -10
            max = 5
        } else if (director._experience >= 76 && director._experience <= 100) {
            min = -5
            max = 5
        }
        return [min, max]
    }

    calcChildrenTopicPopularity() {
        let length = 0
        let value = 0
        if (this.topicPopularity.firstTopic instanceof Object) {
            value += this.topicPopularity.firstTopic.children
            length += 1
        } else if (this.topicPopularity.secondTopic instanceof Object) {
            value += this.topicPopularity.secondTopic.children
            length += 1
        } else if (this.topicPopularity.thirdTopic instanceof Object) {
            value += this.topicPopularity.thirdTopic.children
            length += 1
        }
        return value / length
    }

    calcTeenagerTopicPopularity() {
        let length = 0
        let value = 0
        if (this.topicPopularity.firstTopic instanceof Object) {
            value += this.topicPopularity.firstTopic.teenager
            length += 1
        } else if (this.topicPopularity.secondTopic instanceof Object) {
            value += this.topicPopularity.secondTopic.teenager
            length += 1
        } else if (this.topicPopularity.thirdTopic instanceof Object) {
            value += this.topicPopularity.thirdTopic.teenager
            length += 1
        }
        return value / length
    }

    calcAdultTopicPopularity() {
        let length = 0
        let value = 0
        if (this.topicPopularity.firstTopic instanceof Object) {
            value += this.topicPopularity.firstTopic.adult
            length += 1
        } else if (this.topicPopularity.secondTopic instanceof Object) {
            value += this.topicPopularity.secondTopic.adult
            length += 1
        } else if (this.topicPopularity.thirdTopic instanceof Object) {
            value += this.topicPopularity.thirdTopic.adult
            length += 1
        }
        return value / length
    }

    getSingleCastPopularity(type) {
        let count = 0
        switch (type) {
            case 'main':
                this.screenplay.actors.main.forEach((el) => {
                    count += el._popularity
                })
                return count / this.screenplay.actors.main.length
            case 'minor':
                this.screenplay.actors.minor.forEach((el) => {
                    count += el._popularity
                })
                this.screenplay.actors.cameo.forEach((el) => {
                    count += el._popularity
                })
                return count / (this.screenplay.actors.minor.length + this.screenplay.actors.cameo.length)
            case 'support':
                this.screenplay.actors.support.forEach((el) => {
                    count += el._popularity
                })
                return count / this.screenplay.actors.support.length
        }
    }

    objectByString(o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        s = s.replace(/^\./, '');           // strip a leading dot
        let a = s.split('.');
        for (let i = 0, n = a.length; i < n; ++i) {
            let k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }

    //FOR TESTING
    printAllValues() {

    }
}