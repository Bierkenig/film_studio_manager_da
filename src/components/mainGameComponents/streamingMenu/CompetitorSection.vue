<template>
  <background-tile :title="$t('competitors')">
    <div class="competitorSectionSorts">
      <custom-select class="competitorSectionSelect" :options="[$t('subscribers')]" :placeholder="$t('sortBy')"
                     @select-change="setSelectedSortByWhat"/>
      <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
    </div>
    <div class="verticalScroll">
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
    }
  },
  methods: {
    setSelectedSortByWhat(arg) {
      console.log(arg);
    },

    setSelectedTypeOfSort(arg) {
      console.log(arg);
    },
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

.competitorElement {
  margin-bottom: 10px;
}
</style>