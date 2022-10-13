<template>
  <div id="startMenuMainDiv">
    <div id="startMenuSubDiv">
      <div id="startMenuBackground">
        <div id="startMenuBox">
          <div id="startMenu">
            <div id="heading">
              Filmstudio Manager
            </div>
            <div>
              <router-link :to="{ name: 'createStudio'}">
                <button id="newButton" class="buttonStyle">New</button>
              </router-link>
              <router-link :to="{ name: 'loadWindow'}">
                <button id="loadButton" class="buttonStyle">Load</button>
              </router-link>
              <router-link :to="{ name: 'mainSettings'}">
                <button id="settingsButton" class="buttonStyle">Settings</button>
              </router-link>
              <button id="exitButton" class="buttonStyle" @click="exit">Exit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: 'StartMenu',

  mixins: [soundeffectMixin('button')],

  methods: {
    exit() {
      if (confirm("Close Window?")) {
        close();
      }
    },
  },
}
</script>

<style scoped>

</style>