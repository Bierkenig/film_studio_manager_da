<template>
  <div id="loadWindowMainDiv">
    <div>
      <icon-button
          id="loadWindowBackButton"
          icon="simple-arrow-left"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>

    <div id="savingsBox">
      <h1 id="loadWindowHeader">{{ $t('loadButton') }}</h1>
      <div id="loadWindowSaveItems">
        <load-item class="savingsBoxLoadItem" :slot-nr="1" ref="slot1"/>
        <load-item class="savingsBoxLoadItem" :slot-nr="2" ref="slot2"/>
        <load-item class="savingsBoxLoadItem" :slot-nr="3" ref="slot3"/>
      </div>
    </div>
    <transition name="modal">
      <close-modal
          v-if="showAutoSaveModal"
          headline="autoSaveModal"
          @useAutoSave="useAutoSave = true; autoSaving()"
          @normal="useAutoSave = false; showAutoSaveModal = false; autoSaving()"
          @close="showAutoSaveModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </close-modal>
    </transition>

    <transition name="modal">
      <close-modal
          v-if="showCorruptModal"
          headline="saveCorruptModal"
          @deleteFile="deleting(); showCorruptModal = false"
          @close="showCorruptModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </close-modal>
    </transition>
  </div>
</template>

<script>
import LoadItem from "@/components/startComponents/LoadItem";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";
import i18next from "i18next";
import CloseModal from "@/components/mainGameComponents/CloseModal";
import {Studio} from "@/classes/Studio";
import Topic from "@/classes/Topic";
import Genre from "@/classes/Genre";
import SubGenre from "@/classes/SubGenre";
import {Character} from "@/classes/Character";
import {Screenplay} from "@/classes/Screenplay";
import {Movie} from "@/classes/Movie";
import Award from "@/classes/Award";


