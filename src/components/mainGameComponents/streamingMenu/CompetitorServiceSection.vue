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
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "CompetitorServiceSection",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

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