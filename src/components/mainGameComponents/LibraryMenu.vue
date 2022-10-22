<template>
  <div>
    <game-header
        :studioname="this.$store.getters.getStudio.name"
        :budget="this.$store.getters.getBalance"
        :page-name="$t('library')"/>
    <menu-nav/>
  </div>
</template>

<script>
import GameHeader from "@/components/mainGameComponents/GameHeader";
import MenuNav from "@/components/mainGameComponents/MenuNav";
export default {
  name: "LibraryMenu",
  components: {GameHeader, MenuNav}
}
</script>

<style scoped>

</style>