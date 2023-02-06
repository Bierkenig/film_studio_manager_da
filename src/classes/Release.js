import store from '@/services/store'

export default class Release {
    constructor(preProduction, crewMorale, genrePopularity, subgenrePopularity, topicPopularity, owner, releaseScope = 2
        , marketingPrint, marketingInternet, marketingCommericals) {
        //Important Variables
        this.preProduction = preProduction
        this.budget = preProduction.budget
        this.screenplay = preProduction.screenplay
        this.genrePopularity = genrePopularity
        this.subgenrePopularity = subgenrePopularity
        this.hype = preProduction.hype
        //Example -> {topic1: {children: 0, teenager: 1, adult: 2}, }
        this.topicPopularity = topicPopularity
        this.numberOfMovieTopics = this.calcNumberOfMovieTopics()
        this.owner = owner
        this.productionBudgetRating = this.calcBudgetRating(preProduction.budgetPop)
        this.productionPhasesRating = this.calcPhasesRating(crewMorale)
        this.totalMoviegoersPotential = 300000000
        this.childrenMoviegoersPotential = 45000000
        this.teenagersMoviegoersPotential = 90000000
        this.adultsMoviegoersPotential = 165000000
        this.ticketPricePerTicket = 10
        this.movieInterest = this.calcMovieInterest()
        this.releaseScope = releaseScope
        this.marketingPrint = marketingPrint
        this.marketingInternet = marketingInternet
        this.marketingCommericals = marketingCommericals

        //Earnings for movies
        this.openingWeekGross = 0;
        this.cinemaGross = 0;
        this.dvdGross = 0;

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
        this.directorTalent = this.calcMinMaxDir(this.director)[0] + ((this.calcMinMaxDir(this.director)[1] - this.calcMinMaxDir(this.director)[0]) / preProduction.hiredDirector.dirMorale)

        this.directorFormula = (this.directorTalent * 65 + this.objectByString(preProduction.hiredDirector._genre, this.screenplay.genre) * 35) / 100

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
        this.childrenGenrePopularity = (this.genrePopularity.childrenPopularity * 65 + this.subgenrePopularity.childrenPopularity * 35) / 100
        this.teenagersGenrePopularity = (this.genrePopularity.teenPopularity * 65 + this.subgenrePopularity.teenPopularity * 35) / 100
        this.adultsGenrePopularity = (this.genrePopularity.adultPopularity * 65 + this.subgenrePopularity.adultPopularity * 35) / 100

        //Topics
        this.childrenTopicsPopularity = (this.topicPopularity.first.childrenPopularity + this.topicPopularity.second.childrenPopularity + this.topicPopularity.third.childrenPopularity) / this.numberOfMovieTopics
        this.teenagersTopicsPopularity = (this.topicPopularity.first.teenPopularity + this.topicPopularity.second.teenPopularity + this.topicPopularity.third.teenPopularity) / this.numberOfMovieTopics
        this.adultsTopicsPopularity = (this.topicPopularity.first.adultPopularity + this.topicPopularity.second.adultPopularity + this.topicPopularity.third.adultPopularity) / this.numberOfMovieTopics

        //Studio Popularity
        this.studioPopularityFormula = this.owner.popularity

        //Cast
        this.mainCastPopularity = this.getSingleCastPopularity('main')
        this.supportCastPopularity = this.getSingleCastPopularity('support')
        this.minorCameoCastPopularity = this.getSingleCastPopularity('minor')

        this.castPopularityFormula = (this.mainCastPopularity * 50 + this.supportCastPopularity * 25 + this.minorCameoCastPopularity * 15) / 100

        //Director
        this.directorPopularityFormula = preProduction.hiredDirector.popularity

        //Writer
        this.writerPopularityFormula = this.screenplay.writer._popularity

        //FINAL FORMULA
        this.popularityFormula = (this.studioPopularityFormula * 15 + this.castPopularityFormula * 50 + this.directorPopularityFormula * 20 + this.writerPopularityFormula * 15) / 100

        this.childrenMoviePopularity = (this.childrenTopicsPopularity * 20 + this.childrenGenrePopularity * 30 + this.qualityFormula * 20 + this.popularityFormula * 40) / 100
        this.teenagersMoviePopularity = (this.teenagersTopicsPopularity * 25 + this.teenagersGenrePopularity * 25 + this.qualityFormula * 25 + this.popularityFormula * 35) / 100
        this.adultsMoviePopularity = (this.adultsTopicsPopularity * 30 + this.adultsGenrePopularity * 20 + this.qualityFormula * 30 + this.popularityFormula * 30) / 100

        //Hype
        //Marketing
        let print = this.calcMarketing(this.marketingPrint)
        let internet = this.calcMarketing(this.marketingInternet)
        let commercial = this.calcMarketing(this.marketingCommericals)

        let effectChildren;
        let effectTeenagers;
        let effectAdults;
        if (this.screenplay.ageRating === 'G / +3') {
            effectChildren = 1;
            effectTeenagers = 0.5;
            effectAdults = 0.5
        } else if (this.screenplay.ageRating === 'PG / +7') {
            effectChildren = 1;
            effectTeenagers = 0.75;
            effectAdults = 0.75
        } else if (this.screenplay.ageRating === 'PG-13 / +13') {
            effectChildren = 0.5;
            effectTeenagers = 1;
            effectAdults = 1
        } else if (this.screenplay.ageRating === 'R / +16') {
            effectChildren = 0.25;
            effectTeenagers = 1;
            effectAdults = 1
        } else if (this.screenplay.ageRating === 'NC-17 / +18') {
            effectChildren = 0.05;
            effectTeenagers = 0.75;
            effectAdults = 1
        }

        this.childrenMarketingEffect = (print * 25 + internet * 60 + commercial * 15) / 100
        this.childrenMoviePopularityAfterMarketingFormula = (this.childrenMoviePopularity + this.childrenMarketingEffect) * effectChildren

        this.teenagersMarketingEffect = (print * 25 + internet * 60 + commercial * 15) / 100
        this.teenagersMoviePopularityAfterMarketingFormula = (this.teenagersMoviePopularity + this.teenagersMarketingEffect) * effectTeenagers

        this.adultsMarketingEffect = (print * 25 + internet * 60 + commercial * 15) / 100
        this.adultsMoviePopularityAfterMarketingFormula = (this.adultsMoviePopularity + this.adultsMarketingEffect) * effectAdults

        this.hypeFromMarketing = this.calcFromMarketing()

        this.hypeFormula = this.hype * this.hypeFromMarketing

        //FINAL FORMULA
        this.childrenMoviePopularityFormula = (this.topicPopularity * 20 + this.genrePopularity * 30 + this.qualityFormula * 20 + this.popularityFormula * 30) / 100

        this.teenagersMoviePopularityFormula = (this.topicPopularity * 25 + this.genrePopularity * 25 + this.qualityFormula * 25 + this.popularityFormula * 25) / 100

        this.adultsMoviePopularityFormula = (this.topicPopularity * 30 + this.genrePopularity * 20 + this.qualityFormula * 30 + this.popularityFormula * 20) / 100
        //Ratings
        //Critics Rating
        this.criticsFormula = (this.qualityFormula * 80 + this.popularityFormula * 20) / 100

        //Audience
        this.audienceFormula = (this.qualityFormula * 20 + this.popularityFormula * 80) / 100
        this.setAudienceRating()

        //Earnings
        //Weekly drops
        //Function below

        //FINAL FORMULA
        this.openingEarnings = (this.childrenMoviegoersPotential * (this.childrenMoviePopularityAfterMarketingFormula / 100) +
                this.teenagersMoviegoersPotential * (this.teenagersMoviePopularityAfterMarketingFormula / 100) +
                this.adultsMoviegoersPotential * (this.adultsMoviePopularityAfterMarketingFormula / 100)) *
            (this.movieInterest / 100 / this.releaseScope) * (preProduction.hype / 100) * this.ticketPricePerTicket

        this.continuingEarnings = this.openingEarnings * this.hypeFormula

        this.totalEarnings = this.openingEarnings + this.continuingEarnings

    }

