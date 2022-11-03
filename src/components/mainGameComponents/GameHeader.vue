<template>
  <div id="headerBox">
    <div class="headerSectionBox">
      <router-link to="mainSettings">
        <button id="settingsButton" class="buttonStyle">{{ $t('settings') }}</button>
      </router-link>

      <div>
        <h2>{{ $t(pageName) }}</h2>
        <p>{{ $t('managerDashboard') }}</p>
      </div>

      <img :src="this.$store.getters.getCurrentLogo" alt="Logo"/>
      <p>{{ studioname }}</p>
      <p>{{ budget }}</p>
      <p>{{ ("0" + this.$store.getters.getCurrentDate.getDate()).slice(-2) }}
        {{ this.$store.getters.getCurrentDate.toLocaleString('en-US', {month: 'short'}) }},
        {{ this.$store.getters.getCurrentDate.getFullYear() }}
      </p>

      <button id="skipWeekButton" @click="onUpdateDate">{{ $t('skipWeek') }}</button>
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

  methods: {
    onUpdateDate(){
      this.$store.commit('updateCurrentDate');
    },

    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },
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

img {
  height: 50px;
  width: 50px;
}
</style>