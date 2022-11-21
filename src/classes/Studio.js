export class Studio {
    constructor(name, year = "2023") {
        this.name = name;
        this.year = year;
        this.movies = [];
    }

    getName() {
        return this.name;
    }
}