<template>
  <!--TODO: Market Share und Change berechnen lassen-->
  <div class="viewServicesContainer">
    <div class="viewServicesSectionDetails">
      <div v-if="data.length !== 0">
        <select
            id="sortByWhatServices"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedSortByWhat"
        >
          <option :value="null" disabled selected hidden>{{ $t('sortBy') }}</option>
          <option value="Name">Name</option>
          <option value="Owner">{{ $t('owner') }}</option>
          <option value="Popularity">{{ $t('popularity') }}</option>
        </select>
        <select
            id="typeOfSortServices"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedTypeOfSort"
        >
          <option value="Ascending">{{ $t('ascending') }}</option>
          <option value="Descending">{{ $t('descending') }}</option>
        </select>
      </div>
      <service-item v-for="(it,index) in data" :key="index" :service="it"/>
    </div>
    <button id="viewServicesBackButton" class="buttonStyle" @click="this.$router.push({name: 'streaming'})">{{ $t('back') }}</button>
  </div>
</template>

<script>
import ServiceItem from "@/components/mainGameComponents/streamingMenu/ServiceItem";
export default {
  name: "ViewServices",
  components: {ServiceItem},
  data(){
    return {
      data: this.$store.getters.getStreamingServicesFromOtherStudios,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },

  watch: {
    selectedTypeOfSort: function (){
      this.sortServices();
    },

    selectedSortByWhat: function (){
      this.sortServices();
    }
  },

  methods: {
    sortServices(){
      if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Ascending'){
        this.data.sort((a, b) => a._name.localeCompare(b._name))
      } else if(this.selectedSortByWhat === 'Name' && this.selectedTypeOfSort === 'Descending') {
        this.data.sort((a, b) => b._name.localeCompare(a._name))
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
</script>

<style scoped>
.viewServicesContainer {
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.viewServicesSectionDetails {
  display: flex;
  flex-direction: column;
  background-color: #2F2F3D;
  gap: 1em;
  width: 50%;
  padding: 1em;
}
</style>