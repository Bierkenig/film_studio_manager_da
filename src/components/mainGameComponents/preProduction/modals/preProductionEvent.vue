<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile title="Problem">
                <div class="preProductionEventProblemContainer">{{ $t('preProductionEvents.' + type + '.problem') }}.
                  (In the movie "{{ this.$store.getters.getCurrentCalendarEvent.movie }}")
                </div>
                <div class="preProductionEventActionHeader">Actions</div>
                <div class="preProductionEventActionContainer">
                  <div class="preProductionEventOptionContainer">
                    <div class="preProductionEventOptionHeader">Option A</div>
                    <div class="preProductionEventOptionDescription">{{
                        $t('preProductionEvents.' + type + '.optionA')
                      }}
                    </div>
                    <div class="preProductionEventOptionResults">
                      <div class="preProductionEventOptionResultsElement">
                        {{ $t('preProductionEvents.' + type + '.consequenceA1') }}
                      </div>
                      <div class="preProductionEventOptionResultsElement"
                           v-if="type === 'recast' || type === 'creative' || type === 'extend'">
                        {{ $t('preProductionEvents.' + type + '.consequenceA2') }}
                      </div>
                      <div class="preProductionEventOptionResultsElement" v-if="type === 'extend'">
                        {{ $t('preProductionEvents.' + type + '.consequenceA21') }}
                      </div>
                      <div class="preProductionEventOptionResultsElement" v-if="type === 'extend'">
                        {{ $t('preProductionEvents.' + type + '.consequenceA22') }}
                      </div>
                      <div class="preProductionEventOptionResultsElement" v-if="type === 'extend'">
                        {{ $t('preProductionEvents.' + type + '.consequenceA23') }}
                      </div>
                    </div>
                    <custom-button size="small" class="modal-default-button" @clicked="aOption()">
                      {{ $t('preProductionEvents.optionA') }}
                    </custom-button>
                  </div>
                  <div class="preProductionEventOptionContainer">
                    <div class="preProductionEventOptionHeader">Option B</div>
                    <div class="preProductionEventOptionDescription">{{
                        $t('preProductionEvents.' + type + '.optionB')
                      }}
                    </div>
                    <div class="preProductionEventOptionResults">
                      <div class="preProductionEventOptionResultsElement">
                        {{ $t('preProductionEvents.' + type + '.consequenceB1') }}
                      </div>
                      <div class="preProductionEventOptionResultsElement"
                           v-if="type === 'dropOut' || type === 'creative'">
                        {{ $t('preProductionEvents.' + type + '.consequenceB2') }}
                      </div>
                      <div class="preProductionEventOptionResultsElement" v-if="type === 'creative'">
                        {{ $t('preProductionEvents.' + type + '.consequenceB3') }}
                      </div>
                    </div>
                    <custom-button size="small" class="modal-default-button" @clicked="bOption()">
                      {{ $t('preProductionEvents.optionB') }}
                    </custom-button>
                  </div>

                  <div v-if="duration">
                    <div>{{ $t('preProductionEvents.extend.set') }}</div>
                    <input type="range" min="" max="12" step="1" v-model="durationAmount">
                    <button
                        @click="this.$store.state.currentMovie._preProduction.preProductionLength = durationAmount; $emit('close')">
                      {{ $t('preProductionEvents.close') }}
                    </button>
                  </div>
                </div>
                <button v-if="close" @click="$emit('close')">{{ $t('preProductionEvents.close') }}</button>
              </background-tile>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "pre-production-event",
  components: {CustomButton, BackgroundTile},
  props: {
    type: String,
  },

  data() {
    return {
      dirRating: this.$store.state.currentMovie._preProduction.hiredDirector.rating,
      duration: false,
      min: this.$store.state.currentMovie._preProduction.preProductionLength,
      durationAmount: this.min,
      close: false,
      allMovieActors: this.$store.state.currentMovie._preProduction.screenplay.actors.main.concat(this.$store.state.currentMovie._preProduction.screenplay.actors.support,
          this.$store.state.currentMovie._preProduction.screenplay.actors.minor, this.$store.state.currentMovie._preProduction.screenplay.actors.cameo),
    }
  },

  methods: {
    aOption() {
      switch (this.type) {
        case "dropOut":
          this.$store.state.currentMovie._preProduction.budget.actorSalary += (this.$store.state.currentMovie._preProduction.budget.actorSalary / this.allMovieActors.length) * 0.15;
          this.$store.state.currentMovie._preProduction.happenedEvents.push("dropOut")
          break
        case "recast":
          this.$store.state.currentMovie._preProduction.hype *= 0.9;
          this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale += 1
          this.$store.state.currentMovie._preProduction.happenedEvents.push("recast")
          break
        case "creative":
          this.$store.state.currentMovie._preProduction.budget.directorSalary *= 1.25
          this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale += 1
          this.$store.state.currentMovie._preProduction.happenedEvents.push("creative")
          break
        case "difficulty":
          this.$store.state.currentMovie._preProduction.budget.production *= 1.15
          this.$store.state.currentMovie._preProduction.happenedEvents.push("difficulty")
          break
          /*case "extend":
            this.calcDireMorale(true)
            this.$store.state.currentMovie._preProduction.hype *= 0.9
            this.$store.state.currentMovie._preProduction.happenedEvents.push("extend")
            this.crewMoraleGoes(1)
            break;*/
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
    },

    bOption() {
      switch (this.type) {
        case "dropOut":
          this.$store.state.currentMovie._preProduction.hype *= 0.9
          this.$store.state.currentMovie._preProduction.happenedEvents.push("dropOut")
          this.$router.push({name: 'actorSection'})
          break
        case "recast":
          this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 1
          this.$store.state.currentMovie._preProduction.happenedEvents.push("recast")
          break
        case "creative":
          this.$store.state.currentMovie._preProduction.hype *= 0.75
          this.$store.state.currentMovie._preProduction.happenedEvents.push("creative")
          this.crewMoraleGoes(-1)
          this.$store.getters.getCurrentMovie._preProduction.hiredDirector._workingOnProjects--
          this.$store.getters.getCurrentMovie._preProduction.hiredDirector = null
          this.$router.push({name: 'directorSection'})
          break
        case "difficulty":
          this.$store.state.currentMovie._preProduction.hype *= 0.9
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

    closeModal() {
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if (allCalendarEvents[i].id === currentCalendarEvent.id) {
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
  width: 650px;
  margin: 0px auto;
  padding: 20px 30px;
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  align-self: flex-end;
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

.preProductionEventProblemContainer {
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  margin: 10px 0 10px 0;
  padding: 10px;
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.preProductionEventActionHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-bottom: 0.25em;
}

.preProductionEventActionContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  margin: 10px 0 10px 0;
  padding: 15px;
}

.preProductionEventOptionContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  width: 50%;
}

.preProductionEventOptionHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 20px;
}

.preProductionEventOptionDescription {
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.preProductionEventOptionResults {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
}

.preProductionEventOptionResultsElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  font-size: 15px;
}
</style>