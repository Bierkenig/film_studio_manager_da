<template>
  <div>
    <div>{{$t('durationSection.set')}}</div>
    <input type="range" :min="preProduction.min" :max="preProduction.max" step="1" v-model="preProductionInput">
    <div>{{preProductionInput}} {{$t('durationSection.weeks')}}</div>

    <div>{{$t('durationSection.set2')}}</div>
    <input type="range" :min="production.min" :max="production.max" step="1" v-model="productionInput">
    <div>{{productionInput}} {{$t('durationSection.weeks')}}</div>

    <div>{{$t('durationSection.set3')}}</div>
    <input type="range" :min="production.min" :max="production.max" step="1" v-model="postProductionInput">
    <div>{{postProductionInput}} {{$t('durationSection.weeks')}}</div>

    <button @click="releaseSection = true">{{$t('durationSection.confirm')}}</button>

    <div v-if="releaseSection">
      <div>{{$t('durationSection.releaseDate')}}</div>
      <input type="range" :min="0" :max="12" step="1" v-model="releaseDateInput">

      <div>{{$t('durationSection.choice')}}{{releaseDateInput}} {{$t('durationSection.weeks')}}</div>

      <button @click="calcTheReleaseDate(); release = true; disabled = false">{{$t('durationSection.calc')}}</button>

      <div v-if="release">{{$t('durationSection.estimated')}}</div>
      <div v-if="release">{{calcReleaseDate.toDateString()}}</div>

      <button :disabled="disabled" @click="setStoreWeeks(); this.$router.push({name: 'budgetSection'})">{{$t('durationSection.continue')}}</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "durationSection",
  data() {
    return {
      scope: this.$store.state.currentMovie._preProduction.screenplay.details.scope,
      preProductionInput: 0,
      productionInput: 0,
      postProductionInput: 0,
      releaseDateInput: 0,
      preProduction: {
        min: 0,
        max: 1
      },
      production: {
        min: 0,
        max: 1
      },
      postProduction: {
        min: 0,
        max: 1
      },
      productionPhase: 0,
      disabled: true,
      counter: 0,
      calcReleaseDate: new Date(),
      release: false,
      releaseSection: false,
    }
  },

  methods: {
    calcTheReleaseDate() {
      this.productionPhase = parseInt(this.preProductionInput) + parseInt(this.productionInput) + parseInt(this.postProductionInput)
      const weeks = this.productionPhase + parseInt(this.releaseDateInput)
      this.calcReleaseDate = this.addWeeks(new Date(), weeks, this.$store.getters.getCurrentDate)
    },

    addWeeks(date, weeks, startDate) {
      date.setDate(startDate.getDate() + 7 * weeks);
      return date;
    },

    setStoreWeeks() {
      this.$store.state.currentMovie._preProduction.releaseDate = this.calcReleaseDate;
      this.$store.state.currentMovie._preProduction.preProductionLength = this.preProductionInput
      this.$store.state.currentMovie._preProduction.productionLength = this.productionInput
      this.$store.state.currentMovie._preProduction.postProductionLength = this.postProductionInput
    }
  },

  mounted() {
    switch (this.scope) {
      case "Little":
        this.preProduction.min = 2
        this.preProduction.max = 4
        this.production.min = 4
        this.production.max = 8
        this.postProduction.min = 4
        this.postProduction.max = 8
        break
      case "Small":
        this.preProduction.min = 4
        this.preProduction.max = 6
        this.production.min = 8
        this.production.max = 12
        this.postProduction.min = 8
        this.postProduction.max = 12
        break
      case "Normal":
        this.preProduction.min = 6
        this.preProduction.max = 8
        this.production.min = 12
        this.production.max = 16
        this.postProduction.min = 12
        this.postProduction.max = 16
        break
      case "Large":
        this.preProduction.min = 8
        this.preProduction.max = 10
        this.production.min = 16
        this.production.max = 20
        this.postProduction.min = 16
        this.postProduction.max = 20
        break
      case "Epic":
        this.preProduction.min = 10
        this.preProduction.max = 12
        this.production.min = 20
        this.production.max = 24
        this.postProduction.min = 20
        this.postProduction.max = 24
        break
    }

    this.preProductionInput = this.preProduction.min
    this.productionInput = this.production.min
    this.postProductionInput = this.postProduction.min
  }
}
</script>

<style scoped>

</style>