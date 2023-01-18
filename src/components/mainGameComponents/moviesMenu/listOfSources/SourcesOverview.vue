<template>
  <div id="sourcesOverviewMainDiv">
    <h1 id="sourcesListHeader">{{ $t('listOfFranchises') }}</h1>
    <icon-button
        id="sourcesListBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <sources-list @sendSource="receiveItem"/>
    <sources-details :source="clickedItem" :check-balance="checkBalance"/>
  </div>
</template>

<script>
import SourcesList from "@/components/mainGameComponents/moviesMenu/listOfSources/SourcesList";
import SourcesDetails from "@/components/mainGameComponents/moviesMenu/listOfSources/SourcesDetails";
import IconButton from "@/components/kitchenSink/IconButton.vue";
export default {
  name: "SourcesOverview",
  components: {IconButton, SourcesDetails, SourcesList},

  data(){
    return{
      clickedItem: null,
      checkBalance: null
    }
  },

  methods: {
    goBack() {
      this.$router.push({name: 'movies'})
    },

    receiveItem(item) {
      this.clickedItem = item;
      //TODO: auf Preis von Item (Drehbuch oder Film) umändern
      this.checkBalance = (this.$store.getters.getBalance - parseInt("0")) < 0;
    }
  }
}
</script>

<style scoped>
#sourcesOverviewMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 15px;
}

#sourcesListHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#sourcesListBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>