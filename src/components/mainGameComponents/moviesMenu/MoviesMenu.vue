<template>
  <div>
    <button id="createMovieButton">{{ $t('createMovie') }}</button>
    <button id="createScreenplayButton" @click="goToCreateScreenplay">{{ $t('createScreenplay') }}</button>
    <button id="buyScreenplayButton">{{ $t('buyScreenplay') }}</button>
    <movie-section class="finishedMovies" :heading="$t('finishedMovies')" :data="this.$store.getters.getFinishedMovies"/>
    <screenplay-section class="owningScreenplays" :heading="$t('owningScreenplays')" :data="allOwningScreenplays"/>
    <franchises-section class="franchises"/>
  </div>
</template>

<script>
import MovieSection from "@/components/mainGameComponents/sectionsForMenus/MovieSection";
import ScreenplaySection from "@/components/mainGameComponents/sectionsForMenus/ScreenplaySection";
import FranchisesSection from "@/components/mainGameComponents/sectionsForMenus/FranchisesSection";
import {Screenplay} from "@/classes/Screenplay";
import financeMixin from "@/mixins/financeMixin";
export default {
  name: "MoviesMenu",
  components:{FranchisesSection, ScreenplaySection, MovieSection},

  mixins: [financeMixin()],

  data(){
    return{
      allOwningScreenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
    }
  },

  methods: {
    goToCreateScreenplay(){
      this.$store.commit('setNewCurrentScreenplay', new Screenplay(this.$store.getters.getNextScreenplayId, null, null, null,
          null,null, null, null, null, null,
          {firstTopic: undefined, secondTopic: undefined, thirdTopic: undefined}));
      this.$router.push({name: 'createScreenplay'});
    }
  }
}
</script>

<style scoped>

</style>