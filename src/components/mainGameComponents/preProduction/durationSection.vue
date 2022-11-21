<template>
  <div>
    <div>{{$t('durationSection.set')}}</div>
    <div v-for="(el, index) in screenplay" :key="index">
      {{$t('durationSection.length')}}: {{el.length}} / {{$t('durationSection.scope')}}: {{el.details.scope}} / {{$t('durationSection.castSize')}}:
      {{$t('durationSection.main')}}: {{el.roles.main.length}}, {{$t('durationSection.support')}}: {{el.roles.support.length}},
      {{$t('durationSection.minor')}}: {{el.roles.minor.length}}, {{$t('durationSection.cameo')}}: {{el.roles.cameo.length}}, {{$t('durationSection.voice')}}: {{el.roles.voiceOver.length}}
    </div>
    <!-- swiper with production length-->
    <input type="range" min="" max="" step="">
    <div></div>
  </div>
</template>

<script>
export default {
  name: "durationSection",

  data() {
    return {
      screenplay: this.$store.getters.getCurrentScreenplay
    }
  },
}
</script>

<style scoped>

</style>