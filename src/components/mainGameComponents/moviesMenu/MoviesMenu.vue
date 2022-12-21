<template>
  <div id="moviesMenuContainer">
    <div class="moviesMenuActionContainer">
      <action-section headline="createScreenplay" info-text="createMovieInfoText" button-text="create"/>
      <action-section headline="listOfSources" info-text="listOfSourcesInfoText" button-text="open"/>
      <action-section headline="listOfFranchises" info-text="listOfFranchisesInfoText" button-text="open"/>
    </div>
    <movies-section class="actionSectionMoviesSection" headline="producedMovies"/>
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
  gap: 10px
}

.moviesMenuActionContainer {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 10px;
}

.actionSectionMoviesSection {
  width: 70%;
}
</style>