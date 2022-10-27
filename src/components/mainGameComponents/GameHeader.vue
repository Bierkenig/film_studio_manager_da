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
import $ from "jquery";

export default {
  name: "GameHeader",
  mixins: [soundeffectMixin('button','click')],

  props: {
    studioname: String,
    budget: Number,
    pageName: String
  },

  methods: {
    addClassByDate(date) {
      let dataAttr = this.getDataAttr(date);
      $("[data-date='" + dataAttr + "']").addClass("today");
    },

    getDataAttr(date) {
      return date.getFullYear() + "-" + (date.getMonth().toString.length === 2 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) + "-" + (date.getDate().toString().length === 2 ? date.getDate() : "0" + date.getDate());
    },

    onUpdateDate(){
      this.$store.commit('updateCurrentDate');
      //this.addClassByDate(this.$store.getters.getCurrentDate);
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