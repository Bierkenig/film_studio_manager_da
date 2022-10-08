import store from "../services/store";

export class Screenplay {
    constructor(id, title, genre, ageRating, writer, description, rating, price) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.ageRating = ageRating;
        this.writer = writer;
        this.description = description;
        this.rating = rating;
        this.price = price;
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

    setWriter(value){
        this.writer = value;
    }

    setRating(value){
        this.rating = value;
    }

    setPrice(value){
        this.price = value;
    }

    toString() {
        return "Screenplay (name: " + this.title + ", genre: " + this.genre + ", age rating: " + this.ageRating +
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