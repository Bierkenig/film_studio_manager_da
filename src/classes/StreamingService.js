export class StreamingService {
    constructor(name, price, profit, subscribers) {
        this._name = name;
        this._price = price;
        this._profit = profit;
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
}