import store from '@/services/store'
import Person from "@/classes/Person";
import Topic from "@/classes/Topic";
import Genre from "@/classes/Genre";
import SubGenre from "@/classes/SubGenre";

export default class DBFetcher {
    constructor() {
        this.allPeople = []
        this.allActors = []
        this.allDirectors = []
        this.allWriters = []
        this.allAwards = []
        this.allTopics = []
        this.allScreenplays = []
        this.allGenres = []
        this.allSubGenres = []
    }

    clear() {
        store.state.allPeople = []
        store.state.allActors = []
        store.state.allDirectors = []
        store.state.allWriters = []
        store.state.allAwards = []
        store.state.allTopics = []
        store.state.allScreenplays = []
        store.state.allGenres = []
        store.state.allSubGenres = []
    }

    fetch() {
        //Fetch People
        window.ipcRenderer.send('toGetPeople','SELECT * FROM people');
        window.ipcRenderer.receive('fromGetPeople', (data) => {
            if(data.isWriter == "true"){
                this.allWriters.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
            }
            if(data.isDirector == "true"){
                this.allDirectors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
            }
            if(data.isActor == "true"){
                this.allActors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
            }
            this.allPeople.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent,data.popularity,
                data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
        })

        //Fetch Topics
        window.ipcRenderer.send('toGetTopics','SELECT * FROM topics');
        window.ipcRenderer.receive('fromGetTopics', (data) => {
            this.allTopics.push(new Topic(data.topicName, data.childrenPopularity, data.teenPopularity, data.adultPopularity));
        })

        //Fetch Genre
        window.ipcRenderer.send('getGenres', 'SELECT * FROM genre');
        window.ipcRenderer.receive('gotGenres', (data) => {
            this.allGenres.push(new Genre(data.genreName, data.childrenPopularity, data.teenPopularity, data.adultPopularity))
        })

        //Fetch Subgenre
        let counter = 1;
        let index = 0;
        window.ipcRenderer.send('getSubGenres', 'SELECT * FROM subgenre');
        window.ipcRenderer.receive('gotSubGenres', (data) => {
            this.allSubGenres.push(new SubGenre(data.genreName, data.childrenPopularity, data.teenPopularity, data.adultPopularity))

            let allGenres = ['Action','Adventure','Comedy','Documentary','Drama','Fantasy','Horror','Musical','Romance','Science-Fiction','Thriller','War'];
            store.state.subgenresFromEachGenre[allGenres[index]].push(new SubGenre(data.genreName, data.childrenPopularity, data.teenPopularity, data.adultPopularity));

            if(counter % 5 === 0){
                index++;
            }
            counter++;
        })

        //Set in Store
        store.commit('setAllWriters', this.allWriters);
        store.commit('setAllDirectors', this.allDirectors);
        store.commit('setAllActors', this.allActors);
        store.commit('setAllTopics',this.allTopics);
        store.commit('setAllPeople', this.allPeople);
        store.commit('setAllGenres', this.allGenres)
        store.commit('setAllSubGenres', this.allSubGenres)
    }
}