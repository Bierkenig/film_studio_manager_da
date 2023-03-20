<template>
  <div id="createStudioMainDiv">
    <div id="createStudioSubDiv">
      <div>
        <icon-button
            id="createStudioBackButton"
            size="medium"
            icon="simple-arrow-left"
            :dark="true"
            :bg-gradient="true"
            :icon-gradient="false"
            :shadow="false"
            @click="goBack()"/>
      </div>
      <div class="createStudioBackground">
        <background-tile :title="$t('createStudioHeader')">
          <div class="createStudioBox">
            <div class="createStudioBoxInnerElement">
              <div class="createStudioNameBox">
                <label id="createStudioNameLabel" for="createStudioName">Studio Name</label>
                <input id="createStudioName" v-model="name" type="text" placeholder='Studio Name'/>
              </div>
              <div id="radioBox">
                <div id="budgetHint">
                  Studio Budget
                </div>
                <budget-select id="budgetSelectElement" @send-budget-value="setSelectedBudget"/>
              </div>
              <div id="chooseLogoBox">
                <div id="logoHint">
                  Studio Logo
                </div>
                <div class="selectLogoElement">
                  <div v-for="i in 10" :key="i">
                    <icon-button
                        class="availableIconsElements"
                        size="small"
                        :icon="icon[i-1]"
                        :dark="true"
                        :bg-gradient="true"
                        :icon-gradient="false"
                        :shadow="false"
                        :invertTheme="iconSelected[i-1]"
                        @click="selectIcon(i)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 class="createStudioHeading" id="createStudioModificationHeading">
            {{ $t('modifications') }}
          </h2>
          <div class="createStudioBox">
            <div class="createStudioBoxInnerElement" id="createStudioBoxModificationInformation">
              <div id="createStudioBoxText">{{ $t('modificationsMsg') }}</div>
            </div>
            <div class="createStudioOutsideBoxDatabaseSelection">
              <div class="createStudioBoxDatabaseSelection">
                <div>
                  <input id="currentDatabase" class="databaseRadioButton" type="radio" v-model="databaseType"
                         value="current">
                  <label for="currentDatabase" id="currentDatabaseLabel" class="databaseLabel">
                    {{ $t('modified') }}
                  </label>
                </div>
                <div>
                  <input id="defaultDatabase" class="databaseRadioButton" type="radio" v-model="databaseType"
                         value="default">
                  <label for="defaultDatabase" id="defaultDatabaseLabel" class="databaseLabel">
                    {{ $t('default') }}
                  </label>
                </div>
              </div>
              <div v-if="databaseType === 'current'">
                <select
                    id="createStudioDatabaseSelect"
                    v-model="databaseVersion"
                >
                  <option :value="null" disabled selected hidden>{{ $t('database') }} Slot</option>
                  <option :value="1">{{ $t('database') }} 1</option>
                  <option :value="2">{{ $t('database') }} 2</option>
                  <option :value="3">{{ $t('database') }} 3</option>
                </select>
              </div>
            </div>

          </div>
          <custom-button
              id="createStudioContinueButton"
              :dark="false"
              size="medium"
              :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null || databaseType === '' || (databaseType === 'current' && databaseVersion === null)"
              @clicked="startGame"
          >
            {{ $t('createStudioButton') }}
          </custom-button>
        </background-tile>
      </div>
    </div>
  </div>
</template>

