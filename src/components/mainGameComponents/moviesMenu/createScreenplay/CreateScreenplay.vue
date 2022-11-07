<template>
  <div id="createScreenplayDiv">
    <div id="createScreenplayVertical">
      <div id="createScreenplayBackground">
        <div id="createScreenplayContent">
          <div id="createScreenplayHeader">
            {{ $t('createScreenplay') }}
          </div>
          <input id="createScreenplayTitle" v-model="title" :placeholder="$t('movieTitle')" />
          <textarea id="createScreenplayDescription" v-model="desc" :placeholder="$t('description')" />
          <select
              id="createScreenplayType"
              onfocus="this.size=5;"
              onblur="this.size=1;"
              onchange="this.size=1; this.blur();"
              @change="selectType($event)"
          >
            <option value="" disabled selected hidden>Type</option>
            <option value="Feature">Feature</option>
            <option value="Indie">Indie</option>
            <option value="Animation">Animation</option>
          </select>
          <div id="createScreenplayData">
            <select
              id="createScreenplayGenre"
              onfocus="this.size=5;"
              onblur="this.size=1;"
              onchange="this.size=1; this.blur();"
              @change="selectGenre($event)"
            >
              <option value="" disabled selected hidden>Genre</option>
              <option value="Action">Action</option>
              <option value="Comedy">{{ $t('comedy') }}</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Musical">Musical</option>
              <option value="Romance">{{ $t('romance') }}</option>
              <option value="ScienceFiction">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Western">Western</option>
              <option value="History">{{ $t('history') }}</option>
            </select>
            <select
                id="createScreenplaySubgenre"
                :disabled="!this.genre"
                onfocus="this.size=5;"
                onblur="this.size=1;"
                onchange="this.size=1; this.blur();"
                @change="selectSubgenre($event)"
            >
              <option value="" disabled selected hidden>Subgenre</option>
              <option value="Action" :disabled="this.genre === 'Action'">Action</option>
              <option value="Comedy" :disabled="this.genre === 'Comedy'">{{ $t('comedy') }}</option>
              <option value="Drama" :disabled="this.genre === 'Drama'">Drama</option>
              <option value="Fantasy" :disabled="this.genre === 'Fantasy'">Fantasy</option>
              <option value="Horror" :disabled="this.genre === 'Horror'">Horror</option>
              <option value="Musical" :disabled="this.genre === 'Musical'">Musical</option>
              <option value="Romance" :disabled="this.genre === 'Romance'">{{ $t('romance') }}</option>
              <option value="ScienceFiction" :disabled="this.genre === 'Science-Fiction'">Science-Fiction</option>
              <option value="Thriller" :disabled="this.genre === 'Thriller'">Thriller</option>
              <option value="Western" :disabled="this.genre === 'Western'">Western</option>
              <option value="History" :disabled="this.genre === 'History'">{{ $t('history') }}</option>
            </select>
            <div>
              <h3>{{ $t('topics') }}</h3>
              <select
                  v-for="index in 3"
                  :key="index"
                  :id="'topic' + index"
                  onfocus="this.size=5;"
                  onblur="this.size=1;"
                  onchange="this.size=1; this.blur();"
                  :disabled="disableSelect(index)"
                  @change="selectTopic($event,index)"
              >
                <option value="" disabled selected hidden>{{ $t('topic') }} {{ index }}</option>
                <option
                    v-for="(it,ind) in this.allTopics"
                    :key="ind"
                    :value="it"
                    :disabled="disableTopic(it,index)">{{ it }}</option>
              </select>
            </div>
          </div>
          <button id="createScreenplayButton" class="buttonStyle"
                  :disabled="/*!ageRating ||*/ !genre || !title || !desc || !type || !firstTopic"
                  @click="createScreenplay">
            {{ $t('createScreenplay') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";

export default {
  name: "CreateScreenplay",

  data() {
    return {
      screenplay: null,
      title: null,
      type: null,
      desc: null,
      genre: null,
      subgenre: null,
      firstTopic: null,
      secondTopic: null,
      thirdTopic: null,
      allTopics: ['AB','CD','EF','GH','IJ'],
    }
  },

  /*this.title = screenplay.title;
  document.getElementById('createScreenplayType').value = screenplay.type;
  this.type = screenplay.type;
  this.desc = screenplay.description;
  document.getElementById('createScreenplayGenre').value = screenplay.genre;
  this.genre = screenplay.genre;
  document.getElementById('createScreenplaySubgenre').value = screenplay.subgenre;
  this.subgenre = screenplay.subgenre;
  document.getElementById('topic1').value = screenplay.topics.firstTopic;
  this.firstTopic = screenplay.topics.firstTopic;
  document.getElementById('topic2').value = screenplay.topics.secondTopic;
  this.secondTopic = screenplay.topics.secondTopic;
  document.getElementById('topic3').value = screenplay.topics.thirdTopic;
  this.thirdTopic = screenplay.topics.thirdTopic;*/

  methods: {
    createScreenplay() {
      this.screenplay = new Screenplay(this.$store.getters.getNextScreenplayId, this.title, this.type, this.genre,
          this.subgenre, /*this.ageRating*/null, null, this.desc, null, null,
          {firstTopic: this.firstTopic, secondTopic: this.secondTopic, thirdTopic: this.thirdTopic});
      this.$store.commit('setNewCurrentScreenplay', this.screenplay);
      this.$router.push({name: 'screenplayCharacters'});
    },

    /*selectAgeRating(event) {
      this.ageRating = event.target.value;
    },*/

    selectTopic(event,index){
      switch (index) {
        case 1:
          this.firstTopic = event.target.value;
          break;
        case 2:
          this.secondTopic = event.target.value;
          break;
        case 3:
          this.thirdTopic = event.target.value;
          break;
        default:
          break;
      }
    },

    selectGenre(event) {
      this.genre = event.target.value;
    },

    selectSubgenre(event) {
      this.subgenre = event.target.value;
    },

    selectType(event){
      this.type = event.target.value;
    },

    disableTopic(value, index){
      if(index === 2){
        return value === this.firstTopic;
      } else if(index === 3){
        return value === this.firstTopic || value === this.secondTopic;
      }
    },

    disableSelect(index){
      if((index === 2 || index === 3) && this.firstTopic === null){
        return true;
      } else if(index === 3 && this.secondTopic === null){
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>

<style scoped>

</style>