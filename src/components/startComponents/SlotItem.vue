<template>
  <div id="card">
    <h1 v-if="this.disabledButton">{{ $t('noSaving') }}</h1>
    <h1 v-else> {{studioName}} </h1>
    <p> {{date}} </p>
    <p>{{$t('save_slot')}}: {{slotNr}}</p>
    <!-- -->
    <button id="selectButton" class="buttonStyle" :disabled="!disabledButton" @click="select">Select</button>
    <button id="loadButton" class="buttonStyle" :disabled="disabledButton" @click="deleting">Delete</button>


  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "SlotItem",
  mixins: [soundeffectMixin('button', 'click')],

  props: {
    slotNr: Number,
  },

  data() {
    return {
      disabledButton: null,
      date: null,
      studioName: null
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
      if (data[0] !== null) {
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

    select() {
      this.$store.commit("setSlot", this.slotNr)
      console.log(this.$store.state)
      // window.ipcRenderer.send('r2mLoading', this.slotNr)
      // window.ipcRenderer.receive('m2rLoading', data => {
      //
      // })
      window.ipcRenderer.send('changeDBPath', "./.data/database/fsm_custom1.db")
    },

    deleting(){
      window.ipcRenderer.send('r2mDeleting', this.slotNr)
      this.init()
      this.date = null
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