<template>
  <div id="sourcesOverviewMainDiv">
    <h1 id="sourcesOverviewHeader">{{ $t('listOfSources') }}</h1>
    <icon-button
        id="sourcesOverviewBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <sources-list @sendSource="receiveItem"/>
    <sources-details :source="clickedItem"
                     :source-type="itemType"
                     :list-type="listType"
                     :check-balance="checkBalance"/>
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
      itemType: null,
      listType: null,
      sourcePrice: 0,
      checkBalance: null
    }
  },

  methods: {
    goBack() {
      this.$router.push({name: 'movies'})
    },

    receiveItem(itemClicked, listType) {
      this.clickedItem = itemClicked;
      this.listType = listType;
      if ('id' in this.clickedItem){
        this.itemType = 'Screenplay'
        this.sourcePrice = this.clickedItem.price;
      } else {
        this.itemType = 'Movie'
        this.sourcePrice = this.clickedItem._totalCosts;
      }
      this.checkBalance = (this.$store.getters.getBalance - parseInt(this.sourcePrice)) < 0;
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

#sourcesOverviewHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#sourcesOverviewBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>