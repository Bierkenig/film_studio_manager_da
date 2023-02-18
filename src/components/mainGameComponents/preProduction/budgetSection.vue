<template>
  <div>
    <div>{{$t('budgetSection.overall')}}</div>

    <div>{{$t('budgetSection.production')}}</div>
    <input type="range" :min="production.min" :max="production.max" step="1" v-model="production.value" @change="calcSum()">
    <div>{{production.value}}</div>

    <div>{{$t('budgetSection.extras')}}</div>
    <input type="range" :min="extras.min" :max="extras.max" step="1" v-model="extras.value" @change="calcSum()">
    <div>{{extras.value}}</div>

    <div>{{$t('budgetSection.cinematography')}}</div>
    <input type="range" :min="cinematography.min" :max="cinematography.max" step="1" v-model="cinematography.value" @change="calcSum()">
    <div>{{cinematography.value}}</div>

    <div>{{$t('budgetSection.sound')}}</div>
    <input type="range" :min="sound.min" :max="sound.max" step="1" v-model="sound.value" @change="calcSum()">
    <div>{{sound.value}}</div>

    <div>{{$t('budgetSection.editing')}}</div>
    <input type="range" :min="editing.min" :max="editing.max" step="1" v-model="editing.value" @change="calcSum()">
    <div>{{editing.value}}</div>

    <div>{{$t('budgetSection.score')}}</div>
    <input type="range" :min="score.min" :max="score.max" step="1" v-model="score.value" @change="calcSum()">
    <div>{{score.value}}</div>

    <div>{{$t('budgetSection.set')}}</div>
    <input type="range" :min="set.min" :max="set.max" step="1" v-model="set.value" @change="calcSum()">
    <div>{{set.value}}</div>

    <div>{{$t('budgetSection.stunts')}}</div>
    <input type="range" :min="stunts.min" :max="stunts.max" step="1" v-model="stunts.value" @change="calcSum()">
    <div>{{stunts.value}}</div>

    <div>{{$t('budgetSection.costume')}}</div>
    <input type="range" :min="costume.min" :max="costume.max" step="1" v-model="costume.value" @change="calcSum()">
    <div>{{costume.value}}</div>

    <div>{{$t('budgetSection.makeup')}}</div>
    <input type="range" :min="makeup.min" :max="makeup.max" step="1" v-model="makeup.value" @change="calcSum()">
    <div>{{makeup.value}}</div>

    <div>{{$t('budgetSection.sfx')}}</div>
    <input type="range" :min="sfx.min" :max="sfx.max" step="1" v-model="sfx.value" @change="calcSum()">
    <div>{{sfx.value}}</div>

    <div>{{$t('budgetSection.vfx')}}</div>
    <input type="range" :min="vfx.min" :max="vfx.max" step="1" v-model="vfx.value" @change="calcSum()">
    <div>{{vfx.value}}</div>


    <button @click="setBudgetPop(); disabled = false">{{$t('budgetSection.button')}}</button>

    <div>{{$t('budgetSection.total')}}: $ {{total}}</div>

    <button :disabled="disabled" @click="this.$router.push({name: 'actorSection'})">{{$t('budgetSection.continue')}}</button>
  </div>
</template>

