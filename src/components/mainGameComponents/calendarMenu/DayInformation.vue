<template>
  <div>
    <h3 v-if="clickedDay !== null">
      {{ clickedDay.toLocaleDateString(this.$store.getters.getCurrentLanguage, { weekday: 'long' }) }}
      {{ ("0" + this.clickedDay.getDate()).slice(-2) }}
      {{ this.clickedDay.toLocaleString('en-US', {month: 'short'}) }},
      {{ this.clickedDay.getFullYear() }}
    </h3>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "DayInformation",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    event: Object,
    clickedDay: Date
  },
}
</script>

<style scoped>

</style>