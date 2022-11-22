<template>
  <div class="movieListContainer">
    <div id="movieList">
      <div class="movieListScroll">
        <div v-for="(item, index) in movieData" :id="'item' + index" :key="index" class="movieListElement" @click="getStaffInfo(index, item)">
          <div class="movieListElementTitle">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <movie-details
        id="movieDetailsElement"
        :check-balance="checkBalance"
        :movie="selectedMovie"/>
  </div>
</template>

<script>
import MovieDetails from "@/components/mainGameComponents/streamingMenu/MovieDetails";
export default {
  name: "MovieList",
  components: {MovieDetails},
  data(){
    return {
      movieData: [],
      lastIndex: null,
      selectedMovie: null,
      checkBalance: true
    }
  },

  mounted() {
    let moviesFromOtherStudios = this.$store.getters.getMoviesFromOtherStudios;
    for (let i = 0; i < moviesFromOtherStudios.length; i++) {
      if(moviesFromOtherStudios[i].contract === null){
        this.movieData.push(moviesFromOtherStudios[i])
      }
    }
  },

  methods: {
    getStaffInfo(index, movie) {
      document.getElementById('item' + index).style.backgroundColor = 'rgb(255, 70, 85)';
      if (this.lastIndex !== null) {
        document.getElementById('item' + this.lastIndex).style.backgroundColor = 'unset';
      }
      this.lastIndex = index;
      this.selectedMovie = movie;
      this.checkBalance = false; //TODO: Preis für Rechte einfügen
    }
  }
}
</script>

<style scoped>
.movieListContainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap:8em
}

#movieDetailsElement {
  width: 30%;
}
</style>