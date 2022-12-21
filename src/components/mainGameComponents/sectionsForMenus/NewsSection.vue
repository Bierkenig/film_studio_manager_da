<template>
  <div id="newsSection">
    <h1>{{ $t('news') }}</h1>

    <div>
      <select
        v-model="selectedSortType">
        <option value="People">{{ $t('people') }}</option>
        <option value="Movies">{{ $t('movies') }}</option>
        <option value="Studios">Studios</option>
      </select>
    </div>

    <div id="newsTextSection">
      <div v-for="(it, index) in this.data" :key="index">
        {{ it._title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsSection",

  data(){
    return {
      data: [],
      selectedSortType: 'Movies',
    }
  },

  methods: {
    loadData(){
      let sourceData = this.$store.getters.getCurrentNews;
      for (let i = 0; i < sourceData.length; i++) {
        if(sourceData[i]._type === this.selectedSortType){
          this.data.push(sourceData[i])
        }
      }
    }
  },

  mounted() {
    this.loadData();
  },

  watch: {
    selectedSortType() {
      this.data = []
      this.loadData();
    }
  }
}
</script>

<style scoped>
#newsSection {
  display: flex;
  justify-content: center;
  background-color: black;
  color: white;
}

#newsTextSection {
  background-color: #2c3e50;
  overflow-y: scroll;
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