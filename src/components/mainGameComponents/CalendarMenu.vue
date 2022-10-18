<template>
  <div>
    <game-header :studioname="this.$store.getters.getStudio.name" :budget="this.$store.getters.getBalance"/>
    <menu-nav/>
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";
export default {
  name: "CalendarMenu",
  components: {GameHeader, MenuNav}
}
</script>

<style scoped>

</style>