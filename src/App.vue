<template>
  <div>
    <game-header
        v-show="this.showOnPage.includes(this.$route.name)"
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="this.$route.name"/>

    <router-view/>

    <menu-nav
        v-show="this.showOnPage.includes(this.$route.name)"
        page-name="calendar"
    />

    <audio id="backgroundMusic" autoPlay loop>
      <source src="./backgroundMusic/backgroundMusic.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";

export default {
  name: 'App',
  components: {GameHeader, MenuNav},
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar']
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>