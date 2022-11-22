<template>
  <div id="movieDetailsDiv">
    <div id="movieDetailsVertical">
      <div id="movieTitle" v-if="movie !== null">
        {{ movie.title }}
        <div v-show="!movie.title" class="movieDetailsInvisible">X</div>
      </div>
      <div id="movieDetailsData">
        <div id="movieDetailsEarnings">
          <div v-show="movie" id="movieDetailsEarningsHint">Earnings</div>
          <div id="movieDetailsEarningsValue" v-if="movie !== null">{{ movie.earnings }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
        <div id="movieDetailsScreenplay">
          <div v-show="movie" id="movieDetailsScreenplayHint">Screenplay</div>
          <div id="movieDetailsScreenplayValue" v-if="movie !== null">{{ movie.screenplay }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
        <div id="movieDetailsDate">
          <div v-show="movie" id="movieDetailsDateHint">Date</div>
          <div id="movieDetailsDateValue" v-if="movie !== null">{{ movie.date }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
        <div id="movieDetailsOwner">
          <div v-show="movie" id="movieDetailsOwnerHint">Owner</div>
          <div id="movieDetailsOwnerValue" v-if="movie !== null">{{ movie.owner }}<div v-show="!movie" class="movieDetailsInvisible">X</div></div>
        </div>
      </div>

      <select
          id="contract"
          onfocus="this.size=5;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
          v-model="selectedContract"
      >
        <option value="" disabled selected hidden>Contract</option>
        <option :value="3">3 Years</option>
        <option :value="5">5 Years</option>
        <option :value="10">10 Years</option>
      </select>

      <router-link :to="{name: 'streaming'}">
        <button id="buyMovieRightButton" class="buttonStyle" @click="buyRights" :disabled="checkBalance || selectedContract === 0">Buy Rights</button>
      </router-link>
      <button id="buyMovieRightBackButton" class="buttonStyle" @click="this.$router.push({name: 'streaming'})">Back</button>
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
      selectedContract: 0
    }
  },

  methods: {
    buyRights(){
      let sendMovie = this.movie;
      sendMovie.contract = this.selectedContract;
      this.$store.commit('addOwningMovie',sendMovie);
    }
  }
}
</script>

<style scoped>

</style>