<template>
  <div>
    <h2>{{$t('afterReleaseWithCinema.details')}}</h2>
    <div>
      <div>{{$t('afterReleaseWithCinema.criticsRating')}}: {{release.criticsFormula}}</div>
      <div>{{$t('afterReleaseWithCinema.audienceRating')}}: {{release.audienceFormula}}</div>
      <div>{{$t('afterReleaseWithCinema.release')}}: {{release.popularityFormula}}</div>
      <div>{{$t('afterReleaseWithCinema.open')}}: {{release.openingEarnings}}</div>
    </div>
    <button @click="close()">{{$t('afterReleaseWithCinema.close')}}</button>
  </div>
</template>

<script>

export default {
  name: "afterReleaseWithCinemaRun",

  data() {
    return {
      release: this.$store.getters.getCurrentMovie._release
    }
  },

  methods: {
    close() {

    }
  }
}
</script>

<style scoped>

</style>