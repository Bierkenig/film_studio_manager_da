<template>
  <div class="moviesSection">
    <h1>{{ $t(headline) }}</h1>
    <div v-if="data.length !== 0" id="moviesSectionSelectDiv">
      <custom-select v-if="headline === 'contentManagement'" :options="[$t('contract'),$t('owner'),$t('popularity')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
      <custom-select v-if="headline === 'producedMovies'" :options="[$t('newsData.year'),$t('earnings'),$t('quality')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
      <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
      <!--<select
          id="sortByWhat"
          class="moviesSectionSelect"
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
          class="moviesSectionSelect"
          onfocus="this.size=5;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
          v-model="selectedTypeOfSort"
      >
        <option value="Ascending">{{ $t('ascending') }}</option>
        <option value="Descending">{{ $t('descending') }}</option>
      </select>
      <select
          id="typeOfSort"
          class="moviesSectionSelect"
          onfocus="this.size=5;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
          v-model="selectedTypeOfSort"
      >
        <option value="Ascending">{{ $t('ascending') }}</option>
        <option value="Descending">{{ $t('descending') }}</option>
      </select>-->
    </div>
    <div v-if="headline === 'producedMovies'" class="moviesSectionDetails verticalScroll">
      <movie-element
          class="moviesSectionMovieElement"
          v-for="(it,index) in data"
          :key="index"
          :movie-title="it._preProduction.screenplay.title"
          svg-code=""
          viewers="99"
          critics="99"
          :age="RegExp('\\+\\d+$').exec(it._preProduction.screenplay.ageRating)[0]"
          :genre="it._preProduction.screenplay.genre.genreName"
          :genre-icon="it._preProduction.screenplay.genre.genreName.toLowerCase()"
          release="2025"
          earnings="$ 999,999"
          @open-clicked="movieInfo(it)"/>
          <!--:release="it._preProduction.releaseDate.getYear()"-->
    </div>
    <div v-if="headline === 'contentManagement'" class="moviesSectionDetails verticalScroll">
      <streaming-element
          class="moviesSectionMovieElement"
          v-for="(it,index) in data"
          :key="index"
          svg-code=""
          :streaming-title="it._preProduction.screenplay.title"
          :popularity="it.popularity"
          :contract="it._contract +  ' Years'"
          @open-clicked="movieInfo(it)"/>
    </div>
  </div>
</template>

<script>
import MovieElement from "@/components/kitchenSink/MovieElement.vue";
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";
import StreamingElement from "@/components/kitchenSink/StreamingElement.vue";
export default {
  name: "MoviesSection",
  components: {StreamingElement, CustomListSort, CustomSelect, MovieElement},

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

  /*watch: {
    selectedTypeOfSort: function (){
      this.sortMovieRights();
    },

    selectedSortByWhat: function (){
      this.sortMovieRights();
    }
  },*/

  methods: {
    movieInfo(element){
      this.$store.commit('setNewCurrentMovie',element)
      this.$store.commit('setCurrentMovieDetails',element)
      this.$router.push({name: 'movieDetails'});
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
        /*if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if((this.selectedSortByWhat === 'Year' || this.selectedSortByWhat === 'Jahr') && this.selectedTypeOfSort === 'Descending') {
          this.data.sort((a, b) => b._contract - a._contract)
        } else if((this.selectedSortByWhat === 'Earnings' || this.selectedSortByWhat === 'Einnahmen') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if((this.selectedSortByWhat === 'Earnings' || this.selectedSortByWhat === 'Einnahmen') && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b._contract - a._contract)
        } /*else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._popularity.localeCompare(b._owner))
      } else if((this.selectedSortByWhat === 'Quality' || this.selectedSortByWhat === 'Qualität') && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a, b) => b._popularity.localeCompare(a._owner))
      }*/
      } else if(this.headline === 'contentManagement'){
        if((this.selectedSortByWhat === 'Contract' || this.selectedSortByWhat === 'Vertrag') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._contract - b._contract)
        } else if((this.selectedSortByWhat === 'Contract' || this.selectedSortByWhat === 'Vertrag') && this.selectedTypeOfSort === 'Descending') {
          this.data.sort((a, b) => b._contract - a._contract)
        } else if((this.selectedSortByWhat === 'Owner' || this.selectedSortByWhat === 'Besitzer') && this.selectedTypeOfSort === 'Ascending'){
          this.data.sort((a, b) => a._owner.localeCompare(b._owner))
        } else if((this.selectedSortByWhat === 'Owner' || this.selectedSortByWhat === 'Besitzer') && this.selectedTypeOfSort === 'Descending'){
          this.data.sort((a, b) => b._owner.localeCompare(a._owner))
        } /*else if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._popularity.localeCompare(b._owner))
        } else if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Descending'){
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
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  padding: 0 20px 20px 20px;
}

.moviesSection h1 {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.moviesSectionDetails {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
  gap: 15px;
  height: 500px;
  overflow-x: hidden;
}

#moviesSectionSelectDiv {
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 40%;
}
</style>