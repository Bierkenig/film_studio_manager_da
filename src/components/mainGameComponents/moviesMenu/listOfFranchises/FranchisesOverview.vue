<template>
  <div id="franchiseOverviewMainDiv">
    <h1 id="franchisesListHeader">{{ $t('listOfFranchises') }}</h1>
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
    <franchises-details :franchise="clickedFranchise" :check-balance="checkBalance" @bought-franchise="setClickedFranchise"/>
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


      let franchisePrice = 0;
      for (let i = 0; i < franchise.allMovies.length; i++) {
        let movieEarnings = 0;
        if(franchise.allMovies[i]._earnings.length !== 0){
          for (let j = 0; j < franchise.allMovies[i]._earnings.length; j++) {
            movieEarnings += franchise.allMovies[i]._earnings[j].amount
          }
          franchisePrice += movieEarnings;
        }
      }

      this.checkBalance = (this.$store.getters.getBalance - franchisePrice) < 0;
    },

    setClickedFranchise(){
      this.clickedFranchise = null;
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
  gap: 10px;
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