    calcNumberOfMovieTopics() {
        let amount;
        if (this.topicPopularity.first !== null) amount++;
        else if (this.topicPopularity.second !== null) amount++;
        else if (this.topicPopularity.third !== null) amount++;
        return amount
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

    setAudienceRating() {
        store.getters.getCurrentMovie._preProduction.screenplay.actors.main.forEach((el) => {
            el.audienceRating = this.audienceFormula
        })
        store.getters.getCurrentMovie._preProduction.screenplay.actors.minor.forEach((el) => {
            el.audienceRating = this.audienceFormula
        })
        store.getters.getCurrentMovie._preProduction.screenplay.actors.support.forEach((el) => {
            el.audienceRating = this.audienceFormula
        })
        store.getters.getCurrentMovie._preProduction.screenplay.actors.cameo.forEach((el) => {
            el.audienceRating = this.audienceFormula
        })
        store.getters.getCurrentMovie._preProduction.hiredDirector.audienceRating = this.audienceFormula
        store.getters.getCurrentMovie._preProduction.screenplay.writer = this.audienceFormula
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

    calcMarketing(type) {
        if (this.screenplay.type === "Feature" || this.screenplay.type === "Animation") {
            switch (this.screenplay.details.scope) {
                case "Small":
                    if (this.isBetween(type, 5000000, 10000000) || type > 10000000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 1000000, 5000000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    break
                case "Normal":
                    if (this.isBetween(type, 10000000, 20000000) || type > 20000000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 5000000, 10000000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    if (this.isBetween(type, 1000000, 5000000)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                    break
                case "Large":
                    if (this.isBetween(type, 20000000, 40000000) || type > 40000000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 10000000, 20000000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    if (this.isBetween(type, 5000000, 10000000)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                    break
                case "Epic":
                    if (this.isBetween(type, 40000000, 75000000) || type > 75000000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 20000000, 40000000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    if (this.isBetween(type, 10000000, 20000000)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                    break
                default:
                    return Math.round(Math.random() * (25 - 15)) + 15
            }
        } else if (this.screenplay.type === "Indie") {
            switch (this.screenplay.details.scope) {
                case "Small":
                    if (this.isBetween(type, 1000000, 2500000) || type > 2500000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 100000, 1000000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    break
                case "Normal":
                    if (this.isBetween(type, 2500000, 5000000) || type > 5000000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 1000000, 2500000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    if (this.isBetween(type, 100000, 1000000)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                    break
                case "Large":
                    if (this.isBetween(type, 5000000, 7500000) || type > 7500000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 2500000, 5000000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    if (this.isBetween(type, 1000000, 2500000)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                    break
                case "Epic":
                    if (this.isBetween(type, 7500000, 10000000) || type > 10000000) return Math.round(Math.random() * (25 - 15)) + 15
                    if (this.isBetween(type, 5000000, 7500000)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                    if (this.isBetween(type, 2500000, 5000000)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                    break
                default:
                    return Math.round(Math.random() * (25 - 15)) + 15
            }
        }
    }

    isBetween(value, min, max) {
        return value <= max && value >= min;
    }

    calcFromMarketing() {
        const duration = this.preProduction.postProductionLength
        switch (this.screenplay.details.scope) {
            case 'Small':
                if (this.isBetween(duration, 8, 12) || duration > 12) return Math.round(Math.random() * (25 - 15)) + 15
                if (this.isBetween(duration, 4, 8)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                break
            case 'Normal':
                if (this.isBetween(duration, 12, 16) || duration > 16) return Math.round(Math.random() * (25 - 15)) + 15
                if (this.isBetween(duration, 8, 12)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                if (this.isBetween(duration, 4, 8)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                break
            case 'Large':
                if (this.isBetween(duration, 16, 20) || duration > 20) return Math.round(Math.random() * (25 - 15)) + 15
                if (this.isBetween(duration, 12, 16)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                if (this.isBetween(duration, 8, 12)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                break
            case 'Epic':
                if (this.isBetween(duration, 20, 24) || duration > 24) return Math.round(Math.random() * (25 - 15)) + 15
                if (this.isBetween(duration, 16, 20)) return Math.round(Math.random() * (5 - (-5))) + (-5)
                if (this.isBetween(duration, 12, 16)) return Math.round(Math.random() * ((-15) - (-25))) + (-25)
                break
            default:
                return Math.round(Math.random() * (25 - 15)) + 15
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

    calcMovieInterest() {
        switch (this.screenplay.details.scope) {
            case 'Little':
                return 10
            case 'Small':
                return 15
            case 'Normal':
                return 25
            case 'Large':
                return 35
            case 'Epic':
                return 50
        }
    }

    getWeeklyHypeDrop(blockbuster) {
        let criticsFormulaDrop = this.calcCriticsOrAudience(this.criticsFormula)
        let audienceFormulaDrop = this.calcCriticsOrAudience(this.audienceFormula)
        let movieScopeDrop = this.calcMovieScopeDrop(this.screenplay.details.scope)
        let randomDrop = Math.round(Math.random() * (90 - 35 + 1) + 35)

        if (blockbuster) {
            let weeklyHypeDrop = (criticsFormulaDrop * 30 + audienceFormulaDrop * 25 + movieScopeDrop * 15 + randomDrop * 30) / 100
            return weeklyHypeDrop * 0.9
        } else {
            return (criticsFormulaDrop * 30 + audienceFormulaDrop * 25 + movieScopeDrop * 15 + randomDrop * 30) / 100
        }
    }

    calcCriticsOrAudience(value) {
        if (value > 90) {
            return 0.35
        } else if (value <= 90 && value > 75) {
            return 0.5
        } else if (value <= 75 && value > 60) {
            return 0.6
        } else if (value <= 60 && value > 45) {
            return 0.8
        } else if (value <= 45 && value > 30) {
            return 0.9
        }
    }

    calcMovieScopeDrop(scope) {
        if (scope === 'Little') {
            return 45
        } else if (scope === 'Small') {
            return 50
        } else if (scope === 'Normal') {
            return 55
        } else if (scope === 'Large') {
            return 60
        } else if (scope === 'Epic') {
            return 65
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
}