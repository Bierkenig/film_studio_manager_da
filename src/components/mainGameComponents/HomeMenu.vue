<template>
  <div>
    <game-header :studioname="this.$store.getters.getStudio.name" :budget="this.$store.getters.getBalance"/>
    <h1>{{ $t('home') }}</h1>
    <div id="container">
      <news-section class="news"/>
      <movie-section class="releasedMovies" :heading="$t('releasedMovie')" :data="this.$store.getters.getCreatedMovies"/>
      <earnings-section class="earnings"/>
      <movie-section class="inProductionMovies" :heading="$t('inProduction')" :data="this.$store.getters.getCreatedMovies"/>
      <upcoming-events-section class="upcomingEvents"/>
    </div>
    <menu-nav/>
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import NewsSection from "@/components/mainGameComponents/NewsSection";
import MovieSection from "@/components/mainGameComponents/MovieSection";
import EarningsSection from "@/components/mainGameComponents/EarningsSection";
import UpcomingEventsSection from "@/components/mainGameComponents/UpcomingEventsSection";
export default {
  name: "HomeMenu",
  mixins: [soundeffectMixin('button','click')],
  components: {UpcomingEventsSection, EarningsSection, MovieSection, NewsSection, GameHeader, MenuNav}
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