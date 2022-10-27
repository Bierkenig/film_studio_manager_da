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
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Musical">Musical</option>
              <option value="Romance">Romance</option>
              <option value="ScienceFiction">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Western">Western</option>
              <option value="History">History</option>
            </select>
            <select
                id="createScreenplaySubgenre"
                onfocus="this.size=5;"
                onblur="this.size=1;"
                onchange="this.size=1; this.blur();"
                @change="selectSubgenre($event)"
            >
              <option value="" disabled selected hidden>Subgenre</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Horror">Horror</option>
              <option value="Musical">Musical</option>
              <option value="Romance">Romance</option>
              <option value="ScienceFiction">Sci-Fi</option>
              <option value="Thriller">Thriller</option>
              <option value="Western">Western</option>
              <option value="History">History</option>
            </select>
            <select
              id="createScreenplayAgeRating"
              onfocus="this.size=5;"
              onblur="this.size=1;"
              onchange="this.size=1; this.blur();"
              @change="selectAgeRating($event)"
            >
              <option value="" disabled selected hidden>Age Rating</option>
              <option value="G">3+</option>
              <option value="PG">6+</option>
              <option value="PG-13">13+</option>
              <option value="R">16+</option>
              <option value="NC-17">18+</option>
            </select>
          </div>
          <button id="createScreenplayButton" class="buttonStyle"
                  :disabled="!ageRating || !genre || !title || !desc || !type"
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
      ageRating: null,
      genre: null,
      subgenre: null
    }
  },

  methods: {
    createScreenplay() {
      this.screenplay = new Screenplay(this.$store.getters.getNextScreenplayId, this.title, this.type, this.genre, this.subgenre, this.ageRating, null, this.desc, null, null);
      this.$store.commit('setNewCurrentScreenplay', this.screenplay);
      console.log(this.$store.getters.getCurrentScreenplay)
      this.$router.push({name: 'screenplayCharacters'});
    },

    selectAgeRating(event) {
      this.ageRating = event.target.value;
    },

    selectGenre(event) {
      this.genre = event.target.value;
    },

    selectSubgenre(event) {
      this.subgenre = event.target.value;
    },

    selectType(event){
      this.type = event.target.value;
    }
  }
}
</script>

<style scoped>

</style>