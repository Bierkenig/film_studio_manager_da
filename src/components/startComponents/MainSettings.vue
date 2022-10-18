<template>
  <div>
    <h1>{{ $t('settings') }}</h1>
    <div id="languageBox">
      <p>{{ $t('languages') }}:</p>
      <div>
        <div v-if="languages">
        <span v-for="(lng, index) in Object.keys(languages)" :key="lng">
          <button v-if="$i18next.resolvedLanguage !== lng" v-on:click="$i18next.changeLanguage(lng)">
            {{ languages[lng].nativeName }}
          </button>
          <button v-if="$i18next.resolvedLanguage === lng">
            <strong>{{ languages[lng].nativeName }}</strong>
          </button>
          <span v-if="index < (Object.keys(languages).length - 1)">&nbsp;|&nbsp;</span>
        </span>
        </div>
      </div>
    </div>

    <div id="musicBox">
      <p>{{ $t('music') }}:</p>
      <div>
        <label class="switch">
          <input id="musicToggle" type="checkbox" @change="getMusicStatus">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div id="soundeffectBox">
      <p>{{ $t('soundeffects') }}:</p>
      <div>
        <label class="switch">
          <input id="soundeffectToggle" type="checkbox" @change="getSoundeffectStatus">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <button id="backButton" class="buttonStyle" @click="$router.go(-1)">{{ $t('back') }}</button>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MainSettings",

  mixins: [soundeffectMixin('button','click')],

  data() {
    return {
      languages: {
        en: {nativeName: 'English'},
        de: {nativeName: 'Deutsch'}
      },
      musicStatus: null,
      soundeffectStatus: null
    }
  },

  mounted(){
    document.getElementById('soundeffectToggle').checked = this.$store.getters.getCurrentStatusOfSoundeffect;
    document.getElementById('musicToggle').checked = this.$store.getters.getCurrentStatusOfBackgroundMusic;
  },

  methods: {
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
    }
  }
}
</script>

<style scoped>

.switch {
  position: relative;
  display: inline-block;
  width: 110px;
  height: 60px;
  margin: 0 10px;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.switch input {
  display: none;
}

.slider:before {
  position: absolute;
  content: "";
  height: 50px;
  width: 50px;
  left: 5px;
  bottom: 5px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50px;
}

input:checked + .slider {
  background-color: #ff0000;
}

input:checked + .slider:before {
  transform: translateX(50px);
}

</style>