<template>
  <div>
    <router-link to="home">
      <button id="homeButton" class="buttonStyle">{{ $t('home') }}</button>
    </router-link>
    <router-link to="movies">
      <button id="moviesButton" class="buttonStyle">{{ $t('movies') }}</button>
    </router-link>
    <!--<router-link to="library">
      <button id="libraryButton" class="buttonStyle">{{ $t('library') }}</button>
    </router-link>-->
    <router-link to="streaming">
      <button id="streamingButton" class="buttonStyle">Streaming</button>
    </router-link>
    <router-link to="news">
      <button id="newsButton" class="buttonStyle">{{ $t('news') }}</button>
    </router-link>
    <!--<router-link to="finances">
      <button id="financesButton" class="buttonStyle">{{ $t('finances') }}</button>
    </router-link>-->
    <router-link to="calendar">
      <button id="calendarButton" class="buttonStyle">{{ $t('calendar') }}</button>
    </router-link>
    <button id="skipWeekButton" @click="this.$store.commit('updateCurrentDate')">{{ $t('skipWeek') }}</button>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MenuNav",

  mixins: [soundeffectMixin('button','click')],

  mounted() {
    //document.getElementById('homeButton').focus();
  }
}
</script>

<style scoped>
/*.buttonStyle:focus {
  font-weight: bold;
  background-color: red;
}*/
</style>