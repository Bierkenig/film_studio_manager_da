<template>
  <div id="movieDetailsDiv">
    <div id="movieDetailsVertical">
      <div id="movieTitle" v-if="movie !== null">
        {{ movie.title }}
        <div v-show="!movie.title" class="movieDetailsInvisible">X</div>
      </div>
      <div id="movieDetailsData">
        <div id="movieDetailsEarnings">
          <div v-show="movie" id="movieDetailsEarningsHint">{{ $t('earnings' ) }}</div>
          <div id="movieDetailsEarningsValue" v-if="movie !== null">{{ movie.earnings }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
        <div id="movieDetailsScreenplay">
          <div v-show="movie" id="movieDetailsScreenplayHint">{{ $t('screenplay') }}</div>
          <div id="movieDetailsScreenplayValue" v-if="movie !== null">{{ movie.screenplay }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
        <div id="movieDetailsDate">
          <div v-show="movie" id="movieDetailsDateHint">{{ $t('date') }}</div>
          <div id="movieDetailsDateValue" v-if="movie !== null">{{ movie.date }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
        <div id="movieDetailsOwner">
          <div v-show="movie" id="movieDetailsOwnerHint">{{ $t('owner') }}</div>
          <div id="movieDetailsOwnerValue" v-if="movie !== null">{{ movie.owner }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
      </div>

      <select
          id="contract"
          v-model="selectedContract"
      >
        <option :value="null" disabled selected hidden>{{ $t('contract') }}</option>
        <option :value="1">1 {{ $t('newsData.year') }}</option>
        <option :value="3">3 {{ $t('years') }}</option>
        <option :value="5">5 {{ $t('years') }}</option>
      </select>

      <router-link :to="{name: 'streaming'}">
        <button id="buyMovieRightButton" class="buttonStyle" @click="buyRights" :disabled="checkBalance || !selectedContract || !movie">{{ $t('buyRights') }}</button>
      </router-link>
      <button id="buyMovieRightBackButton" class="buttonStyle" @click="this.$router.push({name: 'streaming'})">{{ $t('back') }}</button>
    </div>
  </div>
</template>

<script>
import {Movie} from "@/classes/Movie";

export default {
  name: "MovieDetails",

  props: {
    movie: Movie,
    checkBalance: Boolean,
  },

  data(){
    return {
      selectedContract: null
    }
  },

  methods: {
    buyRights(){
      let sendMovie = this.movie;
      sendMovie.contract = this.selectedContract;
      this.$store.commit('addBoughtMovieRights',sendMovie);
      this.$router.push({name: 'streaming'})
    }
  }
}
</script>

<style scoped>

</style>