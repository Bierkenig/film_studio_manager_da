<template>
  <div>
    <router-view/>
    <audio id="backgroundMusic" autoplay loop>
      <source src="./backgroundMusic/backgroundMusic.mp3" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
export default {
  name: 'App',
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
