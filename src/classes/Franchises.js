import {Studio} from "@/classes/Studio";
import {Movie} from "@/classes/Movie";

export default class Franchises {
    constructor(id, name, owner, date) {
        //TYPE -> Integer
        this.id = id
        //TYPE -> String
        this.name = name
        //TYPE -> Studio
        this.owner = owner;
        //TYPE -> Date
        this.foundationDate = date;
        //TYPE -> Array
        this.allMovies = []
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    getOwner(){
        return this.owner
    }

    getAllMovies() {
        return this.allMovies
    }

    getFoundationDate(){
        return this.foundationDate;
    }

    addAllMovies(value){
        this.allMovies.push(value)
    }

    getLastScreenplay(){
        return this.allMovies[this.allMovies.length - 1]._preProduction.screenplay;
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new Franchises(), jsonObject)
        instance._owner = Studio.fromJSON(jsonObject._owner)
        instance.foundationDate = new Date(jsonObject.foundationDate)
        instance.allMovies = jsonObject.allMovies?.map(object => Movie.fromJSON(object)) || []
        return instance;
    }
}