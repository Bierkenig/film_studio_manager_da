import Person from "@/classes/Person";
import Award from "@/classes/Award";
import {Movie} from "@/classes/Movie";

export default class News {
    constructor(title, person = null, movie = null, award = null, type) {
        this._title = title;
        this._person = person;
        this._movie = movie;
        this._award = award;
        this._type = type;
    }


    getTitle() {
        return this._title;
    }

    getPerson() {
        return this._person;
    }

    getMovie() {
        return this._movie;
    }

    getAward() {
        return this._award;
    }


    getType() {
        return this._type;
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new News(), jsonObject)
        instance._person = Person.fromJSON(jsonObject._person)
        instance._award = Award.fromJSON(jsonObject._award)
        instance._movie = Movie.fromJSON(jsonObject._movie)
        return instance
    }
}