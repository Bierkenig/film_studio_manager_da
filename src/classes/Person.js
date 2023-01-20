import store from '@/services/store'
export default class Person {
    constructor(id, avatar, first_name, last_name, birthday, gender, nationality, ethnicity, performance, experience, talent,popularity,
    rating, action, adventure, biography, comedy, crime, documentary, drama, erotic,
    family, fantasy, history, horror, musical, mystery, romance, scienceFiction, sport,
    thriller, war, western, isActor, isDirector, isWriter) {
        //TYPE -> Integer
        this._id = id;
        //TYPE -> String
        this._avatar = avatar;
        //TYPE -> String
        this._first_name = first_name;
        //TYPE -> String
        this._last_name = last_name;
        //TYPE -> Integer
        this._birthday = birthday
        //TYPE -> Integer
        this._age = 0
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
        this._biography = biography
        //TYPE -> Integer
        this._comedy = comedy
        //TYPE -> Integer
        this.crime = crime
        //TYPE -> Integer
        this.documentary = documentary
        //TYPE -> Integer
        this.drama = drama
        //TYPE -> Integer
        this.erotic = erotic
        //TYPE -> Integer
        this.family = family
        //TYPE -> Integer
        this.fantasy = fantasy
        //TYPE -> Integer
        this.history = history
        //TYPE -> Integer
        this.horror = horror
        //TYPE -> Integer
        this.musical = musical
        //TYPE -> Integer
        this.mystery = mystery
        //TYPE -> Integer
        this.romance = romance
        //TYPE -> Integer
        this.scienceFiction = scienceFiction
        //TYPE -> Integer
        this.sport = sport
        //TYPE -> Integer
        this.thriller = thriller
        //TYPE -> Integer
        this.war = war
        //TYPE -> Integer
        this.western = western
        //TYPE -> String
        this._isActor = isActor;
        //TYPE -> String
        this._isDirector = isDirector;
        //TYPE -> String
        this._isWriter = isWriter;
        //TYPE -> Integer
        this._no = 0
        //TYPE -> Integer
        if (isDirector) this.dirMorale = 5
        if (isActor) this.notAvailable = 0; this.actorMorale = 5
    }

    calcAge() {
        return (Math.abs(store.state.currentDate - new Date(this._birthday))) / (1000 * 3600 * 24)
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