<template>
  <div id="card">
    <div v-if="this.disabledButton">
      <h2 id="loadItemNoSavingsHeader">Slot {{slotNr}}</h2>
    </div>
    <div v-else>
      <h2 id="loadItemSaveHeader">{{studioName}}</h2>
      <div id="loadItemDateInfo">
        <div id="loadItemDateInfoHeader">{{ $t('date') }}</div>
        <div id="loadItemDateInfoValue">{{date}}</div>
      </div>
      <div id="loadItemButtonContainer">
        <custom-button
            id="loadButton"
            :dark="false"
            size="small"
            :disabled="disabledButton"
            @clicked="load">{{ $t('loadButton') }}</custom-button>
        <custom-button
            id="deleteButton"
            :dark="true"
            size="small"
            @clicked="deleting">{{ $t('delete') }}</custom-button>
      </div>
    </div>

    <transition name="modal">
      <close-modal
          v-if="showAutoSaveModal"
          headline="autoSaveModal"
          @useAutoSave="useAutoSave = true; autoSaving()"
          @normal="useAutoSave = false; showAutoSaveModal = false; autoSaving()">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </close-modal>
    </transition>

    <transition name="modal">
      <close-modal
          v-if="showCorruptModal"
          headline="saveCorruptModal"
          @deleteFile="deleting(); showCorruptModal = false"
          @close="showCorruptModal = false">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </close-modal>
    </transition>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import CustomButton from "@/components/kitchenSink/CustomButton";
import i18next from "i18next";
import CloseModal from "@/components/mainGameComponents/CloseModal";

export default {
  name: "LoadItem",
  components: {CloseModal, CustomButton},
  mixins: [soundeffectMixin('button','click')],

  props: {
    slotNr: Number,
  },

  data(){
    return {
      disabledButton: null,
      date: null,
      studioName: null,
      showAutoSaveModal: false,
      showCorruptModal: false,
      useAutoSave: false
    }
  },

  mounted() {
  this.init()
  },

  methods: {
    init(){
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
        console.log(data[1])
        if(data[0] !== null) {
          if (data[1] !== '102' && data[1] !== '106') {
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

    load(){
      window.ipcRenderer.send('r2mLoading',this.slotNr)
      window.ipcRenderer.receive('m2rLoading', data => {
        if(data[1]==='100') {
          let saveData = data[0].state
          console.log(saveData)
          console.log(data[0].en_date)
          this.$store.commit("loadFromSave", saveData)
          console.log('Save-File was loaded : ' + data[1])
          this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
        }
        else if(data[1] === '101') {
          console.log('Save-File corrupted - Save State was recovered : ' + data[1])
          let saveData = data[0].state
          this.$store.commit("loadFromSave", saveData)
          this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
        }
        else if(data[1] === '102'){
          this.showCorruptModal = true
          console.log("Konnte nicht geladen werden - File Corrupted! - Save State could not be recovered : " + data[1])
        }
        else if(data[1] === '103'){
          console.log('Das Auto-Save-File ist aktueller als deines... Möchtest du das Auto-Save-File von' + this.date + 'laden? : ' + data[1])
          this.showAutoSaveModal = true
        }
      })
    },

    autoSaving(){
      window.ipcRenderer.send('r2mLoading',this.slotNr)
      window.ipcRenderer.receive('m2rLoading', data => {
        if(this.useAutoSave === true){
          let saveData = data[3].state
          this.$store.commit("loadFromSave", saveData)
          this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
        else if(this.useAutoSave === false){
          let saveData = data[0].state
          this.$store.commit("loadFromSave", saveData)
          this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
        }
    })
    },

    async deleting(){
      window.ipcRenderer.send('r2mDeleting', this.slotNr)
      await new Promise(resolve => setTimeout(resolve, 20))
      this.init()
      this.date = null
    }
  }
}
</script>

<style scoped>
#card {
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  transition: 0.3s;
  padding: 1px 20px 20px 20px;
}

#loadButton:disabled,
#loadButton[disabled]{
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

#loadItemNoSavingsHeader {
  color: #848891;
}

#loadItemButtonContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 15px;
}

#loadItemDateInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 5px 10px 5px;
  border-radius: var(--fsm-m-border-radius);
  background-color: var(--fsm-dark-blue-4);
}

#loadItemDateInfoHeader {
  margin-left: 10px;
}

#loadItemDateInfoValue {
  margin-right: 10px;
}
</style>