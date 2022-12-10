<template>
  <div class="settingHeaderContainer">
    <div id="settingHeaderIndividualOptions" v-if="onSettingButtonClicked">
      <icon-button
          v-if="this.showOnPage.includes(this.$route.name)"
          icon="musical"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="getMusicStatus"
      />
      <icon-button
          v-if="this.showOnPage.includes(this.$route.name)"
          icon="star"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="getSoundeffectStatus"
      />
      <icon-button
          v-if="this.showOnPage.includes(this.$route.name)"
          icon="journalism"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"/>
      <icon-button
          v-if="!this.showOnPage.includes(this.$route.name)"
          icon="internet"
          size="small"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"/>
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
export default {
  name: "SettingsHeader",
  components: {IconButton},

  data(){
    return {
      onSettingButtonClicked: false,
      showOnPage: ['default']
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

    getMusicStatus(){
      this.musicStatus = document.getElementById('musicToggle').checked
      this.$store.commit('setCurrentBackgroundMusic',document.getElementById('musicToggle').checked);
      if(this.musicStatus){
        document.getElementById('backgroundMusic').play();
      } else {
        document.getElementById('backgroundMusic').pause();
      }
    },

    getSoundeffectStatus(){
      this.soundeffectStatus = document.getElementById('soundeffectToggle').checked
      this.$store.commit('setCurrentSoundeffect',document.getElementById('soundeffectToggle').checked);
    },
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