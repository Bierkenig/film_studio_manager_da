<template>
  <div id="budgetSectionMainDiv">
    <background-tile id="budgetSectionBgTile" title="Budget">
      <div id="budgetSectionContent">
        <div class="">{{ $t('budgetSection.overall') }}</div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.production') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="production.min" :max="production.max"
                   step="1" v-model="production.value"
                   @change="selected = 1; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(production.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.extras') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="extras.min" :max="extras.max" step="1"
                   v-model="extras.value"
                   @change="selected = 2; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(extras.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.cinematography') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="cinematography.min"
                   :max="cinematography.max" step="1"
                   v-model="cinematography.value"
                   @change="selected = 3; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(cinematography.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.sound') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="sound.min" :max="sound.max" step="1"
                   v-model="sound.value"
                   @change="selected = 4; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(sound.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.editing') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="editing.min" :max="editing.max" step="1"
                   v-model="editing.value"
                   @change="selected = 5; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(editing.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.score') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="score.min" :max="score.max" step="1"
                   v-model="score.value"
                   @change="selected = 6; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(score.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.set') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="set.min" :max="set.max" step="1"
                   v-model="set.value"
                   @change="selected = 7; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(set.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.stunts') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="stunts.min" :max="stunts.max" step="1"
                   v-model="stunts.value"
                   @change="selected = 8; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(stunts.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.costume') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="costume.min" :max="costume.max" step="1"
                   v-model="costume.value"
                   @change="selected = 9; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(costume.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.makeup') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="makeup.min" :max="makeup.max" step="1"
                   v-model="makeup.value"
                   @change="selected = 10; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(makeup.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.sfx') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="sfx.min" :max="sfx.max" step="1"
                   v-model="sfx.value"
                   @change="selected = 11; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(sfx.value) }}</div>
        </div>

        <div class="budgetSectionBudgetElement">
          <div class="budgetSectionBudgetElementLabel">{{ $t('budgetSection.vfx') }}</div>
          <div class="budgetSectionBudgetElementInputContainer">
            <input class="budgetSectionBudgetElementInput" type="range" :min="vfx.min" :max="vfx.max" step="1"
                   v-model="vfx.value"
                   @change="selected = 12; calcSum()">
          </div>
          <div class="budgetSectionBudgetElementValue">{{ roundBudget(vfx.value) }}</div>
        </div>


        <custom-button @click="setBudgetPop(); disabled = false">
          {{ $t('budgetSection.button') }}
        </custom-button>

        <div class="budgetSectionBudgetElement">
          <div>{{ $t('budgetSection.total') }}</div>
          <div>$ {{ roundBudget(total) }}</div>
        </div>

        <custom-button :disabled="disabled" @click="continueButton">
          {{ $t('budgetSection.continue') }}
        </custom-button>
      </div>
    </background-tile>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "budgetSection",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

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
      selected: null
    }
  },

  methods: {
    roundBudget(labelValue) {
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },
    calcInputRange() {
      switch (this.screenplayType) {
        case "Feature":
          this.production.min = parseInt(this.splitRange(this.featureList[0])[0]);
          this.production.max = parseInt(this.splitRange(this.featureList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.featureList[1])[0]);
          this.extras.max = parseInt(this.splitRange(this.featureList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.featureList[2])[0]);
          this.cinematography.max = parseInt(this.cinematography.max = this.splitRange(this.featureList[2])[1])
          this.sound.min = parseInt(this.splitRange(this.featureList[3])[0]);
          this.sound.max = parseInt(this.splitRange(this.featureList[3])[1])
          this.editing.min = parseInt(this.splitRange(this.featureList[4])[0]);
          this.editing.max = parseInt(this.splitRange(this.featureList[4])[1])
          this.score.min = parseInt(this.splitRange(this.featureList[5])[0]);
          this.score.max = parseInt(this.splitRange(this.featureList[5])[1])
          this.set.min = parseInt(this.splitRange(this.featureList[6])[0]);
          this.set.max = parseInt(this.splitRange(this.featureList[6])[1])
          this.stunts.min = parseInt(this.splitRange(this.featureList[7])[0]);
          this.stunts.max = parseInt(this.splitRange(this.featureList[7])[1])
          this.costume.min = parseInt(this.splitRange(this.featureList[8])[0]);
          this.costume.max = parseInt(this.splitRange(this.featureList[8])[1])
          this.makeup.min = parseInt(this.splitRange(this.featureList[9])[0]);
          this.makeup.max = parseInt(this.splitRange(this.featureList[9])[1])
          this.sfx.min = parseInt(this.splitRange(this.featureList[10])[0]);
          this.sfx.max = parseInt(this.splitRange(this.featureList[10])[1])
          this.vfx.min = parseInt(this.splitRange(this.featureList[11])[0]);
          this.vfx.max = parseInt(this.splitRange(this.featureList[11])[1])
          break
        case "Indie":
          this.production.min = parseInt(this.splitRange(this.indieList[0])[0]);
          this.production.max = parseInt(this.splitRange(this.indieList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.indieList[1])[0]);
          this.extras.max = parseInt(this.splitRange(this.indieList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.indieList[2])[0]);
          this.cinematography.max = parseInt(this.splitRange(this.indieList[2])[1])
          this.sound.min = parseInt(this.splitRange(this.indieList[3])[0]);
          this.sound.max = parseInt(this.splitRange(this.indieList[3])[1])
          this.editing.min = parseInt(this.splitRange(this.indieList[4])[0]);
          this.editing.max = parseInt(this.splitRange(this.indieList[4])[1])
          this.score.min = parseInt(this.splitRange(this.indieList[5])[0]);
          this.score.max = parseInt(this.splitRange(this.indieList[5])[1])
          this.set.min = parseInt(this.splitRange(this.indieList[6])[0]);
          this.set.max = parseInt(this.splitRange(this.indieList[6])[1])
          this.stunts.min = parseInt(this.splitRange(this.indieList[7])[0]);
          this.stunts.max = parseInt(this.splitRange(this.indieList[7])[1])
          this.costume.min = parseInt(this.splitRange(this.indieList[8])[0]);
          this.costume.max = parseInt(this.splitRange(this.indieList[8])[1])
          this.makeup.min = parseInt(this.splitRange(this.indieList[9])[0]);
          this.makeup.max = parseInt(this.splitRange(this.indieList[9])[1])
          this.sfx.min = parseInt(this.splitRange(this.indieList[10])[0]);
          this.sfx.max = parseInt(this.splitRange(this.indieList[10])[1])
          this.vfx.min = parseInt(this.splitRange(this.indieList[11])[0]);
          this.vfx.max = parseInt(this.splitRange(this.indieList[11])[1])
          break
        case "Animation":
          this.production.min = parseInt(this.splitRange(this.animatedList[0])[0]);
          this.production.max = parseInt(this.splitRange(this.animatedList[0])[1])
          this.extras.min = parseInt(this.splitRange(this.animatedList[1])[0]);
          this.extras.max = parseInt(this.splitRange(this.animatedList[1])[1])
          this.cinematography.min = parseInt(this.splitRange(this.animatedList[2])[0]);
          this.cinematography.max = parseInt(this.splitRange(this.animatedList[2])[1])
          this.sound.min = parseInt(this.splitRange(this.animatedList[3])[0]);
          this.sound.max = parseInt(this.splitRange(this.animatedList[3])[1])
          this.editing.min = parseInt(this.splitRange(this.animatedList[4])[0]);
          this.editing.max = parseInt(this.splitRange(this.animatedList[4])[1])
          this.score.min = parseInt(this.splitRange(this.animatedList[5])[0]);
          this.score.max = parseInt(this.splitRange(this.animatedList[5])[1])
          this.set.min = parseInt(this.splitRange(this.animatedList[6])[0]);
          this.set.max = parseInt(this.splitRange(this.animatedList[6])[1])
          this.stunts.min = parseInt(this.splitRange(this.animatedList[7])[0]);
          this.stunts.max = parseInt(this.splitRange(this.animatedList[7])[1])
          this.costume.min = parseInt(this.splitRange(this.animatedList[8])[0]);
          this.costume.max = parseInt(this.splitRange(this.animatedList[8])[1])
          this.makeup.min = parseInt(this.splitRange(this.animatedList[9])[0]);
          this.makeup.max = parseInt(this.splitRange(this.animatedList[9])[1])
          this.sfx.min = parseInt(this.splitRange(this.animatedList[10])[0]);
          this.sfx.max = parseInt(this.splitRange(this.animatedList[10])[1])
          this.vfx.min = parseInt(this.splitRange(this.animatedList[11])[0]);
          this.vfx.max = parseInt(this.splitRange(this.animatedList[11])[1])
          break
      }
    },

    splitRange(el) {
      let str = el.replace(/\s/g, '')
      return str.split('-')
    },

    calcSum() {
      //calc Sum
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

      let newMax = this.$store.getters.getStudio.budget - this.total
      let studio = this.$store.getters.getStudio.budget
      if (this.production.max > newMax) {
        this.production.max = newMax
        this.production.value = newMax < 0 ? (this.selected === 1 ? studio : 0) : newMax
        if (this.selected === 1) this.total = studio
      }
      if (this.extras.max > newMax) {
        this.extras.max = newMax
        this.extras.value = newMax < 0 ? (this.selected === 2 ? studio : 0) : newMax
        if (this.selected === 2) this.total = studio
      }
      if (this.cinematography.max > newMax) {
        this.cinematography.max = newMax
        this.cinematography.value = newMax < 0 ? (this.selected === 3 ? studio : 0) : newMax
        if (this.selected === 3) this.total = studio
      }
      if (this.sound.max > newMax) {
        this.sound.max = newMax
        this.sound.value = newMax < 0 ? (this.selected === 4 ? studio : 0) : newMax
        if (this.selected === 4) this.total = studio
      }
      if (this.editing.max > newMax) {
        this.editing.max = newMax
        this.editing.value = newMax < 0 ? (this.selected === 5 ? studio : 0) : newMax
        if (this.selected === 5) this.total = studio
      }
      if (this.score.max > newMax) {
        this.score.max = newMax
        this.score.value = newMax < 0 ? (this.selected === 6 ? studio : 0) : newMax
        if (this.selected === 6) this.total = studio
      }
      if (this.set.max > newMax) {
        this.set.max = newMax
        this.set.value = newMax < 0 ? (this.selected === 7 ? studio : 0) : newMax
        if (this.selected === 7) this.total = studio
      }
      if (this.stunts.max > newMax) {
        this.stunts.max = newMax
        this.stunts.value = newMax < 0 ? (this.selected === 8 ? studio : 0) : newMax
        if (this.selected === 8) this.total = studio
      }
      if (this.costume.max > newMax) {
        this.costume.max = newMax
        this.costume.value = newMax < 0 ? (this.selected === 9 ? studio : 0) : newMax
        if (this.selected === 9) this.total = studio
      }
      if (this.makeup.max > newMax) {
        this.makeup.max = newMax
        this.makeup.value = newMax < 0 ? (this.selected === 10 ? studio : 0) : newMax
        if (this.selected === 10) this.total = studio
      }
      if (this.sfx.max > newMax) {
        this.sfx.max = newMax
        this.sfx.value = newMax < 0 ? (this.selected === 11 ? studio : 0) : newMax
        if (this.selected === 11) this.total = studio
      }
      if (this.vfx.max > newMax) {
        this.vfx.max = newMax
        this.vfx.value = newMax < 0 ? (this.selected === 12 ? studio : 0) : newMax
        if (this.selected === 12) this.total = studio
      }
    },

    setBudgetPop() {
      switch (this.screenplayScope) {
        case "Little":
          if (this.between(this.production.value, (this.production.max - this.production.min) * 0.01, (this.production.max - this.production.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min) * 0.01, (this.extras.max - this.extras.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min) * 0.01, (this.cinematography.max - this.production.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min) * 0.01, (this.sound.max - this.sound.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min) * 0.01, (this.editing.max - this.editing.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min) * 0.01, (this.score.max - this.score.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min) * 0.01, (this.set.max - this.set.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min) * 0.01, (this.stunts.max - this.stunts.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min) * 0.01, (this.costume.max - this.costume.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min) * 0.01, (this.makeup.max - this.makeup.min) * 0.2)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Small":
          if (this.between(this.production.value, (this.production.max - this.production.min) * 0.21, (this.production.max - this.production.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min) * 0.21, (this.extras.max - this.extras.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min) * 0.21, (this.cinematography.max - this.production.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min) * 0.21, (this.sound.max - this.sound.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min) * 0.21, (this.editing.max - this.editing.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min) * 0.21, (this.score.max - this.score.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min) * 0.21, (this.set.max - this.set.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min) * 0.21, (this.stunts.max - this.stunts.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min) * 0.21, (this.costume.max - this.costume.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min) * 0.21, (this.makeup.max - this.makeup.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Normal":
          if (this.between(this.production.value, (this.production.max - this.production.min) * 0.41, (this.production.max - this.production.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min) * 0.41, (this.extras.max - this.extras.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min) * 0.41, (this.cinematography.max - this.production.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min) * 0.41, (this.sound.max - this.sound.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min) * 0.41, (this.editing.max - this.editing.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min) * 0.41, (this.score.max - this.score.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min) * 0.41, (this.set.max - this.set.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min) * 0.41, (this.stunts.max - this.stunts.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min) * 0.41, (this.costume.max - this.costume.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min) * 0.41, (this.makeup.max - this.makeup.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Large":
          if (this.between(this.production.value, (this.production.max - this.production.min) * 0.61, (this.production.max - this.production.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min) * 0.61, (this.extras.max - this.extras.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min) * 0.61, (this.cinematography.max - this.production.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min) * 0.61, (this.sound.max - this.sound.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min) * 0.61, (this.editing.max - this.editing.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min) * 0.61, (this.score.max - this.score.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min) * 0.61, (this.set.max - this.set.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min) * 0.61, (this.stunts.max - this.stunts.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min) * 0.61, (this.costume.max - this.costume.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min) * 0.61, (this.makeup.max - this.makeup.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Epic":
          if (this.between(this.production.value, (this.production.max - this.production.min) * 0.81, (this.production.max - this.production.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.extras.value, (this.extras.max - this.extras.min) * 0.81, (this.extras.max - this.extras.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.cinematography.value, (this.cinematography.max - this.cinematography.min) * 0.81, (this.cinematography.max - this.production.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sound.value, (this.sound.max - this.sound.min) * 0.81, (this.sound.max - this.sound.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.editing.value, (this.editing.max - this.editing.min) * 0.81, (this.editing.max - this.editing.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.score.value, (this.score.max - this.score.min) * 0.81, (this.score.max - this.score.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.set.value, (this.set.max - this.set.min) * 0.81, (this.set.max - this.set.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.stunts.value, (this.stunts.max - this.stunts.min) * 0.81, (this.stunts.max - this.stunts.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.costume.value, (this.costume.max - this.costume.min) * 0.81, (this.costume.max - this.costume.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.makeup.value, (this.makeup.max - this.makeup.min) * 0.81, (this.makeup.max - this.makeup.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
      }

      switch (this.screenplaySpecial) {
        case "None":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min) * 0.01, (this.vfx.max - this.vfx.min) * 0.02)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min) * 0.01, (this.sfx.max - this.sfx.min) * 0.02)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Some":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min) * 0.21, (this.vfx.max - this.vfx.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min) * 0.21, (this.sfx.max - this.sfx.min) * 0.4)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Medium":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min) * 0.41, (this.vfx.max - this.vfx.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min) * 0.41, (this.sfx.max - this.sfx.min) * 0.6)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Lots":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min) * 0.61, (this.vfx.max - this.vfx.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min) * 0.61, (this.sfx.max - this.sfx.min) * 0.8)) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
        case "Spectacle":
          if (this.between(this.vfx.value, (this.vfx.max - this.vfx.min) * 0.81, (this.vfx.max - this.vfx.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          if (this.between(this.sfx.value, (this.sfx.max - this.sfx.min) * 0.81, (this.sfx.max - this.sfx.min))) this.$store.state.currentMovie._preProduction.budgetPop--;
          break
      }
    },

    between(x, min, max) {
      return x >= min && x <= max
    },

    continueButton() {
      if (!this.disabled) {
        this.$router.push({name: 'actorSection'});
      }
    },
  },

  mounted() {
    this.calcInputRange()
    this.production.value = this.production.min
    this.extras.value = this.production.min
    this.cinematography.value = this.production.min
    this.sound.value = this.production.min
    this.editing.value = this.production.min
    this.score.value = this.production.min
    this.set.value = this.production.min
    this.stunts.value = this.production.min
    this.costume.value = this.production.min
    this.makeup.value = this.production.min
    this.sfx.value = this.production.min
    this.vfx.value = this.production.min
    this.total = this.production.value + this.extras.value + this.cinematography.value +
        this.sound.value + this.editing.value + this.score.value + this.set.value +
        this.stunts.value + this.costume.value +
        this.makeup.value + this.sfx.value + this.vfx.value
  }
}
</script>

<style scoped>
#budgetSectionMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

#budgetSectionBgTile {
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}

#budgetSectionContent {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 20px;
}

.budgetSectionBudgetElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px;
}

.budgetSectionBudgetElementLabel, .budgetSectionBudgetElementInputContainer, .budgetSectionBudgetElementValue {
  flex-basis: 0;
}

.budgetSectionBudgetElementLabel {
  flex-grow: 2;
}

.budgetSectionBudgetElementInput {
  flex-grow: 1;
}

.budgetSectionBudgetElementValue {
  flex-grow: 1;
  text-align: center;
}

.budgetSectionBudgetElementValue {
  white-space: nowrap;
}
</style>