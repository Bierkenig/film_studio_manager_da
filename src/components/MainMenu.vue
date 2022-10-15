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
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "MainMenu",
  mixins: [soundeffectMixin('button','click')],
  components: {GameHeader, MenuNav}
}
</script>

<style scoped>

</style>