import {Movie} from "@/classes/Movie";

export class Studio {
    constructor(id, name, year, budget, popularity, share) {
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
        //TYPE -> Integer
        this.marketShare = share
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



    static fromJSON(jsonObject){
        let instance = Object.assign(new Studio(), jsonObject)
        instance.movies = jsonObject.movies?.map(object => Movie.fromJSON(object)) || []
        return instance
    }

}