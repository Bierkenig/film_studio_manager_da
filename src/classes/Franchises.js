export default class Franchises {
    constructor(id, name) {
        //TYPE -> Integer
        this.id = id
        //TYPE -> String
        this.name = name
        //TYPE -> Movie
        this.mainMovie = null
        //TYPE -> Array
        this.allMovies = []
    }

    getId(){
        return this.id
    }

    getName(){
        return this.name
    }

    getMainMovie() {
        return this.mainMovie
    }

    getAllMovies() {
        return this.allMovies
    }

    setMainMovie(value){
        this.mainMovie = value;
        this.allMovies.push(value)
    }

    addAllMovies(value){
        this.allMovies.push(value)
    }

    static fromJSON(jsonObject){
        return Object.assign(new Franchises(), jsonObject)
    }
}