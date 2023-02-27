<template>
  <div class="mainDivContainer">
    <div id="bgImageLayer1">
      <div id="bgImageLayer2">
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
        <img id="bgImageSrc" ref="bgImageSrc" :src="require(`./assets/FSM_background.svg`)" alt="background image"/>
      </div>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import store from "@/services/store";
import gameHeader from "@/components/mainGameComponents/GameHeader";
import menuNav from "@/components/mainGameComponents/MenuNav";
import {Buffer} from "buffer";

export default {
  name: 'App',
  components: {gameHeader, menuNav},
  mixins: [soundeffectMixin('button', 'click'), soundeffectMixin('img', 'click')],
  data() {
    return {
      showOnPage: ['home', 'news', 'movies', 'library', 'streaming', 'finances', 'calendar'],
      checkNavVisibility: false,
      process: process.env.ENV_NODE,
      useFirstBgLayer: true,
      coloredBgIcons: [],
    }
  },

  methods: {
    visibilityChanged(isVisible) {
      this.checkNavVisibility = (isVisible && this.$router.options.history.state.back === '/createStudio')
          || (isVisible && this.$router.options.history.state.back === '/loadings');
    },

    async calcBG() {
      let svgCode = (await this.getSVGCode()).toString();
      let numIcons = (svgCode.match(/backgroundIcon/gm) || []).length;
      let maxColoredIcons = 5;
      // for (let i = 0; i < svgCode.length; i++) {
      //   if (wantedIconId >= numIcons) {
      //     break;
      //   }
      //   if (svgCode[i].indexOf('backgroundIcon' + wantedIconId) !== -1) {
      //     svgCode[i] = svgCode[i].replaceAll(/fill=".*?"/gm, 'fill="#FF3A4D"');
      //     await new Promise(resolve => setTimeout(resolve, 100))
      //     wantedIconId++;
      //   }
      // }
      while (numIcons > 0) {
        let nextIcon = Math.floor(Math.random() * numIcons);
        if (this.coloredBgIcons.length === maxColoredIcons) {
          this.setBG(this.changeIconColor(svgCode, nextIcon, true));
        } else {
          this.setBG(this.changeIconColor(svgCode, nextIcon));
        }
        this.coloredBgIcons.push(nextIcon);
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    },

    changeIconColor(bgSvgCode, iconId, dark = false) {
      let lightIconColor = 'fill="#FF3A4D"';
      let darkIconColor = 'fill="#161b25"';
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
      if (this.useFirstBgLayer) {
        document.getElementById('bgImageLayer1').style.backgroundImage = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svgCode) + '")';
        this.useFirstBgLayer = false;
      } else {
        document.getElementById('bgImageLayer2').style.backgroundImage = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(svgCode) + '")';
        this.useFirstBgLayer = true;
      }
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

  mounted() {
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
    this.calcBG();
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

#bgImageSrc {
  display: none;
}

#bgImageLayer1, #bgImageLayer2 {
  background-position: center;
  background-size: cover;
  -webkit-transition: background-image 100ms ease-in-out;
  transition: background-image 100ms ease-in-out;
}
</style>