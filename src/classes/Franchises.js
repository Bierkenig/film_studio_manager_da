export default class Franchises {
    constructor(id, name) {
        //TYPE -> Integer
        this.id = id
        //TYPE -> String
        this.name = name
    }

    static fromJSON(jsonObject){
        return Object.assign(new Franchises(), jsonObject)
    }
}