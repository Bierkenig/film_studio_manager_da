<template>
  <div>
    <router-view/>
    <menu-nav
        v-show="this.showOnPage.includes(this.$route.name)"
        page-name="calendar"
      />
    <audio id="backgroundMusic" autoplay loop>
      <source src="./backgroundMusic/backgroundMusic.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
export default {
  name: 'App',
  components: {MenuNav},
  data(){
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
