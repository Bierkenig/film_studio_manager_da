import {Movie} from "@/classes/Movie";
import DataUtil from "@/classes/DataUtil";

export class Studio {
    constructor(id, name, year, budget, popularity) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        //TYPE -> Integer
        this.id = id;
        //TYPE -> String
        this.name = name;
        //TYPE -> String
        this.year = year;
        //TYPE -> Integer
        this.budget = budget;
        //TYPE -> Integer
        this.popularity = popularity;
        //TYPE -> Object
        this.marketShare = {"2023": 0}
        //TYPE -> Array
        this.movies = [];
    }

    getId(){
        return this.id;
    }

    getName() {
        return this.name;
    }

    getYear() {
        return this.year;
    }

    getBudget() {
        return this.budget;
    }

    getPopularity() {
        return this.popularity;
    }

    calcRevenue() {
        let amount = 0
        this.movies.forEach((movie) => {
            movie._earnings.forEach((el) => {
                amount += el.amount
            })
        })
        return amount
    }

    calcProfit() {
        let amount = 0
        this.movies.forEach((movie) => {
            amount += movie._totalOutgoings
        })
        return this.calcRevenue() - amount
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Studio(DataUtil.skip), jsonObject)
        instance.movies = jsonObject.movies?.map(object => Movie.fromJSON(object)) || []
        return instance
    }

}