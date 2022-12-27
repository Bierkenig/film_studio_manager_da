<template>
  <div id="card">
    <div v-if="this.disabledButton">
      <h2 id="slotItemNoSavingsHeader">Slot {{slotNr}}</h2>
    </div>
    <div v-else>
      <h2 id="slotItemSaveHeader">{{studioName}}</h2>
      <div id="slotItemDateInfo">
        <div id="slotItemDateInfoHeader">{{ $t('date') }}</div>
        <div id="slotItemDateInfoValue">{{date}}</div>
      </div>
    </div>
    <div id="slotItemButtonContainer">
      <custom-button
          id="selectButton"
          :dark="false"
          size="small"
          :disabled="!disabledButton"
          @clicked="select">{{ $t('buyScreenplaySection.select') }}</custom-button>
      <custom-button
          id="deleteButton"
          :dark="true"
          size="small"
          :disabled="disabledButton"
          @clicked="deleting">{{ $t('delete') }}</custom-button>
    </div>
  </div>
  <!--<div id="card">
    <h1 v-if="this.disabledButton">{{ $t('noSaving') }}</h1>
    <h1 v-else> {{studioName}} </h1>
    <p> {{date}} </p>
    <p>{{$t('save_slot')}}: {{slotNr}}</p>
    <button id="selectButton" class="buttonStyle" :disabled="!disabledButton" @click="select">Select</button>
    <button id="loadButton" class="buttonStyle" :disabled="disabledButton" @click="deleting">Delete</button>


  </div>-->
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "SlotItem",
  components: {CustomButton},
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

      this.$router.push({name: 'createStudio'})
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

#selectButton:disabled,
#deleteButton:disabled,
#selectButton[disabled],
#deleteButton[disabled]{
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

#slotItemNoSavingsHeader {
  color: #848891;
}

#slotItemButtonContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 15px;
}

#slotItemDateInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 5px 10px 5px;
  border-radius: var(--fsm-m-border-radius);
  background-color: var(--fsm-dark-blue-4);
}

#slotItemDateInfoHeader {
  margin-left: 10px;
}

#slotItemDateInfoValue {
  margin-right: 10px;
}
</style>