<script>
export default {
  name: "budgetSection",
  data() {
    return {
      screenplayType: this.$store.state.currentMovie._preProduction.screenplay.type,
      screenplayScope: this.$store.state.currentMovie._preProduction.screenplay.details.scope,
      screenplaySpecial: this.$store.state.currentMovie._preProduction.screenplay.details.specialEffects,
      featureList: this.$store.state.feature,
      indieList: this.$store.state.indie,
      animatedList: this.$store.state.animation,
      disabled: true,
      total: 0,
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
      switch (this.screenplayType) {
        case "Feature":
          this.production.min = parseInt(this.splitRange(this.featureList[0])[0]); this.production.max = parseInt(this.splitRange(this.featureList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.featureList[1])[0]); this.extras.max = parseInt(this.splitRange(this.featureList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.featureList[2])[0]); this.cinematography.max = parseInt(this.cinematography.max = this.splitRange(this.featureList[2])[1])
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
        case "Indie":
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
        case "Animation":
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
      this.$store.getters.getCurrentMovie._preProduction.budget.production = parseInt(this.production.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.extras = parseInt(this.extras.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.cinematography = parseInt(this.cinematography.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.sound = parseInt(this.sound.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.editing = parseInt(this.editing.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.score = parseInt(this.score.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.set = parseInt(this.set.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.stunts = parseInt(this.stunts.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.costume = parseInt(this.costume.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.makeup = parseInt(this.makeup.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.sfx = parseInt(this.sfx.value)
      this.$store.getters.getCurrentMovie._preProduction.budget.vfx = parseInt(this.vfx.value)

      this.total = this.$store.getters.getCurrentMovie._preProduction.budget.production +
          this.$store.getters.getCurrentMovie._preProduction.budget.extras +
          this.$store.getters.getCurrentMovie._preProduction.budget.cinematography +
          this.$store.getters.getCurrentMovie._preProduction.budget.sound +
          this.$store.getters.getCurrentMovie._preProduction.budget.editing +
          this.$store.getters.getCurrentMovie._preProduction.budget.score +
          this.$store.getters.getCurrentMovie._preProduction.budget.set +
          this.$store.getters.getCurrentMovie._preProduction.budget.stunts +
          this.$store.getters.getCurrentMovie._preProduction.budget.costume +
          this.$store.getters.getCurrentMovie._preProduction.budget.makeup +
          this.$store.getters.getCurrentMovie._preProduction.budget.sfx +
          this.$store.getters.getCurrentMovie._preProduction.budget.vfx
    },

    setBudgetPop() {
      switch (this.screenplayScope) {
        case "Little":
          if (this.between(this.production.value, (this.production.max - this.production.min)*0.01, (this.production.max - this.production.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min)*0.01, (this.extras.max - this.extras.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min)*0.01, (this.cinematography.max - this.production.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min)*0.01, (this.sound.max - this.sound.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min)*0.01, (this.editing.max - this.editing.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min)*0.01, (this.score.max - this.score.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min)*0.01, (this.set.max - this.set.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min)*0.01, (this.stunts.max - this.stunts.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min)*0.01, (this.costume.max - this.costume.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min)*0.01, (this.makeup.max - this.makeup.min)*0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Small":
          if (this.between(this.production.value, (this.production.max - this.production.min)*0.21, (this.production.max - this.production.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min)*0.21, (this.extras.max - this.extras.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min)*0.21, (this.cinematography.max - this.production.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min)*0.21, (this.sound.max - this.sound.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min)*0.21, (this.editing.max - this.editing.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min)*0.21, (this.score.max - this.score.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min)*0.21, (this.set.max - this.set.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min)*0.21, (this.stunts.max - this.stunts.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min)*0.21, (this.costume.max - this.costume.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min)*0.21, (this.makeup.max - this.makeup.min)*0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Normal":
          if (this.between(this.production.value, (this.production.max - this.production.min)*0.41, (this.production.max - this.production.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min)*0.41, (this.extras.max - this.extras.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min)*0.41, (this.cinematography.max - this.production.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min)*0.41, (this.sound.max - this.sound.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min)*0.41, (this.editing.max - this.editing.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min)*0.41, (this.score.max - this.score.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min)*0.41, (this.set.max - this.set.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min)*0.41, (this.stunts.max - this.stunts.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min)*0.41, (this.costume.max - this.costume.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min)*0.41, (this.makeup.max - this.makeup.min)*0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Large":
          if (this.between(this.production.value, (this.production.max - this.production.min)*0.61, (this.production.max - this.production.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min)*0.61, (this.extras.max - this.extras.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min)*0.61, (this.cinematography.max - this.production.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min)*0.61, (this.sound.max - this.sound.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min)*0.61, (this.editing.max - this.editing.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min)*0.61, (this.score.max - this.score.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min)*0.61, (this.set.max - this.set.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min)*0.61, (this.stunts.max - this.stunts.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min)*0.61, (this.costume.max - this.costume.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min)*0.61, (this.makeup.max - this.makeup.min)*0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Epic":
          if (this.between(this.production.value, (this.production.max - this.production.min)*0.81, (this.production.max - this.production.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min)*0.81, (this.extras.max - this.extras.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min)*0.81, (this.cinematography.max - this.production.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min)*0.81, (this.sound.max - this.sound.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min)*0.81, (this.editing.max - this.editing.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min)*0.81, (this.score.max - this.score.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min)*0.81, (this.set.max - this.set.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min)*0.81, (this.stunts.max - this.stunts.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min)*0.81, (this.costume.max - this.costume.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min)*0.81, (this.makeup.max - this.makeup.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
      }

      switch (this.screenplaySpecial) {
        case "None":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min)*0.01, (this.vfx.max - this.vfx.min) * 0.02)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min)*0.01, (this.sfx.max - this.sfx.min) * 0.02)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Some":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min)*0.21, (this.vfx.max - this.vfx.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min)*0.21, (this.sfx.max - this.sfx.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Medium":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min)*0.41, (this.vfx.max - this.vfx.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min)*0.41, (this.sfx.max - this.sfx.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Lots":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min)*0.61, (this.vfx.max - this.vfx.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min)*0.61, (this.sfx.max - this.sfx.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Spectacle":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min)*0.81, (this.vfx.max - this.vfx.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min)*0.81, (this.sfx.max - this.sfx.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
      }
    },

    between(x, min, max) {
      return x>= min && x  <= max
    }
  },

  mounted() {
    this.calcInputRange()
  }
}
</script>

<style scoped>

</style>