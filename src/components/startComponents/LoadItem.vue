<template>
  <div id="card">
    <h1>{{ $t('noSaving') }}</h1>
    <p>{{$t('save_slot')}}: {{slotNr}}</p>
    <button id="loadButton" class="buttonStyle" :disabled="disabledButton" @click="load">load</button>

  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "LoadItem",
  mixins: [soundeffectMixin('button','click')],

  props: {
    slotNr: Number,
  },

  data(){
    return {
      disabledButton: null
    }
  },

  mounted() {
    window.ipcRenderer.send('r2mChecking',this.slotNr)
    window.ipcRenderer.receive('m2rChecking', data => {
      console.log(data[0])
      console.log(this.slotNr)
        if(data[0] === true){
          if(data[1] === this.slotNr) {
            this.disabledButton = false;
          }

        }
        else if(data[0] === "error" || data[0] === false) {
          this.disabledButton = true;
        }
    })

  },

  methods: {
    load(){
      window.ipcRenderer.send('r2mLoading',this.slotNr)
      window.ipcRenderer.receive('m2rLoading', data => {
        if(data!==null) {
          let saveData = data.state
          this.$store.commit("loadFromSave", saveData)
        }
        else{
          //TODO code hier wenn save-file kaputt ist
          console.log("Konnte nicht geladen werden - File Corrupted!")
        }
      })
    }
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