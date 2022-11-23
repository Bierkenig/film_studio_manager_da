export class Studio {
    constructor(name, year = "2023") {
        //TYPE -> String
        this.name = name;
        //TYPE -> String
        this.year = year;
        //TYPE -> Array
        this.movies = [];
    }

    getName() {
        return this.name;
    }
    static fromJSON(jsonObject){
        return Object.assign(new Studio(), jsonObject)
    }

}