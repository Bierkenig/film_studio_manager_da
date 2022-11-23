<template>
  <div class="contentManagementSection">
    <h1>{{ $t('contentManagement') }}</h1>
    <div v-if="data.length !== 0">
      <select
          id="sortByWhat"
          onfocus="this.size=5;"
          onblur="this.size=1;"
          onchange="this.size=1; this.blur();"
          v-model="selectedSortByWhat"
      >
        <option :value="null" disabled selected hidden>{{ $t('sortBy') }}</option>
        <option value="Contract">{{ $t('contract') }}</option>
        <option value="Owner">{{ $t('owner') }}</option>
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
    <div class="contentManagementSectionDetails">
      <movie-item v-for="(it,index) in data" :key="index" :movie="it"/>
    </div>
  </div>
</template>

<script>
import MovieItem from "@/components/mainGameComponents/streamingMenu/MovieItem";
export default {
  name: "ContentManagementSection",
  components: {MovieItem},

  data(){
    return {
      data: this.$store.getters.getAllOwningMovies,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
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
      if(this.selectedSortByWhat === 'Contract' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._contract - b._contract)
      } else if(this.selectedSortByWhat === 'Contract' && this.selectedTypeOfSort === 'Descending') {
        this.data.sort((a, b) => b._contract - a._contract)
      } else if(this.selectedSortByWhat === 'Owner' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._owner.localeCompare(b._owner))
      } else if(this.selectedSortByWhat === 'Owner' && this.selectedTypeOfSort === 'Descending'){
        this.data.sort((a, b) => b._owner.localeCompare(a._owner))
      }
    }
  }
}
</script>

<style scoped>
.contentManagementSection {
  justify-content: center;
  background-color: black;
  color: white;
}

.contentManagementSectionDetails {
  display: flex;
  flex-direction: column;
  color: white;
}
</style>