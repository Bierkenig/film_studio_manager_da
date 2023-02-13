<template>
  <div class="mainDivContainer">
    <game-header
        class="gameHeaderComponent"
        v-if="this.showOnPage.includes(this.$route.name) || this.$route.name === 'simulation'"
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1)"/>

    <router-view class="routerViewContainer"/>

    <menu-nav
        class="menuNavComponent"
        v-show="this.showOnPage.includes(this.$route.name)"
        v-observe-visibility="visibilityChanged"
        :check-visibility="checkNavVisibility"
    />

   <!-- <audio id="backgroundMusic" autoplay loop>
      <source src="./backgroundMusic/backgroundMusic.mp3" type="audio/mpeg">
    </audio>-->
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import store from "@/services/store";

export default {
  name: 'App',
  components: {GameHeader, MenuNav},
  mixins: [soundeffectMixin('button','click')],
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar'],
      checkNavVisibility: false
    }
  },

  methods: {
    visibilityChanged (isVisible) {
      this.checkNavVisibility = (isVisible && this.$router.options.history.state.back === '/createStudio')
          || (isVisible && this.$router.options.history.state.back === '/loadings');
    }
  },

  mounted(){

    window.ipcRenderer.send('r2mSettingsLoading')
    window.ipcRenderer.receive('m2rSettingsLoading', async data => {
      if(data !== null) {
        let saveData = data.state
        if(saveData.currentLanguage !== "de"){
          saveData.currentLanguage = "en"
        }
        if(saveData.soundeffects !== false){
          saveData.soundeffects = true
        }
        if(saveData.backgroundMusic !== false){
          saveData.backgroundMusic = true
        }
        this.$store.commit('setCurrentBackgroundMusic', saveData.backgroundMusic);
        this.$store.commit('setCurrentSoundeffect', saveData.soundeffects);
        this.$store.commit('changeCurrentLanguage', saveData.currentLanguage);
        await new Promise(resolve => setTimeout(resolve, 20))
        console.log('Settings-File was loaded')
      }
    })
  },

  async created(){
    setInterval(function() {
      console.log("tried auto save")
      if(store.getters.getSlot !== null){
        let reducedState = {}
        store.commit("stateToSave", reducedState)
        window.ipcRenderer.send('autoSave', [JSON.stringify(reducedState), store.getters.getSlot])
        console.log("auto save finished")
      }
    }, 300000);
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
  margin-bottom: 40px;
}

.menuNavComponent {
  margin-top: 40px;
  margin-bottom: 40px;
}

.routerViewContainer {
  display: flex;
  flex-direction: column;
  margin-right: 100px;
  margin-left: 100px;
  flex: 1;
}
</style>