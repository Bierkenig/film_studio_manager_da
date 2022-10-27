import store from "../services/store";

export class Screenplay {
    constructor(id, title, type, genre, subgenre, ageRating, writer, description, rating, price) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.ageRating = ageRating;
        this.writer = writer;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.type = type;
        this.subgenre = subgenre;
        this.roles = {main: [], support: [], minor: [], cameo: [], voiceOver: []};
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

    getPrice(){
        return this.price;
    }


    getType() {
        return this.type;
    }

    getSubgenre() {
        return this.subgenre;
    }

    setWriter(value){
        this.writer = value;
    }

    setRating(value){
        this.rating = value;
    }

    setPrice(value){
        this.price = value;
    }


    setType(value) {
        this.type = value;
    }

    setSubgenre(value) {
        this.subgenre = value;
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

    addVoiceOverCharacter(actor) {
        this.roles.voiceOver.push(actor);
    }

    getRoles() {
        return this.roles;
    }

    toString() {
        return "Screenplay (name: " + this.title + ", type: " + this.type + ", genre: " + this.genre + ", subgenre: " + this.subgenre + ", age rating: " + this.ageRating +
            ",\nwriter: " + this.writer +
            ", rating: " + this.rating + "\n" +
            "price: " + this.price + ")\n\n";
    }

    static fromJSON(jsonObject) {
        let instance = Object.assign(new Screenplay(), jsonObject)
        instance.writer = instance.writer ? store.data.allWriters.find(writer => writer.id === instance.writer.id) : null
        return instance
    }
}