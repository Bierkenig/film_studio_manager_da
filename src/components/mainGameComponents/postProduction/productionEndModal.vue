<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{ $t('options.message') }}</h3>
            <div>{{ $t('options.message2') }}</div>

            <button @click="cancelMovie">{{ $t('options.cancel') }}</button>
            <button @click="this.$router.push({name: 'postProduction'})">{{ $t('options.continue') }}</button>
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
    return {}
  },

  methods: {
    cancelMovie() {
      this.$store.state.currentMovie = null
      this.$store.state.preProduction.isPreProduction = false
      this.$store.state.preProduction.currentScreenplay = null
      this.$store.state.preProduction.hiredDirector = null
      this.$store.state.preProduction.outgoings = 0
      this.$store.state.preProduction.directorMood = 0
      this.$store.state.preProduction.duration.preProductionLength = null
      this.$store.state.preProduction.duration.productionLength = null
      this.$store.state.preProduction.duration.releaseDate = null
      this.$store.state.preProduction.duration.postProductionLength = null
      this.$store.state.preProduction.budget.production = null
      this.$store.state.preProduction.budget.extras = null
      this.$store.state.preProduction.budget.cinematography = null
      this.$store.state.preProduction.budget.sound = null
      this.$store.state.preProduction.budget.editing = null
      this.$store.state.preProduction.budget.score = null
      this.$store.state.preProduction.budget.set = null
      this.$store.state.preProduction.budget.stunts = null
      this.$store.state.preProduction.budget.costume = null
      this.$store.state.preProduction.budget.makeup = null
      this.$store.state.preProduction.budget.vfx = null
      this.$store.state.preProduction.budget.sfx = null
      this.$store.state.preProduction.budget.problemBudget = null
      this.$store.state.preProduction.budgetPop = 12
    },
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