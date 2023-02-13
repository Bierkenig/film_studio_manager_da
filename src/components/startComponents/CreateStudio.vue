<template>
  <div id="createStudioMainDiv">
    <div id="createStudioSubDiv">
      <div>
        <icon-button
            id="createStudioBackButton"
            size="medium"
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
                  <label for="currentDatabase" id="currentDatabaseLabel" class="databaseLabel">{{
                      $t('modified')
                    }}</label>
                </div>
                <div>
                  <input id="defaultDatabase" class="databaseRadioButton" type="radio" v-model="databaseType"
                         value="default">
                  <label for="defaultDatabase" id="defaultDatabaseLabel" class="databaseLabel">{{
                      $t('default')
                    }}</label>
                </div>
              </div>
              <div v-if="databaseType === 'current'">
                <select
                    id="createStudioDatabaseSelect"
                    v-model="databaseVersion"
                >
                  <option :value="null" disabled selected hidden>Database Number</option>
                  <option :value="1">Database 1</option>
                  <option :value="2">Database 2</option>
                  <option :value="3">Database 3</option>
                </select>
              </div>
            </div>

          </div>
          <custom-button
              id="createStudioContinueButton"
              :dark="false"
              size="medium"
              :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null || databaseType === '' || (databaseType === 'current' && databaseVersion === null)"
              @clicked="startGame">{{ $t('createStudioButton') }}
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
import Person from "@/classes/Person";
import {Screenplay} from "@/classes/Screenplay";
import Genre from "@/classes/Genre";
import Topic from "@/classes/Topic";
import {Movie} from "@/classes/Movie";
import Award from "@/classes/Award";

