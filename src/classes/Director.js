export class Director {
    // TODO JAKOB: genre must be an associative array e.g. genres.action = 50
    constructor(id, firstName, lastName, age, rating, genres, salary, gender) {
        this.id = id
        this.firstName = firstName
        this.lastName = lastName
        this.age = age
        this.rating = rating
        this.genres = genres
        this.salary = salary
        this.gender = gender
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

    toString(){
        return 'Director: ' + this.id + ', ' + this.firstName + ' ' + this.lastName + ' (' + this.age + ') ' + ' | rating: ' +
            this.rating + ' | rating for genres: ' + JSON.stringify(this.genres) + ' | salary: ' + this.salary + '$\n';
    }

    //required for serialization
    toJSON(){
        return {id: this.id}
    }

}