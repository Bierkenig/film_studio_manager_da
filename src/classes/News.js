export default class News {
    constructor(title, person = null, movie = null, award = null) {
        this._title = title;
        this._person = person;
        this._movie = movie;
        this._award = award;
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
}