import {Studio} from "@/classes/Studio";

export class StreamingService {
    constructor(name, price, profit, subscribers, popularity, owner, foundationDate) {
        //TYPE -> String
        this._name = name;
        //TYPE -> Integer/Float
        this._price = price;
        //TYPE -> Integer
        this._profit = profit;
        //TYPE -> Integer
        this._subscribers = subscribers;
        //TYPE -> Integer
        this._popularity = popularity;
        //TYPE -> Studio
        this._owner = owner;
        //TYPE -> Date, for costs and revenues per month
        this._foundationDate = foundationDate;
        this._lastCheckedDate = foundationDate;
        this._marketShare = 0;
        this._changes = 0;
    }


    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get profit() {
        return this._profit;
    }

    get subscribers() {
        return this._subscribers;
    }

    get owner() {
        return this._owner;
    }

    get marketShare() {
        return this._marketShare;
    }

    get changes() {
        return this._changes;
    }


    set marketShare(value) {
        this._marketShare = value;
    }

    set changes(value) {
        this._changes = value;
    }

    set owner(value) {
        this._owner = value;
    }

    set name(value) {
        this._name = value;
    }

    set price(value) {
        this._price = value;
    }

    set profit(value) {
        this._profit = value;
    }

    set subscribers(value) {
        this._subscribers = value;
    }

    static fromJSON(jsonObject){
        let instance =  Object.assign(new StreamingService(), jsonObject)
        instance._owner = Studio.fromJSON(jsonObject._owner)
        instance._foundationDate = new Date(jsonObject._foundationDate)
        instance._lastCheckedDate = new Date(jsonObject._lastCheckedDate)
        return instance;
    }
}