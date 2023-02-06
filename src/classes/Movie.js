import {Screenplay} from "@/classes/Screenplay";
import Person from "@/classes/Person";
import Earnings from "@/classes/Earnings";
import {Studio} from "@/classes/Studio";
import PreProduction from "@/classes/PreProduction";
import Production from "@/classes/Production";
import PostProduction from "@/classes/PostProduction";
import Release from "@/classes/Release"
import preProductionTest from '@/classes/test/preProductionTest'
import store from "@/services/store";

export class Movie {
    constructor(owner, contract) {
        //TYPE -> String from another Class
        this._title = this._screenplay?.title
        //TYPE -> String
        this._status = null;
        //TYPE -> a preProduction Class Object
        //TODO
        this._preProduction = new preProductionTest()
        //TYPE -> a production Class Object
        //TODO
        this._production = null

        //TODO
        //TYPE -> a postProduction Class Object
        this._postProduction = null

        //TODO
        //TYPE -> releaseMovie class object
        this._release = null
        //TYPE -> director Class Object
        this.director = this._preProduction.hiredDirector;
        //TYPE -> screenplay class Object
        this._screenplay = this._preProduction.screenplay;
        //TYPE -> Studio Class Object
        this._owner = owner;
        // null -> no rights bought / 0 -> unlimited rights (own created movie, bought movie)
        this._contract = contract;
        //NOT DONE YET
        this._earnings = [new Earnings(100, new Date()), new Earnings(200, new Date())]
        //TYPE -> Integer
        this.genrePopularity = null
        //TYPE -> Integer
        this.subgenrePopularity = null
        //TYPE -> Integer
        this.topicPopularity = null
        //TYPE -> Integer
        this.quality = 100
        //TYPE -> Integer
        this.riskOfFailure = 0
        //TYPE -> Integer
        this.crewMorale = 5
        //this._date = date;
        //TYPE -> String
        this._franchiseType = null;
        //TYPE -> Date (for films in which rights have been acquired)
        this._boughtRightDate = null;
        //TYPE -> Integer (for films in which rights have been acquired or for films from other studios which are able to buy)
        this._totalCosts = 0;
        //TYPE -> Date
        this._foundationDate = null;
        //TYPE -> Integer (TODO POSTPRODUCTION)
        if (this._status === 'Release') this.totalOutgoings = this._preProduction.outgoings + this._production.outgoings
    }

    setProduction() {
        if (this._status === 'Production' && this._preProduction instanceof PreProduction || this._preProduction instanceof preProductionTest) {
            this._production = new Production(this._preProduction.releaseDate)
        }
    }

    setPostProduction() {
        if (this._status === 'Postproduction' && this._production instanceof Production) {
            this._postProduction = new PostProduction(this._preProduction.postProductionLength, this._preProduction.screenplay)
        }
    }

    setRelease() {
        if (this.status === 'Release' && this._postProduction instanceof PostProduction) {
            this.genrePopularity = this.calcGenrePopularities()
            this.subgenrePopularity = this.calcSubGenrePopularities()
            this.topicPopularity = this.calcTopicPopularities()
            console.log(this.genrePopularity)
            console.log(this.subgenrePopularity)
            console.log(this.topicPopularity)
            this._release = new Release(this._preProduction, this.crewMorale, this.genrePopularity,
                this.subgenrePopularity, this.topicPopularity, this.owner, 2,
                this._postProduction.marketingPrint, this._postProduction.marketingInternet, this._postProduction.marketingCommercial)
        }
    }

    calcGenrePopularities() {
        return store.state.allGenres.filter(el => el.genreName === this._screenplay.getGenre())
    }

    calcSubGenrePopularities() {
        return store.state.allSubGenres.filter(el => el.genreName === this._screenplay.subgenre)
    }

    calcTopicPopularities() {
        let allPops = {
            first: null,
            second: null,
            third: null
        }
        allPops.first = store.state.allTopics.filter(el => el.topicName === this._screenplay.getTopics().firstTopic)
        allPops.second= store.state.allTopics.filter(el => el.topicName === this._screenplay.getTopics().secondTopic)
        allPops.third = store.state.allTopics.filter(el => el.topicName === this._screenplay.getTopics().thirdTopic)
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
        let instance = Object.assign(new Movie(), jsonObject)
        //TODO Cannot create Studio from String
        instance._owner = Studio.fromJSON(jsonObject._owner)
        instance._screenplay = Screenplay.fromJSON(jsonObject._screenplay)
        instance._date = new Date(jsonObject._date)
        instance.director = Person.fromJSON(jsonObject.director)
        instance._earnings = jsonObject._earnings.map(object => Earnings.fromJSON(object))
        instance.boughtRightDate = new Date(jsonObject.boughtRightDate)
        instance._foundationDate = new Date(jsonObject._foundationDate)
        return instance;
    }
}