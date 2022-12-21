<template>
  <div id="projectsSection">
    <h1>Projects</h1>

    <div>
      <select
          v-model="selectedProjectsType">
        <option value="All">All</option>
        <option value="Screenplays">Screenplays</option>
        <option value="Productions">Productions</option>
      </select>
    </div>

    <div id="projectsTextSection">
      <div v-for="(it, index) in this.data" :key="index">
        {{ it.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectsSection",

  data(){
    return {
      selectedProjectsType: 'All',
      createdScreenplays: this.$store.getters.getScreenplays,
      productionMovies: this.$store.getters.getInProductionMovies,
      data: []
    }
  },

  mounted() {
    this.data = this.createdScreenplays.concat(this.productionMovies);
  },

  watch: {
    selectedProjectsType() {
      if(this.selectedProjectsType === 'All'){
        this.data = this.createdScreenplays.concat(this.productionMovies);
      } else if(this.selectedProjectsType === 'Screenplays'){
        this.data = this.createdScreenplays;
      } else if(this.selectedProjectsType === 'Productions'){
        this.data = this.productionMovies;
      }
    }
  }
}
</script>

<style scoped>
#projectsSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#projects {
  margin: 3em;
  background-color: #2c3e50;
  overflow-y: scroll;
  width: 80%;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-button {
  height: 1.5em;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1C222F;
  border-radius: 20px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(226, 226, 226);
  border-radius: 20px;
}
</style>