<template>
  <div>
    <game-header :studioname="this.$store.getters.getStudio.name" :budget="this.$store.getters.getBalance"/>
    <h1>Main Menu</h1>
    <menu-nav/>
    <img :src="this.$store.getters.getCurrentLogo" alt="Logo"/>
  </div>
</template>

<script>
import MenuNav from "@/components/MenuNav";
import GameHeader from "@/components/GameHeader";
export default {
  name: "MainMenu",
  components: {GameHeader, MenuNav}
}
</script>

<style scoped>

</style>