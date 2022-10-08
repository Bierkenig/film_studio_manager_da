<template>
  <div>
    <StartMenu/>
  </div>
</template>

<script>
import StartMenu from "@/components/StartMenu";
export default {
  name: 'App',
  components: {
    StartMenu
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
