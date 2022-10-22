<template>
  <div>
    <game-header
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="$t('movies')"/>
  </div>
</template>

<script>
import GameHeader from "@/components/mainGameComponents/GameHeader";
export default {
  name: "MoviesMenu",
  components: {GameHeader}
}
</script>

<style scoped>

</style>