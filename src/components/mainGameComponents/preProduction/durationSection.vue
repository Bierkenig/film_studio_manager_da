<template>
  <div>
    <div>{{$t('durationSection.set')}}</div>
    <input type="range" :min="2" :max="12" step="1" v-model="preProductionInput">
    <div>{{preProductionInput}} {{$t('durationSection.weeks')}}</div>

    <div>{{$t('durationSection.set2')}}</div>
    <input type="range" :min="4" :max="24" step="1" v-model="productionInput">
    <div>{{productionInput}} {{$t('durationSection.weeks')}}</div>

    <div>{{$t('durationSection.set3')}}</div>
    <input type="range" :min="4" :max="24" step="1" v-model="postProductionInput">
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
      productionPhase: 0,
      disabled: true,
      counter: 0,
      calcReleaseDate: null,
      release: false,
      releaseSection: false,
    }
  },

  methods: {
    calcTheReleaseDate() {
      this.productionPhase = parseInt(this.preProductionInput) + parseInt(this.productionInput) + parseInt(this.postProductionInput)
      const weeks = this.productionPhase + parseInt(this.releaseDateInput)
      this.calcReleaseDate = this.addWeeks(weeks, this.$store.getters.getCurrentDate)
    },

    addWeeks(weeks, startDate) {
      return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + (weeks * 7))
    },

    setStoreWeeks() {
      this.$store.state.currentMovie._preProduction.releaseDate = this.calcReleaseDate;
      this.$store.state.currentMovie._preProduction.preProductionLength = this.preProductionInput
      this.$store.state.currentMovie._preProduction.productionLength = this.productionInput
      this.$store.state.currentMovie._preProduction.postProductionLength = this.postProductionInput

      //check for needed
      switch (this.scope) {
        case "Small":
          if (this.isBetween(2, 4, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(4, 8, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(4, 8, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          break
        case "Normal":
          if (this.isBetween(4, 6, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(8, 12, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(8, 12, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(2, 4, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(4, 8, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(4, 8, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          break
        case "Large":
          if (this.isBetween(6, 8, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(12, 16, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(12, 16, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(4, 6, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(8, 12, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(8, 12, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          break
        case "Epic":
          if (this.isBetween(8, 10, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(16, 20, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(16, 20, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.3
          if (this.isBetween(6, 8, this.preProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(12, 16, this.productionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          if (this.isBetween(12, 16, this.postProductionInput)) this.$store.getters.getCurrentMovie._preProduction.neededDuration += 0.7
          break
      }

      console.log(this.scope)
      console.log(Math.round(this.$store.getters.getCurrentMovie._preProduction.neededDuration))
    },

    isBetween(min, max, value) {
      if (value >= min && value < max) return true
    }
  },

  mounted() {
    this.preProductionInput = 2
    this.productionInput = 4
    this.postProductionInput = 4
  }
}
</script>

<style scoped>

</style>