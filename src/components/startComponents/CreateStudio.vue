<template>
  <div id="createStudioMainDiv">
    <div id="createStudioSubDiv">
      <div>
        <icon-button
            id="createStudioBackButton"
            icon="simple-arrow-left"
            size="medium"
            :dark="true"
            :bg-gradient="true"
            :icon-gradient="false"
            :shadow="false"
            @click="goBack()"/>
      </div>
      <div class="createStudioBackground">
        <h1 class="createStudioHeading">
          {{ $t('createStudioHeader') }}
        </h1>
        <div class="createStudioBox">
          <div class="createStudioBoxInnerElement">
            <label id="createStudioNameLabel" for="createStudioName">Studio Name</label>
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
          </div>
        </div>
        <h1 class="createStudioHeading" id="createStudioModificationHeading">
          Modifications
        </h1>
        <div class="createStudioBox">
          <div class="createStudioBoxInnerElement" id="createStudioBoxModificationInformation">
            <div>Do you want to use the current modified database or the default?</div>
          </div>
        </div>
        <custom-button id="createStudioContinueButton" :dark="false" size="medium" :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null" @clicked="startGame">{{ $t('createStudioButton') }}</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Studio} from "@/classes/Studio";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import Person from "@/classes/Person";
//import SettingsHeader from "@/components/startComponents/SettingsHeader";
import IconButton from "@/components/kitchenSink/IconButton";
import CustomButton from "@/components/kitchenSink/CustomButton";
//import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
/*import Actor from "@/classes/Actor";
import {Writer} from "@/classes/Writer";
import {Director} from "@/classes/Director";*/

export default {
  name: "CreateStudio",
  components: {CustomButton, IconButton},
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

      let writers = [], directors = [], actors = [], topics = [], people = [];
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
        people.push(new Person(data.pk_personID,data.avatar,data.first_name,data.last_name, data.age, data.gender, data.nationality,
            data.ethnicity,data.performance, data.experience, data.depth, data.craft, data.talent,data.popularity,
            data.rating, data.salary, data.isActor, data.isDirector, data.isWriter,[]))
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

        for (let i = 0; i < people.length; i++) {
          if(data.fk_pk_personID === people[i]._id) {
            people[i]._genre[data.genreName] = data.number;
          }
        }
      })

      this.$store.commit('setAllWriters', writers);
      this.$store.commit('setAllDirectors', directors);
      this.$store.commit('setAllActors', actors);
      this.$store.commit('setAllTopics',topics);
      this.$store.commit('setAllPeople', people);

      this.$router.push({name: 'home'})
    },

    test(){
      console.log(this.budget)
    },

    goBack(){
      this.$router.push({name: 'default'})
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

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  width: 350px;
  padding: 10px 20px 10px 20px;
}

.createStudioBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  margin-top: 10px;
}

#createStudioSettingHeader {
  position: absolute;
  float: right;
  right: 100px;
  top: 20px;
}

#createStudioBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

.createStudioBoxInnerElement {
  margin-left: 20px;
  padding-top: 20px;
}

#createStudioName {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  height: 30px;
  width: 80%;
  margin-top: 10px;
  padding-left: 10px;
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

#createStudioContinueButton {
  margin-top: 20px;
}
</style>