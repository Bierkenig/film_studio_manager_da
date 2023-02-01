import store from '@/services/store'
export default class Person {
    constructor(id, avatar, first_name, last_name, birthday, deathAge, gender, nationality, ethnicity, workingSince, performance, experience, talent,popularity,
    rating, action, adventure, comedy, documentary, drama, fantasy, horror, musical, romance, scienceFiction,
    thriller, war, isActor, isDirector, isWriter) {
        //TYPE -> Integer
        this._id = id;
        //TYPE -> String
        this._avatar = avatar;
        //TYPE -> String
        this._first_name = first_name;
        //TYPE -> String
        this._last_name = last_name;
        //TYPE -> String
        this._birthday = birthday
        //TYPE -> Integer
        this._deathAge = deathAge
        //TYPE -> Integer
        this._age = 0
        //TYPE -> String
        this._gender = gender;
        //TYPE -> String
        this._nationality = nationality;
        //TYPE -> String
        this._ethnicity = ethnicity;
        //TYPE -> String
        this._workingSince = workingSince
        //TYPE -> Integer
        this._performance = performance;
        //TYPE -> Integer
        this._experience = experience;
        //TYPE -> Integer
        this._talent = talent;
        //TYPE -> Integer
        this._popularity = popularity;
        //TYPE -> Integer/Float
        this._rating = rating;
        //TYPE -> Integer
        this._action = action
        //TYPE -> Integer
        this._adventure = adventure
        //TYPE -> Integer
        this._comedy = comedy
        //TYPE -> Integer
        this._documentary = documentary
        //TYPE -> Integer
        this._drama = drama
        //TYPE -> Integer
        this._fantasy = fantasy
        //TYPE -> Integer
        this._horror = horror
        //TYPE -> Integer
        this._musical = musical
        //TYPE -> Integer
        this._romance = romance
        //TYPE -> Integer
        this._scienceFiction = scienceFiction
        //TYPE -> Integer
        this._thriller = thriller
        //TYPE -> Integer
        this._war = war
        //TYPE -> String
        this._isActor = isActor;
        //TYPE -> String
        this._isDirector = isDirector;
        //TYPE -> String
        this._isWriter = isWriter;
        //TYPE -> Integer
        this._no = 0
        //TYPE -> Integer
        this._workingOnProjects = 0
        //TYPE -> Integer
        this.audienceRating = 0
        //TYPE -> Integer
        if (isDirector) this.dirMorale = 5
        if (isActor) this.actorMorale = 5
        this.calcAge(this._birthday)
    }

    calcAge(birthday) {
        if (store !== undefined) {
            this._age = store.getters.getCurrentDate.getFullYear() - (parseInt(birthday.toString().slice(-4)))
        }
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

    getFullName() {
        return this._first_name + ' ' + this._last_name;
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

    get talent() {
        return this._talent;
    }

    get popularity() {
        return this._popularity;
    }

    get rating() {
        return this._rating;
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

    static fromJSON(jsonObject){
        return Object.assign(new Person(), jsonObject)
    }
}