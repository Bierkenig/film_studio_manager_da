<template>
  <div id="createScreenplayDiv">
    <div id="createScreenplayVertical">
      <div id="createScreenplayBackground">
        <div id="createScreenplayContent">
          <div id="createScreenplayHeader">
            {{ $t('createScreenplay') }}
          </div>
          <div v-if="this.$store.getters.getCurrentFranchise !== null">{{$t('buyScreenplaySection.selFran')}}{{this.$store.getters.getCurrentFranchise.name}}</div>
          <input id="createScreenplayTitle" v-model="title" :placeholder="$t('movieTitle')" spellcheck="false"/>
          <textarea id="createScreenplayDescription" v-model="desc" :placeholder="$t('description')" />
          <select
              id="createScreenplayType"
              onfocus="this.size=5;"
              onblur="this.size=1;"
              onchange="this.size=1; this.blur();"
              v-model="type"
          >
            <option :value="null" disabled selected hidden>{{ $t('type') }}</option>
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
              <option value="Adventure">{{ $t('adventure') }}</option>
              <option value="Biography">{{ $t('biography') }}</option>
              <option value="Comedy">{{ $t('comedy') }}</option>
              <option value="Crime">{{ $t('crime') }}</option>
              <option value="Documentary">{{ $t('documentary') }}</option>
              <option value="Drama">Drama</option>
              <option value="Erotic">{{ $t('erotic') }}</option>
              <option value="Family">{{ $t('family') }}</option>
              <option value="Fantasy">Fantasy</option>
              <option value="History">{{ $t('history') }}</option>
              <option value="Horror">Horror</option>
              <option value="Musical">Musical</option>
              <option value="Mystery">{{ $t('mystery') }}</option>
              <option value="Romance">{{ $t('romance') }}</option>
              <option value="ScienceFiction">Sci-Fi</option>
              <option value="Sport">Sport</option>
              <option value="Thriller">Thriller</option>
              <option value="War">{{ $t('war') }}</option>
              <option value="Western">Western</option>
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
              <option value="Adventure" :disabled="this.genre === 'Adventure'">{{ $t('adventure') }}</option>
              <option value="Biography" :disabled="this.genre === 'Biography'">{{ $t('biography') }}</option>
              <option value="Comedy" :disabled="this.genre === 'Comedy'">{{ $t('comedy') }}</option>
              <option value="Crime" :disabled="this.genre === 'Crime'">{{ $t('crime') }}</option>
              <option value="Documentary" :disabled="this.genre === 'Documentary'">{{ $t('documentary') }}</option>
              <option value="Drama" :disabled="this.genre === 'Drama'">Drama</option>
              <option value="Erotic" :disabled="this.genre === 'Erotic'">{{ $t('erotic') }}</option>
              <option value="Family" :disabled="this.genre === 'Family'">{{ $t('family') }}</option>
              <option value="Fantasy" :disabled="this.genre === 'Fantasy'">Fantasy</option>
              <option value="History" :disabled="this.genre === 'History'">{{ $t('history') }}</option>
              <option value="Horror" :disabled="this.genre === 'Horror'">Horror</option>
              <option value="Musical" :disabled="this.genre === 'Musical'">Musical</option>
              <option value="Mystery" :disabled="this.genre === 'Mystery'">{{ $t('mystery') }}</option>
              <option value="Romance" :disabled="this.genre === 'Romance'">{{ $t('romance') }}</option>
              <option value="ScienceFiction" :disabled="this.genre === 'Science-Fiction'">Sci-Fi</option>
              <option value="Sport" :disabled="this.genre === 'Sport'">Sport</option>
              <option value="Thriller" :disabled="this.genre === 'Thriller'">Thriller</option>
              <option value="War" :disabled="this.genre === 'War'">{{ $t('war') }}</option>
              <option value="Western" :disabled="this.genre === 'Western'">Western</option>
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
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "CreateScreenplay",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

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
      allTopics: this.$store.getters.getAllTopics,
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
      this.$store.getters.getCurrentScreenplay.franchise = this.$store.getters.getCurrentFranchise
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
  },
}
</script>

<style scoped>

</style>