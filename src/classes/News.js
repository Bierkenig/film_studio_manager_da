import Person from "@/classes/Person";
import Award from "@/classes/Award";
import {Movie} from "@/classes/Movie";
import {Studio} from "@/classes/Studio";
import DataUtil from "@/classes/DataUtil";

export default class News {
    constructor(title, description, type, date, person = null, movie = null, award = null, studio = null) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this._title = title;
        this._person = person;
        this._movie = movie;
        this._award = award;
        this._studio = studio;
        this._description = description;
        this._type = type;
        this._date = date;
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

    getStudio() {
        return this._studio;
    }

    getDescription() {
        return this._description;
    }

    getType() {
        return this._type;
    }

    getDate() {
        return this._date;
    }

    static fromJSON(jsonObject){
        let instance = Object.assign(new News(DataUtil.skip), jsonObject)
        if(jsonObject._person != null){
            instance._person = Person.fromJSON(jsonObject._person)
        }

        if(jsonObject._award != null){
            instance._award = Award.fromJSON(jsonObject._award)
        }

        if(jsonObject._movie !== null){
            instance._movie = Movie.fromJSON(jsonObject._movie)
        }

        if(jsonObject._studio != null){
            instance._studio = Studio.fromJSON(jsonObject._studio)
        }

        instance._date = jsonObject._date == null ? null : new Date(jsonObject._date)
        return instance
    }
}