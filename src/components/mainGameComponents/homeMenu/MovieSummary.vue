<template>
  <div>
    <h2>{{ this.selectedMovie._preProduction.screenplay.title }}</h2>
    <custom-button
        v-if="this.selectedMovie._franchiseType === null"
        id="movieSummaryCreateFranchiseButton"
        :dark="false"
        size="small"
        @click="createFranchise">Create Franchise</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "MovieSummary",
  components: {CustomButton},

  data(){
    return {
      selectedMovie: this.$store.getters.getCurrentMovie,
    }
  },

  methods:{
    createFranchise(){
      this.$router.push({name: 'createFranchise'})
    }
  }
}
</script>

<style scoped>

</style>