export class Director {
    // TODO JAKOB: genre must be an associative array e.g. genres.action = 50
    constructor(id, firstName, lastName, age, rating, genres, salary, gender,
                avatar, craft, ethnicity, experience, nationality, performance, popularity) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.rating = rating
        this.genres = genres
        this.salary = salary
        this.gender = gender
        this.craft = craft;
        this.ethnicity = ethnicity;
        this.experience = experience;
        this.nationality = nationality;
        this.performance = performance;
        this.popularity = popularity;
        this.avatar = avatar;
        this.no = 0
    }

    getId() {
        return this.id;
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

    getFullName() {
        return this.firstName + ' ' + this.lastName;
    }

    getAge() {
        return this.age
    }

    getGender() {
        return this.gender
    }

    getAvatar() {
        return this.avatar;
    }

    getCraft() {
        return this.craft;
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

    toString(){
        return 'Director: ' + this.id + ', ' + this.firstName + ' ' + this.lastName + ' (' + this.age + ') ' + ' | rating: ' +
            this.rating + ' | rating for genres: ' + JSON.stringify(this.genres) + ' | salary: ' + this.salary + '$\n';
    }

    //required for serialization
    toJSON(){
        return {id: this.id}
    }

    //methods
    noCounter() {
        this.no++
    }
}