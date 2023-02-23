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

    <audio id="backgroundMusic" :volume="this.$store.state.backgroundMusicVolume" autoplay loop>
      <source src="../src/backgroundMusic/BackgroundMusic_mixdown.mp3">
    </audio>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import store from "@/services/store";
import gameHeader from "@/components/mainGameComponents/GameHeader";
import menuNav from "@/components/mainGameComponents/MenuNav";

export default {
  name: 'App',
  components: {gameHeader, menuNav},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar'],
      checkNavVisibility: false,
      process: process.env.ENV_NODE,
    }
  },

  methods: {
    visibilityChanged (isVisible) {
      this.checkNavVisibility = (isVisible && this.$router.options.history.state.back === '/createStudio')
          || (isVisible && this.$router.options.history.state.back === '/loadings');
    }
  },

  mounted(){
    console.log(process.env.NODE_ENV )
    window.ipcRenderer.send('r2mSettingsLoading')
    window.ipcRenderer.receive('m2rSettingsLoading', async data => {
      if(data !== null) {
        let saveData = data.state
        if(saveData.currentLanguage !== "de"){
          saveData.currentLanguage = "en"
        }
        else if(saveData.currentLanguage === "de") {
          this.$store.commit('changeCurrentLanguage', saveData.currentLanguage);
        }

        if(saveData.soundeffects !== false){
          saveData.soundeffects = true
        }
        else if(saveData.soundeffects === false){
          this.$store.commit('setCurrentSoundeffect', saveData.soundeffects);
        }

        if(saveData.backgroundMusic !== false){
          saveData.backgroundMusic = true
        }
        else if(saveData.backgroundMusic === false){
          this.$store.commit('setCurrentBackgroundMusic', saveData.backgroundMusic);
        }

        if(saveData.backgroundMusicVolume <= 1 && saveData.backgroundMusicVolume >= 0){
          this.$store.state.backgroundMusicVolume = saveData.backgroundMusicVolume
        }else{
          this.$store.state.backgroundMusicVolume = 0.5
        }
        await new Promise(resolve => setTimeout(resolve, 20))

        console.log(this.$store.state)
      }
      })
    },

  async created(){
    setInterval(function() {
      if(store.getters.getSlot !== null){
        let reducedState = {}
        store.commit("stateToSave", reducedState)
        window.ipcRenderer.send('autoSave', [JSON.stringify(reducedState), store.getters.getSlot])
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