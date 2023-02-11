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
import DataUtil from "@/classes/DataUtil";

export class Movie {
    constructor(owner, contract) {
        if(arguments[0] === DataUtil.skip){
            return
        }
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
        this.director = this._preProduction?.hiredDirector;
        //TYPE -> screenplay class Object
        this._screenplay = this._preProduction?.screenplay;
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
        //TYPE -> Integer (for films in which rights have been acquired or for films from other studios which are able to buy) | totalCosts - KOSTEN fürs Kaufen
        this._totalCosts = 0;
        //TYPE -> Date
        this._foundationDate = null;
        //TYPE -> Integer | totalOutgoings - AUSGABEN während Filmherstellung (TODO POSTPRODUCTION)
        this._totalOutgoings = this._preProduction.outgoings
    }

    setProduction() {
        if (this._status === 'Production' && this._preProduction instanceof PreProduction || this._preProduction instanceof preProductionTest) {
            this._production = new Production(this._preProduction.releaseDate, this._preProduction.productionLength)
        }
    }

    setPostProduction() {
        if (this._status === 'Post Production' && this._production instanceof Production) {
            this._postProduction = new PostProduction(this._preProduction.postProductionLength, this._preProduction.screenplay)
        }
    }

    setRelease() {
        if (this._status === 'Released' && this._postProduction instanceof PostProduction) {
            this.genrePopularity = this.calcGenrePopularities()
            if(this._preProduction.screenplay.subgenre !== null){
                this.subgenrePopularity = this.calcSubGenrePopularities()
            }
            this.topicPopularity = this.calcTopicPopularities()
            console.log(this.genrePopularity)
            console.log(this.subgenrePopularity)
            console.log(this.topicPopularity)
            //TODO releaseScope
            this._release = new Release(this._preProduction, this.crewMorale, this.genrePopularity,
                this.subgenrePopularity, this.topicPopularity, this._owner, 2,
                this._postProduction.marketingPrint, this._postProduction.marketingInternet, this._postProduction.marketingCommercial)
        }
    }

    calcGenrePopularities() {
        let result = null;
        store.state.allGenres.forEach((el) => {
            console.log(el.genreName);
            console.log(this._preProduction.screenplay.genre.genreName)
            if(el.genreName === this._preProduction.screenplay.genre.genreName){
                result = el;
            }
        })
        return result
    }

    calcSubGenrePopularities() {
        let result = null;
        store.state.allSubGenres.forEach((el) => {
            if(el.genreName === this._preProduction.screenplay.subgenre.genreName){
                result = el;
            }
        })
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
        //TODO Cannot create Studio from String
        if(jsonObject._preProduction !== null)
        instance._preProduction = new PreProduction(jsonObject._preProduction)
        if(jsonObject._production !== null){
            instance._production = new Production(jsonObject._production)
        }
        if(jsonObject._postProduction !== null) {
            instance._postProduction = new PostProduction(jsonObject._postProduction)
        }

        if(instance._release !== null) {
            instance._release = new Release(jsonObject._release)
        }
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