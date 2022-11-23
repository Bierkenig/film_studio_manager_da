<template>
  <div class="rightsSection">
    <h1>{{ $t('rights') }}</h1>
    <p>{{ $t('rightsMsg') }}</p>
    <router-link :to="{name: 'buyMovieRights'}">
      <button>{{ $t('buyRights') }}</button>
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