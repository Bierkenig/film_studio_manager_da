import {Movie} from "@/classes/Movie";

export class Studio {
    constructor(name, year, budget, popularity) {
        //TYPE -> String
        this.name = name;
        //TYPE -> String
        this.year = year;
        //TYPE -> Integer
        this.budget = budget;
        //TYPE -> Integer
        this.popularity = popularity;
        //TYPE -> Array
        this.movies = [];
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



    static fromJSON(jsonObject){
        let instance = Object.assign(new Studio(), jsonObject)
        instance.movies = jsonObject.movies?.map(object => Movie.fromJSON(object)) || []
        return instance
    }

}