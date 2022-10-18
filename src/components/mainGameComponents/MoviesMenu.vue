<template>
  <div>
    <game-header :studioname="this.$store.getters.getStudio.name" :budget="this.$store.getters.getBalance"/>
    <menu-nav/>
  </div>
</template>

<script>
import GameHeader from "@/components/mainGameComponents/GameHeader";
import MenuNav from "@/components/mainGameComponents/MenuNav";
export default {
  name: "MoviesMenu",
  components: {GameHeader, MenuNav}
}
</script>

<style scoped>

</style>