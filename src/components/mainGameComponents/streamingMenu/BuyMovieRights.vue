<template>
  <div id="buyMovieRightsMainDiv">
    <h1 id="buyMovieRightsHeader">{{ $t('buyStreamingRights') }}</h1>
    <icon-button
        id="buyMovieRightsBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <movie-list @sendMovie="receiveMovie"/>
    <movie-details :movie="clickedMovie"/>
  </div>
</template>

<script>
import MovieList from "@/components/mainGameComponents/streamingMenu/MovieList";
import MovieDetails from "@/components/mainGameComponents/streamingMenu/MovieDetails";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "BuyMovieRights",
  components: {IconButton, MovieDetails, MovieList},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      clickedMovie: null,
    }
  },

  methods: {
    receiveMovie: function (movie){
      this.clickedMovie = movie;
    },

    goBack(){
      this.$router.push({name: 'streaming'})
    }
  }
}
</script>

<style scoped>
#buyMovieRightsMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 15px;
}

#buyMovieRightsHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#buyMovieRightsBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>