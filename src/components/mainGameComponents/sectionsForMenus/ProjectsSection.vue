<template>
  <div id="projectsSection">
    <h1 id="projectHeading">{{ $t('projects') }}</h1>

    <div>
      <tile-pages-nav id="projectsNavigation" :pages='["All","Screenplays","Productions"]' :gradient='true'>
        <div class="projectsSectionElement verticalScroll">
          <div v-for="(it, index) in this.all" :key="index">
            <div v-if="it.earnings === undefined">
              <screenplay-element class="projectsElement" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre.genreName" :genre-icon="it.genre.genreName.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
            </div>
            <div v-else>
              <project-element class="projectsElement" :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre.genreName" :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()" :release="it._preProduction.releaseDate.getYear()" :status="it._status" @open-clicked="movieInfo"/>
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
            <project-element class="projectsElement" :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre.genreName" :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()" :release="it._preProduction.releaseDate.getYear()" :status="it._status" @open-clicked="movieInfo"/>
          </div>
        </div>
      </tile-pages-nav>
    </div>
    </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import ScreenplayElement from "@/components/kitchenSink/ScreenplayElement";
import ProjectElement from "@/components/kitchenSink/ProjectElement.vue";
export default {
  name: "ProjectsSection",
  components: {ProjectElement, ScreenplayElement, TilePagesNav},
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
  }
}
</script>

<style scoped>
#projectsSection {
  display: flex;
  flex-direction: column;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
}

.projectsSectionElement {
  width: 100%;
  height: 580px;
  overflow-x: hidden;
}

#projectHeading{
  font-size: 28px;
  color: var(--fsm-pink-1);
  margin-top: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 0
}

.projectsElement{
  margin-bottom: 10px;
}
#projectsNavigation{
  margin: 15px;
}
</style>