<template>
  <div id="card">
    <h1 v-if="this.disabledButton">{{ $t('noSaving') }}</h1>
    <h1 v-else> {{studioName}} </h1>
    <p> {{date}} </p>
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
      disabledButton: null,
      date: null,
      studioName: null
    }
  },

  mounted() {
    window.ipcRenderer.send('r2mChecking', this.slotNr)
    window.ipcRenderer.receive('m2rChecking', data => {
      console.log(data[0])
      console.log(this.slotNr)
      if (data[0] === true) {
        if (data[1] === this.slotNr) {
          this.disabledButton = false;
        }

      } else if (data[0] === false && data[1] === this.slotNr) {
        this.disabledButton = true;
      }
    })

    window.ipcRenderer.send('r2mLoading', this.slotNr)
    window.ipcRenderer.receive('m2rLoading', data => {
      if(data[0] !== null) {
        if (data[1] === '100') {
          if (data[2] === this.slotNr) {
            console.log(data[0].de_date)
            this.date = data[0].de_date
            this.studioName = data[0].state.studio.name
            console.log("Date eingesetzt")
          }
        }
      }
    })

  },

  methods: {
    load(){
      window.ipcRenderer.send('r2mLoading',this.slotNr)
      window.ipcRenderer.receive('m2rLoading', data => {
        if(data[1]==='100') {
          let saveData = data[0].state
          console.log(data[0].en_date)
          this.$store.commit("loadFromSave", saveData)
          console.log('Save-File was loaded : ' + data[1])
        }
        else if(data[1] === '101') {
          console.log('Save-File corrupted - Save State was recovered : ' + data[1])
          let saveData = data[0].state
          this.$store.commit("loadFromSave", saveData)
        }
        else if(data[1] === '102'){
          //TODO code hier wenn save-file kaputt ist - Möglicherweise löschen
          console.log("Konnte nicht geladen werden - File Corrupted! - Save State could not be recovered : " + data[1])
        }
        else if(data[1] === '103'){
          //TODO Popup für User entscheidung ob neues oder altes File + Falls Noch kein save vorhanden Auto benutzen?
          console.log('Das Auto-Save-File ist aktueller als deines... Möchtest du das Auto-Save-File von' + this.date + 'laden? : ' + data[1])
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