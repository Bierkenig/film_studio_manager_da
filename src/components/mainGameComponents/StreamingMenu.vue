<template>
  <div>
    <game-header
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        page-name="Streaming"/>
  </div>
</template>

<script>
import GameHeader from "@/components/mainGameComponents/GameHeader";
export default {
  name: "StreamingMenu",
  components: {GameHeader}
}
</script>

<style scoped>

</style>