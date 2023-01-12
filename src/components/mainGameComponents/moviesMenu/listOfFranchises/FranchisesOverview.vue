<template>
  <div id="franchiseOverviewMainDiv">
    <h1 id="franchisesListHeader">List of Franchises</h1>
    <icon-button
        id="franchisesListBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
    <franchises-list @sendFranchise="receiveFranchise"/>
    <franchises-details :franchise="clickedFranchise" :check-balance="checkBalance"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import FranchisesList from "@/components/mainGameComponents/moviesMenu/listOfFranchises/FranchisesList.vue";
import FranchisesDetails from "@/components/mainGameComponents/moviesMenu/listOfFranchises/FranchisesDetails.vue";

export default {
  name: "FranchisesOverview",
  components: {FranchisesDetails, FranchisesList, IconButton},

  data(){
    return{
      clickedFranchise: null,
      checkBalance: null
    }
  },

  methods: {
    goBack(){
      this.$router.push({name: 'movies'})
    },

    receiveFranchise(franchise){
      this.clickedFranchise = franchise;
      //TODO: auf Preis von Franchise umändern
      this.checkBalance = (this.$store.getters.getBalance - parseInt("0")) < 0;
    }
  }
}
</script>

<style scoped>
#franchiseOverviewMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 15px;
}

#franchisesListHeader {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
}

#franchisesListBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>