export default {
  name: "CreateStudio",
  components: {BackgroundTile, BudgetSelect, CustomButton, IconButton},
  mixins: [soundeffectMixin('button', 'click')],

  props: {
    slot: String
  },

  data() {
    return {
      name: '',
      budget: "250000000",
      databaseVersion: null,
      chosenLogo: null,
      databaseType: "default",
      iconSelected: [false, false, false, false, false, false, false, false, false, false],
      icon: ['placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder', 'placeholder']//['action','comedy','musical','movies','home','calendar','adventure','alchemy','animal','award']
    }
  },
  methods: {
    startGame() {
      this.$store.commit('resetState')
      this.$store.commit("setSlot", parseInt(this.slot))
      console.log(this.$store.state)
      this.$store.state.dbFetcher.clear()
      this.$store.state.dbFetcher.fetch()
      //TODO REMOVE TEST
      window.ipcRenderer.send('toGetPeopleTest', 'SELECT * FROM people')
      window.ipcRenderer.receive('fromGetPeopleTest', (data) => {
        this.$store.state.allPeopleTest.push(new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
            data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
            data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
            data.thriller, data.war, data.isActor, data.isDirector, data.isWriter))
      })
      if(this.databaseType === 'current'){
        window.ipcRenderer.send('changeDBPath', "./data/database/fsm_custom" + this.databaseVersion +".db")
      } else {
        window.ipcRenderer.send('changeDBPath', "src/DB/database/fsm.db");
      }

      window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      window.ipcRenderer.receive('gotStudios', (data) => {
        this.$store.commit('addOtherStudios', new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })
      //screenplays
      window.ipcRenderer.send('getScreenplays', "SELECT *, g.childrenPopularity as 'gChild', g.teenPopularity as 'gTeen', g.adultPopularity as 'gAdult', t.topicName as 'topic1', t2.topicName as 'topic2', t3.topicName as 'topic3', t.pk_topicID as 't1TopicID', t2.pk_topicID as 't2TopicID', t3.pk_topicID as 't3TopicID', t.childrenPopularity as 'tChild', t.teenPopularity as 'tTeen', t.adultPopularity as 'tAdult', t2.childrenPopularity as 't2Child', t2.teenPopularity as 't2Teen', t2.adultPopularity as 't2Adult', t3.childrenPopularity as 't3Child', t3.teenPopularity as 't3Teen', t3.adultPopularity as 't3Adult' FROM screenplay INNER JOIN genre g on g.pk_genreID = screenplay.fk_pk_genreID INNER JOIN subgenre s on s.pk_subgenreID = screenplay.fk_pk_subgenreID INNER JOIN topics t on t.pk_topicID = screenplay.fk_pk_topic1 INNER JOIN topics t2 on t2.pk_topicID = screenplay.fk_pk_topic2 INNER JOIN topics t3 on t3.pk_topicID = screenplay.fk_pk_topic3 INNER JOIN people p on screenplay.fk_pk_writerID = p.pk_personID")
      window.ipcRenderer.receive('gotScreenplays', (data) => {
        this.$store.commit('addAllScreenplay', new Screenplay(data.pk_screenplayID, data.title, data.type,
            new Genre(data.genreName, data.gChild, data.gTeen, data.gAdult),
            new SubGenre(data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity),
            data.violenceAgeRating,
            new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
                data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                data.thriller, data.war, data.isActor, data.isDirector, data.isWriter),
            data.description, data.screenplayRating, data.price,
            {
              firstTopic: new Topic(data.topic1, data.tChild, data.tTeen, data.tAdult),
              secondTopic: new Topic(data.topic2, data.t2Child, data.t2Teen, data.t2Adult),
              thirdTopic: new Topic(data.topic3, data.t3Child, data.t3Teen, data.t3Adult)
            }, null, data.bought,
            {
              scope: data.scope, tone: data.tone, specialEffects: data.specialEffects
            },
            {
              violence: data.violenceAgeRating, cursing: data.CursingAgeRating, loveScenes: data.loveScenesAgeRating
            }))
      })

      //Movies
      window.ipcRenderer.send('getMovies', "SELECT *, s2.popularity as 'studioPop',g.childrenPopularity  as 'gChild',g.teenPopularity      as 'gTeen',g.adultPopularity     as 'gAdult',t.topicName           as 'topic1',t2.topicName          as 'topic2',t3.topicName          as 'topic3',t.pk_topicID          as 't1TopicID',t2.pk_topicID         as 't2TopicID',t3.pk_topicID         as 't3TopicID',t.childrenPopularity  as 'tChild',t.teenPopularity      as 'tTeen',t.adultPopularity     as 'tAdult',t2.childrenPopularity as 't2Child',t2.teenPopularity     as 't2Teen',t2.adultPopularity    as 't2Adult',t3.childrenPopularity as 't3Child',t3.teenPopularity     as 't3Teen',t3.adultPopularity    as 't3Adult' FROM movies INNER JOIN studio s2 on movies.owner = s2.pk_studioID INNER JOIN screenplay s on movies.screenplay = s.pk_screenplayID INNER JOIN genre g on g.pk_genreID = s.fk_pk_genreID INNER JOIN subgenre s3 on s3.pk_subgenreID = s.fk_pk_subgenreID INNER JOIN topics t on t.pk_topicID = s.fk_pk_topic1 INNER JOIN topics t2 on t2.pk_topicID = s.fk_pk_topic2 INNER JOIN topics t3 on t3.pk_topicID = s.fk_pk_topic3 INNER JOIN people p1 on s.fk_pk_writerID = p1.pk_personID INNER JOIN people p2 on movies.director = p2.pk_personID")
      window.ipcRenderer.receive('gotMovies', (data) => {
        this.$store.commit('addAllMovie', new Movie(data.pk_movieID,
            new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.studioPop, {"2023": data.marketShare}),
            data.contract, data.status, data.quality, data.totalOutgoings,
            new Screenplay(data.pk_screenplayID, data.title, data.type,
                new Genre(data.genreName, data.gChild, data.gTeen, data.gAdult),
                new SubGenre(data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity),
                data.violenceAgeRating,
                new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                    data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
                    data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                    data.thriller, data.war, data.isActor, data.isDirector, data.isWriter),
                data.description, data.screenplayRating, data.price,
                {
                  firstTopic: new Topic(data.topic1, data.tChild, data.tTeen, data.tAdult),
                  secondTopic: new Topic(data.topic2, data.t2Child, data.t2Teen, data.t2Adult),
                  thirdTopic: new Topic(data.topic3, data.t3Child, data.t3Teen, data.t3Adult)
                }, null, data.bought,
                {
                  scope: data.scope, tone: data.tone, specialEffects: data.specialEffects
                },
                {
                  violence: data.violenceAgeRating, cursing: data.CursingAgeRating, loveScenes: data.loveScenesAgeRating
                }),
            data.hype, data.crewMorale,
            new Person(data.pk_personID, data.avatar, data.first_name, data.last_name, data.birthday, data.deathAge, data.gender, data.nationality,
                data.ethnicity, data.workingSince, data.performance, data.experience, data.talent, data.popularity,
                data.rating, data.action, data.adventure, data.comedy, data.documentary, data.drama, data.fantasy, data.horror, data.musical, data.romance, data.scienceFiction,
                data.thriller, data.war, data.isActor, data.isDirector, data.isWriter),
            data.audiencePopularity, data.critics, data.openingEarnings, data.totalEarnings, data.cinemaEarnings, data.dvdEarnings
        ))
      })

      console.log(this.$store.state.allMovies)
      //Awards
      window.ipcRenderer.send('getIntAwards', "SELECT * FROM internationalAwards")
      window.ipcRenderer.receive('gotIntAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_intAwardsID, data.fk_bestActorInLeading,
            data.fk_bestActorInSupport, data.fk_bestActressInLeading, data.fk_bestActressInSupport,
            data.fk_bestMovie, data.fk_bestDirecting, data.fk_bestScreenplay, null,
            null, null, null, null, null, null,
            "international", data.year))
        console.log(data)
      })
      window.ipcRenderer.send('getIndAwards', "SELECT * FROM independentAwards")
      window.ipcRenderer.receive('gotIndAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_indAwardsID, null,
            null, null, null,
            data.fk_bestMovie, data.fk_bestDirector, data.fk_bestScreenplay, data.fk_bestActor,
            data.fk_bestActress, null, null, null, null, null,
            "independent", data.year))
      })
      window.ipcRenderer.send('getAudAwards', "SELECT * FROM audienceAwards")
      window.ipcRenderer.receive('gotAudAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_audAwards, null,
            null, null, null,
            null, data.fk_bestDirector, data.fk_bestScreenplay, data.fk_bestActor,
            data.fk_bestActress, data.fk_bestAdventure, data.fk_bestAction, data.fk_bestThriller, data.fk_bestScienceFiction, data.fk_bestFantasy,
            "independent", data.year))
      })
      console.log(this.$store.state.allAwards)
      console.log(this.$store.state.allPeople)
      //Fetch Subgenre once
      let allSubGenres = []
      let counter = 1;
      let index = 0;
      window.ipcRenderer.send('getSubGenres', 'SELECT * FROM subgenre');
      window.ipcRenderer.receive('gotSubGenres', (data) => {
        allSubGenres.push(new SubGenre(data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity))

        let allGenres = ['Action', 'Adventure', 'Comedy', 'Documentary', 'Drama', 'Fantasy', 'Horror', 'Musical', 'Romance', 'Science-Fiction', 'Thriller', 'War'];
        this.$store.state.subgenresFromEachGenre[allGenres[index]].push(new SubGenre(data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity));

        if (counter % 5 === 0) {
          index++;
        }
        counter++;
      })
      console.log(this.$store.state.allAwards)
      this.$store.commit('setAllSubGenres', allSubGenres)
      console.log(this.$store.state.allSubGenres)
      console.log(this.$store.state.subgenresFromEachGenre)

      this.$store.commit('createStudio', {studio: new Studio(1,this.name,"2023",parseInt(this.budget),1), logo: this.chosenLogo});
      this.$store.commit('createStudio', {studio: new Studio(1,this.name,"2023",parseInt(this.budget),1), logo: this.chosenLogo});
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('creatingStudio') + '...', duration: '3'}})
      if (this.databaseType === 'current') {
       window.ipcRenderer.send('changeDBPath', "./.data/database/fsm_custom" + this.databaseVersion + ".db")
      }
      this.$store.commit('createStudio', {
        studio: new Studio(1, this.name, "2023", parseInt(this.budget), 1),
        logo: this.chosenLogo
      });
      this.$store.commit('createStudio', {
        studio: new Studio(1, this.name, "2023", parseInt(this.budget), 1),
        logo: this.chosenLogo
      });
      this.$router.push({
        name: 'loadingScreen',
        params: {nextRoute: 'home', title: i18next.t('creatingStudio') + '...', duration: '3'}
      })

    },

    test() {
      console.log(this.budget)
    },

    goBack() {
      this.$router.push({name: 'SelectSlotWindow'})
    },

    setSelectedBudget(value) {
      this.budget = value;
      console.log(value)
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
  width: 400px;
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
  width: 70%;
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