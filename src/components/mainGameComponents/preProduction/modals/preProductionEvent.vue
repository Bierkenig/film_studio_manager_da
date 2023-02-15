<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <h3>{{ $t('preProductionEvents.' + type + '.problem') }}</h3>
              <div>{{ $t('preProductionEvents.' + type + '.optionA') }}</div>
              <ul>
                <li>{{ $t('preProductionEvents.' + type + '.consequenceA1') }}</li>
                <li v-if="type === 'recast' || type === 'creative' || type === 'extend'">
                  {{ $t('preProductionEvents.' + type + '.consequenceA2') }}
                </li>
                <li v-if="type === 'extend'">
                  {{ $t('preProductionEvents.' + type + '.consequenceA21') }}
                </li>
                <li v-if="type === 'extend'">
                  {{ $t('preProductionEvents.' + type + '.consequenceA22') }}
                </li>
                <li v-if="type === 'extend'">
                  {{ $t('preProductionEvents.' + type + '.consequenceA23') }}
                </li>
              </ul>
              <div>{{ $t('preProductionEvents.' + type + '.optionB') }}</div>
              <ul>
                <li>{{ $t('preProductionEvents.' + type + '.consequenceB1') }}</li>
                <li v-if="type === 'dropOut' || type === 'creative'">
                  {{ $t('preProductionEvents.' + type + '.consequenceB2') }}
                </li>
                <li v-if="type === 'creative'">{{ $t('preProductionEvents.' + type + '.consequenceB3') }}</li>
              </ul>

              <button class="modal-default-button" @click="aOption()">{{ $t('preProductionEvents.optionA') }}</button>
              <button class="modal-default-button" @click="bOption()">{{ $t('preProductionEvents.optionB') }}</button>

              <div v-if="duration">
                <div>{{$t('preProductionEvents.extend.set')}}</div>
                <input type="range" min="" max="12" step="1" v-model="durationAmount">
                <button @click="this.$store.state.currentMovie._preProduction.preProductionLength = durationAmount; $emit('close')">{{$t('preProductionEvents.close')}}</button>
              </div>

              <actors-section v-if="actorSection"></actors-section>

              <director-section v-if="directorSection"></director-section>

              <button v-if="close" @click="$emit('close')">{{$t('preProductionEvents.close')}}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Person from "@/classes/Person";
import ActorsSection from "@/components/mainGameComponents/preProduction/actorsSection";
import DirectorSection from "@/components/mainGameComponents/preProduction/directorSection";

export default {
  name: "pre-production-event",
  components: {DirectorSection, ActorsSection},
  props: {
    type: String,
    actor: Person,
  },

  data() {
    return {
      dirRating: this.$store.state.currentMovie._preProduction.hiredDirector.rating,
      duration: false,
      min: this.$store.state.currentMovie._preProduction.preProductionLength,
      durationAmount: this.min,
      close: false,
      actorSection: false,
      directorSection: false,
      allMovieActors: this.$store.state.currentMovie._preProduction.screenplay.actors.main.concat(this.$store.state.currentMovie._preProduction.screenplay.actors.support,
          this.$store.state.currentMovie._preProduction.screenplay.actors.minor, this.$store.state.currentMovie._preProduction.screenplay.actors.cameo),
    }
  },

  methods: {
    aOption() {
      switch (this.type) {
        case "dropOut":
          this.$store.state.currentMovie._preProduction.budget.actorSalary += (this.$store.state.currentMovie._preProduction.budget.actorSalary / this.allMovieActors.length) * 0.15;
          //this.$store.state.preProductionEvents.actorWhoWantsToDropOut._paidSalary *= 1.15
          this.$store.state.currentMovie._preProduction.happenedEvents.push("dropOut")
          break
        case "recast":
          this.$store.state.currentMovie._preProduction.movie.hype *= 0.9;
          this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale += 1
          this.$store.state.currentMovie._preProduction.happenedEvents.push("recast")
          break
        case "creative":
          this.$store.state.currentMovie._preProduction.budget.directorSalary *= 1.25
          //this.$store.state.preProductionEvents.directorWithDispute._paidSalary *= 1.25
          this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale += 1
          this.$store.state.currentMovie._preProduction.happenedEvents.push("creative")
          break
        case "difficulty":
          this.$store.state.currentMovie._preProduction.budget.production *= 1.15
          this.$store.state.currentMovie._preProduction.happenedEvents.push("difficulty")
          break
        /*case "extend":
          this.calcDireMorale(true)
          this.$store.state.currentMovie._preProduction.movie.hype *= 0.9
          this.$store.state.currentMovie._preProduction.happenedEvents.push("extend")
          this.crewMoraleGoes(1)
          break;*/
        default:
          break;
      }
      this.closeModal()
      console.log(this.$store.getters.getInProductionMovies)
    },

    bOption() {
      switch (this.type) {
        case "dropOut":
          this.$store.state.currentMovie._preProduction.movie.hype *= 0.9
          this.actorSection = true
          this.$store.state.currentMovie._preProduction.happenedEvents.push("dropOut")
          break
        case "recast":
          this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 1
          this.$store.state.currentMovie._preProduction.happenedEvents.push("recast")
          break
        case "creative":
          this.$store.state.currentMovie._preProduction.movie.hype *= 0.75
          this.$store.state.currentMovie._preProduction.happenedEvents.push("creative")
          this.directorSection = true
          this.crewMoraleGoes(-1)
          break
        case "difficulty":
          this.$store.state.currentMovie._preProduction.movie.hype *= 0.9
          this.$store.state.currentMovie._preProduction.happenedEvents.push("difficulty")
          break
        /*case "extend":
          this.calcDireMorale(false)
          this.$store.state.currentMovie._preProduction.happenedEvents.push("extend")
          break*/
        default:
          break;
      }
      this.closeModal()
      console.log(this.$store.getters.getInProductionMovies)
    },

    calcDireMorale(trueFalse) {
      if (this.dirRating > 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 3
      } else if (this.dirRating > 50 && this.dirRating <= 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 2
      } else if (this.dirRating <= 50) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 1
      }
    },

    crewMoraleGoes(up) {
      this.$store.state.currentMovie._preProduction.screenplay.actors.main.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.currentMovie._preProduction.screenplay.actors.minor.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.currentMovie._preProduction.screenplay.actors.support.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.currentMovie._preProduction.screenplay.actors.cameo.forEach((el) => {
        el.actorMorale += up
      })
    },

    closeModal(){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].id === currentCalendarEvent.id){
          allCalendarEvents[i].completed = true;
        }
      }
      this.$emit('close');
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