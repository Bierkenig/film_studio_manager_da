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
import Actor from "@/classes/Actor";
import {Writer} from "@/classes/Writer";
import {Director} from "@/classes/Director";

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

      let directors = [], writers = [], actors = [];
      window.ipcRenderer.send('toMain','SELECT * FROM actors');
      window.ipcRenderer.receive('fromMain', (data) => {
        if(data.pk_actorID !== undefined){
          actors.push(new Actor(data.pk_actorID, data.first_name, data.last_name, data.age, data.rating,
              null, data.salary, data.gender, null, data.depth, data.ethnicity, data.experience,
              data.nationality, data.performance, data.popularity));
        }
      })
      window.ipcRenderer.send('toMain','SELECT * FROM writer');
      window.ipcRenderer.receive('fromMain', (data2) => {
        if(data2.pk_writerID !== undefined){
          writers.push(new Writer(data2.pk_writerID, data2.first_name, data2.last_name, data2.age, data2.rating,
              null, data2.salary, data2.gender, null, data2.depth, data2.ethnicity, data2.experience,
              data2.nationality, data2.performance, data2.popularity));
        }
      })
      window.ipcRenderer.send('toMain','SELECT * FROM directors');
      window.ipcRenderer.receive('fromMain', (data3) => {
        if(data3.pk_directorID !== undefined){
          directors.push(new Director(data3.pk_directorID, data3.first_name, data3.last_name, data3.age, data3.rating,
              null, data3.salary, data3.gender, null, data3.craft, data3.ethnicity, data3.experience,
              data3.nationality, data3.performance, data3.popularity));
        }
      })
      this.$store.commit('setAllActors', actors);
      this.$store.commit('setAllDirectors', directors);
      this.$store.commit('setAllWriters', writers);
    },
  },
}
</script>

<style scoped>

</style>