<template>
  <background-tile class="moviesSection" :title="$t(headline)">
    <div v-if="data.length !== 0" id="moviesSectionSelectDiv">
      <custom-select v-if="headline === 'contentManagement'" :options="[$t('contract'),$t('owner'),$t('quality')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
      <custom-select v-if="headline === 'producedMovies'" :options="[$t('newsData.year'),$t('earnings'),$t('quality')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
      <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
    </div>
    <div v-if="headline === 'producedMovies'" class="moviesSectionDetails verticalScroll">
      <movie-element
          class="moviesSectionMovieElement"
          v-for="(it,index) in data"
          :key="index"
          :movie-title="it._preProduction.screenplay.title"
          svg-code=""
          :viewers="Math.round(it._release.audiencePopularity).toString()"
          :critics="Math.round(it._release.criticsFormula).toString()"
          :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]"
          :genre="it._preProduction.screenplay.genre.genreName"
          :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()"
          :release="it._preProduction.releaseDate.getFullYear().toString()"
          :earnings="'$ ' + roundBudget(it._release.dvdGross + it._release.cinemaGross + it._release.openingWeekGross)"
          @open-clicked="movieInfo(it)"/>
          <!--:release="it._preProduction.releaseDate.getYear()"-->
    </div>
    <div v-if="headline === 'contentManagement'" class="moviesSectionDetails verticalScroll">
      <div v-for="(it,index) in data"
           :key="index">
        <streaming-element
            class="moviesSectionMovieElement"
            v-if="it._contract > 0"
            svg-code=""
            :streaming-title="it._preProduction.screenplay.title"
            :popularity="Math.round(it.popularity)"
            :contract="it._contract +  ' Years'"
            @open-clicked="movieInfo(it)"/>
        <streaming-element
            class="moviesSectionMovieElement"
            v-else
            svg-code=""
            :streaming-title="it._preProduction.screenplay.title"
            :popularity="Math.round(it.popularity)"
            contract="Unlimited"
            @open-clicked="movieInfo(it)"/>
      </div>
    </div>
  </background-tile>
</template>

<script>
import MovieElement from "@/components/kitchenSink/MovieElement.vue";
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";
import StreamingElement from "@/components/kitchenSink/StreamingElement.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
export default {
  name: "MoviesSection",
  components: {BackgroundTile, StreamingElement, CustomListSort, CustomSelect, MovieElement},

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
      this.data = this.$store.getters.getBoughtMovieRights.concat(this.$store.getters.getFinishedMovies, this.$store.getters.getBoughtMovies);

      let franchises = this.$store.getters.getFranchises;
      for (let i = 0; i < franchises.length; i++) {
        for (let j = 0; j < franchises[i].allMovies.length; j++) {
          if(!this.data.includes(franchises[i].allMovies[j])){
            this.data.push(franchises[i].allMovies[j])
          }
        }
      }
    }
  },

  methods: {
    movieInfo(element){
      this.$store.commit('setCurrentMovieDetails',element)
      this.$router.push({name: 'movieDetails'});
    },

    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },

    setSelectedSortByWhat(arg){
      this.selectedSortByWhat = arg;
      this.sortMovieRights();
    },

    setSelectedTypeOfSort(arg){
      this.selectedTypeOfSort = arg;
      this.sortMovieRights();
    },

    sortMovieRights(){
      if(this.headline === 'producedMovies'){
        if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._preProduction.releaseDate.getTime() - b._preProduction.releaseDate.getTime())
        } else if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Descending') {
          this.data.sort((a, b) => b._preProduction.releaseDate.getTime() - a._preProduction.releaseDate.getTime())
        } else if((this.selectedSortByWhat === 'Earnings' || this.selectedSortByWhat === 'Einnahmen') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => (a._release.openingWeekGross + a._release.cinemaGross + a._release.dvdGross) - (b._release.openingWeekGross + b._release.cinemaGross + b._release.dvdGross))
        } else if((this.selectedSortByWhat === 'Earnings' || this.selectedSortByWhat === 'Einnahmen') && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => (b._release.openingWeekGross + b._release.cinemaGross + b._release.dvdGross) - (a._release.openingWeekGross + a._release.cinemaGross + a._release.dvdGross))
        } else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a.quality - b.quality)
        } else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b.quality - a.quality)
        }
      } else if(this.headline === 'contentManagement'){
        if((this.selectedSortByWhat === 'Contract' || this.selectedSortByWhat === 'Vertrag') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if((this.selectedSortByWhat === 'Contract' || this.selectedSortByWhat === 'Vertrag') && this.selectedTypeOfSort === 'Descending') {
          this.data.sort((a, b) => b._contract - a._contract)
        } else if((this.selectedSortByWhat === 'Owner' || this.selectedSortByWhat === 'Besitzer') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._owner.localeCompare(b._owner))
        } else if((this.selectedSortByWhat === 'Owner' || this.selectedSortByWhat === 'Besitzer') && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b._owner.localeCompare(a._owner))
        } else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a.quality - b.quality)
        } else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b.quality - a.quality)
        }
      }
    },

    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    }
  }
}
</script>

<style scoped>
.moviesSection {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.moviesSectionDetails {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
  height: auto;
  box-sizing: border-box;
  flex-grow: 1;
}

#moviesSectionSelectDiv {
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 50%;
}

.moviesSectionMovieElement {
  max-width: 49%;
}
</style>