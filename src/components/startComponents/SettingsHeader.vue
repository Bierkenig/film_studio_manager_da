<template>
  <div class="settingHeaderContainer">
    <div id="settingHeaderIndividualOptions" v-if="onSettingButtonClicked">
      <icon-button
          v-if="this.showOnPage.includes(this.$route.name)"
          icon="musical"
          size="small"
          :dark="false"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          :invertTheme="!backgroundMusicStatus"
          @click="changeMusicStatus"
      />
      <icon-button
          v-if="this.showOnPage.includes(this.$route.name)"
          icon="star"
          size="small"
          :dark="false"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          :invertTheme="!soundEffectStatus"
          @click="changeSoundeffectStatus"
      />
      <icon-button
          v-if="this.showOnPage.includes(this.$route.name)"
          icon="journalism"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="changeLanguage"/>
      <icon-button
          v-if="!this.showOnPage.includes(this.$route.name)"
          icon="save"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="save"/>
          <!--TODO: @click="" zum Speichern einfügen-->
      <icon-button
          v-if="!this.showOnPage.includes(this.$route.name)"
          icon="home"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goToStartMenu"
      />
      <icon-button
          v-if="!this.showOnPage.includes(this.$route.name)"
          icon="simple-arrow-right"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="exit"
      />
    </div>
    <icon-button
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
export default {
  name: "SettingsHeader",
  components: {IconButton},

  data(){
    return {
      onSettingButtonClicked: false,
      showOnPage: ['default'],
      soundEffectStatus: this.$store.getters.getCurrentStatusOfSoundeffect,
      backgroundMusicStatus: this.$store.getters.getCurrentStatusOfBackgroundMusic,
      language: this.$store.getters.getCurrentLanguage,
    }
  },

  methods: {
    goToStartMenu(){
      if (confirm("Go to start menu?")) {
        this.$router.push({name: 'default'});
      }
    },

    exit() {
      if (confirm("Close Window?")) {
        close();
      }
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
      console.log(this.$store.state)
      console.log(reducedState)
      window.ipcRenderer.send('savingData', [JSON.stringify(reducedState), this.$store.getters.getSlot])
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
  gap: 5px;
  margin-right: 10px;
}
</style>