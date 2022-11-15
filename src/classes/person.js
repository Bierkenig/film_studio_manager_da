export default class person {
    constructor(id, avatar, first_name, last_name, age, gender, nationality, ethnicity, performance, experience, depth, craft, talent,
                popularity, rating, salary, isActor, isDirector, isWriter) {
        this._id = id;
        this._avatar = avatar;
        this._first_name = first_name;
        this._last_name = last_name;
        this._age = age;
        this._gender = gender;
        this._nationality = nationality;
        this._ethnicity = ethnicity;
        this._performance = performance;
        this._experience = experience;
        this._depth = depth;
        this._craft = craft;
        this._talent = talent;
        this._popularity = popularity;
        this._rating = rating;
        this._salary = salary;
        this._isActor = isActor;
        this._isDirector = isDirector;
        this._isWriter = isWriter;
    }

    get id() {
        return this._id;
    }

    get avatar() {
        return this._avatar;
    }

    get first_name() {
        return this._first_name;
    }

    get last_name() {
        return this._last_name;
    }

    get age() {
        return this._age;
    }

    get gender() {
        return this._gender;
    }

    get nationality() {
        return this._nationality;
    }

    get ethnicity() {
        return this._ethnicity;
    }

    get performance() {
        return this._performance;
    }

    get experience() {
        return this._experience;
    }

    get depth() {
        return this._depth;
    }

    get craft() {
        return this._craft;
    }

    get talent() {
        return this._talent;
    }

    get popularity() {
        return this._popularity;
    }

    get rating() {
        return this._rating;
    }

    get salary() {
        return this._salary;
    }

    get isActor() {
        return this._isActor;
    }

    get isDirector() {
        return this._isDirector;
    }

    get isWriter() {
        return this._isWriter;
    }
}