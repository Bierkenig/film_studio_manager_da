export default class Person {
    constructor(id, avatar, first_name, last_name, age, gender, nationality, ethnicity, performance, experience, depth, craft, talent,
                popularity, rating, salary, isActor, isDirector, isWriter, genre) {
        //TYPE -> Integer
        this._id = id;
        //TYPE -> String
        this._avatar = avatar;
        //TYPE -> String
        this._first_name = first_name;
        //TYPE -> String
        this._last_name = last_name;
        //TYPE -> Integer
        this._age = age;
        //TYPE -> String
        this._gender = gender;
        //TYPE -> String
        this._nationality = nationality;
        //TYPE -> String
        this._ethnicity = ethnicity;
        //TYPE -> Integer
        this._performance = performance;
        //TYPE -> Integer
        this._experience = experience;
        //TYPE -> Integer
        this._depth = depth;
        //TYPE -> Integer
        this._craft = craft;
        //TYPE -> Integer
        this._talent = talent;
        //TYPE -> Integer
        this._popularity = popularity;
        //TYPE -> Integer/Float
        this._rating = rating;
        //TYPE -> String
        this._salary = salary.replaceAll('.', '');
        //TYPE -> Integer
        this._paidSalary = this._salary;
        //TYPE -> String
        this._isActor = isActor;
        //TYPE -> String
        this._isDirector = isDirector;
        //TYPE -> String
        this._isWriter = isWriter;
        //TYPE -> String
        this._genre = genre;
        //TYPE -> Integer
        this._no = 0
        //TYPE -> Integer
        if (isDirector) this.dirMorale = 5
        if (isActor) this.notAvailable = 0; this.actorMorale = 5
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

    getLastName() {
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

    get genre() {
        return this._genre;
    }

    static fromJSON(jsonObject){
        return Object.assign(new Person(), jsonObject)

    }
}