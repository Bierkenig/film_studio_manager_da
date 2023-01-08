export default class Franchises {
    constructor(id, name, owner) {
        //TYPE -> Integer
        this.id = id
        //TYPE -> String
        this.name = name
        //TYPE -> Studio
        this.owner = owner;
        //TYPE -> Array
        this.allMovies = []
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    getOwner(){
        return this.owner
    }

    getAllMovies() {
        return this.allMovies
    }

    addAllMovies(value){
        this.allMovies.push(value)
    }

    getLastScreenplay(){
        return this.allMovies[this.allMovies.length - 1]._preProduction.screenplay;
    }

    static fromJSON(jsonObject){
        return Object.assign(new Franchises(), jsonObject)
    }
}