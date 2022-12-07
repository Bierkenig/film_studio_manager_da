<template>
  <router-link :to="{ name: 'WriterOutput'}">
  <button id="WriterInputButton" class="buttonStyle">Edit Writers</button>
  </router-link>
  <button id="DirectorInputButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit Directors</button>
  <button id="ActorInputButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit Actors</button>
  <button id="MovieInputButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit Movies</button>
  <button id="FranchiseInputButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit Franchises</button>
  <button id="AwardInputButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit Awards</button>
  <button id="exitButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit</button>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Editor",

  methods:{

  }
}
</script>

<style scoped>

</style>