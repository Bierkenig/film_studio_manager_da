<template>
  <div id="moviesListMainDiv">
    <div class="moviesList">
      <div class="moviesListSortDiv">
        <custom-select :options="[$t('quality'),'Name',$t('newsData.year')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
        <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      </div>
      <div class="moviesListScroll verticalScroll">
        <div v-for="(it, index) in allOwningMovies" :id="'movieOwningItem' + index" :key="index" class="moviesListElement" @click="getMovieInfo(it,index)">
          <div class="moviesListElementTitle" :id="'moviesListElementName' + index">
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

export default {
  name: "MoviesList",
  components: {CustomListSort, CustomSelect},

  data(){
    return {
      allOwningMovies: this.$store.getters.getInProductionMovies.concat(this.$store.getters.getFinishedMovies, this.$store.getters.getBoughtMovies),
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
      } else if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Ascending'){
        this.allOwningMovies.sort((a, b) => a._preProduction.startDate - b._preProduction.startDate)
      } else if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Descending'){
        this.allOwningMovies.sort((a,b) => b._preProduction.startDate - a._preProduction.startDate)
      }
    },

    getMovieInfo(movie, index) {
      document.getElementById('movieOwningItem' + index).style.backgroundColor = 'var(--fsm-pink-1)';
      document.getElementById('moviesListElementName' + index).style.color = 'var(--fsm-dark-blue-4)';
      if (this.lastIndex !== null) {
        document.getElementById('movieOwningItem' + this.lastIndex).style.backgroundColor = 'var(--fsm-dark-blue-4)';
        document.getElementById('moviesListElementName' + this.lastIndex).style.color = 'unset';
      }
      this.lastIndex = index;

      this.$emit('sendMovie',movie);
    },
  }
}
</script>

<style scoped>
#moviesListMainDiv {
  background: rgba(37, 45, 62, 0.66);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-radius: var(--fsm-l-border-radius);
  padding: 15px;
  width: 350px;
}

.moviesListScroll {
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.moviesListSortDiv {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 15px;
  margin-bottom: 20px;
}

.moviesListElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 0 10px 15px;
}

.moviesList {
  width: 100%;
}
</style>