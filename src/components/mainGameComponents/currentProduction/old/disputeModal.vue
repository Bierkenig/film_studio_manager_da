<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-body">
          <slot name="body">
            <h3>{{ $t('dispute.dispute') }}</h3>
            <div>{{ $t('dispute.happened') }}{{ $t('dispute.dispute2') }}{{ actor._first_name }}
              {{ actor._last_name }}{{ $t('dispute.and') }}{{ director._first_name }} {{ director._first_name }}
            </div>

            <button class="modal-default-button" @click="fire2 = true; fireDirectorOrActor('actor')">
              {{ $t('dispute.fire') }}
            </button>
            <button class="modal-default-button" @click="fire = true; fireDirectorOrActor('director')">
              {{ $t('dispute.fire2') }}
            </button>
            <button class="modal-default-button" @click="$emit('close')">{{ $t('dispute.nothing') }}</button>

            <div v-if="fire">
              <div>{{ $t('dispute.hire') }}</div>
              <director-section></director-section>
              <div>{{$t('dispute.extend')}}</div>

              <button @click="this.$store.state.preProduction.budget.production *= later ? 1.35 : 1.25; ">{{$t('dispute.yes')}}</button>
              <button @click="this.$store.state.currentMovie.quality *= later ? 0.75 : 0.85">{{$t('dispute.no')}}</button>
            </div>

            <div v-if="fire2">
              <div>{{ $t('dispute.hire2') }}</div>
              <actors-section></actors-section>

              <div>{{$t('dispute.extend')}}</div>

              <button @click="this.$store.state.preProduction.budget.production *= later ? 1.35 : 1.25; ">{{$t('dispute.yes')}}</button>
              <button @click="this.$store.state.currentMovie.quality *= later ? 0.75 : 0.85">{{$t('dispute.no')}}</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Person from "@/classes/Person";
import DirectorSection from "@/components/mainGameComponents/preProduction/directorSection";
import ActorsSection from "@/components/mainGameComponents/preProduction/actorsSection";

export default {
  name: "disputeModal",
  components: {ActorsSection, DirectorSection},
  props: {
    actor: Person,
    later: Boolean
  },

  data() {
    return {
      director: this.$store.state.preProduction.hiredDirector,
      morale: this.$store.state.preProduction.hiredDirector.morale,
      fire: false,
      fire2: false,
    }
  },

  methods: {
    fireDirectorOrActor(payload) {
      if (payload === "director") {
        this.$store.state.preProduction.hiredDirector = null
      } else {
        Object.keys(this.$store.state.preProduction.screenplay.actors).forEach((key) => {
          this.$store.state.preProduction.screenplay.actors[key]
              .splice(this.$store.state.preProduction.screenplay.actors[key].indexOf(this.actor))
        })
        console.log(this.$store.state.preProduction.screenplay.actors)
      }
      this.$store.state.preProduction.screenplay.morale -= 5
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