<template>
  <background-tile :title="$t('competitors')">
    <custom-select :options="[$t('subscribers')]" :placeholder="$t('sortBy')" @select-change="setSelectedSortByWhat"/>
    <custom-list-sort @sort-changed="setSelectedTypeOfSort"/>
    <!-- CONTINUE HERE -->
  </background-tile>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomSelect from "@/components/kitchenSink/CustomSelect.vue";
import CustomListSort from "@/components/kitchenSink/CustomListSort.vue";

export default {
  name: "CompetitorSection",
  components: {CustomListSort, CustomSelect, BackgroundTile},
  methods: {
    setSelectedSortByWhat(arg){
      console.log(arg);
    },

    setSelectedTypeOfSort(arg){
      console.log(arg);
    },
  },
}
</script>

<style scoped>

</style>