export default {
  name: "LoadWindow",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],
  components: {CloseModal, LoadItem, IconButton},

  data(){
    return{
      showAutoSaveModal: false,
      showCorruptModal: false,
      useAutoSave: false,
      slotForAutoSave: null,
    }
  },

  mounted(){
    window.ipcRenderer.receive('m2rLoading', data => {
      this.slotForAutoSave = data[2]
      if(data[1]==='100') {
        let saveData = data[0].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
        this.loadDBData()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
      else if(data[1] === '101') {
        let saveData = data[0].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
        this.loadDBData()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
      else if(data[1] === '102'){
        this.showCorruptModal = true
      }
      else if(data[1] === '103'){
        this.showAutoSaveModal = true
      }
    })

    window.ipcRenderer.receive('m2rAutoSaveLoading', data => {
      if(this.useAutoSave === true){
        let saveData = data[3].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
        this.loadDBData()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
      else if(this.useAutoSave === false){
        let saveData = data[0].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
        this.loadDBData()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
    })
  },

  methods: {
    goBack(){
      this.$router.push({name: 'startMenu'})
    },
    removeListeners(){
      window.ipcRenderer.removeAllListeners('m2rLoading')
      window.ipcRenderer.removeAllListeners('m2rChecking')
      window.ipcRenderer.removeAllListeners('m2rAutoSaveLoading')
      window.ipcRenderer.removeAllListeners('m2rSaveSlot')
    },
    autoSaving(){
      window.ipcRenderer.send('r2mLoading',{slotNr: this.slotForAutoSave, responseChannel: 'm2rAutoSaveLoading'})
    },

    deleting(){
      window.ipcRenderer.send('r2mDeleting', this.slotNr)
      this.$refs['slot' + this.slotForAutoSave].deleting()
    },

    async loadDBData() {
      //set all listeners null
      await window.ipcRenderer.removeAllListeners('gotStudios')
      await window.ipcRenderer.removeAllListeners('fromGetTopics')
      await window.ipcRenderer.removeAllListeners('gotGenres')
      await window.ipcRenderer.removeAllListeners('gotSubGenres')
      await window.ipcRenderer.removeAllListeners('gotCharacters')
      await window.ipcRenderer.removeAllListeners('fromGetPeople')
      await window.ipcRenderer.removeAllListeners('gotScreenplays')
      await window.ipcRenderer.removeAllListeners('gotRoles')
      await window.ipcRenderer.removeAllListeners('gotMovies')
      await window.ipcRenderer.removeAllListeners('gotIntAwards')
      await window.ipcRenderer.removeAllListeners('gotIndAwards')
      await window.ipcRenderer.removeAllListeners('gotAudAwards')

      //Fetch Studios
      let allStudios = []
      await window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      await window.ipcRenderer.receive('gotStudios', (data) => {
        allStudios.push(new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })
      this.$store.commit('addOtherStudios', allStudios)

      await new Promise(resolve => setTimeout(resolve, 100))
      //Fetch Topics
      let allTopics = []
      await window.ipcRenderer.send('toGetTopics', 'SELECT * FROM topics');
      await window.ipcRenderer.receive('fromGetTopics', (data) => {
        allTopics.push(new Topic(data.pk_topicID, data.topicName, data.childrenPopularity, data.teenPopularity, data.adultPopularity))
      })
      this.$store.commit('setAllTopics', allTopics)
      await new Promise(resolve => setTimeout(resolve, 100))

      //Fetch Genre
      let allGenres = []
      await window.ipcRenderer.send('getGenres', 'SELECT * FROM genre');
      await window.ipcRenderer.receive('gotGenres', (data) => {
        allGenres.push(new Genre(data.pk_genreID, data.genreName.replaceAll(' ', '-'), data.childrenPopularity, data.teenPopularity, data.adultPopularity))
      })
      this.$store.commit('setAllGenres', allGenres)
      await new Promise(resolve => setTimeout(resolve, 200))

      //Fetch Subgenre once
      let allSubGenres = []
      let counter = 1;
      let index = 0;
      await window.ipcRenderer.send('getSubGenres', 'SELECT * FROM subgenre');
      await window.ipcRenderer.receive('gotSubGenres', (data) => {
        allSubGenres.push(new SubGenre(data.pk_subgenreID, data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity))

        let genres = ['Action', 'Adventure', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Musical', 'Romance', 'Science-Fiction', 'Thriller', 'War'];
        this.$store.state.subgenresFromEachGenre[genres[index]].push(new SubGenre(data.pk_subgenreID, data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity));

        if (counter % 5 === 0) {
          index++;
        }
        counter++;
      })
      this.$store.commit('setAllSubGenres', allSubGenres)

      await new Promise(resolve => setTimeout(resolve, 200))

      //fetch Character
      let characters = []
      await window.ipcRenderer.send('getCharacters', 'SELECT * FROM characters')
      await window.ipcRenderer.receive('gotCharacters', (data) => {
        characters.push(new Character(data.first_name + " " + data.last_name, data.gender, data.age, data.pk_characterID))
      })
      this.$store.commit('setAllCharacters', characters)

      await new Promise(resolve => setTimeout(resolve, 100))

      //screenplays
      let screenplays = []
      let allWriters = this.$store.getters.getAllWriters
      await window.ipcRenderer.send('getScreenplays', "SELECT * FROM screenplay")
      await window.ipcRenderer.receive('gotScreenplays', (data) => {
        let genreInd = data.fk_pk_genreID - 1
        let subgenreInd = data.fk_pk_subgenreID - 1
        let wriInd = data.fk_pk_writerID - 1
        let screenplay = new Screenplay(data.pk_screenplayID, data.title, data.type,
            allGenres[genreInd],
            allSubGenres[subgenreInd],
            data.violenceAgeRating,
            allWriters[wriInd],
            data.description, parseInt(data.screenplayRating.split('-')[0]), data.screenplayRating, data.price, {
              firstTopic: allTopics[data.fk_pk_topic1 - 1],
              secondTopic: allTopics[data.fk_pk_topic2 - 1],
              thirdTopic: allTopics[data.fk_pk_topic3 - 1]
            }, null, data.bought, {scope: data.scope, tone: data.tone, specialEffects: data.specialEffects},
            {violence: data.violenceAgeRating, cursing: data.CursingAgeRating, loveScenes: data.loveScenesAgeRating})

        screenplays.push(screenplay)
      })

      this.$store.commit('addAllScreenplay', screenplays)

      await new Promise(resolve => setTimeout(resolve, 100))

      //fetch Roles
      await window.ipcRenderer.send('getRoles', 'SELECT * FROM roles')
      await window.ipcRenderer.receive('gotRoles', (data) => {
        let index = data.fk_pk_screenplayID - 1
        let screenplay = this.$store.getters.getAllScreenplays[index]
        let character = this.$store.getters.getAllCharacters[data.fk_pk_characterID - 1]
        let actor = this.$store.getters.getAllActors[data.fk_pk_actorID - 1]
        if (data.roleType.toString().toLowerCase() === 'main') {
          screenplay.addMainCharacter(character)
          screenplay.addMainActor(actor)
        } else if (data.roleType.toString().toLowerCase() === 'minor') {
          screenplay.addMinorCharacter(character)
          screenplay.addMinorActor(actor)
        } else if (data.roleType.toString().toLowerCase() === 'support') {
          screenplay.addSupportCharacter(character)
          screenplay.addSupportActor(actor)
        } else if (data.roleType.toString().toLowerCase() === 'cameo') {
          screenplay.addCameoCharacter(character)
          screenplay.addCameoActor(actor)
        }
      })

      await new Promise(resolve => setTimeout(resolve, 100))

      //Movies
      let allMovies = []
      let allDirectors = this.$store.getters.getAllDirectors
      await window.ipcRenderer.send('getMovies', "SELECT * FROM movies")
      await window.ipcRenderer.receive('gotMovies', (data) => {
        let movie = new Movie(data.pk_movieID, allStudios[data.owner - 1],
            null, data.status, data.quality, data.totalOutgoings, data.audiencePopularity, data.popularity,
            new Date(parseInt(data.foundationDate.split('-')[2]),
                parseInt(data.foundationDate.split('-')[1]),
                parseInt(data.foundationDate.split('-')[0])),
            data.totalCosts, data.critics, data.openingEarnings, data.totalEarnings,
            data.cinemaEarnings, data.dvdEarnings, data.childrenPopularityMovie, data.teenPopularityMovie, data.adultsPopularityMovie,
            data.marketingPrint, data.marketingInternet, data.marketingCommercials)

        //set PreProd Values
        let index = data.screenplay - 1
        let dirIndex = data.director - 1
        movie._preProduction.screenplay = screenplays[index]
        movie._preProduction.hiredDirector = allDirectors[dirIndex]
        movie._preProduction.crewMorale = data.crewMorale
        movie._preProduction.hype = data.hype
        movie._preProduction.releaseDate = new Date(parseInt(data.releaseDate.split('-')[2]),
            parseInt(data.releaseDate.split('-')[1]),
            parseInt(data.releaseDate.split('-')[0]));
        movie._preProduction.budget.production = data.production

        //set other phases
        movie.setProduction()
        movie.setPostProduction()
        movie.setRelease()

        allMovies.push(movie)
      })

      this.$store.commit('addAllMovie', allMovies)

      await new Promise(resolve => setTimeout(resolve, 100))

      //Awards
      await window.ipcRenderer.send('getIntAwards', "SELECT * FROM internationalAwards")
      await window.ipcRenderer.receive('gotIntAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_intAwardsID, data.fk_bestActorInLeading,
            data.fk_bestActorInSupport, data.fk_bestActressInLeading, data.fk_bestActressInSupport,
            data.fk_bestMovie, data.fk_bestDirecting, data.fk_bestScreenplay, data.fk_bestWriter, null,
            null, null, null, null, null, null, null,
            "international", new Date(data.year.split('-')[2], data.year.split('-')[1], data.year.split('-')[0])))
      })
      await window.ipcRenderer.send('getIndAwards', "SELECT * FROM independentAwards")
      await window.ipcRenderer.receive('gotIndAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_indAwardsID, null,
            null, null, null,
            data.fk_bestMovie, data.fk_bestDirector, data.fk_bestScreenplay, data.fk_bestWriter, data.fk_bestActor,
            data.fk_bestActress, null, null, null, null, null, null,
            "independent", new Date(data.year.split('-')[2], data.year.split('-')[1], data.year.split('-')[0])))
      })
      await window.ipcRenderer.send('getAudAwards', "SELECT * FROM audienceAwards")
      await window.ipcRenderer.receive('gotAudAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_audAwards, null,
            null, null, null,
            null, data.fk_bestDirector, data.fk_bestScreenplay, data.fk_bestWriter, data.fk_bestActor,
            data.fk_bestActress, data.fk_bestAdventure, data.fk_bestAction, data.fk_bestThriller, data.fk_bestScienceFiction, data.fk_bestFantasy, data.fk_bestHorror,
            "audience", new Date(data.year.split('-')[2], data.year.split('-')[1], data.year.split('-')[0])))
      })
    }
  }
}
</script>

<style scoped>
#loadWindowMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#loadWindowBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#loadWindowHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

#savingsBox {
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 350px;
  padding: 10px 20px 20px 20px;
}

#loadWindowSaveItems {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>