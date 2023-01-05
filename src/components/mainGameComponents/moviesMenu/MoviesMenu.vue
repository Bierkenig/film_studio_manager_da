<template>
  <div id="moviesMenuContainer">
    <div class="moviesMenuActionContainer">
      <action-section headline="createMovie" info-text="createMovieInfoText" button-text="create" icon="movies"/>
      <action-section headline="listOfSources" info-text="listOfSourcesInfoText" button-text="open" icon="placeholder"/>
      <action-section headline="listOfFranchises" info-text="listOfFranchisesInfoText" button-text="open" icon="settings"/>
    </div>
    <movies-section class="moviesMenuMoviesSection" headline="producedMovies"/>
  </div>
</template>

<script>
import {Screenplay} from "@/classes/Screenplay";
import financeMixin from "@/mixins/financeMixin";
import ActionSection from "@/components/mainGameComponents/moviesMenu/ActionSection";
import MoviesSection from "@/components/mainGameComponents/sectionsForMenus/MoviesSection";
export default {
  name: "MoviesMenu",
  components:{MoviesSection, ActionSection},

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
#moviesMenuContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
}

.moviesMenuActionContainer {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 20px;
}

.moviesMenuMoviesSection {
  width: 70%;
}
</style>