<template>
  <div id="sourcesDetailsMainDiv">
    <h2 class="sourcesDetailsHeader">{{ $t('general') }}</h2>
    <div class="sourcesDetailsBox">
      <div id="sourcesDetailsPosterBox">
      </div>
      <div v-if="franchise !== null" class="sourcesDetailsFranchiseInfo">
        <div id="sourcesDetailsFranchiseName">
          {{ franchise.name }}
        </div>
        <div>
          {{ franchise.foundationDate.toLocaleDateString(this.$store.getters.getCurrentLanguage, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
        </div>
        <div>
          {{ franchiseMovies.length }}
        </div>
      </div>
    </div>
    <h2 class="sourcesDetailsHeader" id="sourcesDetailsMovieHeader">{{ $t('movies') }}</h2>
    <div class="sourcesDetailsBox">
      <div v-if="franchiseMovies.length !== 0" class="sourcesDetailsMovieBox">
        <div v-for="(it,index) in franchiseMovies" :key="index" class="sourcesDetailsMovieItem">
          {{ it._preProduction.screenplay.title }}
        </div>
      </div>
    </div>
    <custom-button
        v-if="franchise !== null && franchise.owner !== this.$store.getters.getStudio"
        id="sourcesDetailsBuyButton"
        :dark="false"
        size="small"
        :disabled="checkBalance"
        @clicked="buyFranchise">{{ $t('continue') }}</custom-button>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton";
export default {
  name: "SourcesDetails",
  components: {CustomButton}
}
</script>

<style scoped>

</style>