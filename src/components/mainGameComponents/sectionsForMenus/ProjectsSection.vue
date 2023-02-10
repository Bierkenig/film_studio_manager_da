<template>
  <div id="projectsSection">
    <background-tile :title="$t('projects')">
      <div>
        <tile-pages-nav id="projectsNavigation" :pages='["All","Screenplays","Productions"]' :gradient='true'>
          <div class="projectsSectionElement verticalScroll">
            <div v-for="(it, index) in this.all" :key="index">
              <div v-if="it.earnings === undefined">
                <screenplay-element class="projectsElement" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre.genreName" :genre-icon="it.genre.genreName.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
              </div>
              <div v-else>
                <project-element class="projectsElement" :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre.genreName" :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()" :release="it._preProduction.releaseDate.toLocaleDateString('de-DE')" :status="it._status" @open-clicked="movieInfo(it)"/>
              </div>
            </div>
          </div>
          <div class="projectsSectionElement verticalScroll">
            <div v-for="(it, index) in this.screenplays" :key="index">
              <screenplay-element class="projectsElement" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre.genreName" :genre-icon="it.genre.genreName.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
            </div>
          </div>
          <div class="projectsSectionElement verticalScroll">
            <div v-for="(it, index) in this.productions" :key="index">
              <project-element class="projectsElement" :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre.genreName" :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()" :release="it._preProduction.releaseDate.toLocaleDateString('de-DE')" :status="it._status" @open-clicked="movieInfo(it)"/>
            </div>
          </div>
        </tile-pages-nav>
      </div>
    </background-tile>
  </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import ScreenplayElement from "@/components/kitchenSink/ScreenplayElement";
import ProjectElement from "@/components/kitchenSink/ProjectElement.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
export default {
  name: "ProjectsSection",
  components: {BackgroundTile, ProjectElement, ScreenplayElement, TilePagesNav},
  data() {
    return {
      all: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays,this.$store.getters.getInProductionMovies),
      screenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
      productions: this.$store.getters.getInProductionMovies,
    }
  },

  methods: {
    screenplayInfo(element){
      this.$store.commit('setNewCurrentScreenplay',element)
      this.$router.push({name: 'screenplaySummary'});
    },

    movieInfo(element){
      this.$store.commit('setCurrentMovieDetails',element)
      this.$router.push({name: 'movieDetails'});
    },
  }
}
</script>

<style scoped>
#projectsSection {
  display: flex;
  flex-direction: column;
}

.projectsSectionElement {
  width: 100%;
  height: 567px;
  overflow-x: hidden;
}

.projectsElement{
  margin-bottom: 10px;
}

#projectsNavigation{
  margin: 15px;
}
</style>