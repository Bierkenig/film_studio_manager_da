<template>
  <div>
    <div>{{$t('budgetSection.overall')}}</div>

    <div>{{$t('budgetSection.production')}}</div>
    <input type="range" :min="production.min" :max="production.max" step="1" v-model="production.value">

    <div>{{$t('budgetSection.extras')}}</div>
    <input type="range" :min="extras.min" :max="extras.max" step="1" v-model="extras.value">

    <div>{{$t('budgetSection.cinematography')}}</div>
    <input type="range" :min="cinematography.min" :max="cinematography.max" step="1" v-model="cinematography.value">

    <div>{{$t('budgetSection.sound')}}</div>
    <input type="range" :min="sound.min" :max="sound.max" step="1" v-model="sound.value">

    <div>{{$t('budgetSection.editing')}}</div>
    <input type="range" :min="editing.min" :max="editing.max" step="1" v-model="editing.value">

    <div>{{$t('budgetSection.score')}}</div>
    <input type="range" :min="score.min" :max="score.max" step="1" v-model="score.value">

    <div>{{$t('budgetSection.set')}}</div>
    <input type="range" :min="set.min" :max="set.max" step="1" v-model="set.value">

    <div>{{$t('budgetSection.stunts')}}</div>
    <input type="range" :min="stunts.min" :max="stunts.max" step="1" v-model="stunts.value">

    <div>{{$t('budgetSection.costume')}}</div>
    <input type="range" :min="costume.min" :max="costume.max" step="1" v-model="costume.value">

    <div>{{$t('budgetSection.makeup')}}</div>
    <input type="range" :min="makeup.min" :max="makeup.max" step="1" v-model="makeup.value">

    <div>{{$t('budgetSection.sfx')}}</div>
    <input type="range" :min="sfx.min" :max="sfx.max" step="1" v-model="sfx.value">

    <div>{{$t('budgetSection.vfx')}}</div>
    <input type="range" :min="vfx.min" :max="vfx.max" step="1" v-model="vfx.value">

    <button @click="calcSum(); disabled = false">{{$t('budgetSection.button')}}</button>

    <div>{{this.$store.state.preProduction.outgoings}}</div>

    <button :disabled="disabled" @click="this.$store.state.movieState = 'preProduction' ;this.$router.push({name: 'afterPreProductionPhase'})">{{$t('budgetSection.continue')}}</button>
  </div>
</template>

