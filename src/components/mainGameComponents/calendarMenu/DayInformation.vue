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
export default {
  name: "DayInformation",

  props: {
    event: Object,
    clickedDay: Date
  },
}
</script>

<style scoped>

</style>