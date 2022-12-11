<template>
  <div id="headerBox">
    <div class="headerSectionBox">
      <page-heading :heading="pageName">Your manager dashboard.</page-heading>

      <!--<div>
        <h2>{{ $t(pageName) }}</h2>
        <p>{{ $t('managerDashboard') }}</p>
      </div>-->

      <div class="headerBoxStudioInformation">
        <!--<img :src="this.$store.getters.getCurrentLogo" alt="Logo"/>
        <p>{{ studioname }}</p>-->
        <header-info :icon="this.$store.getters.getCurrentLogo">{{ studioname }}</header-info>
        <p>{{ roundBudget(budget) }}</p>
        <p>{{ ("0" + this.$store.getters.getCurrentDate.getDate()).slice(-2) }}
          {{ this.$store.getters.getCurrentDate.toLocaleString('en-US', {month: 'short'}) }},
          {{ this.$store.getters.getCurrentDate.getFullYear() }}
        </p>
      </div>

      <p class="headerBoxHiddenElement"></p>
      <settings-header id="headerBoxSettingHeader"/>
      <!--<custom-button :dark="false" size="small" @click="onUpdateDate">{{ $t('skipWeek') }}</custom-button>-->
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";
import PageHeading from "@/components/kitchenSink/PageHeading";
import SettingsHeader from "@/components/startComponents/SettingsHeader";
import HeaderInfo from "@/components/kitchenSink/HeaderInfo";
//import CustomButton from "@/components/kitchenSink/CustomButton";

export default {
  name: "GameHeader",
  components: {HeaderInfo, SettingsHeader, PageHeading, /*CustomButton*/},
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
.headerSectionBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 100px;
  margin-right: 100px;
}

.headerBoxStudioInformation {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  text-align: center;
}

img {
  height: 50px;
  width: 50px;
}

#headerBoxSettingHeader {
  position: absolute;
  float: right;
  right: 100px;
}

.headerBoxHiddenElement {
  width: 167px;
}
</style>