<template>
  <div class="moviesSection">
    <h1>{{ $t(headline) }}</h1>
    <div v-if="data.length !== 0">
      <select
          id="sortByWhat"
          onfocus="this.size=5;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
          v-model="selectedSortByWhat"
      >
        <option :value="null" disabled selected hidden>{{ $t('sortBy') }}</option>
        <option v-if="headline === 'contentManagement'" value="Contract">{{ $t('contract') }}</option>
        <option v-if="headline === 'contentManagement'" value="Owner">{{ $t('owner') }}</option>
        <option v-if="headline === 'contentManagement'" value="Popularity">{{ $t('popularity') }}</option>
        <option v-if="headline === 'producedMovies'" value="Year">{{ $t('years') }}</option>
        <option v-if="headline === 'producedMovies'" value="Earnings">{{ $t('earnings') }}</option>
        <option v-if="headline === 'producedMovies'" value="Quality">{{ $t('quality') }}</option>
      </select>
      <select
          id="typeOfSort"
          onfocus="this.size=5;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
          v-model="selectedTypeOfSort"
      >
        <option value="Ascending">{{ $t('ascending') }}</option>
        <option value="Descending">{{ $t('descending') }}</option>
      </select>
    </div>
    <div class="moviesSectionDetails">
      <movie-item v-for="(it,index) in data" :key="index" :movie="it"/>
    </div>
  </div>
</template>

<script>
import MovieItem from "@/components/mainGameComponents/streamingMenu/MovieItem";
export default {
  name: "MoviesSection",
  components: {MovieItem},

  props: {
    headline: String
  },

  data(){
    return {
      data: [],
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  mounted(){
    if(this.headline === 'producedMovies'){
      this.selectedSortByWhat = 'Year'
      this.data = this.$store.getters.getCreatedMovies.concat(this.$store.getters.getFinishedMovies)
    } else if(this.headline === 'contentManagement'){
      this.selectedSortByWhat = 'Contract'
      this.data = this.$store.getters.getAllOwningMovies
    }
  },

  watch: {
    selectedTypeOfSort: function (){
      this.sortMovieRights();
    },

    selectedSortByWhat: function (){
      this.sortMovieRights();
    }
  },

  methods: {
    sortMovieRights(){
      if(this.headline === 'producedMovies'){
        /*if(this.selectedSortByWhat === 'Year' && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if(this.selectedSortByWhat === 'Year' && this.selectedTypeOfSort === 'Descending') {
          this.data.sort((a, b) => b._contract - a._contract)
        } else if(this.selectedSortByWhat === 'Earnings' && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if(this.selectedSortByWhat === 'Earnings' && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b._contract - a._contract)
        } /*else if(this.selectedSortByWhat === 'Quality' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._popularity.localeCompare(b._owner))
      } else if(this.selectedSortByWhat === 'Quality' && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a, b) => b._popularity.localeCompare(a._owner))
      }*/
      } else if(this.headline === 'contentManagement'){
        if(this.selectedSortByWhat === 'Contract' && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if(this.selectedSortByWhat === 'Contract' && this.selectedTypeOfSort === 'Descending') {
          this.data.sort((a, b) => b._contract - a._contract)
        } else if(this.selectedSortByWhat === 'Owner' && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._owner.localeCompare(b._owner))
        } else if(this.selectedSortByWhat === 'Owner' && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b._owner.localeCompare(a._owner))
        } /*else if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._popularity.localeCompare(b._owner))
      } else if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a, b) => b._popularity.localeCompare(a._owner))
      }*/
      }
    }
  }
}
</script>

<style scoped>
.moviesSection {
  justify-content: center;
  background-color: black;
  color: white;
}

.moviesSectionDetails {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  color: white;
}
</style>