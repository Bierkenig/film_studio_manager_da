<template>
  <div id="projectsSection">
    <h1 id="projectHeading">{{ $t('projects') }}</h1>

    <div>
      <tile-pages-nav id="projectsNavigation" :pages='["All","Screenplays","Productions"]' :gradient='true'>
        <div>
          <div v-for="(it, index) in this.all" :key="index">
            <div v-if="it.earnings === undefined">
              <screenplay-element svg-code="" :screenplay-title="it.title" :age="it.ageRating" :genre="it.genre" :genre-icon="it.genre.toLowerCase()" :quality="it.rating" :writer="it.writer" />
            </div>
            <div v-else>
              <movie-element svg-code="" :movie-title="it._title" viewers="99" critics="99" age="13+" genre="Western" genre-icon="western" budget="$ 9,999" earnings="$ 999,999" @open-clicked="elementOpened"/>
            </div>
            </div>
          </div>
        <div>
          <div v-for="(it, index) in this.screenplays" :key="index">
            <screenplay-element svg-code="" :screenplay-title="it.title"  :age="it.ageRating" :genre="it.genre" :genre-icon="it.genre.toLowerCase()" :quality="it.rating" :writer="it.writer" />
          </div>
        </div>
        <div>
          <div v-for="(it, index) in this.productions" :key="index">
            <movie-element svg-code="" :movie-title="it._title" viewers="99" critics="99" age="13+" genre="Western" genre-icon="western" budget="$ 9,999" earnings="$ 999,999" @open-clicked="elementOpened"/>
          </div>
        </div>
      </tile-pages-nav>
    </div>
    </div>
</template>

<script>
import TilePagesNav from "@/components/kitchenSink/TilePagesNav";
import ScreenplayElement from "@/components/kitchenSink/ScreenplayElement";
import MovieElement from "@/components/kitchenSink/MovieElement";
export default {
  name: "ProjectsSection",
  components: {MovieElement, ScreenplayElement, TilePagesNav},
  data() {
    return {
      all: this.$store.getters.getScreenplays.concat(this.$store.getters.getInProductionMovies),
      screenplays: this.$store.getters.getScreenplays,
      productions: this.$store.getters.getInProductionMovies
    }
  },
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

#projects {
  margin: 3em;
  background-color: #2c3e50;
  overflow-y: scroll;
  width: 80%;
}

#projectHeading{
  font-size: 28px;
  color: var(--fsm-pink-1);
  margin-top: 0.7em;
  margin-left: 0.7em;
  margin-bottom: 0
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