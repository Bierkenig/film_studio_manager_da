<template>
  <div>
    <button id="homeButton" class="buttonStyle">Home</button>
    <button id="projectButton" class="buttonStyle">Project</button>
    <button id="studioButton" class="buttonStyle">Studio</button>
    <button id="newsButton" class="buttonStyle">News</button>
    <button id="calendarButton" class="buttonStyle">Calendar</button>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "MenuNav",

  mixins: [soundeffectMixin('button')],
}
</script>

<style scoped>

</style>