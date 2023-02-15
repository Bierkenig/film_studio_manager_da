<template>
  <div v-for="(el, index) in otherStudios" :key="index">
    {{ el.id }}
    {{ el.name }}
    {{ el.year }}
    {{ el.budget}}
    {{ el.popularity }}
    {{ el.marketShare}}
    {{ el.movies }}

    <router-link :to="{ name: 'StudioEdit'}">
      <button id="editButton" class="buttonStyle" @click="edit(el)" >Edit</button>
    </router-link>
    <button id="deleteButton" class="buttonStyle" @click="deleteStudio(el)">Delete</button>
  </div>
  <button id="backButton" class="buttonStyle" @click="this.$router.go(-2)">Back</button>

</template>

<script>
import {Studio} from "@/classes/Studio";

export default {
  name: "StudioOutput",
  components: {},
  data(){
    return {
      otherStudios: null
    };
  },
  mounted(){
    this.otherStudios = []
    this.otherStudios = this.$store.state.otherStudios;
  },

  methods: {
    edit(studio){
      this.$store.state.editStudio = studio
    },

    async deleteStudio(studio){
      window.ipcRenderer.removeAllListeners("gotStudios")
      window.ipcRenderer.send('editDB', 'DELETE FROM studio WHERE pk_studioID = ' + studio.id)

      this.$store.state.otherStudios = []
      await new Promise(resolve => setTimeout(resolve, 200))
      window.ipcRenderer.send('getStudios', 'SELECT * FROM studio')
      window.ipcRenderer.receive('gotStudios', (data) => {
        this.$store.commit('addOtherStudios', new Studio(data.pk_studioID, data.name, data.foundationDate, data.budget, data.popularity, {"2023": data.marketShare}))
      })
    },
  }


}


</script>

<style scoped>

</style>