<template>
  <div>
    <game-header :studioname="this.$store.getters.getStudio.name" :budget="this.$store.getters.getBalance"/>
    <h1>{{ $t('home') }}</h1>
    <menu-nav/>
  </div>
</template>

<script>
import MenuNav from "@/components/mainGameComponents/MenuNav";
import GameHeader from "@/components/mainGameComponents/GameHeader";
import soundeffectMixin from "@/mixins/soundeffectMixin";
export default {
  name: "HomeMenu",
  mixins: [soundeffectMixin('button','click')],
  components: {GameHeader, MenuNav}
}
</script>

<style scoped>

</style>