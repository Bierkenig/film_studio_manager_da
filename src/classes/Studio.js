export class Studio {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
    //required for serialization
    static fromJSON(jsonObject){
        return Object.assign(new Studio(), jsonObject)
    }
}