<script>
import {Studio} from "@/classes/Studio";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";
import CustomButton from "@/components/kitchenSink/CustomButton";
import BudgetSelect from "@/components/startComponents/BudgetSelect";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import i18next from "i18next";
import SubGenre from "@/classes/SubGenre";
import Genre from "@/classes/Genre";
import Topic from "@/classes/Topic";
import Person from "@/classes/Person";
import {Character} from "@/classes/Character";
import {Screenplay} from "@/classes/Screenplay";
import {Movie} from "@/classes/Movie";
import Award from "@/classes/Award";
import store from "@/services/store";
import {createScreenplaysFromWriters} from "@/simulation/simulation";
export default {
  name: "CreateStudio",
  components: {BackgroundTile, BudgetSelect, CustomButton, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    slot: String
  },

  data() {
    return {
      name: '',
      budget: "250000000",
      databaseVersion: this.slot,
      chosenLogo: null,
      databaseType: "default",
      iconSelected: [false, false, false, false, false, false, false, false, false, false],
      icon: ['logo1', 'logo2', 'logo3', 'logo4', 'logo5', 'logo6', 'logo7', 'logo8', 'logo9', 'logo10']//['action','comedy','musical','movies','home','calendar','adventure','alchemy','animal','award']
    }
  },
  methods: {
    async startGame() {
      this.$store.commit('resetState')
      this.$store.commit("setSlot", parseInt(this.slot))
      //For Production
      if (this.databaseType === 'current') {
        process.env.NODE_ENV !== 'production' ? window.ipcRenderer.send('changeDBPath', "public/DB/fsm_custom" + this.databaseVersion + ".db") : window.ipcRenderer.send('changeDBPath', "./bundled/DB/fsm_custom" + this.databaseVersion + ".db")
      } else {
        process.env.NODE_ENV !== 'production' ? window.ipcRenderer.send('changeDBPath', "public/DB/database/fsm.db") : window.ipcRenderer.send('changeDBPath', "./bundled/DB/database/fsm.db")
      }
      //set all listeners null
      window.ipcRenderer.removeAllListeners('gotStudios')
      window.ipcRenderer.removeAllListeners('fromGetTopics')
      window.ipcRenderer.removeAllListeners('gotGenres')
      window.ipcRenderer.removeAllListeners('gotSubGenres')
      window.ipcRenderer.removeAllListeners('gotCharacters')
      window.ipcRenderer.removeAllListeners('fromGetPeople')
      window.ipcRenderer.removeAllListeners('gotScreenplays')
      window.ipcRenderer.removeAllListeners('gotRoles')
      window.ipcRenderer.removeAllListeners('gotMovies')
      window.ipcRenderer.removeAllListeners('gotIntAwards')
      window.ipcRenderer.removeAllListeners('gotIndAwards')
      window.ipcRenderer.removeAllListeners('gotAudAwards')
      //Fetch Studios
      let
          allStudios = []
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

      //people
      let allWriters = [], allActors = [], allDirectors = [], allPeople = []
      window.ipcRenderer.send('toGetPeople', 'SELECT * FROM people');
      window.ipcRenderer.receive('fromGetPeople', (data) => {
        if (data.isWriter === "true") {
          allWriters.push(new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
              data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
              data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
              data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
        }
        if (data.isDirector === "true") {
          allDirectors.push(new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
              data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
              data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
              data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
        }
        if (data.isActor === "true") {
          allActors.push(new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
              data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
              data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
              data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
        }
        allPeople.push(new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
            data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
            data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
            data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
      })

      //Set in Store
      this.$store.commit('setAllWriters', allWriters);
      this.$store.commit('setAllDirectors', allDirectors);
      this.$store.commit('setAllActors', allActors);
      this.$store.commit('setAllPeople', allPeople);

      await new Promise(resolve => setTimeout(resolve, 300))

      //screenplays
      let screenplays = []
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

      this.$store.commit('createStudio', {
        studio: new Studio(16, this.name, "2023", parseInt(this.budget), 1, {"2023": 0}),
        logo: this.chosenLogo
      });

      this.$router.push({
        name: 'loadingScreen',
        params: {nextRoute: 'home', title: i18next.t('creatingStudio') + '...', duration: '3'}
      })

      let newScreenplay = createScreenplaysFromWriters('forMovieGeneration');
      store.commit('addScreenplay', newScreenplay)
    },

    goBack() {
      this.$router.push({name: 'SelectSlotWindow'})
    },

    setSelectedBudget(value) {
      this.budget = value
    },

    selectIcon(index) {
      for (let i = 0; i < this.iconSelected.length; i++) {
        if (i === (index - 1)) {
          this.iconSelected[index - 1] = true;
        } else {
          this.iconSelected[i] = false;
        }
      }
      this.chosenLogo = this.icon[index - 1];
    }
  },
}
</script>

<style scoped>
#createStudioMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.createStudioHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.createStudioBackground {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 10px 20px 10px 20px;
}

.createStudioBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  margin-top: 10px;
}

#createStudioBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

.createStudioBoxInnerElement {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
}

.createStudioNameBox {
  display: flex;
  flex-direction: column;
}

#createStudioName {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  flex: 1;
  margin-top: 10px;
  padding: 10px;
  margin-bottom: 20px;
}

#createStudioName:focus {
  outline: none;
}

#createStudioModificationHeading {
  margin-top: 10px !important;
}

#createStudioBoxModificationInformation {
  padding-top: 10px !important;
}

#createStudioBoxText {
  color: #848891;
}

#createStudioContinueButton {
  margin-top: 20px;
  margin-bottom: 10px;
}

#budgetSelectElement {
  margin-top: 10px;
}

.selectLogoElement {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  width: 75%;
  gap: 15px;
  padding-bottom: 15px;
}

.availableIconsElements {
  margin-top: 10px;
  flex: 0 1 calc(20% - 8px);
}

.createStudioOutsideBoxDatabaseSelection {
  display: flex;
  flex-direction: column;
  gap: 10px
}

.createStudioBoxDatabaseSelection {
  margin-top: 10px;
  margin-left: 16px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.databaseLabel {
  margin-left: 10px;
  font-size: 14px;
}

input[type='radio']:after {
  top: -2px;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  position: relative;
  background-color: #1C222F;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 5px solid #252D3E;
}

input[type='radio']:checked:after {
  top: -2px;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  position: relative;
  background-color: #FF3A4D;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 5px solid #252D3E;
}

#createStudioDatabaseSelect {
  margin-bottom: 15px;
  margin-left: 16px;
  font-size: 15px;
  padding: 0.25em;
  width: 50%;
  border-radius: 10px;
  position: relative;
  background-color: #252D3E;
  display: inline-block;
  visibility: visible;
  border-style: none;
  outline: none;
}
</style>