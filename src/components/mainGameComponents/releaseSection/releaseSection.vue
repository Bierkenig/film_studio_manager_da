<template>
  <div>
    <h3>{{$t('release.releaseOptions')}}</h3>
    <div>{{$t('release.cinema')}}</div>
    <div>{{$t('release.cinRe')}}</div>
    <input type="range" min="" max="" step="1" v-model="cinema.weeks">

    <!-- TODO release medium -->

    <div>{{$t('release.negotiate')}}</div>
    <div v-if="cinema.weeks > 6">{{$t('release.long')}}</div>
    <div v-if="cinema.weeks > 6">{{$t('release.risk1')}}</div>
    <div v-if="cinema.weeks <= 6">{{$t('release.short')}}</div>
    <div v-if="cinema.weeks <= 6">{{$t('release.risk2')}}</div>

    <div>{{$t('release.timeSlots')}}</div>
    <div>{{$t('release.more')}}</div>
    <div>{{$t('release.less')}}</div>

    <input type="range" min="0" max="50" step="1" v-model="timeSlots">
    <div>{{$t('release.earnings')}} {{roundBudget(earnings)}}</div>

    <div>{{$t('release.dvd')}}</div>
    <div>{{$t('release.earnings')}} {{roundBudget(earnings2)}}</div>

    <div>{{$t('release.streaming')}}</div>
    <div></div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "releaseSection",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      cinema: {
        min: 0,
        max: 1,
        weeks: 0,
      },
      timeSlots: 0,
      earnings: this.calcCinemaEarnings(),
      earnings2: this.calcDVDEarnings(),
    }
  },

  methods: {
    calcCinemaEarnings() {

    },
    roundBudget(labelValue){
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : Math.abs(Number(labelValue));
      }
    },
    calcDVDEarnings() {

    }
  }
}
</script>

<style scoped>

</style>