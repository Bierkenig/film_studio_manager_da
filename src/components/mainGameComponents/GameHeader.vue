<template>
  <div id="headerBox">
    <div class="headerSectionBox">
      <router-link to="mainSettings">
        <button id="settingsButton" class="buttonStyle">{{ $t('settings') }}</button>
      </router-link>

      <h2>{{ $t(pageName) }}</h2>

      <img :src="this.$store.getters.getCurrentLogo" alt="Logo"/>
      <p>{{ studioname }}</p>
      <p>{{ budget }}</p>
      <p>{{ ("0" + this.$store.getters.getCurrentDate.getDate()).slice(-2) }}
        {{ this.$store.getters.getCurrentDate.toLocaleString('en-US', {month: 'short'}) }},
        {{ this.$store.getters.getCurrentDate.getFullYear() }}
      </p>

      <button id="skipWeekButton" @click="this.$store.commit('updateCurrentDate')">{{ $t('skipWeek') }}</button>
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
    pageName: String
  },
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

img {
  height: 50px;
  width: 50px;
}
</style>