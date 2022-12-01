<template>
  <!--TODO: Preis für Rechte einbauen-->
  <div>
    {{ $t('buyRights') }}
    <div id="buyMovieRightsBackground">
      <movie-list id="buyMovieRightsList" :movie-data="data" @sendMovie="receiveMovie"/>
      <movie-details
          id="buyMovieRightsDetails"
          :movie="clickedMovie"
          :check-balance="checkBalance"
      />
    </div>
  </div>
</template>

<script>
import MovieList from "@/components/mainGameComponents/streamingMenu/MovieList";
import MovieDetails from "@/components/mainGameComponents/streamingMenu/MovieDetails";
export default {
  name: "BuyMovieRights",
  components: {MovieDetails, MovieList},

  data() {
    return {
      data: [],
      clickedMovie: null,
      checkBalance: true
    }
  },

  mounted() {
    let moviesFromOtherStudios = this.$store.getters.getMoviesFromOtherStudios;
    for (let i = 0; i < moviesFromOtherStudios.length; i++) {
      if(moviesFromOtherStudios[i].contract === null){
        this.data.push(moviesFromOtherStudios[i])
      }
    }
  },

  methods: {
    receiveMovie: function (movie){
      this.clickedMovie = movie;
      this.checkBalance = false; //TODO: Preis für Rechte einfügen
    },

    goBack(){
      this.$router.push({name: 'streaming'})
    }
  }
}
</script>

<style scoped>
#buyMovieRightsBackground {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap:8em
}

#buyMovieRightsDetails {
  width: 30%;
}
</style>