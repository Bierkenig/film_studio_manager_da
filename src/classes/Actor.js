//class for printing & handling the actors
export default class Actor {
    // TODO JAKOB: genre must be an associative array e.g. genres.action = 50
    constructor(id, firstName, lastName, age, rating, genres, salary, gender) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.rating = rating
        this.salary = salary
        this.genres = genres
        this.gender = gender
    }

    getId() {
        return this.id;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    getSalary() {
        return this.salary;
    }

    getGenres() {
        return this.genres;
    }

    getRating() {
        return this.rating;
    }

    toString() {
        return this.id + ' | ' + this.firstName + ' ' + this.lastName + ' (' + this.age + ') ' + ' | ' + this.rating + ' | ' + this.salary + '$ | ' + JSON.stringify(this.genres)
    }

    //required for serialization
    toJSON(){
        return {id: this.id}
    }


}