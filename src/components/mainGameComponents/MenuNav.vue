<template>
  <div>
    <router-link to="home">
      <button id="homeButton" class="buttonStyle" @click="focusButton('homeButton')">{{ $t('home') }}</button>
    </router-link>
    <router-link to="movies">
      <button id="moviesButton" class="buttonStyle" @click="focusButton('moviesButton')">{{ $t('movies') }}</button>
    </router-link>
    <router-link to="library">
      <button id="libraryButton" class="buttonStyle" @click="focusButton('libraryButton')">{{ $t('library') }}</button>
    </router-link>
    <router-link to="streaming">
      <button id="streamingButton" class="buttonStyle" @click="focusButton('streamingButton')">Streaming</button>
    </router-link>
    <router-link to="news">
      <button id="newsButton" class="buttonStyle" @click="focusButton('newsButton')">{{ $t('news') }}</button>
    </router-link>
    <router-link to="finances">
      <button id="financesButton" class="buttonStyle" @click="focusButton('financesButton')">{{ $t('finances') }}</button>
    </router-link>
    <router-link to="calendar">
      <button id="calendarButton" class="buttonStyle" @click="focusButton('calendarButton')">{{ $t('calendar') }}</button>
    </router-link>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MenuNav",

  props:{
    pageName: String,
  },

  data(){
    return {
      lastButton: 'homeButton'
    }
  },

  mixins: [soundeffectMixin('button','click')],

  mounted() {
    document.getElementById('homeButton').style.fontWeight = 'bold';
    document.getElementById('homeButton').style.backgroundColor = 'red';
  },

  methods: {
    focusButton(name){
      document.getElementById(name).style.fontWeight = 'bold';
      document.getElementById(name).style.backgroundColor = 'red';
      document.getElementById(this.lastButton).style.fontWeight = '';
      document.getElementById(this.lastButton).style.backgroundColor = '';
      this.lastButton = name;
    }
  }
}
</script>

<style scoped>

</style>