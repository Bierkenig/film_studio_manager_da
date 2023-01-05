import Person from "@/classes/Person";
import Franchises from "@/classes/Franchises";
import {Character} from "@/classes/Character";
import DataUtil from "@/classes/DataUtil"

export class Screenplay {
    constructor(id, title, type, genre, subgenre, ageRating, writer, description, rating, price, topics, franchise = null, bought = false) {
        //TYPE -> Integer
        this.id = id;
        //TYPE -> String
        this.title = title;
        //TYPE -> String
        this.genre = genre;
        //TYPE -> String
        this.ageRating = ageRating;
        //TYPE -> Writer
        this.writer = writer;
        //TYPE -> String
        this.description = description;
        //TYPE -> Integer
        this.rating = rating;
        //TYPE -> String
        this.ratingRange = null;
        //TYPE -> Integer
        this.price = price;
        //TYPE -> String
        this.type = type;
        //TYPE -> String
        this.subgenre = subgenre;
        //TYPE -> Object
        this.topics = topics;
        //scope = little, small, normal, large, epic
        //TYPE -> Object [Character]
        this.roles = {main: [], support: [], minor: [], cameo: []};
        //TYPE -> Object [Persons]
        this.actors = {main: [], support: [], minor: [], cameo: []};
        //TYPE -> Object
        this.acts = {act1: [], act2: [], act3: []};
        //TYPE -> Object
        this.details = {scope: '', tone: '', specialEffects: ''};
        //TYPE -> Object
        this.ageRatingDetails = {violence: '', cursing: '', loveScenes: ''};
        //TYPE -> Integer
        this.length = null;
        //TYPE -> Integer
        this.writingPhase = null;
        //TYPE -> Integer
        this.rewritingValue = 3;
        //TYPE -> Boolean
        this.rewritingStatus = false;
        //TYPE -> Franchise
        this.franchise = franchise
        //TYPE -> Boolean
        this.bought = bought;
        //TYPE -> Integer
        if (this.actors.main.length > 0 && this.actors.minor.length > 0 && this.actors.cameo > 0 && this.actors.support > 0) this.morale = this.getCastMorale()
    }

    getCastMorale() {
        let morale = 0
        let counter = 0
        Object.keys(this.actors).forEach(key => {
            this.actors[key].forEach(person => {
                morale += person.actorMorale
                counter++
            })
        })
        return morale / counter
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }

    getGenre() {
        return this.genre;
    }

    getAgeRating() {
        return this.ageRating;
    }

    getWriter() {
        return this.writer;
    }

    getDescription() {
        return this.description;
    }

    getRating() {
        return this.rating;
    }

    getPrice() {
        return this.price;
    }

    getType() {
        return this.type;
    }

    getSubgenre() {
        return this.subgenre;
    }

    getActs() {
        return this.acts;
    }

    getTopics() {
        return this.topics;
    }

    getDetails() {
        return this.details;
    }

    getAgeRatingDetails() {
        return this.ageRatingDetails;
    }

    getRoles() {
        return this.roles;
    }

    getLength() {
        return this.length;
    }

    getWritingPhase() {
        return this.writingPhase;
    }

    getRewritingStatus() {
        return this.rewritingStatus;
    }

    getRewritingValue() {
        return this.rewritingValue;
    }

    getRatingRange() {
        return this.ratingRange;
    }

    getBoughtStatus() {
        return this.bought;
    }


    setBoughtStatus(value) {
        this.bought = value;
    }

    setWriter(value) {
        this.writer = value;
    }

    setRating(value) {
        this.rating = value;
    }

    setPrice(value) {
        this.price = value;
    }

    setType(value) {
        this.type = value;
    }

    setSubgenre(value) {
        this.subgenre = value;
    }

    setAct1(value) {
        this.acts.act1 = value;
    }

    setAct2(value) {
        this.acts.act2 = value;
    }

    setAct3(value) {
        this.acts.act3 = value;
    }

    addMainCharacter(actor) {
        this.roles.main.push(actor);
    }

    addSupportCharacter(actor) {
        this.roles.support.push(actor);
    }

    addMinorCharacter(actor) {
        this.roles.minor.push(actor);
    }

    addCameoCharacter(actor) {
        this.roles.cameo.push(actor);
    }

    removeMainCharacter(actor) {
        this.roles.main = this.roles.main.filter(character => character !== actor)
    }

    removeSupportCharacter(actor) {
        this.roles.support = this.roles.support.filter(character => character !== actor)
    }

    removeMinorCharacter(actor) {
        this.roles.minor = this.roles.minor.filter(character => character !== actor)
    }

    removeCameoCharacter(actor) {
        this.roles.cameo = this.roles.cameo.filter(character => character !== actor)
    }

    setScope(value) {
        this.details.scope = value;
    }

    setTone(value) {
        this.details.tone = value;
    }

    setSpecialEffects(value) {
        this.details.specialEffects = value;
    }

    setViolence(value) {
        this.ageRatingDetails.violence = value;
    }

    setCursing(value) {
        this.ageRatingDetails.cursing = value;
    }

    setLoveScenes(value) {
        this.ageRatingDetails.loveScenes = value;
    }

    setAgeRating(value) {
        this.ageRating = value;
    }

    setLength(value) {
        this.length = value;
    }

    setWritingPhase(value) {
        this.writingPhase = value;
    }

    setRewritingStatus(value) {
        this.rewritingStatus = value;
    }

    subtractRewriting() {
        this.rewritingValue = this.rewritingValue - 1;
    }

    setRatingRange(value) {
        this.ratingRange = value;
    }

    toString() {
        return "Screenplay (name: " + this.title + ", type: " + this.type + ", genre: " + this.genre + ", subgenre: " + this.subgenre + ", age rating: " + this.ageRating +
            ",\nwriter: " + this.writer +
            ", rating: " + this.rating + "\n" +
            "price: " + this.price + ")\n\n";
    }

    static fromJSON(jsonObject) {
        let instance = Object.assign(new Screenplay(), jsonObject)
        instance.writer = Person.fromJSON(jsonObject.writer)
        instance.franchise = Franchises.fromJSON(jsonObject.franchise)
        instance.roles = DataUtil.objectMap(jsonObject.roles, characters => characters.map(character => Character.fromJSON(character)))
        instance.actors = DataUtil.objectMap(jsonObject.actors, actors => actors.map(actor => Person.fromJSON(actor)))
        return instance
    }

}