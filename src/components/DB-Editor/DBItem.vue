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
      isShow: null
    }
  },

  methods: {
    select() {
      console.log(this.slotNr)
      console.log(this.$store.state)
      window.ipcRenderer.send('changeDBPath', "./.data/database/fsm_custom" + this.slotNr +".db")
      this.$store.state.dbFetcher.clear()
      this.$store.state.dbFetcher.fetch()
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