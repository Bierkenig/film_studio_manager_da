<template>
  <div class="mainDivContainer">
    <game-header
        class="gameHeaderComponent"
        v-if="this.showOnPage.includes(this.$route.name)"
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)"/>

    <router-view class="routerViewContainer"/>

    <menu-nav
        class="menuNavComponent"
        v-show="this.showOnPage.includes(this.$route.name)"
        page-name="calendar"
    />

    <!--    <audio id="backgroundMusic" autoplay loop>-->
    <!--      <source src="./backgroundMusic/backgroundMusic.mp3" type="audio/mpeg">-->
    <!--    </audio>-->
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";
import store from "./services/store";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: 'App',
  components: {GameHeader, MenuNav},
  mixins: [soundeffectMixin('button','click')],
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar']
    }
  },
  created(){
    setInterval(function() {
      window.ipcRenderer.send('autoSave', [JSON.stringify(store.state),3])
      console.log(store);
    }, 600000);
  }
}
</script>

<style>
@import "@/style/stylesheet.css";

html, body {
  min-height: 100%;
}

.mainDivContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

.gameHeaderComponent {
  margin-top: 20px;
}

.menuNavComponent {
  margin-bottom: 40px;
}

.routerViewContainer {
  margin-right: 100px;
  margin-left: 100px;
}
</style>