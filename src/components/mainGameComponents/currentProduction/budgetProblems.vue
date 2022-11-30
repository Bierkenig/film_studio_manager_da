<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{$t('budgetProblems.budget')}}</h3>
            <div>{{$t('budgetProblems.happened')}}</div>
            <div>{{$t('budgetProblems.increase')}}</div>

            <div>
              <div>{{$t('budgetSection.currentProduction')}}</div>
              <input type="range" :min="production.min" :max="production.max" step="1" v-model="production.value">
              <div>{{production.value}}</div>

              <div>{{$t('budgetSection.extras')}}</div>
              <input type="range" :min="extras.min" :max="extras.max" step="1" v-model="extras.value">
              <div>{{extras.value}}</div>

              <div>{{$t('budgetSection.cinematography')}}</div>
              <input type="range" :min="cinematography.min" :max="cinematography.max" step="1" v-model="cinematography.value">
              <div>{{cinematography.value}}</div>

              <div>{{$t('budgetSection.sound')}}</div>
              <input type="range" :min="sound.min" :max="sound.max" step="1" v-model="sound.value">
              <div>{{sound.value}}</div>

              <div>{{$t('budgetSection.editing')}}</div>
              <input type="range" :min="editing.min" :max="editing.max" step="1" v-model="editing.value">
              <div>{{editing.value}}</div>

              <div>{{$t('budgetSection.score')}}</div>
              <input type="range" :min="score.min" :max="score.max" step="1" v-model="score.value">
              <div>{{score.value}}</div>

              <div>{{$t('budgetSection.set')}}</div>
              <input type="range" :min="set.min" :max="set.max" step="1" v-model="set.value">
              <div>{{set.value}}</div>

              <div>{{$t('budgetSection.stunts')}}</div>
              <input type="range" :min="stunts.min" :max="stunts.max" step="1" v-model="stunts.value">
              <div>{{stunts.value}}</div>

              <div>{{$t('budgetSection.costume')}}</div>
              <input type="range" :min="costume.min" :max="costume.max" step="1" v-model="costume.value">
              <div>{{costume.value}}</div>

              <div>{{$t('budgetSection.makeup')}}</div>
              <input type="range" :min="makeup.min" :max="makeup.max" step="1" v-model="makeup.value">
              <div>{{makeup.value}}</div>

              <div>{{$t('budgetSection.sfx')}}</div>
              <input type="range" :min="sfx.min" :max="sfx.max" step="1" v-model="sfx.value">
              <div>{{sfx.value}}</div>

              <div>{{$t('budgetSection.vfx')}}</div>
              <input type="range" :min="vfx.min" :max="vfx.max" step="1" v-model="vfx.value">
              <div>{{vfx.value}}</div>
            </div>

            <button @click="addBudget()">{{$t('budgetProblems.set')}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "eventModal",

  data() {
    return {
      production: {
        min: this.$store.state.preProduction.budget.production,
        max: this.$store.state.preProduction.budget.production * 1.35,
        value: 0,
      },
      extras: {
        min: this.$store.state.preProduction.budget.extras,
        max: this.$store.state.preProduction.budget.extras * 1.35,
        value: 0,
      },
      cinematography: {
        min: this.$store.state.preProduction.budget.cinematography,
        max: this.$store.state.preProduction.budget.cinematography * 1.35,
        value: 0,
      },
      sound: {
        min: this.$store.state.preProduction.budget.sound,
        max: this.$store.state.preProduction.budget.sound * 1.35,
        value: 0,
      },
      editing: {
        min: this.$store.state.preProduction.budget.editing,
        max: this.$store.state.preProduction.budget.editing * 1.35,
        value: 0,
      },
      score: {
        min: this.$store.state.preProduction.budget.score,
        max: this.$store.state.preProduction.budget.score * 1.35,
        value: 0,
      },
      set: {
        min: this.$store.state.preProduction.budget.set,
        max: this.$store.state.preProduction.budget.set * 1.35,
        value: 0,
      },
      stunts: {
        min: this.$store.state.preProduction.budget.stunts,
        max: this.$store.state.preProduction.budget.stunts * 1.35,
        value: 0,
      },
      costume: {
        min: this.$store.state.preProduction.budget.costume,
        max: this.$store.state.preProduction.budget.costume * 1.35,
        value: 0,
      },
      makeup: {
        min: this.$store.state.preProduction.budget.makeup,
        max: this.$store.state.preProduction.budget.makeup * 1.35,
        value: 0,
      },
      sfx: {
        min: this.$store.state.preProduction.budget.sfx,
        max: this.$store.state.preProduction.budget.sfx * 1.35,
        value: 0,
      },
      vfx: {
        min: this.$store.state.preProduction.budget.vfx,
        max: this.$store.state.preProduction.budget.vfx * 1.35,
        value: 0,
      },
    }
  },

  methods: {
    addBudget() {
      this.$store.state.preProduction.budget.production = parseInt(this.production.value)
      this.$store.state.preProduction.budget.extras = parseInt(this.extras.value)
      this.$store.state.preProduction.budget.cinematography = parseInt(this.cinematography.value)
      this.$store.state.preProduction.budget.sound = parseInt(this.sound.value)
      this.$store.state.preProduction.budget.editing = parseInt(this.editing.value)
      this.$store.state.preProduction.budget.score = parseInt(this.score.value)
      this.$store.state.preProduction.budget.set = parseInt(this.set.value)
      this.$store.state.preProduction.budget.stunts = parseInt(this.stunts.value)
      this.$store.state.preProduction.budget.costume = parseInt(this.costume.value)
      this.$store.state.preProduction.budget.makeup = parseInt(this.makeup.value)
      this.$store.state.preProduction.budget.vfx = parseInt(this.vfx.value)
      this.$store.state.preProduction.budget.sfx = parseInt(this.sfx.value)
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>