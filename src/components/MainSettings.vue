<template>
  <div>
    <h1>Settings</h1>
    <div id="languageBox">
      <p>Language:</p>
      <div>
        <div>
          <input id="german" v-model="language" type="radio" class="radioButton" value="DE" />
          <label for="german" class="labelRadio">DE</label>
        </div>
        <div>
          <input id="english" v-model="language" type="radio" class="radioButton" value="EN" />
          <label for="english" class="labelRadio">EN</label>
        </div>
      </div>
    </div>

    <div id="musicBox">
      <p>Music:</p>
      <div>
        <label class="switch">
          <input id="musicToggle" type="checkbox" @change="getMusicStatus">
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <div id="soundeffectBox">
      <p>Soundeffect:</p>
      <div>
        <label class="switch">
          <input id="soundeffectToggle" type="checkbox" @change="getSoundeffectStatus">
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MainSettings",

  mixins: [soundeffectMixin('button')],

  data() {
    return {
      language: 'DE',
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