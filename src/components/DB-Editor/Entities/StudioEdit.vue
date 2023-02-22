<template>
  <div id="studioEditMainDiv">
    <icon-button
        id="dbEditorBackButton"
        icon="simple-arrow-left"
        size="medium"
        :dark="true"
        :bg-gradient="true"
        :icon-gradient="false"
        :shadow="false"
        @click="$router.go(-1)"
    />
    <background-tile title="Edit Studio" id="studioEditBgTile">
      <div class="studioEditInputLine">
        <label for="name">Studio Name</label>
        <input id="name" v-model="name">
      </div>
      <div class="studioEditInputLine">
        <label for="popularity">Studio Popularity</label>
        <input id="popularity" type="Number"
               @change="() => { if(popularity > 100 || popularity < 1) { this.popularity = 0 }}" v-model="popularity">
      </div>
      <custom-button id="saveButton" class="buttonStyle" @click="writeDB(studio)">Save</custom-button>
    </background-tile>
  </div>
</template>

<script>

import {Studio} from "@/classes/Studio";
import IconButton from "@/components/kitchenSink/IconButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "PersonEdit",
  components: {CustomButton, BackgroundTile, IconButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],


  data() {
    return {
      studio: this.$store.state.editStudio,
      name: null,
      year: null,
      budget: null,
      popularity: null,

    }
  },
  mounted() {
    this.name = this.studio.name
    this.year = this.studio.year
    this.budget = this.studio.budget
    this.popularity = this.studio.popularity
  },
  methods: {
    async writeDB(studio) {
      window.ipcRenderer.removeAllListeners("gotStudios")

      window.ipcRenderer.send('editDB', "UPDATE studio SET name = '" + this.name + "', popularity = '" + this.popularity + "' WHERE pk_studioID = " + studio.id)

      this.$store.state.otherStudios = []
      await new Promise(resolve => setTimeout(resolve, 200))
      window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      window.ipcRenderer.receive('gotStudios', (data) => {
        this.$store.commit('addOtherStudios', new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })

      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>
#studioEditMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#dbEditorBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

#studioEditBgTile {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  width: fit-content;
}

.studioEditInputLine {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

input {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  padding: 10px;
}

input:focus {
  outline: none;
}
</style>