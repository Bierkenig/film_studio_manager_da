<template>
  <div>
    <div id="container">
      <news-section class="news"/>
      <movie-section class="releasedMovies" :heading="$t('releasedMovie')" :data="this.$store.getters.getCreatedMovies"/>
      <earnings-section class="earnings"/>
      <movie-section class="inProductionMovies" :heading="$t('inProduction')" :data="this.$store.getters.getCreatedMovies"/>
      <upcoming-events-section class="upcomingEvents"/>
    </div>
    <router-link to="directorSection">
      <button>director</button>
    </router-link>
    <router-link to="screenplaySection">
      <button>screenplay</button>
    </router-link>
    <router-link to="durationSection">
      <button>duration</button>
    </router-link>
    <router-link to="actorSection">
      <button>actor</button>
    </router-link>
    <router-link to="budgetSection">
      <button>budget</button>
    </router-link>
    <button id="saveButton" class="buttonStyle" @click="save">save</button>

  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import NewsSection from "@/components/mainGameComponents/sectionsForMenus/NewsSection";
import MovieSection from "@/components/mainGameComponents/sectionsForMenus/MovieSection";
import EarningsSection from "@/components/mainGameComponents/sectionsForMenus/EarningsSection";
import UpcomingEventsSection from "@/components/mainGameComponents/sectionsForMenus/UpcomingEventsSection";
export default {
  name: "HomeMenu",
  mixins: [soundeffectMixin('button','click')],
  components: {UpcomingEventsSection, EarningsSection, MovieSection, NewsSection},
  methods: {
    save() {
      let slotNr = 1
      window.ipcRenderer.send('savingData', [JSON.stringify(this.$store.state), slotNr])
    }
  }
}
</script>

<style scoped>
#container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3em;
}

.news, .releasedMovies, .earnings {
  width: 30%;
}
</style>