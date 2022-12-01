<template>
  <div class="competitorServiceSection">
    <h1>{{ $t('competitorServices') }}</h1>
    <p>{{ $t('competitorMsg') }}</p>
    <router-link :to="{name: 'viewServices'}">
      <button>{{ $t('viewServices') }}</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CompetitorServiceSection"
}
</script>

<style scoped>
.competitorServiceSection {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: black;
  color: white;
}
</style>