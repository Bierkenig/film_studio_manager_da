<template>

  <button id="WriterInputButton" class="buttonStyle" @click="toWriter">Edit Writers</button>

  <button id="DirectorInputButton" class="buttonStyle" @click="toDirector">Edit Directors</button>

  <button id="ActorInputButton" class="buttonStyle" @click="toActor">Edit Actors</button>

  <button id="exitButton" class="buttonStyle" @click="this.$router.push('WriterOutput')" >Edit</button>

  <button id="backButton" class="buttonStyle" @click="this.$router.go(-1)">Back</button>

</template>

<script>
import i18next from "i18next";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Editor",

  methods:{
    toWriter(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'WriterOutput', title: i18next.t('editorToWriter') + '...', duration: '3'}})

    },
    toDirector(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'DirectorOutput', title: i18next.t('editorToDirector') + '...', duration: '3'}})

    },
    toActor(){
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'ActorOutput', title: i18next.t('editorToActor') + '...', duration: '3'}})

    }
  }
}
</script>

<style scoped>

</style>