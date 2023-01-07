export default class Franchises {
    constructor(id, name) {
        //TYPE -> Integer
        this.id = id
        //TYPE -> String
        this.name = name
        //TYPE -> Array
        this.allMovies = []
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
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