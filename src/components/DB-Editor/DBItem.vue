<template>
  <div id="card">
    <h2>{{ $t('database') }} {{slotNr}}</h2>
    <!-- -->
    <div id="dbItemButtonContainer">
      <custom-button
          id="selectButton"
          :dark="false"
          size="small"
          @clicked="select">Edit</custom-button>
      <custom-button
          id="deleteButton"
          :dark="false"
          size="small"
          @clicked="reset">Reset</custom-button>
    </div>

  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import {Studio} from "@/classes/Studio";

export default {
  name: "DBItem",
  components: {CustomButton},
  mixins: [soundeffectMixin('button', 'click')],

  props: {
    slotNr: Number,
  },

  data() {
    return {
      name: null,
      isShow: false
    }
  },

  methods: {
    async select() {
      window.ipcRenderer.removeAllListeners('gotStudios')
      process.env.NODE_ENV !== 'production' ? window.ipcRenderer.send('changeDBPath', "public/DB/fsm_custom" + this.slotNr +".db") : window.ipcRenderer.send('changeDBPath',  "../bundled/DB/fsm_custom"+ this.slotNr +".db")
      this.$store.state.dbFetcher.clear()
      this.$store.state.dbFetcher.fetch()
      this.$store.state.otherStudios = []
      await new Promise(resolve => setTimeout(resolve, 200))
      window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      window.ipcRenderer.receive('gotStudios', (data) => {
        this.$store.commit('addOtherStudios', new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })
      this.$router.push("Editor")
    },

    reset(){
      this.$emit('reset', this.slotNr)
    },


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

#dbItemButtonContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-top: 15px;
}
</style>