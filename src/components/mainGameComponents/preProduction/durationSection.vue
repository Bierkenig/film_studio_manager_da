<template>
  <div>
    <div>{{$t('durationSection.set')}}</div>
    <input type="range" :min="preProduction.min" :max="preProduction.max" step="1" v-model="preProductionInput">
    <div>{{preProductionInput}}</div>

    <div>{{$t('durationSection.set2')}}</div>
    <input type="range" :min="production.min" :max="production.max" step="1" v-model="productionInput">
    <div>{{productionInput}}</div>

    <div>{{$t('durationSection.set3')}}</div>
    <input type="range" :min="production.min" :max="production.max" step="1" v-model="postProductionInput">
    <div>{{postProductionInput}}</div>

    <button @click="calcStartDate(); disabled = false">{{$t('durationSection.confirm')}}</button>

    <div>{{$t('durationSection.releaseDate')}}</div>
    <input type="range" :min="releaseDate.min" :max="releaseDate.max" step="1" v-model="releaseDateInput">

    <div>{{$t('durationSection.choice')}}{{releaseDateInput}}</div>

    <button @click="calcTheReleaseDate(); release = true">{{$t('durationSection.calc')}}</button>

    <div v-if="release">{{$t('durationSection.estimated')}}</div>
    <div v-if="release">{{calcReleaseDate}}</div>

    <button :disabled="disabled" @click="setStoreWeeks(); this.$router.push({name: 'budgetSection'})">{{$t('durationSection.continue')}}</button>

  </div>
</template>

<script>
export default {
  name: "durationSection",
  data() {
    return {
      scope: this.$store.state.currentMovie._preProduction.screenplay.details.scope,
      preProductionInput: 4,
      productionInput: 4,
      postProductionInput: 8,
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
      releaseDate: {
        min: 0,
        max: 0,
      },
      productionPhase: 0,
      directorCreativeControl: (this.$store.state.currentMovie._preProduction.hiredDirector._popularity + this.$store.state.currentMovie._preProduction.hiredDirector._experience + this.$store.state.currentMovie._preProduction.hiredDirector._rating) / 3,
      disabled: true,
      counter: 0,
      calcReleaseDate: new Date(),
      release: false
    }
  },

  methods: {
    calcStartDate() {
      this.productionPhase = parseInt(this.preProductionInput) + parseInt(this.productionInput) + parseInt(this.postProductionInput)
      if (this.directorCreativeControl <= 50) {
        this.releaseDate.min = this.productionPhase - 12
        this.releaseDate.max = this.productionPhase + 12
      } else if (this.directorCreativeControl > 50 && this.directorCreativeControl <= 75) {
        this.releaseDate.min = (this.productionPhase * 1.25) - 12
        this.releaseDate.max = (this.productionPhase * 1.25) + 12
      } else if (this.directorCreativeControl > 75) {
        this.releaseDate.min = (this.productionPhase * 1.50) - 12
        this.releaseDate.max = (this.productionPhase * 1.50) + 12
      }
    },

    calcTheReleaseDate() {
      this.calcReleaseDate.setDate(this.$store.state.currentDate.getDate() + 7 * (this.productionPhase + this.releaseDateInput));
    },

    setStoreWeeks() {
      this.$store.state.currentMovie._preProduction.releaseDate = this.calcReleaseDate;
      this.$store.state.currentMovie._preProduction.preProductionLength = this.preProduction
      this.$store.state.currentMovie._preProduction.productionLength = this.production
      this.$store.state.currentMovie._preProduction.postProductionLength = this.postProduction
    }
  },

  mounted() {
    switch (this.scope) {
      case "little":
        this.preProduction.min = 2
        this.preProduction.max = 4
        this.production.min = 4
        this.production.max = 8
        this.production.min = 4
        this.production.max = 8
        break
      case "small":
        this.preProduction.min = 4
        this.preProduction.max = 6
        this.production.min = 8
        this.production.max = 12
        this.production.min = 8
        this.production.max = 12
        break
      case "normal":
        this.preProduction.min = 6
        this.preProduction.max = 8
        this.production.min = 12
        this.production.max = 16
        this.production.min = 12
        this.production.max = 16
        break
      case "large":
        this.preProduction.min = 8
        this.preProduction.max = 10
        this.production.min = 16
        this.production.max = 20
        this.production.min = 16
        this.production.max = 20
        break
      case "epic":
        this.preProduction.min = 10
        this.preProduction.max = 12
        this.production.min = 20
        this.production.max = 24
        this.production.min = 20
        this.production.max = 24
        break
    }
  }
}
</script>

<style scoped>

</style>