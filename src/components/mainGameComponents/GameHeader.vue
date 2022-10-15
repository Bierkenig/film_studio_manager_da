<template>
  <div id="headerBox">
    <div class="headerSectionBox">
      <img :src="this.$store.getters.getCurrentLogo" alt="Logo"/>
      <p>{{ studioname }}</p>
      <span>&#124;</span>
      <p>{{ budget }}</p>
    </div>

    <div class="headerSectionBox">
      <button id="skipWeekButton">{{ $t('skipWeek') }}</button>
    </div>

  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "GameHeader",
  mixins: [soundeffectMixin('button','click')],

  props: {
    studioname: String,
    budget: Number,
  }
}
</script>

<style scoped>
#headerBox, .headerSectionBox {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  gap: 3em;
}

.headerSectionBox {
  background-color: lightgray;
}

img {
  height: 50px;
  width: 50px;
}
</style>