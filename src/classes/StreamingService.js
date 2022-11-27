export class StreamingService {
    constructor(name, price, profit, subscribers, owner, lastCheckedDate) {
        //TYPE -> String
        this._name = name;
        //TYPE -> Integer/Float
        this._price = price;
        //TYPE -> Integer
        this._profit = profit;
        //TYPE -> Integer
        this._subscribers = subscribers;
        //TYPE -> String
        this._owner = owner;
        //TYPE -> Date, for costs and revenues per month
        this._lastCheckedDate = lastCheckedDate;
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
        return Object.assign(new StreamingService(), jsonObject)
    }
}