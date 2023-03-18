<template>
  <div id="moviesMenuContainer">
    <div class="moviesMenuActionContainer">
      <action-section headline="createMovie" info-text="createMovieInfoText" button-text="create" icon="movies"/>
      <action-section headline="createScreenplay" info-text="createScreenplayInfoText" button-text="create" icon="screenplay"/>
    </div>
    <movies-section class="moviesMenuMoviesSection" headline="producedMovies"/>
    <div class="moviesMenuActionContainer">
      <action-section headline="listOfSources" info-text="listOfSourcesInfoText" button-text="open" icon="sources"/>
      <action-section headline="listOfFranchises" info-text="listOfFranchisesInfoText" button-text="open" icon="franchises"/>
    </div>
  </div>
</template>

<script>
import ActionSection from "@/components/mainGameComponents/moviesMenu/ActionSection";
import MoviesSection from "@/components/mainGameComponents/sectionsForMenus/MoviesSection";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "MoviesMenu",
  components:{MoviesSection, ActionSection},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  mounted(){
    window.ipcRenderer.send("updateDiscordDetails", "In Game: Movies Menu")
  },
  data(){
    return{
      allOwningScreenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
    }
  },
}
</script>

<style scoped>
#moviesMenuContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
}

.moviesMenuActionContainer {
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex-basis: 0;
  flex-grow: 4;
}

.moviesMenuMoviesSection {
  flex-basis: 0;
  flex-grow: 7;
}
</style>