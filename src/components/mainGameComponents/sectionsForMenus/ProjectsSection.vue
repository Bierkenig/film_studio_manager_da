<template>
  <background-tile class="projectTile" :title="$t('projects')">
    <tile-pages-nav id="projectsNavigation" :pages='[all,screenplaysText,productionsText]' :gradient='true'>
      <div class="projectsSectionElement verticalScroll">
        <screenplay-element class="projectsElement" v-for="(it, index) in this.screenplays" :key="index" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre.genreName" :genre-icon="it.genre.genreName.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
        <project-element class="projectsElement" v-for="(it, index) in this.productions" :key="index" :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre.genreName" :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()" :release="it._preProduction.releaseDate.toLocaleDateString('de-DE')" :status="it._status" @open-clicked="movieInfo(it)"/>
      </div>
      <div class="projectsSectionElement verticalScroll">
        <screenplay-element class="projectsElement" v-for="(it, index) in this.screenplays" :key="index" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre.genreName" :genre-icon="it.genre.genreName.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
      </div>
      <div class="projectsSectionElement verticalScroll">
        <project-element class="projectsElement" v-for="(it, index) in this.productions" :key="index" :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre.genreName" :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()" :release="it._preProduction.releaseDate.toLocaleDateString('de-DE')" :status="it._status" @open-clicked="movieInfo(it)"/>
      </div>
    </tile-pages-nav>
  </background-tile>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import ScreenplayElement from "@/components/kitchenSink/ScreenplayElement";
import ProjectElement from "@/components/kitchenSink/ProjectElement.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import {i18next} from "@/translation/i18n";
export default {
  name: "ProjectsSection",
  components: {BackgroundTile, ProjectElement, ScreenplayElement, TilePagesNav},
  data() {
    return {
      screenplays: this.$store.getters.getScreenplays.concat(this.$store.getters.getBoughtScreenplays),
      productions: this.$store.getters.getInProductionMovies,
      all: i18next.t('all'),
      screenplaysText: i18next.t('screenplays'),
      productionsText: i18next.t('productions'),
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
.projectTile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.projectsSectionElement {
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  height: auto;
  box-sizing: border-box;
  width: 100%;
  overflow-x: hidden;
}

.projectsElement{
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 10px;
}

#projectsNavigation {
  flex-grow: 1;
  flex-basis: 0;
  margin-top: 10px;
}
</style>