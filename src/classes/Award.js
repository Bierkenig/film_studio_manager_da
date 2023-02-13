import DataUtil from "@/classes/DataUtil";
import store from "@/services/store";

export default class Award {
    constructor(id, bestActorInLeading, bestActorInSupport, bestActressInLeading,
                bestActressInSupport, bestMovie, bestDirector, bestScreenplay, bestActor, bestActress,
                bestAdventure, bestAction, bestThriller, bestScienceFiction, bestFantasy, type, year) {
        if(arguments[0] === DataUtil.skip){
            return
        }
        this.id = id
        this.bestActorInLeading = this.filterPeople(bestActorInLeading)[0]
        this.bestActorInSupport = this.filterPeople(bestActorInSupport)[0]
        this.bestActressInLeading = this.filterPeople(bestActressInLeading)[0]
        this.bestActressInSupport = this.filterPeople(bestActressInSupport)[0]
        this.bestMovie = this.filterMovie(bestMovie)[0]
        this.bestDirector = this.filterPeople(bestDirector)[0]
        this.bestScreenplay = this.filterScreenplay(bestScreenplay)[0]
        this.bestActor = this.filterPeople(bestActor)[0]
        this.bestActress = this.filterPeople(bestActress)[0]
        this.bestAdventure = this.filterMovie(bestAdventure)[0]
        this.bestAction = this.filterMovie(bestAction)[0]
        this.bestThriller = this.filterMovie(bestThriller)[0]
        this.bestScienceFiction = this.filterMovie(bestScienceFiction)[0]
        this.bestFantasy = this.filterMovie(bestFantasy)[0]
        this.type = type
        this.year = year
    }

    filterPeople(value) {
        return store.getters.getAllPeople.filter((el) => value === el.id)
    }

    filterMovie(value) {
        return store.getters.getAllMovies.filter((el) => value === el.id)
    }

    filterScreenplay(value) {
        return store.getters.getAllScreenplays.filter((el) => value === el.id)
    }

    getType() {
        return this.type
    }

    getYear() {
        return this.year
    }

    static fromJSON(jsonObject){
        return Object.assign(new Award(DataUtil.skip) ,jsonObject)
    }
}