export class Studio {
    constructor(name, year = "2023") {
        this.name = name;
        this.year = year;
    }

    getName() {
        return this.name;
    }

    getCreateYear() {
        return this.year;
    }
    //required for serialization
    static fromJSON(jsonObject){
        return Object.assign(new Studio(), jsonObject)
    }
}