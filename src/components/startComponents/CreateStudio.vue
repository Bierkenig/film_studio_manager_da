<template>
  <div id="createStudioMainDiv">
    <div id="createStudioSubDiv">
      <div id="createStudioBackground">
        <div id="createStudioBox">
          <h1 id="createStudioHeading">
            {{ $t('createStudioHeader') }}
          </h1>
          <input id="createStudioName" v-model="name" type="text" placeholder='Studio Name' />
          <div id="radioBox">
            <div id="budgetHint">
              Budget
            </div>
            <div>
              <input id="hard" v-model="budget" type="radio" class="radioButton" value="25000000" />
              <label for="hard" class="labelRadio">{{ $t('hard') }} - $ 25 M</label>
            </div>
            <div>
              <input id="medium" v-model="budget" type="radio" class="radioButton" value="100000000" />
              <label for="medium" class="labelRadio">Normal - $ 100 M</label>
            </div>
            <div>
              <input id="easy" v-model="budget" type="radio" class="radioButton" value="500000000" />
              <label for="easy" class="labelRadio">{{ $t('easy') }} - $ 500 M</label>
            </div>
          </div>
          <div id="chooseLogoBox">
            <div v-for="(img,index) in this.logoImages" :key="index">
              <input v-model="chosenLogo" type="radio" class="logoRadioButton" :value="img.imgSource">
              <img :src="img.imgSource" :alt="'Logo' + index" style="width: 50px; height: 50px">
            </div>
          </div>
          <router-link :to="{ name: 'home' }">
            <button id="startButton" class="buttonStyle" :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null" @click="startGame">{{ $t('createStudioButton') }}</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Studio} from "@/classes/Studio";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import Person from "@/classes/Person";
/*import Actor from "@/classes/Actor";
import {Writer} from "@/classes/Writer";
import {Director} from "@/classes/Director";*/

export default {
  name: "CreateStudio",

  mixins: [soundeffectMixin('button','click')],

  data() {
    return {
      name: '',
      budget: "100000000",
      logoImages: [
        {
          imgSource: [require("../../assets/logo.png")],
          index: 1
        },
        {
          imgSource: [require("../../assets/Logo-v2.png")],
          index: 2
        }
      ],
      chosenLogo: null
    }
  },
  methods: {
    startGame() {
      this.$store.commit('createStudio', {studio: new Studio(this.name), budget: parseInt(this.budget), logo: this.chosenLogo});

      let writers = [], directors = [], actors = [], topics = [];
      window.ipcRenderer.send('toGetPeople','SELECT * FROM people');
      window.ipcRenderer.receive('fromGetPeople', (data) => {
        if(data.isWriter == "true"){
          writers.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.age, data.gender, data.nationality,
              data.ethnicity,data.performance, data.experience, data.depth, data.craft, data.talent,data.popularity,
              data.rating, data.salary, data.isActor, data.isDirector, data.isWriter,[]))
        }
        if(data.isDirector == "true"){
          directors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.age, data.gender, data.nationality,
              data.ethnicity,data.performance, data.experience, data.depth, data.craft, data.talent,data.popularity,
              data.rating, data.salary, data.isActor, data.isDirector, data.isWriter,[]))
        }
        if(data.isActor == "true"){
          actors.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.age, data.gender, data.nationality,
              data.ethnicity,data.performance, data.experience, data.depth, data.craft, data.talent,data.popularity,
              data.rating, data.salary, data.isActor, data.isDirector, data.isWriter,[]))
        }
      })
      window.ipcRenderer.send('toGetTopics','SELECT * FROM topics');
      window.ipcRenderer.receive('fromGetTopics', (data) => {
        topics.push(data.topicName);
      })

      window.ipcRenderer.send('toGetGenreRating','SELECT genreRating.*, g.* FROM genreRating INNER JOIN genre g ON genreRating.fk_pk_genreID = g.pk_genreID');
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
      })

      this.$store.commit('setAllWriters', writers);
      this.$store.commit('setAllDirectors', directors);
      this.$store.commit('setAllActors', actors);
      this.$store.commit('setAllTopics',topics);
    },
  },
}
</script>

<style scoped>

</style>