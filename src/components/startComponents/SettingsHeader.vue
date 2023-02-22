<template>
  <div class="settingHeaderContainer">
    <div id="settingHeaderIndividualOptions" v-if="onSettingButtonClicked">
      <div v-show="this.showOnPage.includes(this.$route.name)" class="settingHeaderMusicValue">
        <input v-if="backgroundMusicStatus === true" v-model="this.$store.state.backgroundMusicVolume" class="slide" type="range" :min="0" :max="1" :step="0.1">
        <input v-else v-model="this.$store.state.backgroundMusicVolume" class="slide" type="range" :min="0" :max="1" :step="0.1" disabled>
      </div>
      <info-circle
          class="button"
          v-show="this.showOnPage.includes(this.$route.name)"
          icon="music"
          :grey-icon="!backgroundMusicStatus"
          @click="changeMusicStatus"/>
      <info-circle
          class="button"
          v-show="this.showOnPage.includes(this.$route.name)"
          icon="soundeffect"
          :grey-icon="!soundEffectStatus"
          @click="changeSoundeffectStatus"/>
      <info-circle
          class="button"
          v-show="this.showOnPage.includes(this.$route.name)"
          :text="this.$store.getters.getCurrentLanguage.toUpperCase()"
          @click="changeLanguage"/>
      <icon-button
          class="button"
          v-if="!this.showOnPage.includes(this.$route.name)"
          icon="save"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          :data-title="saving"
          @click="save(); changeTitle()"/>
          <!--TODO: @click="" zum Speichern einfügen-->
      <icon-button
          class="button"
          icon="home"
          v-if="!this.showOnPage.includes(this.$route.name)"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          :data-title="$t('goBackMenu')"
          @click="showMenuModal = true"
      />

      <transition name="modal">
        <menu-modal
            v-if="showMenuModal"
            headline="goBackMenu"
            @backToStartmenu="goToStartMenu"
            @close="showMenuModal = false">
          <template v-slot:header>
            <h3>custom header</h3>
          </template>
        </menu-modal>
      </transition>

      <icon-button
          class="button"
          icon="exit"
          v-if="!this.showOnPage.includes(this.$route.name)"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          :data-title="$t('closeGame')"
          @click="showCloseModal = true"
      />

      <transition name="modal">
        <close-modal
            v-if="showCloseModal"
            headline="closeGame"
            @closeGame="exit"
            @close="showCloseModal = false">
          <template v-slot:header>
            <h3>custom header</h3>
          </template>
        </close-modal>
      </transition>
    </div>
    <icon-button
        class="button"
        icon="settings"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        :invertTheme="onSettingButtonClicked"
        @click="onSettingButtonClicked = !onSettingButtonClicked"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import i18next from "i18next";
import CloseModal from "@/components/mainGameComponents/CloseModal";
import MenuModal from "@/components/mainGameComponents/CloseModal";
import InfoCircle from "@/components/kitchenSink/InfoCircle.vue";
export default {
  name: "SettingsHeader",
  components: {InfoCircle, CloseModal, MenuModal, IconButton},

  data(){
    return {
      onSettingButtonClicked: false,
      showOnPage: ['startMenu'],
      soundEffectStatus: this.$store.getters.getCurrentStatusOfSoundeffect,
      backgroundMusicStatus: this.$store.getters.getCurrentStatusOfBackgroundMusic,
      language: null,
      showCloseModal: false,
      showMenuModal: false,
      saving: i18next.t("saving")
    }
  },
  mounted(){
    window.ipcRenderer.receive('m2rSettingsLoading', async data => {
      if(data != null){
        this.soundEffectStatus = data.state.soundeffects
        this.backgroundMusicStatus = data.state.backgroundMusic
        this.$store.commit('setCurrentSoundeffect',data.state.soundeffects);
      }


      if(this.backgroundMusicStatus){
        document.getElementById('backgroundMusic').play();
      } else {
        document.getElementById('backgroundMusic').pause();
      }

    })
  },
  methods: {
    goToStartMenu(){
      this.$store.state.slot = null
      this.$router.push({name: 'loadingScreen', params: {nextRoute: 'startMenu', title: i18next.t('returnToMain') + '...', duration: '1.5'}})
    },

    exit() {
      close();
    },

    changeMusicStatus(){
      this.backgroundMusicStatus = !this.backgroundMusicStatus;
      this.$store.commit('setCurrentBackgroundMusic',this.backgroundMusicStatus);
      if(this.backgroundMusicStatus){
        document.getElementById('backgroundMusic').play();
      } else {
        document.getElementById('backgroundMusic').pause();
      }
    },

    changeSoundeffectStatus(){
      this.soundEffectStatus = !this.soundEffectStatus;
      this.$store.commit('setCurrentSoundeffect',this.soundEffectStatus);
    },

    changeLanguage(){
      let language = ['en','de']
      this.language = this.$store.getters.getCurrentLanguage
      for (let i = 0; i < language.length; i++) {
        if(this.language !== language[i]){
          this.language = language[i];
          break;
        }
      }
      i18next.changeLanguage(this.language)
      this.$store.commit('changeCurrentLanguage',i18next.language);
    },

    save(){
      let reducedState = {}
      this.$store.commit("stateToSave", reducedState)
      window.ipcRenderer.send('savingData', [JSON.stringify(reducedState), this.$store.getters.getSlot])

      let reducedStateSettings = {}
      this.$store.commit("stateToSettings", reducedStateSettings)
      window.ipcRenderer.send('saveSettingData', JSON.stringify(reducedStateSettings))
    },

    changeTitle(){
      this.saving = i18next.t("saved")
      setTimeout(() => {
        this.saving = i18next.t("saving")
      }, 2000);

    }
  }
}
</script>

<style scoped>
.settingHeaderContainer {
  display: flex ;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#settingHeaderIndividualOptions {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
  align-items: center;
}

.button{
  margin-left: 5px;
}

.settingHeaderMusicValue {
  margin-right: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
}

input[type='range']:disabled::-webkit-slider-thumb {
  background: var(--fsm-grey-font-color);
  box-shadow: -9999px 0 0 9994px var(--fsm-grey-font-color);
}
</style>