<template>
  <div>
    <!-- call components -->
    <button style="accent-color: aqua" @click="sendMain"></button>
    <h1>{{ renderer }}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },

  data() {
    return {
      mainPro: ['Julian', 'Singer', 'ist', 'coProjektowner'],
      renderer: ""
    }
  },

  methods: {
    sendMain() {
      window.ipcRenderer.send("toMain", "SELECT * FROM test")
    }
  },

  mounted() {
    window.ipcRenderer.receive('fromMain', (data) => {
      console.log("DATA VARIABLE: " + data)
      this.renderer = data
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
