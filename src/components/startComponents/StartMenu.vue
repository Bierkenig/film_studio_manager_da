<template>
  <div id="startMenuMainDiv">
    <div id="startMenuSubDiv">
      <div id="startMenuBackground">
        <div id="startMenuBox">
          <div id="startMenu">
            <div id="heading">
              {{ $t('welcome') }}
            </div>
            <div>
              <router-link :to="{ name: 'kitchenSink'}">
                <button id="kitchenSinkButton" class="buttonStyle">kitchen-sink</button>
              </router-link>
              <router-link :to="{ name: 'createStudio'}">
                <button id="newButton" class="buttonStyle">{{ $t('newStudioButton') }}</button>
              </router-link>
              <router-link :to="{ name: 'loadWindow'}">
                <button id="loadButton" class="buttonStyle">{{ $t('loadButton') }}</button>
              </router-link>
              <router-link :to="{ name: 'mainSettings'}">
                <button id="settingsButton" class="buttonStyle">{{ $t('settings') }}</button>
              </router-link>

<!--              <router-link :to="{ name: 'editorInput' }">-->
<!--                <button id="editorButton" class="buttonStyle"> editor </button>-->
<!--              </router-link>-->

                <button id="exitButton" class="buttonStyle" @click="exit">{{ $t('exitButton') }}</button>

              <button id="saveButton" class="buttonStyle" @click="save">save</button>
              <button id="deleteButton" class="buttonStyle" @click="deleting">delete</button>
              <button id="autoSave" class="buttonStyle" @click="autoSave">autoSave</button>

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

  mixins: [soundeffectMixin('button','click')],

  methods: {
    exit() {
      if (confirm("Close Window?")) {
        close();
      }
    },
    save(){
     let slotNr = 1
      let reducedState = {}
      this.$store.commit("stateToSave", reducedState)
      console.log(this.$store.state)
      console.log(reducedState)
      window.ipcRenderer.send('savingData', [JSON.stringify(reducedState), slotNr])
    },
    deleting(){
      window.ipcRenderer.send('r2mDeleting', 3)
    },
    autoSave(){
      window.ipcRenderer.send('autoSave', [JSON.stringify(this.$store.state),3])
    }
  },
}
</script>

<style scoped>

</style>