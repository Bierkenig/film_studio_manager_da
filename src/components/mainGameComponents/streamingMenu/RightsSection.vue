<template>
  <div class="rightsSection">
    <h1>Rights</h1>
    <p>Buy rights to movies from other studios</p>
    <router-link :to="{name: 'movieList'}">
      <button>Buy</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RightsSection",

  data(){
    return {
      showMovieRightsModal: false
    }
  },

  methods: {
    buyRights(movie){
      this.$store.commit('addOwningMovie', movie)
    }
  }
}
</script>

<style scoped>
.rightsSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}
</style>