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

      <div>
        {{ price }}
      </div>

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
      selectedContract: null,
      price: 0
    }
  },

  watch: {
    movie: function (){
      if(this.selectedContract !== null){
        this.setMoviePrice()
      }
    },

    selectedContract: function (){
      if(this.movie !== null){
        this.setMoviePrice()
      }
    }
  },

  methods: {
    setMoviePrice(){
      //TODO: Quality ersetzen mit Audience Rating
      let percentage = 0;
      if(this.movie.quality < 50){
        percentage = (Math.floor(Math.random() * (75 - 25 + 1) + 25)) / 100;
      } else if(this.movie.quality >= 50 && this.movie.quality < 75){
        percentage = (Math.floor(Math.random() * (100 - 50 + 1) + 50)) / 100;
      } else {
        percentage = (Math.floor(Math.random() * (125 - 75 + 1) + 75)) / 100;
      }

      if(this.selectedContract === 3){
        percentage = percentage * 1.5;
      } else if(this.selectedContract === 5){
        percentage = percentage * 2;
      }

      this.price = this.movie.totalOutgoings * percentage;
    },

    buyRights(){
      let sendMovie = this.movie;
      sendMovie.contract = this.selectedContract;
      sendMovie._boughtRightDate = this.$store.getters.getCurrentDate;
      sendMovie._totalCosts = this.price;
      sendMovie._preProduction.hype = 100;
      this.$store.commit('addBoughtMovieRights',sendMovie);
      this.$router.push({name: 'streaming'})
    }
  }
}
</script>

<style scoped>

</style>