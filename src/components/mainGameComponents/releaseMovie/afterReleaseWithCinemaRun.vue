<template>
  <div>
    <h2>{{$t('afterReleaseWithCinema.details')}}</h2>
    <div>
      <div>{{$t('afterReleaseWithCinema.criticsRating')}}: {{release.criticsFormula}}</div>
      <div>{{$t('afterReleaseWithCinema.audienceRating')}}: {{release.audienceFormula}}</div>
      <div>{{$t('afterReleaseWithCinema.release')}}: {{release.popularityFormula}}</div>
      <div>{{$t('afterReleaseWithCinema.open')}}: {{release.openingEarnings}}</div>
    </div>
  </div>
</template>

<script>
import Release from "@/classes/Release";

export default {
  name: "afterReleaseWithCinemaRun",

  props: {
    release: Release
  }
}
</script>

<style scoped>

</style>