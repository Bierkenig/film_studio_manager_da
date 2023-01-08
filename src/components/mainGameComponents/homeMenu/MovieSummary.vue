<template>
  <div>
    <h2>{{ this.selectedMovie._preProduction.screenplay.title }}</h2>
    <custom-button
        v-if="this.selectedMovie._franchiseType === null && this.selectedMovie._owner === this.ownStudio && !partOfFranchise"
        id="movieSummaryCreateFranchiseButton"
        :dark="false"
        size="small"
        @click="createFranchise">Create Franchise</custom-button>
    <icon-button
        id="movieSummaryBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="goBack"/>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import IconButton from "@/components/kitchenSink/IconButton.vue";

export default {
  name: "MovieSummary",
  components: {IconButton, CustomButton},

  data(){
    return {
      selectedMovie: this.$store.getters.getCurrentMovie,
      ownStudio: this.$store.getters.getStudio,
      partOfFranchise: false,
    }
  },

  mounted() {
    if(this.selectedMovie._preProduction.screenplay.franchise !== null){
      this.partOfFranchise = true;
    }
  },

  methods:{
    createFranchise(){
      this.$router.push({name: 'createFranchise'})
    },

    goBack(){
      this.$router.push({name: 'movies'})
    }
  }
}
</script>

<style scoped>
* {
  text-align: center;
}

#movieSummaryBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}
</style>