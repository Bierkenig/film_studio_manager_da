<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{$t('notDone.desc')}}</h3>
            <div>{{$t('notDone.happened')}}</div>

            <div>{{$t('notDone.shot')}}</div>
            <div>{{$t('notDone.prod')}}</div>

            <button @click="stopShot(); $emit('close')">{{$t('notDone.stop')}}</button>
            <button @click="extendProd(); $emit('close')">{{$t('notDone.extend')}}</button>
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
    }
  },

  methods: {
    stopShot() {
      this.$store.state.currentMovie.quality *= 0.8
    },

    extendProd() {
      this.$store.state.currentMovie.hype *= 0.95
      this.$store.state.preProduction.budget.problemBudget +=
          (this.$store.state.preProduction.budget.production + this.$store.state.preProduction.budget.extras
              + this.$store.state.preProduction.budget.cinematography + this.$store.state.preProduction.budget.sound
              + this.$store.state.preProduction.budget.editing + this.$store.state.preProduction.budget.score
              + this.$store.state.preProduction.budget.set + this.$store.state.preProduction.budget.stunts
              + this.$store.state.preProduction.budget.costume + this.$store.state.preProduction.budget.makeup
              + this.$store.state.preProduction.budget.sfx + this.$store.state.preProduction.budget.vfx) * 0.20
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