<script>
export default {
  name: "budgetSection",

  data() {
    return {
      screenplayType: this.$store.state.preProduction.currentScreenplay.type,
      featureList: this.$store.state.preProduction.feature,
      indieList: this.$store.state.preProduction.indie,
      animatedList: this.$store.state.preProduction.animated,
      disabled: true,
      production: {
        value: 0,
        min: 0,
        max: 0
      },
      extras: {
        value: 0,
        min: 0,
        max: 0
      },
      cinematography: {
        value: 0,
        min: 0,
        max: 0
      },
      sound: {
        value: 0,
        min: 0,
        max: 0
      },
      editing: {
        value: 0,
        min: 0,
        max: 0
      },
      score: {
        value: 0,
        min: 0,
        max: 0
      },
      set: {
        value: 0,
        min: 0,
        max: 0
      },
      stunts: {
        value: 0,
        min: 0,
        max: 0
      },
      costume: {
        value: 0,
        min: 0,
        max: 0
      },
      makeup: {
        value: 0,
        min: 0,
        max: 0
      },
      sfx: {
        value: 0,
        min: 0,
        max: 0
      },
      vfx: {
        value: 0,
        min: 0,
        max: 0
      },
    }
  },

  methods: {
    calcInputRange() {
      switch (this.screenplayType.toLowerCase()) {
        case "feature":
          console.log(this.splitRange(this.featureList[0]))
          console.log(parseInt(this.splitRange(this.featureList[0])[0]))
          console.log(parseInt(this.splitRange(this.featureList[0])[1]))
          this.production.min = parseInt(this.splitRange(this.featureList[0])[0]); this.production.max = parseInt(this.splitRange(this.featureList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.featureList[1])[0]); this.extras.max = parseInt(this.splitRange(this.featureList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.featureList[2])[0]); parseInt(this.cinematography.max = this.splitRange(this.featureList[2])[1])
          this.sound.min = parseInt(this.splitRange(this.featureList[3])[0]); this.sound.max = parseInt(this.splitRange(this.featureList[3])[1])
          this.editing.min = parseInt(this.splitRange(this.featureList[4])[0]); this.editing.max = parseInt(this.splitRange(this.featureList[4])[1])
          this.score.min = parseInt(this.splitRange(this.featureList[5])[0]); this.score.max = parseInt(this.splitRange(this.featureList[5])[1])
          this.set.min = parseInt(this.splitRange(this.featureList[6])[0]); this.set.max = parseInt(this.splitRange(this.featureList[6])[1])
          this.stunts.min = parseInt(this.splitRange(this.featureList[7])[0]); this.stunts.max = parseInt(this.splitRange(this.featureList[7])[1])
          this.costume.min = parseInt(this.splitRange(this.featureList[8])[0]); this.costume.max = parseInt(this.splitRange(this.featureList[8])[1])
          this.makeup.min = parseInt(this.splitRange(this.featureList[9])[0]); this.makeup.max = parseInt(this.splitRange(this.featureList[9])[1])
          this.sfx.min = parseInt(this.splitRange(this.featureList[10])[0]); this.sfx.max = parseInt(this.splitRange(this.featureList[10])[1])
          this.vfx.min = parseInt(this.splitRange(this.featureList[11])[0]); this.vfx.max = parseInt(this.splitRange(this.featureList[11])[1])
          break
        case "indie":
          this.production.min = parseInt(this.splitRange(this.indieList[0])[0]); this.production.max = parseInt(this.splitRange(this.indieList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.indieList[1])[0]); this.extras.max = parseInt(this.splitRange(this.indieList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.indieList[2])[0]); this.cinematography.max = parseInt(this.splitRange(this.indieList[2])[1])
          this.sound.min = parseInt(this.splitRange(this.indieList[3])[0]); this.sound.max = parseInt(this.splitRange(this.indieList[3])[1])
          this.editing.min = parseInt(this.splitRange(this.indieList[4])[0]); this.editing.max = parseInt(this.splitRange(this.indieList[4])[1])
          this.score.min = parseInt(this.splitRange(this.indieList[5])[0]); this.score.max = parseInt(this.splitRange(this.indieList[5])[1])
          this.set.min = parseInt(this.splitRange(this.indieList[6])[0]); this.set.max = parseInt(this.splitRange(this.indieList[6])[1])
          this.stunts.min = parseInt(this.splitRange(this.indieList[7])[0]); this.stunts.max = parseInt(this.splitRange(this.indieList[7])[1])
          this.costume.min = parseInt(this.splitRange(this.indieList[8])[0]); this.costume.max = parseInt(this.splitRange(this.indieList[8])[1])
          this.makeup.min = parseInt(this.splitRange(this.indieList[9])[0]); this.makeup.max = parseInt(this.splitRange(this.indieList[9])[1])
          this.sfx.min = parseInt(this.splitRange(this.indieList[10])[0]); this.sfx.max = parseInt(this.splitRange(this.indieList[10])[1])
          this.vfx.min = parseInt(this.splitRange(this.indieList[11])[0]); this.vfx.max = parseInt(this.splitRange(this.indieList[11])[1])
          break
        case "animated":
          this.production.min = parseInt(this.splitRange(this.animatedList[0])[0]); this.production.max = parseInt(this.splitRange(this.animatedList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.animatedList[1])[0]); this.extras.max = parseInt(this.splitRange(this.animatedList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.animatedList[2])[0]); this.cinematography.max = parseInt(this.splitRange(this.animatedList[2])[1])
          this.sound.min = parseInt(this.splitRange(this.animatedList[3])[0]); this.sound.max = parseInt(this.splitRange(this.animatedList[3])[1])
          this.editing.min = parseInt(this.splitRange(this.animatedList[4])[0]); this.editing.max = parseInt(this.splitRange(this.animatedList[4])[1])
          this.score.min = parseInt(this.splitRange(this.animatedList[5])[0]); this.score.max = parseInt(this.splitRange(this.animatedList[5])[1])
          this.set.min = parseInt(this.splitRange(this.animatedList[6])[0]); this.set.max = parseInt(this.splitRange(this.animatedList[6])[1])
          this.stunts.min = parseInt(this.splitRange(this.animatedList[7])[0]); this.stunts.max = parseInt(this.splitRange(this.animatedList[7])[1])
          this.costume.min = parseInt(this.splitRange(this.animatedList[8])[0]); this.costume.max = parseInt(this.splitRange(this.animatedList[8])[1])
          this.makeup.min = parseInt(this.splitRange(this.animatedList[9])[0]); this.makeup.max = parseInt(this.splitRange(this.animatedList[9])[1])
          this.sfx.min = parseInt(this.splitRange(this.animatedList[10])[0]); this.sfx.max = parseInt(this.splitRange(this.animatedList[10])[1])
          this.vfx.min = parseInt(this.splitRange(this.animatedList[11])[0]); this.vfx.max = parseInt(this.splitRange(this.animatedList[11])[1])
          break
      }
    },

    splitRange(el) {
      let str = el.replace(/\s/g, '')
      return str.split('-')
    },

    calcSum() {
      this.$store.state.preProduction.outgoings = parseInt(this.production.value) + parseInt(this.extras.value) + parseInt(this.cinematography.value) +
          parseInt(this.sound.value) + parseInt(this.editing.value) + parseInt(this.score.value) + parseInt(this.set.value) +
          parseInt(this.stunts.value) + parseInt(this.costume.value) + parseInt(this.makeup.value) + parseInt(this.sfx.value) +
          parseInt(this.vfx.value)
      this.$store.state.balance -= this.$store.state.preProduction.outgoings
    }
  },

  mounted() {
    this.calcInputRange()
  }
}
</script>

<style scoped>

</style>