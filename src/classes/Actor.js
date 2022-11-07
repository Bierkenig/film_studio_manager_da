//class for printing & handling the actors
export default class Actor {
    // TODO JAKOB: genre must be an associative array e.g. genres.action = 50
    constructor(id, firstName, lastName, age, rating, genres, salary, gender,
                avatar, depth, ethnicity, experience, nationality, performance, popularity) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.rating = rating
        this.salary = salary
        this.genres = genres
        this.gender = gender
        this.depth = depth;
        this.ethnicity = ethnicity;
        this.experience = experience;
        this.nationality = nationality;
        this.performance = performance;
        this.popularity = popularity;
        this.avatar = avatar;
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

    getAge() {
        return this.age
    }

    getGender() {
        return this.gender
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


    getAvatar() {
        return this.avatar;
    }

    getDepth() {
        return this.depth;
    }

    getEthnicity() {
        return this.ethnicity;
    }

    getExperience() {
        return this.experience;
    }

    getNationality() {
        return this.nationality;
    }

    getPerformance() {
        return this.performance;
    }

    getPopularity() {
        return this.popularity;
    }

    toString() {
        return this.id + ' | ' + this.firstName + ' ' + this.lastName + ' (' + this.age + ') ' + ' | ' + this.rating + ' | ' + this.salary + '$ | ' + JSON.stringify(this.genres)
    }

    //required for serialization
    toJSON(){
        return {id: this.id}
    }


}