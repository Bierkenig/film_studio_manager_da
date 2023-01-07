<template>
  <div>
    <label id="createFranchiseNameLabel" for="createFranchiseName">Franchise Name</label>
    <input id="createFranchiseName" v-model="franchiseTitle" type="text" placeholder="Franchise Name" />
    <custom-button
        id="createFranchiseContinueButton"
        :dark="false"
        size="medium"
        :disabled="!franchiseTitle"
        @clicked="saveFranchise">Save Franchise</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import Franchises from "@/classes/Franchises";

export default {
  name: "CreateFranchise",
  components: {CustomButton},

  data(){
    return {
      franchiseTitle: null,
    }
  },

  methods: {
    saveFranchise(){
      let newFranchise = new Franchises(this.$store.getters.getNextFranchiseId,this.franchiseTitle);
      newFranchise.addAllMovies(this.$store.getters.getCurrentMovie)
      this.$store.commit('addFranchise',newFranchise);
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style scoped>
#createFranchiseContinueButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}
</style>