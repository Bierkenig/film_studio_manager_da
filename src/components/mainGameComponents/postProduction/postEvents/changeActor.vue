<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{$t('changeActor.h3')}}</h3>
            <div>{{$t('changeActor.msg')}}</div>

            <div>{{$t('changeActor.new')}}{{newActor._first_name}} {{newActor._last_name}}</div>

            <div>{{$t('changeActor.reshoot')}}</div>

            <div>{{$t('changeActor.budget')}}{{moreBudget}}</div>
            <div>{{$t('changeActor.hype')}}{{lowerHype}}</div>

            <div v-if="bool">{{$t('changeActor.ignore2')}}</div>

            <button class="modal-default-button" @click="changeActor(); $emit('close')">{{$t('changeActor.accept')}}</button>
            <button class="modal-default-button" @click="bool === true ? this.$store.state.currentMovie.riskOfFailure += 10 && $emit('close') : bool = true">{{$t('changeActor.ignore')}}</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Person from "@/classes/Person";

export default {
  name: "eventModal",

  props: {
    newActor: Person,
    moreBudget: Number,
    lowerHype: Number,
  },

  data() {
    return {
      bool: false
    }
  },

  methods: {
    changeActor() {
      this.$store.state.preProduction.budget.problemBudget += this.moreBudget
      this.$store.state.currentMovie.hype -= 10
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