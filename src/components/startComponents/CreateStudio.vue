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
import {Character} from "@/classes/Character";

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
      window.ipcRenderer.send('dbP', "")
      window.ipcRenderer.receive('dbP2', (data) => {
        console.log(data)
      })
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
      /*if(this.databaseType === 'current'){
        window.ipcRenderer.send('changeDBPath', "./data/database/fsm_custom" + this.databaseVersion +".db")
      } else {
        window.ipcRenderer.send('changeDBPath', "src/DB/database/fsm.db");
      }*/
      //Fetch Topics
      let allTopics = []
      window.ipcRenderer.send('toGetTopics','SELECT * FROM topics');
      window.ipcRenderer.receive('fromGetTopics', (data) => {
        console.log(data)
        allTopics.push(new Topic(data.topicName, data.childrenPopularity, data.teenPopularity, data.adultPopularity))
        this.$store.commit('setAllTopics', allTopics)
      })

      //Fetch Genre
      let allGenres = []
      window.ipcRenderer.send('getGenres', 'SELECT * FROM genre');
      window.ipcRenderer.receive('gotGenres', (data) => {
        console.log(data)
        allGenres.push(new Genre(data.genreName.replaceAll(' ','-'), data.childrenPopularity, data.teenPopularity, data.adultPopularity))
        this.$store.commit('setAllGenres', allGenres)
      })
      //FETCH Subgenre
      window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      window.ipcRenderer.receive('gotStudios', (data) => {
        this.$store.commit('addOtherStudios', new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })
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
      //screenplays
      window.ipcRenderer.send('getScreenplays', "SELECT *, g.childrenPopularity as 'gChild', g.teenPopularity as 'gTeen', g.adultPopularity as 'gAdult', t.topicName as 'topic1', t2.topicName as 'topic2', t3.topicName as 'topic3', t.pk_topicID as 't1TopicID', t2.pk_topicID as 't2TopicID', t3.pk_topicID as 't3TopicID', t.childrenPopularity as 'tChild', t.teenPopularity as 'tTeen', t.adultPopularity as 'tAdult', t2.childrenPopularity as 't2Child', t2.teenPopularity as 't2Teen', t2.adultPopularity as 't2Adult', t3.childrenPopularity as 't3Child', t3.teenPopularity as 't3Teen', t3.adultPopularity as 't3Adult', c.first_name as 'cFirst', c.last_name as 'cLast', c.gender as 'cGender', p5.pk_personID as 'act2ID', p5.avatar as 'act2Avatar', p5.first_name as 'act2First', p5.last_name as 'act2Last', p5.birthday as 'act2Birth', p5.deathAge as 'act2Death', p5.gender as 'act2Gender', p5.nationality as 'act2Nat', p5.ethnicity as 'act2Eth', p5.workingSince as 'act2Work', p5.performance as 'act2Per', p5.experience as 'act2Exp', p5.talent as 'act2Tal', p5.popularity as 'act2Pop', p5.rating as 'act2Rating', p5.action as 'act2Action', p5.adventure as 'act2Adv', p5.comedy as 'act2Come', p5.documentary as 'act2Doc', p5.drama as 'act2Drama', p5.fantasy as 'act2Fant', p5.horror as 'act2Horror', p5.musical as 'act2Mus', p5.romance as 'act2Rom', p5.scienceFiction as 'act2Science', p5.thriller as 'act2Thrill', p5.war as 'act2War', p5.isActor as 'act2Act', p5.isActor as 'act2act2', p5.isWriter as 'act2Wri', p.pk_personID as 'wri0ID', p.avatar as 'wri0Avatar', r.roleType as 'roleType', p.first_name as 'wri0First', p.last_name as 'wri0Last', p.birthday as 'wri0Birth', p.deathAge as 'wri0Death', p.gender as 'wri0Gender', p.nationality as 'wri0Nat', p.ethnicity as 'wri0Eth', p.workingSince as 'wri0Work', p.performance as 'wri0Per', p.experience as 'wri0Exp', p.talent as 'wri0Tal', p.popularity as 'wri0Pop', p.rating as 'wri0Rating', p.action as 'wri0Action', p.adventure as 'wri0Adv', p.comedy as 'wri0Come', p.documentary as 'wri0Doc', p.drama as 'wri0Drama', p.fantasy as 'wri0Fant', p.horror as 'wri0Horror', p.musical as 'wri0Mus', p.romance as 'wri0Rom', p.scienceFiction as 'wri0Science', p.thriller as 'wri0Thrill', p.war as 'wri0War', p.isActor as 'wri0Act', p.isActor as 'wri0wri0', p.isWriter as 'wri0Wri' FROM screenplay INNER JOIN genre g on g.pk_genreID = screenplay.fk_pk_genreID INNER JOIN subgenre s on s.pk_subgenreID = screenplay.fk_pk_subgenreID INNER JOIN topics t on t.pk_topicID = screenplay.fk_pk_topic1 INNER JOIN topics t2 on t2.pk_topicID = screenplay.fk_pk_topic2 INNER JOIN topics t3 on t3.pk_topicID = screenplay.fk_pk_topic3 INNER JOIN people p on screenplay.fk_pk_writerID = p.pk_personID INNER JOIN roles r on screenplay.pk_screenplayID = r.fk_pk_screenplayID INNER JOIN characters c on r.fk_pk_characterID = c.pk_characterID INNER JOIN people p5 on fk_pk_actorID = p5.pk_personID")
      window.ipcRenderer.receive('gotScreenplays', (data) => {
        let check = false
        let screenplay = new Screenplay(data.pk_screenplayID, data.title, data.type,
            new Genre(data.genreName, data.gChild, data.gTeen, data.gAdult),
            new SubGenre(data.subGenreName, data.subChildrenPopularity, data.subTeenPopularity, data.subAdultPopularity),
            data.violenceAgeRating,
            new Person(data.wri0ID, data.wri0Avatar, data.wri0First, data.wri0Last, data.wri0Birth, data.wri0Death, data.wri0Gender, data.wri0Nat,
                data.wri0Eth, data.wri0Work, data.wri0Per, data.wri0Exp, data.wri0Tal, data.wri0Pop,
                data.wri0Rating, data.wri0Action, data.wri0Adv, data.wri0Come, data.wri0Doc, data.wri0Drama, data.wri0Fan, data.wri0Horror, data.wri0Mus, data.wri0Rom, data.wri0Science,
                data.wri0Thrill, data.wri0War, data.wri0Act, data.wri0Dir, data.wri0Wri),
            data.description, data.screenplayRating, parseInt(data.price),
            {
              firstTopic: new Topic(data.topic1, data.tChild, data.tTeen, data.tAdult),
              secondTopic: new Topic(data.topic2, data.t2Child, data.t2Teen, data.t2Adult),
              thirdTopic: new Topic(data.topic3, data.t3Child, data.t3Teen, data.t3Adult)
            }, null, data.bought !== "false",
            {
              scope: data.scope, tone: data.tone, specialEffects: data.specialEffects
            },
            {
              violence: data.violenceAgeRating, cursing: data.CursingAgeRating, loveScenes: data.loveScenesAgeRating
            })

        this.$store.getters.getAllScreenplays.forEach(el => {
          if (el.id === data.pk_screenplayID) {
            screenplay = el
            check = true
          }
        })

        //push actor and roles
        if (data.roleType === 'main') {
          screenplay.roles.main.push(new Character(data.cFirst + " " + data.cLast, data.cGender, data.age))
          screenplay.actors.main.push([...this.$store.getters.getAllPeople].filter(el => el.id === data.act2ID)[0])
        } else if (data.roleType === 'minor') {
          screenplay.roles.minor.push(new Character(data.cFirst + " " + data.cLast, data.cGender, data.age))
          screenplay.actors.minor.push([...this.$store.getters.getAllPeople].filter(el => el.id === data.act2ID)[0])
        } else if (data.roleType === 'support'){
          screenplay.roles.support.push(new Character(data.cFirst + " " + data.cLast, data.cGender, data.age))
          screenplay.actors.support.push([...this.$store.getters.getAllPeople].filter(el => el.id === data.act2ID)[0])
        } else if (data.roleType === 'cameo') {
          screenplay.roles.cameo.push(new Character(data.cFirst + " " + data.cLast, data.cGender, data.age))
          screenplay.actors.cameo.push([...this.$store.getters.getAllPeople].filter(el => el.id === data.act2ID)[0])
        }

        if (!check) {
          this.$store.commit('addAllScreenplay', screenplay)
        }
      })

      //Movies
      window.ipcRenderer.send('getMovies', "SELECT s2.popularity as 'studioPop',g.childrenPopularity  as 'gChild',g.teenPopularity      as 'gTeen',g.adultPopularity     as 'gAdult',t.topicName           as 'topic1',t2.topicName          as 'topic2',t3.topicName          as 'topic3',t.pk_topicID          as 't1TopicID',t2.pk_topicID         as 't2TopicID',t3.pk_topicID         as 't3TopicID',t.childrenPopularity  as 'tChild',t.teenPopularity      as 'tTeen',t.adultPopularity     as 'tAdult',t2.childrenPopularity as 't2Child',t2.teenPopularity     as 't2Teen',t2.adultPopularity    as 't2Adult' ,t3.childrenPopularity as 't3Child',t3.teenPopularity     as 't3Teen',t3.adultPopularity    as 't3Adult',  movies.popularity as 'movPop', movies.foundationDate as 'movDate', p2.pk_personID as 'dirID', p2.avatar as 'dirAvatar', p2.first_name as 'dirFirst', p2.last_name as 'dirLast', p2.birthday as 'dirBirth', p2.deathAge as 'dirDeath', p2.gender as 'dirGender', p2.nationality as 'dirNat', p2.ethnicity as 'dirEth', p2.workingSince as 'dirWork', p2.performance as 'dirPer', p2.experience as 'dirExp', p2.talent as 'dirTal', p2.popularity as 'dirPop', p2.rating as 'dirRating', p2.action as 'dirAction', p2.adventure as 'dirAdv', p2.comedy as 'dirCome', p2.documentary as 'dirDoc', p2.drama as 'dirDrama', p2.fantasy as 'dirFant', p2.horror as 'dirHorror', p2.musical as 'dirMus', p2.romance as 'dirRom', p2.scienceFiction as 'dirScience', p2.thriller as 'dirThrill', p2.war as 'dirWar', p2.isActor as 'dirAct', p2.isDirector as 'dirDir', p2.isWriter as 'dirWri', p1.pk_personID as 'wriID', p1.avatar as 'wriAvatar', p1.first_name as 'wriFirst', p1.last_name as 'wriLast', p1.birthday as 'wriBirth', p1.deathAge as 'wriDeath', p1.gender as 'wriGender', p1.nationality as 'wriNat', p1.ethnicity as 'wriEth', p1.workingSince as 'wriWork', p1.performance as 'wriPer', p1.experience as 'wriExp', p1.talent as 'wriTal', p1.popularity as 'wriPop', p1.rating as 'wriRating', p1.action as 'wriAction', p1.adventure as 'wriAdv', p1.comedy as 'wriCome', p1.documentary as 'wriDoc', p1.drama as 'wriDrama', p1.fantasy as 'wriFant', p1.horror as 'wriHorror', p1.musical as 'wriMus', p1.romance as 'wriRom', p1.scienceFiction as 'wriScience', p1.thriller as 'wriThrill', p1.war as 'wriWar', p1.isActor as 'wriAct', p1.isDirector as 'wriDir', p1.isWriter as 'wriWri', * FROM movies INNER JOIN studio s2 on movies.owner = s2.pk_studioID INNER JOIN screenplay s on movies.screenplay = s.pk_screenplayID INNER JOIN genre g on g.pk_genreID = s.fk_pk_genreID INNER JOIN subgenre s3 on s3.pk_subgenreID = s.fk_pk_subgenreID INNER JOIN topics t on t.pk_topicID = s.fk_pk_topic1 INNER JOIN topics t2 on t2.pk_topicID = s.fk_pk_topic2 INNER JOIN topics t3 on t3.pk_topicID = s.fk_pk_topic3 INNER JOIN people p1 on s.fk_pk_writerID = p1.pk_personID INNER JOIN people p2 on movies.director = p2.pk_personID")
      window.ipcRenderer.receive('gotMovies', (data) => {

        let movie = new Movie(data.pk_movieID,
            new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.studioPop, {"2023": data.marketShare}),
            null, data.status, data.quality, data.totalOutgoings, data.production, data.releaseDate,
            [...this.$store.getters.getAllScreenplays].filter(el => el.id === data.screenplay)[0],
            data.hype, data.crewMorale,
            new Person(data.dirID, data.dirAvatar, data.dirFirst, data.dirLast, data.dirBirth, data.dirDeath, data.dirGender, data.dirNat,
                data.dirEth, data.dirWork, data.dirPer, data.dirExp, data.dirTal, data.dirPop,
                data.dirRating, data.dirAction, data.dirAdv, data.dirCome, data.dirDoc, data.dirDrama, data.dirFan, data.dirHorror, data.dirMus, data.dirRom, data.dirScience,
                data.dirThrill, data.dirWar, data.dirAct, data.dirDir, data.dirWri),
            data.audiencePopularity, data.movPop, data.movDate, data.totalCosts, data.critics,
            data.openingEarnings, data.totalEarnings, data.cinemaEarnings, data.dvdEarnings,
            data.childrenPopularityMovie, data.teenPopularityMovie, data.adultsPopularityMovie,
            data.marketingPrint, data.marketingInternet, data.marketingCommercials
        )
        movie.setProduction()
        movie.setPostProduction()
        movie.setRelease()

        this.$store.commit('addAllMovie', movie)
      })

      console.log(this.$store.state.allMovies)
      //Awards
      window.ipcRenderer.send('getIntAwards', "SELECT * FROM internationalAwards")
      window.ipcRenderer.receive('gotIntAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_intAwardsID, data.fk_bestActorInLeading,
            data.fk_bestActorInSupport, data.fk_bestActressInLeading, data.fk_bestActressInSupport,
            data.fk_bestMovie, data.fk_bestDirecting, data.fk_bestScreenplay, data.fk_bestWriter, null,
            null, null, null, null, null, null, null,
            "international", data.year))
        console.log(data)
      })
      window.ipcRenderer.send('getIndAwards', "SELECT * FROM independentAwards")
      window.ipcRenderer.receive('gotIndAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_indAwardsID, null,
            null, null, null,
            data.fk_bestMovie, data.fk_bestDirector, data.fk_bestScreenplay, data.fk_bestWriter, data.fk_bestActor,
            data.fk_bestActress, null, null, null, null, null, null,
            "independent", data.year))
      })
      window.ipcRenderer.send('getAudAwards', "SELECT * FROM audienceAwards")
      window.ipcRenderer.receive('gotAudAwards', (data) => {
        this.$store.commit('addAllAward', new Award(data.pk_audAwards, null,
            null, null, null,
            null, data.fk_bestDirector, data.fk_bestScreenplay, data.fk_bestWriter, data.fk_bestActor,
            data.fk_bestActress, data.fk_bestAdventure, data.fk_bestAction, data.fk_bestThriller, data.fk_bestScienceFiction, data.fk_bestFantasy, data.fk_bestHorror,
            "independent", data.year))
      })

      this.$store.commit('createStudio', {studio: new Studio(1,this.name,"2023",parseInt(this.budget),1,{"2023": 0}), logo: this.chosenLogo});
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('creatingStudio') + '...', duration: '3'}})
      if (this.databaseType === 'current') {
       //window.ipcRenderer.send('changeDBPath', "./.data/database/fsm_custom" + this.databaseVersion + ".db")
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