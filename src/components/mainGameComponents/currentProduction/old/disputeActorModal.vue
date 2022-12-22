<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{ $t('dispute.dispute') }}</h3>
            <div>{{ $t('dispute.happened') }}{{ $t('dispute.dispute2') }}{{ actor1._first_name }}
              {{ actor1._last_name }}{{ $t('dispute.and') }}{{ actor2._first_name }} {{ actor2._first_name }}
            </div>
            <button @click="one = true">{{$t('dispute.one')}}</button>
            <button @click="fireBothActors">{{$t('dispute.both')}}</button>

            <div v-if="one">
              <label for="ac1">{{actor1._first_name}} {{actor1._last_name}}</label>
              <input type="radio" id="ac1" name="radio" :value="input">
              <label for="ac2">{{actor2._first_name}} {{actor2._last_name}}</label>
              <input type="radio" id="ac2" name="radio" :value="input">
              <button @click="fireOneActor">{{$t('dispute.fire3')}}</button>
            </div>
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
    actor1: Person,
    actor2: Person
  },

  data() {
    return {
      one: false,
      both: false,
      input: "",
    }
  },

  methods: {
    fireOneActor() {
      if(this.actor1._first_name === this.input) {
        Object.keys(this.$store.state.preProduction.screenplay.actors).forEach((key) => {
          this.$store.state.preProduction.screenplay.actors[key]
              .splice(this.$store.state.preProduction.screenplay.actors[key].indexOf(this.actor1))
        })
      } else if (this.actor2._first_name === this.input) {
        Object.keys(this.$store.state.preProduction.screenplay.actors).forEach((key) => {
          this.$store.state.preProduction.screenplay.actors[key]
              .splice(this.$store.state.preProduction.screenplay.actors[key].indexOf(this.actor2))
        })
      }
      this.$store.state.currentMovie.popularity -= 15
      this.$store.state.preProduction.screenplay.morale += 5
    },
    fireBothActors() {
      Object.keys(this.$store.state.preProduction.screenplay.actors).forEach((key) => {
        this.$store.state.preProduction.screenplay.actors[key]
            .splice(this.$store.state.preProduction.screenplay.actors[key].indexOf(this.actor2))
      })
      Object.keys(this.$store.state.preProduction.screenplay.actors).forEach((key) => {
        this.$store.state.preProduction.screenplay.actors[key]
            .splice(this.$store.state.preProduction.screenplay.actors[key].indexOf(this.actor1))
      })
      this.$store.state.currentMovie.popularity -= 15
      this.$store.state.preProduction.screenplay.morale += 5
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