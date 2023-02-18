<template>
  <background-tile :title="$t('competitors')">
    <div class="competitorSectionSorts">
      <custom-select class="competitorSectionSelect" :options="[$t('subscribers'),$t('popularity'),'Profit']" :placeholder="$t('sortBy')"
                     @select-change="setSelectedSortByWhat"/>
      <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
    </div>
    <div class="verticalScroll competitorElements">
      <streaming-competitor-element class="competitorElement" v-for="(service, index) in services" :key="index"
                                    :streaming-service="service._name" icon="placeholder"
                                    :subscribers="service._subscribers"/>
    </div>
  </background-tile>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";
import StreamingCompetitorElement from "@/components/kitchenSink/StreamingCompetitorElement.vue";

export default {
  name: "CompetitorSection",
  components: {StreamingCompetitorElement, CustomListSort, CustomSelect, BackgroundTile},
  data() {
    return {
      services: this.$store.getters.getStreamingServicesFromOtherStudios,
      selectedSortByWhat: null,
      selectedTypeOfSort: 'Ascending',
    }
  },
  methods: {
    setSelectedSortByWhat(arg) {
      this.selectedSortByWhat = arg;
      this.sortServiceCompetitors();
    },

    setSelectedTypeOfSort(arg) {
      this.selectedTypeOfSort = arg;
      this.sortServiceCompetitors();
    },

    sortServiceCompetitors(){
      if((this.selectedSortByWhat === 'Subscribers' || this.selectedSortByWhat === 'Abonnenten') && this.selectedTypeOfSort === 'Ascending'){
        this.services.sort((a, b) => a._subscribers - b._subscribers)
      } else if((this.selectedSortByWhat === 'Subscribers' || this.selectedSortByWhat === 'Abonnenten') && this.selectedTypeOfSort === 'Descending') {
        this.services.sort((a, b) => b._subscribers - a._subscribers)
      } else if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Ascending'){
        this.services.sort((a, b) => a._popularity - b._popularity)
      } else if((this.selectedSortByWhat === 'Popularity' || this.selectedSortByWhat === 'Bekanntheit') && this.selectedTypeOfSort === 'Descending'){
        this.services.sort((a, b) => b._popularity - a._popularity)
      } else if(this.selectedSortByWhat === 'Profit' && this.selectedTypeOfSort === 'Ascending'){
        this.services.sort((a, b) => a._profit - b._profit)
      } else if(this.selectedSortByWhat === 'Profit' && this.selectedTypeOfSort === 'Descending'){
        this.services.sort((a, b) => b._profit - a._profit)
      }
    }
  },
}
</script>

<style scoped>
.competitorSectionSorts {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 20px;
}

.competitorSectionSelect {
  margin-right: 10px;
}

.competitorElements {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
}
</style>