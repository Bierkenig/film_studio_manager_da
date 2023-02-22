<template>
  <div id="movieListMainDiv">
    <div class="movieList">
      <div class="movieListSortDiv">
        <custom-select :options="[$t('quality'),'Name',$t('price')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
        <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      </div>
      <div class="movieListScroll verticalScroll">
        <div v-for="(it, index) in allOwningMovies" :id="'movieItem' + index" :key="index" class="movieListElement" @click="getMovieInfo(it,index)">
          <div class="movieListElementTitle" :id="'moviesListElementName' + index">
            {{it._preProduction.screenplay.title}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MovieList",
  components: {CustomListSort, CustomSelect},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data(){
    return {
      allOwningMovies: [],
      lastIndex: null,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  mounted() {
    let moviesFromOtherStudios = this.$store.getters.getMoviesFromOtherStudios.concat(this.$store.getters.getAllMovies);
    for (let i = 0; i < moviesFromOtherStudios.length; i++) {
      if(moviesFromOtherStudios[i].contract === null){
        this.allOwningMovies.push(moviesFromOtherStudios[i])
      }
    }
  },

  methods: {
    setSelectedSortByWhat(arg) {
      this.selectedSortByWhat = arg;
      this.sortMovieList();
    },

    setSelectedTypeOfSort(arg) {
      this.selectedTypeOfSort = arg;
      this.sortMovieList();
    },

    sortMovieList() {
      if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Ascending'){
        this.allOwningMovies.sort((a, b) => a.quality - b.quality)
      } else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Descending') {
        this.allOwningMovies.sort((a, b) => b.quality - a.quality)
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Ascending'){
        this.allOwningMovies.sort((a, b) => a._title.localeCompare(b._title))
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Descending'){
        this.allOwningMovies.sort((a, b) => b._title.localeCompare(a._title))
      } else if((this.selectedSortByWhat === 'Price' || this.selectedSortByWhat === 'Preis') && this.selectedTypeOfSort === 'Ascending'){
        this.allOwningMovies.sort((a, b) => a._totalCosts - b._totalCosts)
      } else if((this.selectedSortByWhat === 'Price' || this.selectedSortByWhat === 'Preis') && this.selectedTypeOfSort === 'Descending'){
        this.allOwningMovies.sort((a,b) => b._totalCosts - a._totalCosts)
      }
    },

    getMovieInfo(movie, index) {
      document.getElementById('movieItem' + index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('moviesListElementName' + index).style.color = 'var(--fsm-dark-blue-4)';
      if (this.lastIndex !== null) {
        document.getElementById('movieItem' + this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById('moviesListElementName' + this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendMovie',movie);
    },
  }
}
</script>

<style scoped>
#movieListMainDiv {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);
  padding: 15px;
  width: 350px;
}

.movieListScroll {
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.movieListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-bottom: 20px;
}

.movieListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}

.movieList {
  width: 100%;
}
</style>