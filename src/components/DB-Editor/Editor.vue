<template>
  <router-link :to="{ name: 'WriterOutput'}">
  <button id="WriterInputButton" class="buttonStyle">Edit Writers</button>
  </router-link>
  <router-link :to="{ name: 'DirectorOutput'}">
  <button id="DirectorInputButton" class="buttonStyle">Edit Directors</button>
  </router-link>
  <router-link :to="{ name: 'ActorOutput'}">
  <button id="ActorInputButton" class="buttonStyle">Edit Actors</button>
  </router-link>

  <button id="exitButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit</button>
  <button id="backButton" class="buttonStyle" @click="this.$router.go(-1)">Back</button>

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