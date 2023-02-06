<template>
  <div id="moviesOverviewMainDiv">
    <h1 id="moviesOverviewHeader">{{ $t('listOfMovies') }}</h1>
    <icon-button
        id="moviesOverviewBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <movies-list @sendMovie="receiveMovie"/>
    <movies-details :movie="clickedMovie"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import MoviesList from "@/components/mainGameComponents/newsMenu/listOfMovies/MoviesList.vue";
import MoviesDetails from "@/components/mainGameComponents/newsMenu/listOfMovies/MoviesDetails.vue";

export default {
  name: "MoviesOverview",
  components: {MoviesDetails, MoviesList, IconButton},

  data() {
    return {
      clickedMovie: null,
    }
  },

  methods: {
    goBack() {
      this.$router.push({name: 'news'})
    },

    receiveMovie(movie) {
      this.clickedMovie = movie;
    }
  }
}
</script>

<style scoped>
#moviesOverviewMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 15px;
}

#moviesOverviewHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#moviesOverviewBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>