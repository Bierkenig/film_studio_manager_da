import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";
import {Studio} from "@/classes/Studio";
import PreProduction from "@/classes/PreProduction";
import Production from "@/classes/Production";
import PostProduction from "@/classes/PostProduction";
import Release from "@/classes/Release"
import store from "@/services/store";
import DataUtil from "@/classes/DataUtil";

export class Movie {
    constructor(id, owner, contract, status = null, quality = 100, outgoings,
                audiencePopularity, popularity, foundationDate, totalCosts, critics, openingEarnings, allTotalEarnings, cinema, dvd, children,
                teens, adults, print, internet, commericals) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.id = id
        //TYPE -> String from another Class
        this._title = this._screenplay?.title
        //TYPE -> String
        this._status = status;
        //TYPE -> a preProduction Class Object
        this._preProduction = new PreProduction()
        //TYPE -> a production Class Object
        this._production = null
        //TYPE -> a postProduction Class Object
        this._postProduction = null
        //TYPE -> releaseMovie class object
        this._release = null
        this.audiencePop = audiencePopularity
        this.critics = critics
        this.openingEarnings = openingEarnings
        this.allTotalEarings = allTotalEarnings
        this.cinema = cinema
        this.dvd = dvd
        this.popularity = popularity !== undefined ? popularity : 0
        this.children = children
        this.teen = teens
        this.adults = adults
        this.print = print
        this.internet = internet
        this.commericals = commericals
        //TYPE -> Studio Class Object
        this._owner = owner;
        // null -> no rights bought / 0 -> unlimited rights (own created movie, bought movie)
        this._contract = contract;
        //NOT DONE YET
        this._earnings = []
        //TYPE -> Integer
        this.genrePopularity = null
        //TYPE -> Integer
        this.subgenrePopularity = null
        //TYPE -> Integer
        this.topicPopularity = null
        //TYPE -> Integer
        this.quality = quality
        //TYPE -> Integer
        this.riskOfFailure = 0
        //TYPE -> Integer
        this.crewMorale = 5
        //this._date = date;
        //TYPE -> String
        this._franchiseType = null;
        //TYPE -> Date (for films in which rights have been acquired)
        this._boughtRightDate = null;
        //TYPE -> Integer (for films in which rights have been acquired or for films from other studios which are able to buy) | totalCosts - KOSTEN fürs Kaufen
        this._totalCosts = totalCosts !== undefined ? totalCosts : 0;
        //TYPE -> Date
        this._foundationDate = foundationDate !== undefined ? foundationDate : null;
        //TYPE -> Integer | totalOutgoings - AUSGABEN während Filmherstellung (TODO POSTPRODUCTION)
        this._totalOutgoings = outgoings !== undefined ? Math.round(outgoings) : this._preProduction.outgoings
    }

    setProduction() {
        if (this._status === 'Production' || this._status === 'Finished' && this._preProduction instanceof PreProduction) {
            this._production = new Production(this._preProduction.releaseDate, this._preProduction.productionLength)
        }
    }

    setPostProduction() {
        if (this._status === 'Post Production' || this._status === 'Finished' && this._production instanceof Production) {
            this._postProduction = new PostProduction(this._preProduction.postProductionLength, this._preProduction.screenplay)
        }
    }

    setRelease() {
        if (this._status === 'Released' || this._status === 'Finished' && this._postProduction instanceof PostProduction) {
            this.genrePopularity = this.children === undefined ? this.calcGenrePopularities() : null
            this.subgenrePopularity = this.children === undefined ? this.calcSubGenrePopularities() : null
            this.topicPopularity = this.children === undefined ? this.calcTopicPopularities() : null
            this._release = new Release(this._preProduction, this.crewMorale, this.genrePopularity,
                this.subgenrePopularity, this.topicPopularity, this._owner, this._postProduction.releaseScope !== null ? this._postProduction.releaseScope : 1,
                this._postProduction.marketingPrint, this._postProduction.marketingInternet, this._postProduction.marketingCommercial,
                this.audiencePop, this.critics, this.openingEarnings, this.allTotalEarings, this.cinema,
                this.dvd, this.children, this.teen, this.adults, this.print, this.internet, this.commericals)
        }
    }

    calcGenrePopularities() {
        let result = null
        store.getters.getAllGenres.forEach((el) => {
            if(el.genreName === this._preProduction.screenplay.genre.genreName){
                result = el
            }
        })
        return result
    }

    calcSubGenrePopularities() {
        let result = null;
        if(this._preProduction.screenplay.subgenre !== null){
            store.state.allSubGenres.forEach((el) => {
                if(el.subGenreName === this._preProduction.screenplay.subgenre.subGenreName){
                    result = el;
                }
            })
        }
        return result;
    }

    calcTopicPopularities() {
        let allPops = {
            first: null,
            second: null,
            third: null
        }
        store.state.allTopics.forEach((el) => {
            if(el.topicName === this._preProduction.screenplay.topics.firstTopic.topicName){
                allPops.first = el;
            }
        })
        if(this._preProduction.screenplay.topics.secondTopic !== null){
            store.state.allTopics.forEach((el) => {
                if(el.topicName === this._preProduction.screenplay.topics.secondTopic.topicName){
                    allPops.second = el;
                }
            })
        }
        if(this._preProduction.screenplay.topics.thirdTopic !== null){
            store.state.allTopics.forEach((el) => {
                if(el.topicName === this._preProduction.screenplay.topics.thirdTopic.topicName){
                    allPops.third = el;
                }
            })
        }
        return allPops
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

    get boughtRightDate() {
        return this._boughtRightDate;
    }

    static fromJSON(jsonObject) {
        let instance = Object.assign(new Movie(DataUtil.skip), jsonObject)

        if(jsonObject._preProduction != null){
            instance._preProduction = PreProduction.fromJSON(jsonObject._preProduction)
        }

        if(jsonObject._production != null){
            instance._production = Production.fromJSON(jsonObject._production)
        }

        if(jsonObject._postProduction != null) {
            instance._postProduction =  PostProduction.fromJSON(jsonObject._postProduction)
        }

        if(instance._release != null) {
            instance._release = Release.fromJSON(jsonObject._release)
        }

        if(jsonObject._owner != null){
            instance._owner = Studio.fromJSON(jsonObject._owner)
        }

        if(jsonObject._screenplay != null){
            instance._screenplay = Screenplay.fromJSON(jsonObject._screenplay)
        }

        instance._date = jsonObject._date == null ? null : new Date(jsonObject._date)

        if(jsonObject.director != null){
            instance.director = Person.fromJSON(jsonObject.director)
        }

        if(jsonObject._earnings != null){
            instance._earnings = jsonObject._earnings.map(object => Earnings.fromJSON(object))
        }

        instance._boughtRightDate = jsonObject._boughtRightDate == null ? null : new Date(jsonObject._boughtRightDate)
        instance._foundationDate = jsonObject._foundationDate == null ? null : new Date(jsonObject._foundationDate)
        return instance;
    }
}