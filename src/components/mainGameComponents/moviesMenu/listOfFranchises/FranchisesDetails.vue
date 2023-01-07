<template>
  <div>
    <div v-if="franchiseMovies.length !== 0">
      <div v-for="(it,index) in franchiseMovies" :key="index">
        {{ it._preProduction.screenplay.title }}
      </div>
    </div>
  </div>
</template>

<script>
import Franchises from "@/classes/Franchises";

export default {
  name: "FranchisesDetails",

  props: {
    franchise: Franchises
  },

  data(){
    return {
      franchiseMovies: []
    }
  },

  watch: {
    franchise: function(){
      if (this.franchise !== null) {
        this.franchiseMovies = this.franchise.allMovies;
        //this.numberOfOffers = 0;
      }
    },
  }
}
</script>

<style scoped>

</style>