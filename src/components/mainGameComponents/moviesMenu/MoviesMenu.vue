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
export default {
  name: "MoviesMenu",
  components:{MoviesSection, ActionSection},
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
  gap: 20px;
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