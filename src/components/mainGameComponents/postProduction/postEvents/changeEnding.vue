<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{$t('changeEnding.h3')}}</h3>
            <div>{{$t('changeEnding.ending')}}</div>
            <div>{{$t('changeEnding.qst')}}</div>

            <div>{{$t('changeEnding.budget')}}</div>
            <div>{{$t('changeEnding.hype')}}</div>

            <button class="modal-default-button" @click="reshootEnding(); $emit('close')">{{$t('changeEnding.reshoot')}}</button>
            <button class="modal-default-button" @click="$emit('close')">{{$t('changeEnding.ignore')}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "changeEnding",

  data() {
    return {
    }
  },

  methods: {
    reshootEnding() {
      this.$store.state.preProduction.budget.problemBudget += (parseInt(this.$store.state.preProduction.budget.production)
          + parseInt(this.$store.state.preProduction.budget.extras) + parseInt(this.$store.state.preProduction.budget.cinematography)
          + parseInt(this.$store.state.preProduction.budget.sound) + parseInt(this.$store.state.preProduction.budget.editing)
          + parseInt(this.$store.state.preProduction.budget.score) + parseInt(this.$store.state.preProduction.budget.set)
          + parseInt(this.$store.state.preProduction.budget.stunts) + parseInt(this.$store.state.preProduction.budget.costume)
          + parseInt(this.$store.state.preProduction.budget.makeup) + parseInt(this.$store.state.preProduction.budget.vfx)
          + parseInt(this.$store.state.preProduction.budget.sfx)) * 0.1

      this.$store.state.currentMovie.hype -= this.$store.state.currentMovie.hype * 0.05
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