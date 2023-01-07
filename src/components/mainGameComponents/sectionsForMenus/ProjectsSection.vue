<template>
  <div id="projectsSection">
    <h1 id="projectHeading">{{ $t('projects') }}</h1>

    <div>
      <tile-pages-nav id="projectsNavigation" :pages='["All","Screenplays","Productions"]' :gradient='true'>
        <div class="projectsSectionElement">
          <div v-for="(it, index) in this.all" :key="index">
            <div v-if="it.earnings === undefined">
              <screenplay-element class="projectsElement" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre" :genre-icon="it.genre.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
            </div>
            <div v-else>
              <project-element :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre" :genre-icon="it._preProduction.screenplay.genre.toLowerCase()" :release="it._preProduction.releaseDate.getYear()" :status="it._status" @open-clicked="movieInfo(it)"/>
            </div>
          </div>
        </div>
        <div class="projectsSectionElement">
          <div v-for="(it, index) in this.screenplays" :key="index">
            <screenplay-element class="projectsElement" svg-code="" :screenplay-title="it.title" :age="RegExp('\\+\\d+$').exec(it.ageRating)[0]" :genre="it.genre" :genre-icon="it.genre.toLowerCase()" :quality="it.rating" :writer="it.writer._first_name + ' ' + it.writer._last_name" @open-clicked="screenplayInfo(it)"/>
          </div>
        </div>
        <div class="projectsSectionElement">
          <div v-for="(it, index) in this.productions" :key="index">
            <project-element :project-title="it._preProduction.screenplay.title" svg-code="" :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]" :genre="it._preProduction.screenplay.genre" :genre-icon="it._preProduction.screenplay.genre.toLowerCase()" :release="it._preProduction.releaseDate.getYear()" :status="it._status" @open-clicked="movieInfo(it)"/>
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
      all: this.$store.getters.getScreenplays.concat(this.$store.getters.getInProductionMovies),
      screenplays: this.$store.getters.getScreenplays,
      productions: this.$store.getters.getInProductionMovies,
    }
  },

  methods: {
    screenplayInfo(element){
      this.$store.commit('setNewCurrentScreenplay',element)
      this.$router.push({name: 'screenplaySummary'});
    },

    movieInfo(element){
      this.$store.commit('setNewCurrentMovie',element)
      this.$router.push({name: 'movieSummary'});
    },
  }
}
</script>

<style scoped>
#projectsSection {
  display: flex;
  flex-direction: column;
  background-color: var(--fsm-dark-blue-3);
  color: white;
  border-radius: var(--fsm-l-border-radius);
}

.projectsSectionElement {
  width: 100%;
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

/* width */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-button {
  height: 1.5em;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1C222F;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(226, 226, 226);
  border-radius: 20px;
}
</style>