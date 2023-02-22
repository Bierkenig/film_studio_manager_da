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
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "RightsSection",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

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