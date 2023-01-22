<template>
  <div class="mainDivContainer">
    <game-header
        class="gameHeaderComponent"
        v-if="this.showOnPage.includes(this.$route.name)"
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)"/>

    <router-view class="routerViewContainer"/>

    <menu-nav
        class="menuNavComponent"
        v-show="this.showOnPage.includes(this.$route.name)"
        v-observe-visibility="visibilityChanged"
        :check-visibility="checkNavVisibility"
    />

   <!-- <audio id="backgroundMusic" autoplay loop>
      <source src="./backgroundMusic/backgroundMusic.mp3" type="audio/mpeg">
    </audio>-->
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";
import store from "./services/store";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import Person from "@/classes/Person";
import {Character} from "@/classes/Character";
import Earnings from "@/classes/Earnings";

export default {
  name: 'App',
  components: {GameHeader, MenuNav},
  mixins: [soundeffectMixin('button','click')],
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar'],
      checkNavVisibility: false
    }
  },

  methods: {
    visibilityChanged (isVisible) {
      this.checkNavVisibility = (isVisible && this.$router.options.history.state.back === '/createStudio')
          || (isVisible && this.$router.options.history.state.back === '/loadings');
    }
  },

  mounted(){

    window.ipcRenderer.send('r2mSettingsLoading')
    window.ipcRenderer.receive('m2rSettingsLoading', async data => {
      if(data !== null) {
        let saveData = data.state
        if(saveData.currentLanguage !== "de"){
          saveData.currentLanguage = "en"
        }
        if(saveData.soundeffects !== false){
          saveData.soundeffects = true
        }
        if(saveData.backgroundMusic !== false){
          saveData.backgroundMusic = true
        }
        this.$store.commit('setCurrentBackgroundMusic', saveData.backgroundMusic);
        this.$store.commit('setCurrentSoundeffect', saveData.soundeffects);
        this.$store.commit('changeCurrentLanguage', saveData.currentLanguage);
        await new Promise(resolve => setTimeout(resolve, 20))
        console.log('Settings-File was loaded')
      }
    })
  },

  created(){
    setInterval(function() {
      //window.ipcRenderer.send('autoSave', [JSON.stringify(store.state),store.getters.getSlot])
      if(store.getters.getSlot !== null){
        let reducedState = {}
        store.commit("stateToSave", reducedState)
        window.ipcRenderer.send('autoSave', [JSON.stringify(reducedState), store.getters.getSlot])
        console.log(store);
      }
    }, 600000);

    let writers = [], directors = [], actors = [], topics = [], people = [];
    window.ipcRenderer.send('toGetPeople','SELECT * FROM people');
    window.ipcRenderer.receive('fromGetPeople', (data) => {
      if(data.isWriter == "true"){
        writers.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.gender, data.nationality,
            data.ethnicity,data.performance, data.experience, data.talent,data.popularity,
            data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
            data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
            data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
      }
      if(data.isDirector == "true"){
        directors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.gender, data.nationality,
            data.ethnicity,data.performance, data.experience, data.talent,data.popularity,
            data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
            data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
            data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
      }
      if(data.isActor == "true"){
        actors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.gender, data.nationality,
            data.ethnicity,data.performance, data.experience, data.talent,data.popularity,
            data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
            data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
            data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
      }
      people.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.birthday, data.gender, data.nationality,
          data.ethnicity,data.performance, data.experience, data.talent,data.popularity,
          data.rating, data.action, data.adventure, data.biography, data.comedy, data.crime, data.documentary, data.drama, data.erotic,
          data.family, data.fantasy, data.history, data.horror, data.musical, data.mystery, data.romance, data.scienceFiction, data.sport,
          data.thriller, data.war, data.western, data.isActor, data.isDirector, data.isWriter))
    })
    window.ipcRenderer.send('toGetTopics','SELECT * FROM topics');
    window.ipcRenderer.receive('fromGetTopics', (data) => {
      topics.push(data.topicName);
    })

    /*window.ipcRenderer.send('toGetGenreRating','SELECT genreRating.*, g.* FROM genreRating INNER JOIN genre g ON genreRating.fk_pk_genreID = g.pk_genreID');
    window.ipcRenderer.receive('fromGetGenreRating', (data) => {
      for (let i = 0; i < writers.length; i++) {
        if(data.fk_pk_personID === writers[i]._id){
          writers[i]._genre[data.genreName] = data.number;
        }
      }

      for (let i = 0; i < directors.length; i++) {
        if(data.fk_pk_personID === directors[i]._id){
          directors[i]._genre[data.genreName] = data.number;
        }
      }

      for (let i = 0; i < actors.length; i++) {
        if(data.fk_pk_personID === actors[i]._id){
          actors[i]._genre[data.genreName] = data.number;
        }
      }

      for (let i = 0; i < people.length; i++) {
        if(data.fk_pk_personID === people[i]._id) {
          people[i]._genre[data.genreName] = data.number;
        }
      }
    })*/

    //test

    this.$store.commit('setAllWriters', writers);
    this.$store.commit('setAllDirectors', directors);
    this.$store.commit('setAllActors', actors);
    this.$store.commit('setAllTopics',topics);
    this.$store.commit('setAllPeople', people);

    this.$store.getters.getBoughtScreenplays[0].setRatingRange('61 - 70');
    this.$store.getters.getBoughtScreenplays[0].addMainCharacter(new Character('Woodie','male',18));
    this.$store.getters.getBoughtScreenplays[0].addSupportCharacter(new Character('Buzz','male',16));
    this.$store.getters.getBoughtScreenplays[0].addMinorCharacter(new Character('Andy','male',25));
    this.$store.getters.getBoughtScreenplays[0].setAct1([{
      id: 0,
      characterOne: 'Woodie',
      characterMoment: 'dies',
      characterTwo: '',
      textDe: 'Charakter Ereignis: Woodie stirbt',
      textEn: 'Character Moment: Woodie dies',
      list: '1',
      type: 'characterMoment'
    },
        {
          id: 1,
          value: 'undefined',
          textDe: 'Ort: Unbestimmt',
          textEn: 'Setting: Undefined',
          list: '1',
          type: 'setting'
        },
        {
          id: 2,
          value: 'presentDay',
          textDe: 'Zeitspanne: Gegenwart',
          textEn: 'Time Period: Present Day',
          list: '1',
          type: 'timePeriod'
        }]);
    this.$store.getters.getBoughtScreenplays[0].setAct2([{
          id: 3,
          characterOne: 'Buzz',
          characterMoment: 'dies',
          characterTwo: '',
          textDe: 'Charakter Ereignis: Buzz stirbt',
          textEn: 'Character Moment: Buzz dies',
          list: '2',
          type: 'characterMoment'
        },
        {
          id: 4,
          value: 'undefined',
          textDe: 'Ort: Unbestimmt',
          textEn: 'Setting: Undefined',
          list: '2',
          type: 'setting'
        },
        {
          id: 5,
          value: 'presentDay',
          textDe: 'Zeitspanne: Gegenwart',
          textEn: 'Time Period: Present Day',
          list: '2',
          type: 'timePeriod'
        }]);
    this.$store.getters.getBoughtScreenplays[0].setAct3([{
          id: 6,
          characterOne: 'Andy',
          characterMoment: 'dies',
          characterTwo: '',
          textDe: 'Charakter Ereignis: Andy stirbt',
          textEn: 'Character Moment: Andy dies',
          list: '3',
          type: 'characterMoment'
        },
        {
          id: 7,
          value: 'undefined',
          textDe: 'Ort: Unbestimmt',
          textEn: 'Setting: Undefined',
          list: '3',
          type: 'setting'
        },
        {
          id: 8,
          value: 'presentDay',
          textDe: 'Zeitspanne: Gegenwart',
          textEn: 'Time Period: Present Day',
          list: '3',
          type: 'timePeriod'
        }]);
    this.$store.getters.getBoughtScreenplays[0].setScope('Little');
    this.$store.getters.getBoughtScreenplays[0].setTone('Dark');
    this.$store.getters.getBoughtScreenplays[0].setSpecialEffects('Medium');
    this.$store.getters.getBoughtScreenplays[0].setViolence('G / +3');
    this.$store.getters.getBoughtScreenplays[0].setCursing('G / +3');
    this.$store.getters.getBoughtScreenplays[0].setLoveScenes('G / +3');
    this.$store.getters.getBoughtScreenplays[0].setLength('152');
    this.$store.getters.getBoughtScreenplays[0].setWritingPhase(14);

    this.$store.getters.getScreenplays[0].setRatingRange('61 - 70');
    this.$store.getters.getScreenplays[0].addMainCharacter(new Character('Woodie','male',18));
    this.$store.getters.getScreenplays[0].addSupportCharacter(new Character('Buzz','male',16));
    this.$store.getters.getScreenplays[0].addMinorCharacter(new Character('Andy','male',25));
    this.$store.getters.getScreenplays[0].setAct1([{
          id: 0,
          characterOne: 'Woodie',
          characterMoment: 'dies',
          characterTwo: '',
          textDe: 'Charakter Ereignis: Woodie stirbt',
          textEn: 'Character Moment: Woodie dies',
          list: '1',
          type: 'characterMoment'
        },
        {
          id: 1,
          value: 'undefined',
          textDe: 'Ort: Unbestimmt',
          textEn: 'Setting: Undefined',
          list: '1',
          type: 'setting'
        },
        {
          id: 2,
          value: 'presentDay',
          textDe: 'Zeitspanne: Gegenwart',
          textEn: 'Time Period: Present Day',
          list: '1',
          type: 'timePeriod'
        }]);
    this.$store.getters.getScreenplays[0].setAct2([{
          id: 3,
          characterOne: 'Buzz',
          characterMoment: 'dies',
          characterTwo: '',
          textDe: 'Charakter Ereignis: Buzz stirbt',
          textEn: 'Character Moment: Buzz dies',
          list: '2',
          type: 'characterMoment'
        },
        {
          id: 4,
          value: 'undefined',
          textDe: 'Ort: Unbestimmt',
          textEn: 'Setting: Undefined',
          list: '2',
          type: 'setting'
        },
        {
          id: 5,
          value: 'presentDay',
          textDe: 'Zeitspanne: Gegenwart',
          textEn: 'Time Period: Present Day',
          list: '2',
          type: 'timePeriod'
        }]);
    this.$store.getters.getScreenplays[0].setAct3([{
          id: 6,
          characterOne: 'Andy',
          characterMoment: 'dies',
          characterTwo: '',
          textDe: 'Charakter Ereignis: Andy stirbt',
          textEn: 'Character Moment: Andy dies',
          list: '3',
          type: 'characterMoment'
        },
        {
          id: 7,
          value: 'undefined',
          textDe: 'Ort: Unbestimmt',
          textEn: 'Setting: Undefined',
          list: '3',
          type: 'setting'
        },
        {
          id: 8,
          value: 'presentDay',
          textDe: 'Zeitspanne: Gegenwart',
          textEn: 'Time Period: Present Day',
          list: '3',
          type: 'timePeriod'
        }]);
    this.$store.getters.getScreenplays[0].setScope('Little');
    this.$store.getters.getScreenplays[0].setTone('Dark');
    this.$store.getters.getScreenplays[0].setSpecialEffects('Medium');
    this.$store.getters.getScreenplays[0].setViolence('G / +3');
    this.$store.getters.getScreenplays[0].setCursing('G / +3');
    this.$store.getters.getScreenplays[0].setLoveScenes('G / +3');
    this.$store.getters.getScreenplays[0].setLength('152');
    this.$store.getters.getScreenplays[0].setWritingPhase(14);

    this.$store.getters.getFinishedMovies[0]._preProduction.screenplay = this.$store.getters.getScreenplays[0];
    this.$store.getters.getFinishedMovies[0]._foundationDate = this.$store.getters.getCurrentDate;
    this.$store.getters.getFinishedMovies[0].genrePopularity = {children: 18, teenager: 85, adult: 59};
    this.$store.getters.getFinishedMovies[0].subgenrePopularity = {children: 55, teenager: 37, adult: 75};
    this.$store.getters.getFinishedMovies[0].topicPopularity = {firstTopic: {children: 28, teenager: 3, adult: 5},
      secondTopic: {children: 96, teenager: 58, adult: 75},
      thirdTopic: {children: 25, teenager: 86, adult: 15}};

    this.$store.getters.getFinishedMovies[0]._earnings.push(new Earnings(2500000,new Date('01.01.2023')))
    this.$store.getters.getFinishedMovies[0]._earnings.push(new Earnings(3500000,new Date('02.01.2023')))
    this.$store.getters.getFinishedMovies[0]._earnings.push(new Earnings(750000,new Date('03.01.2023')))
  }
}
</script>

<style>
@import "@/style/stylesheet.css";

html, body {
  min-height: 100%;
}

.mainDivContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.gameHeaderComponent {
  margin-top: 20px;
  margin-bottom: 40px;
}

.menuNavComponent {
  margin-top: 40px;
  margin-bottom: 40px;
}

.routerViewContainer {
  display: flex;
  flex-direction: column;
  margin-right: 100px;
  margin-left: 100px;
  flex: 1;
}
</style>