<template>
  <div>
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
    <div>
      <franchises-list @sendWriter="receiveFranchise"/>
      <franchises-details :franchise="clickedFranchise"/>
    </div>
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
    }
  },

  methods: {
    goBack(){
      this.$router.push({name: 'movies'})
    },

    receiveFranchise(franchise){
      this.clickedFranchise = franchise;
    }
  }
}
</script>

<style scoped>
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