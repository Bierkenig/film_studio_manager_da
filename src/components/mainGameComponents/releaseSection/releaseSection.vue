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
    <div>{{$t('release.earnings')}} {{earnings}}</div>

    <div>{{$t('release.dvd')}}</div>
    <div>{{$t('release.earnings')}} {{earnings2}}</div>

    <div>{{$t('release.streaming')}}</div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "releaseSection",

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
    calcDVDEarnings() {

    }
  }
}
</script>

<style scoped>

</style>