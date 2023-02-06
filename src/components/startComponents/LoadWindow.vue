<template>
  <div id="loadWindowMainDiv">
    <div>
      <icon-button
          id="loadWindowBackButton"
          icon="simple-arrow-left"
          size="medium"
          :dark="true"
          :bg-gradient="true"
          :icon-gradient="false"
          :shadow="false"
          @click="goBack()"/>
    </div>

    <div id="savingsBox">
      <h1 id="loadWindowHeader">{{ $t('loadButton') }}</h1>
      <div id="loadWindowSaveItems">
        <load-item class="savingsBoxLoadItem" :slot-nr="1" ref="slot1"/>
        <load-item class="savingsBoxLoadItem" :slot-nr="2" ref="slot2"/>
        <load-item class="savingsBoxLoadItem" :slot-nr="3" ref="slot3"/>
      </div>
    </div>
    <transition name="modal">
      <close-modal
          v-if="showAutoSaveModal"
          headline="autoSaveModal"
          @useAutoSave="useAutoSave = true; autoSaving()"
          @normal="useAutoSave = false; showAutoSaveModal = false; autoSaving()"
          @close="showAutoSaveModal = false">
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
import LoadItem from "@/components/startComponents/LoadItem";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";
import i18next from "i18next";
import CloseModal from "@/components/mainGameComponents/CloseModal";


export default {
  name: "LoadWindow",
  mixins: [soundeffectMixin('button','click')],
  components: {CloseModal, LoadItem, IconButton},

  data(){
    return{
      showAutoSaveModal: false,
      showCorruptModal: false,
      useAutoSave: false,
      slotForAutoSave: null,
      componentKey: 0
    }
  },

  mounted(){
    console.log(this.$refs)
    window.ipcRenderer.receive('m2rLoading', data => {
      this.slotForAutoSave = data[2]
      if(data[1]==='100') {
        let saveData = data[0].state
        console.log(saveData)
        console.log(data[0].en_date)
        this.$store.commit("loadFromSave", saveData)
        console.log('Save-File was loaded : ' + data[1])
        this.removeListeners()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
      else if(data[1] === '101') {
        console.log('Save-File corrupted - Save State was recovered : ' + data[1])
        let saveData = data[0].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
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

    window.ipcRenderer.receive('m2rAutoSaveLoading', data => {
      if(this.useAutoSave === true){
        let saveData = data[3].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
      else if(this.useAutoSave === false){
        let saveData = data[0].state
        this.$store.commit("loadFromSave", saveData)
        this.removeListeners()
        this.$router.push({name: 'loadingScreen', params: {nextRoute: 'home', title: i18next.t('loadingSaveFile') + '...', duration: '3'}})
      }
    })
  },

  methods: {
    goBack(){
      this.$router.push({name: 'default'})
    },
    removeListeners(){
      window.ipcRenderer.removeAllListeners('m2rLoading')
      window.ipcRenderer.removeAllListeners('m2rChecking')
      window.ipcRenderer.removeAllListeners('m2rAutoSaveLoading')
      window.ipcRenderer.removeAllListeners('m2rSaveSlot')
    },
    autoSaving(){
      window.ipcRenderer.send('r2mLoading',{slotNr: this.slotForAutoSave, responseChannel: 'm2rAutoSaveLoading'})
    },

    deleting(){
      window.ipcRenderer.send('r2mDeleting', this.slotNr)
      this.$refs['slot' + this.slotForAutoSave].deleting()
    },
  }
}
</script>

<style scoped>
#loadWindowMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#loadWindowBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#loadWindowHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

#savingsBox {
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 350px;
  padding: 10px 20px 20px 20px;
}

#loadWindowSaveItems {
  display: flex;
  flex-direction: column;
  gap: 15px
}
</style>