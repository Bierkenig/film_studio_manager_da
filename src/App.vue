<template>
  <div id="mainDivContainer">
    <game-header
        class="gameHeaderComponent"
        v-if="this.showOnPage.includes(this.$route.name) || this.$route.name === 'simulation'"
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="this.$route.name"/>

    <router-view class="routerViewContainer"/>

    <menu-nav
        class="menuNavComponent"
        v-show="this.showOnPage.includes(this.$route.name)"
    />

    <audio id="backgroundMusic" :volume="this.$store.state.backgroundMusicVolume" autoplay loop>
      <source src="../src/backgroundMusic/BackgroundMusic_mixdown.mp3">
    </audio>
    <img id="bgImageSrc" ref="bgImageSrc" :src="require(`./assets/FSM_background.svg`)" alt="background image"/>
  </div>
</template>

<script>
import store from "@/services/store";
import gameHeader from "@/components/mainGameComponents/GameHeader";
import menuNav from "@/components/mainGameComponents/MenuNav";
import {Buffer} from "buffer";

export default {
  name: 'App',
  components: {gameHeader, menuNav},
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar'],
      process: process.env.ENV_NODE,
      coloredBgIcons: [],
    }
  },

  methods: {
    async calcBG() {
      let svgCode = (await this.getSVGCode()).toString();
      let numIcons = (svgCode.match(/backgroundIcon/gm) || []).length;
      let maxColoredIcons = 5;
      while (numIcons > 0) {
        let nextIcon = Math.floor(Math.random() * numIcons);
        while (this.coloredBgIcons.includes(nextIcon)) {
          nextIcon = Math.floor(Math.random() * numIcons);
        }
        if (this.coloredBgIcons.length === maxColoredIcons) {
          svgCode = this.changeIconColor(svgCode, this.coloredBgIcons[0], true);
          this.coloredBgIcons.splice(0, 1);
        }
        svgCode = this.changeIconColor(svgCode, nextIcon);
        this.setBG(svgCode)
        this.coloredBgIcons.push(nextIcon);
        await new Promise(resolve => setTimeout(resolve, 2100))
      }
    },

    changeIconColor(bgSvgCode, iconId, dark = false) {
      let lightIconColor = 'fill="#FF3A4D"';
      let darkIconColor = 'fill="#161B25"';
      let fillRegex = /fill=".*?"/gm;
      let iconLineRegex = new RegExp('<path id="backgroundIcon' + iconId + '".*?/>', 'gm');
      let iconLine = bgSvgCode.match(iconLineRegex)[0];
      if (!dark) {
        iconLine = iconLine.replaceAll(fillRegex, lightIconColor);
      } else {
        iconLine = iconLine.replaceAll(fillRegex, darkIconColor);
      }
      return bgSvgCode.replaceAll(iconLineRegex, iconLine);
    },

    setBG(svgCode) {
      document.getElementById('mainDivContainer').style.backgroundImage = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svgCode) + '")';
    },

    async getSVGCode() {
      let requestResult = await new Promise((resolve) => {
            let request = new XMLHttpRequest();
            request.open('GET', this.$refs.bgImageSrc.src, true);
            request.responseType = 'blob';
            request.onload = async function () {
              resolve(await new Promise((resolveRead) => {
                const reader = new FileReader();
                reader.onloadend = () => resolveRead(reader.result);
                reader.onerror = () => console.log(reader.error);
                reader.readAsDataURL(request.response);
              }));
            };
            request.onerror = () => console.log(request.response);
            request.send();
          }
      );
      return Buffer.from(requestResult.substring(26), 'base64');
    },
  },

  async mounted(){
    window.ipcRenderer.send('r2mSettingsLoading')
    window.ipcRenderer.receive('m2rSettingsLoading', async data => {
      if (data !== null) {
        let saveData = data.state
        if (saveData.currentLanguage !== "de") {
          saveData.currentLanguage = "en"
        } else if (saveData.currentLanguage === "de") {
          this.$store.commit('changeCurrentLanguage', saveData.currentLanguage);
        }

        if (saveData.soundeffects !== false) {
          saveData.soundeffects = true
        } else if (saveData.soundeffects === false) {
          this.$store.commit('setCurrentSoundeffect', saveData.soundeffects);
        }

        if (saveData.backgroundMusic !== false) {
          saveData.backgroundMusic = true
        } else if (saveData.backgroundMusic === false) {
          this.$store.commit('setCurrentBackgroundMusic', saveData.backgroundMusic);
        }

        if (saveData.backgroundMusicVolume <= 1 && saveData.backgroundMusicVolume >= 0) {
          this.$store.state.backgroundMusicVolume = saveData.backgroundMusicVolume
        } else {
          this.$store.state.backgroundMusicVolume = 0.5
        }
        await new Promise(resolve => setTimeout(resolve, 20))
      }
      })
    await new Promise(resolve => setTimeout(resolve, 1000))

    await this.calcBG();

  },

  async created() {
    setInterval(function () {
      if (store.getters.getSlot !== null) {
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

#mainDivContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-position: center;
  background-size: cover;
  -webkit-transition: background-image 2000ms ease-in-out;
  transition: background-image 2000ms ease-in-out;
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

#bgImageSrc {
  display: none;
}
</style>