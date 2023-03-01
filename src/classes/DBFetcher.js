import store from '@/services/store'
import Person from "@/classes/Person";

export default class DBFetcher {
    constructor() {
        this.allPeople = []
        this.allActors = []
        this.allDirectors = []
        this.allWriters = []
    }

    clear() {
        this.allPeople = []
        this.allActors = []
        this.allDirectors = []
        this.allWriters = []
    }

    fetch() {
        this.clear()
        window.ipcRenderer.removeAllListeners('fromGetPeople')
        //Fetch People
        window.ipcRenderer.send('toGetPeople','SELECT * FROM people');
        window.ipcRenderer.receive('fromGetPeople', (data) => {
            if(data.isWriter === "true"){
                this.allWriters.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
            }
            if(data.isDirector === "true"){
                this.allDirectors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
            }
            if(data.isActor === "true"){
                this.allActors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
            }
            this.allPeople.push(new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
        })

        //Set in Store
        store.commit('setAllWriters', this.allWriters);
        store.commit('setAllDirectors', this.allDirectors);
        store.commit('setAllActors', this.allActors);
        store.commit('setAllPeople', this.allPeople);
    }
}