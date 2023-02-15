<template>
  <div>
    <label for="name">Studio Name</label>
    <input id="name" v-model="name">
  </div>

  <br/>

  <div>
    <label for="popularity">Studio Popularity</label>
    <input id="popularity" type="Number" @change="() => { if(popularity > 100 || popularity < 1) { this.popularity = 0 }}" v-model="popularity">
  </div>

  <button id="backButton" class="buttonStyle" @click="this.$router.go(-1)">Back</button>
  <button id="saveButton" class="buttonStyle" @click="writeDB(studio)">Save</button>

</template>

<script>

import {Studio} from "@/classes/Studio";

export default {
  name: "PersonEdit",

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

      window.ipcRenderer.send('editDB', "UPDATE studio SET name = '" + this.name + "', popularity = '" + this.popularity+ "' WHERE pk_studioID = " + studio.id)

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

</style>