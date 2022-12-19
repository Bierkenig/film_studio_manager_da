<template>
  <div id="card">
    <h1>DBv{{slotNr}}</h1>
    <!-- -->
    <button id="selectButton" class="buttonStyle" @click="select">Edit</button>
    <button id="deleteButton" class="buttonStyle" @click="reset">Reset</button>
    <button id="renameButton" class="buttonStyle" @click="rename">Rename</button>

  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "DBItem",
  mixins: [soundeffectMixin('button', 'click')],

  props: {
    slotNr: Number,
  },

  data() {
    return {
      name: null,
      isShow: null
    }
  },

  methods: {
    select() {
      console.log(this.slotNr)
      console.log(this.$store.state)
      window.ipcRenderer.send('changeDBPath', "./.data/database/fsm_custom" + this.slotNr +".db")
      this.$router.push("Editor")
    },

    reset(){
      window.ipcRenderer.send('resetDB', this.slotNr)
    },


  }
}
</script>

<style scoped>
#card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  padding: 2em;
}
</style>