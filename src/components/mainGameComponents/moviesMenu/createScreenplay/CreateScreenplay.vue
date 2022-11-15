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
              v-model="type"
          >
            <option :value="null" disabled selected hidden>Type</option>
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
              v-model="genre"
            >
              <option :value="null" disabled selected hidden>Genre</option>
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
                v-model="subgenre"
            >
              <option :value="null" disabled selected hidden>Subgenre</option>
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
                  v-model="topics[index-1]"
              >
                <option :value="undefined" disabled selected hidden>{{ $t('topic') }} {{ index }}</option>
                <option
                    v-for="(it,ind) in this.allTopics"
                    :key="ind"
                    :value="it"
                    :disabled="disableTopic(it,index)">{{ it }}</option>
              </select>
            </div>
          </div>
          <button id="createScreenplayButton" class="buttonStyle"
                  :disabled="!genre || !title || !desc || !type || topics[0] === undefined"
                  @click="createScreenplay">
            {{ $t('continue') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CreateScreenplay",

  data() {
    return {
      title: this.$store.getters.getCurrentScreenplay.title,
      type: this.$store.getters.getCurrentScreenplay.type,
      desc: this.$store.getters.getCurrentScreenplay.description,
      genre: this.$store.getters.getCurrentScreenplay.genre,
      subgenre: this.$store.getters.getCurrentScreenplay.subgenre,
      topics: [this.$store.getters.getCurrentScreenplay.topics.firstTopic,
        this.$store.getters.getCurrentScreenplay.topics.secondTopic,
        this.$store.getters.getCurrentScreenplay.topics.thirdTopic],
      allTopics: ['AB','CD','EF','GH','IJ'],
    }
  },

  methods: {
    createScreenplay() {
      this.$store.getters.getCurrentScreenplay.title = this.title;
      this.$store.getters.getCurrentScreenplay.type = this.type;
      this.$store.getters.getCurrentScreenplay.description = this.desc;
      this.$store.getters.getCurrentScreenplay.genre = this.genre;
      this.$store.getters.getCurrentScreenplay.subgenre = this.subgenre;
      this.$store.getters.getCurrentScreenplay.topics.firstTopic = this.topics[0];
      this.$store.getters.getCurrentScreenplay.topics.secondTopic = this.topics[1];
      this.$store.getters.getCurrentScreenplay.topics.thirdTopic = this.topics[2];
      this.$router.push({name: 'screenplayCharacters'});
    },

    disableTopic(value, index){
      if(index === 2){
        return value === this.topics[0];
      } else if(index === 3){
        return value === this.topics[0] || value === this.topics[1];
      }
    },

    disableSelect(index){
      if((index === 2 || index === 3) && this.topics[0] === null){
        return true;
      } else if(index === 3 && this.topics[1] === null){
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