<template>
  <div>
    <div>{{$t('durationSection.set')}}</div>
    <input type="range" min="4" max="14" step="1" v-model="preProduction" @change="changeReleaseDate">
    <div>{{preProduction}}</div>

    <div>{{$t('durationSection.set2')}}</div>
    <input type="range" min="4" max="24" step="1" v-model="production">
    <div>{{production}}</div>

    <div>{{$t('durationSection.set3')}}</div>
    <input type="range" min="8" max="26" step="1" v-model="postProduction">
    <div>{{postProduction}}</div>

    <button @click="calcStartDate(); disabled = false">{{$t('durationSection.confirm')}}</button>

    <div>{{$t('durationSection.releaseDate')}}</div>
    <input type="range" :min="releaseDate.min" :max="releaseDate.max" step="1" v-model="releaseDateInput">

    <div>{{$t('durationSection.choice')}}{{releaseDateInput}}</div>

    <!-- Director moral Smiley-->
    <smiley-director></smiley-director>

    <button :disabled="disabled" @click="setStoreWeeks() ;this.$router.push({name: 'actorSection'})">{{$t('durationSection.continue')}}</button>

  </div>
</template>

<script>
import SmileyDirector from "@/components/mainGameComponents/preProduction/SmileyDirector";
export default {
  name: "durationSection",
  components: {SmileyDirector},
  data() {
    return {
      scope: this.$store.state.preProduction.screenplay.details.scope,
      preProduction: 0,
      production: 0,
      postProduction: 0,
      releaseDateInput: 0,
      releaseDate: {
        min: 0,
        max: 0,
      },
      productionPhase: 0,
      directorCreativeControl: (this.$store.state.preProduction.hiredDirector._popularity + this.$store.state.preProduction.hiredDirector._experience + this.$store.state.preProduction.hiredDirector._rating) / 3,
      directorPerfectDate: 0,
      disabled: true,
      counter: 0,
      perfectWeeks: 0,
    }
  },

  methods: {
    calcStartDate() {
      this.productionPhase = parseInt(this.preProduction) + parseInt(this.production) + parseInt(this.postProduction)
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

    changeReleaseDate() {
      this.calcPerfectWeeks()
      if (this.directorCreativeControl > 50 && this.directorCreativeControl <= 75) {
        if (this.perfectWeeks === this.preProduction) {
          this.$store.state.preProduction.hiredDirector._no--;
        } else {
          this.$store.state.preProduction.hiredDirector._no++;
        }
      } else if (this.directorCreativeControl > 75) {
        if (this.perfectWeeks + 2 <= this.preProduction) {
          this.$store.state.preProduction.hiredDirector._no--;
        } else {
          this.$store.state.preProduction.hiredDirector._no++;
        }
      }else {
        this.$store.state.preProduction.hiredDirector._no--;
      }
    },

    calcPerfectWeeks() {
      switch (this.scope) {
        case "little":
          this.perfectWeeks = 6
          break
        case "small":
          this.perfectWeeks = 7
          break
        case "normal":
          this.perfectWeeks = 9
          break
        case "large":
          this.perfectWeeks = 11
          break
        case "epic":
          this.perfectWeeks = 13
          break
      }
    },

    setStoreWeeks() {
      this.$store.state.preProduction.releaseDate = this.releaseDateInput;
      this.$store.state.preProduction.preProductionLength = this.preProduction
      this.$store.state.preProduction.productionLength = this.production
      this.$store.state.preProduction.postProductionLength = this.postProduction
    }
  }
}
</script>

<style scoped>

</style>