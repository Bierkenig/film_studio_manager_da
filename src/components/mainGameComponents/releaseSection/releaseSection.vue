<template>
  <div>
    <h3>{{$t('release.releaseOptions')}}</h3>
    <div>{{$t('release.cinema')}}</div>
    <div>{{$t('release.cinRe')}}</div>
    <input type="range" min="" max="" step="1">

    <div>{{$t('release.negotiate')}}</div>

  </div>
</template>

<script>
export default {
  name: "releaseSection",

  data() {
    return {
      cinema: {
        min: 0,
        max: 1
      }
    }
  }
}
</script>

<style scoped>

</style>