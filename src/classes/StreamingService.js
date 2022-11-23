export class StreamingService {
    constructor(name, price, profit, subscribers) {
        //TYPE -> String
        this._name = name;
        //TYPE -> Integer/Float
        this._price = price;
        //TYPE -> Integer
        this._profit = profit;
        //TYPE -> Integer
        this._subscribers = subscribers;
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