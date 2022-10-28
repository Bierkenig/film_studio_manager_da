<template>
  <div>
    <button id="createMovieButton">{{ $t('createMovie') }}</button>
    <router-link to="createScreenplay">
      <button id="createScreenplayButton">{{ $t('createScreenplay') }}</button>
    </router-link>
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
export default {
  name: "MoviesMenu",
  components:{FranchisesSection, ScreenplaySection, MovieSection},

  data(){
    return{
      allOwningScreenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
    }
  }
}
</script>

<style scoped>

</style>