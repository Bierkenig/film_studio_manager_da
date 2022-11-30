import {Movie} from "@/classes/Movie";

export class Studio {
    constructor(name, year = "2023") {
        //TYPE -> String
        this.name = name;
        //TYPE -> String
        this.year = year;
        //TYPE -> Array
        this.movies = [];
    }

    getName() {
        return this.name;
    }

    static fromJSON(jsonObject){
        let instance =  Object.assign(new Studio(), jsonObject)
        instance.movies = jsonObject.movies.map(object => Movie.fromJSON(object))
        return instance
    }

}