<template>
  <div class="movieListContainer">
    <div v-if="movieData.length !== 0">
      <select
          id="sortByWhatMovies"
          v-model="selectedSortByWhat"
      >
        <option :value="null" disabled selected hidden>{{ $t('sortBy') }}</option>
        <option value="Title">{{ $t('newsData.title') }}</option>
        <option value="Price">{{ $t('price') }}</option>
        <option value="Studio">Studio</option>
        <option value="Popularity">{{ $t('popularity') }}</option>
      </select>
      <select
          id="typeOfSortMovies"
          v-model="selectedTypeOfSort"
      >
        <option value="Ascending">{{ $t('ascending') }}</option>
        <option value="Descending">{{ $t('descending') }}</option>
      </select>
    </div>

    <div id="movieList">
      <div class="movieListScroll">
        <div v-for="(item, index) in copiedMovieData" :id="'item' + index" :key="index" class="movieListElement" @click="getStaffInfo(index, item)">
          <div class="movieListElementTitle">
            {{ item.title }}
          </div>
          <div class="movieListElementPopularity">
            78
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieList",

  props: {
    movieData: Array
  },

  data(){
    return {
      lastIndex: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
      copiedMovieData: this.movieData
    }
  },

  watch: {
    selectedTypeOfSort: function (){
      this.sortMovies();
    },

    selectedSortByWhat: function (){
      this.sortMovies();
    }
  },

  methods: {
    getStaffInfo(index, movie) {
      document.getElementById('item' + index).style.backgroundColor = 'rgb(255, 70, 85)';
      if (this.lastIndex !== null) {
        document.getElementById('item' + this.lastIndex).style.backgroundColor = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendMovie',movie);
    },

    sortMovies(){
      if(this.selectedSortByWhat === 'Title' && this.selectedTypeOfSort === 'Ascending'){
        this.copiedMovieData.sort((a, b) => a._title.localeCompare(b._title))
      } else if(this.selectedSortByWhat === 'Title' && this.selectedTypeOfSort === 'Descending') {
        this.copiedMovieData.sort((a, b) => b._title.localeCompare(a._title))
      } else if(this.selectedSortByWhat === 'Studio' && this.selectedTypeOfSort === 'Ascending') {
        this.copiedMovieData.sort((a, b) => b._owner.localeCompare(a._owner))
      } else if(this.selectedSortByWhat === 'Studio' && this.selectedTypeOfSort === 'Descending') {
        this.copiedMovieData.sort((a, b) => a._owner.localeCompare(b._owner))
      } /*else if(this.selectedSortByWhat === 'Price' && this.selectedTypeOfSort === 'Ascending'){
        this.copiedMovieData.sort((a, b) => a._price - b._price)
      } else if(this.selectedSortByWhat === 'Price' && this.selectedTypeOfSort === 'Descending'){
        this.copiedMovieData.sort((a, b) => b._price - a._price)
      } /*else if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._popularity.localeCompare(b._owner))
      } else if(this.selectedSortByWhat === 'Popularity' && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a, b) => b._popularity.localeCompare(a._owner))
      }*/
    }
  }
}
</script>

<style scoped>
.movieListContainer {
  background-color: #2c3e50;
  color: white;
  width: 30%;
  padding: 1em;
}

.movieListScroll {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.movieListElement {
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>