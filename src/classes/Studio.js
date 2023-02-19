import {Movie} from "@/classes/Movie";
import DataUtil from "@/classes/DataUtil";
import store from "@/services/store";

export class Studio {
    constructor(id, name, year, budget, popularity, marketShare = {}) {
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
        //TYPE -> Object eg {"2023": 23}
        this.marketShare = marketShare
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
        if (this.id !== store.getters.getStudio.id) {
            store.getters.getAllMovies.forEach((movie) => {
                console.log(movie.owner.id)
                if (this.id === movie.owner.id && movie._preProduction.releaseDate.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += movie.allTotalEarings
                }
            })

            store.getters.getMoviesFromOtherStudios.forEach(movie => {
                if (this.id === movie.owner.id && movie._preProduction.releaseDate.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += movie.allTotalEarings
                }
            })
        } else {
            store.getters.getEarnings.forEach(el => {
                if (el.date.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += el.amount
                }
            })
        }

        return amount
    }

    calcProfit() {
        let amount = 0
        if (this.id !== store.getters.getStudio.id) {
            store.getters.getAllMovies.forEach((movie) => {
                if (this.id === movie.owner.id && movie._preProduction.releaseDate.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += movie._totalOutgoings
                }
            })

            store.getters.getMoviesFromOtherStudios.forEach(movie => {
                if (this.id === movie.owner.id && movie._preProduction.releaseDate.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += movie._totalOutgoings
                }
            })
        } else {
            store.getters.getFinishedMovies.forEach(movie => {
                if (this.id === movie.owner.id && movie._preProduction.releaseDate.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += movie._totalOutgoings
                }
            })

            store.getters.getCreatedMovies.forEach(movie => {
                if (this.id === movie.owner.id && movie._preProduction.releaseDate.getFullYear() === store.getters.getCurrentDate.getFullYear()) {
                    amount += movie._totalOutgoings
                }
            })
        }
        return this.calcRevenue() - amount
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Studio(DataUtil.skip), jsonObject)
        instance.movies = jsonObject.movies?.map(object => Movie.fromJSON(object)) || []
        return instance
    }

}