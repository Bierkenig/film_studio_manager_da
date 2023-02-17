<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile title="Problem">
                <div class="productionEventProblemContainer">{{ $t('productionEvents.' + type + '.problem') }}.
                  (In the movie "{{ this.$store.getters.getCurrentCalendarEvent.movie }}")
                </div>
                <div class="productionEventActionHeader">Actions</div>
                <div class="productionEventActionContainer">
                  <div class="productionEventOptionContainer">
                    <div class="productionEventOptionHeader">{{$t('productionEvents.optionA')}}</div>
                    <div class="productionEventOptionDescription">{{ $t('productionEvents.' + type + '.optionA') }}</div>
                    <div class="productionEventOptionResults">
                      <div class="productionEventOptionResultsElement">{{ $t('productionEvents.' + type + '.consequenceA1') }}</div>
                      <div class="productionEventOptionResultsElement" v-if="type === 'budgetForCostumes' || type === 'equipment' ||
                          type === 'budget' || type === 'breakdown' || type === 'duration' || type === 'directorLeaves' ||
                          type === 'changes' || type === 'injured'">
                        {{ $t('productionEvents.' + type + '.consequenceA2') }}
                      </div>
                      <div class="productionEventOptionResultsElement" v-if="type === 'castMember' || type === 'budgetForCostumes' || type === 'equipment' ||
                          type === 'budget' || type === 'breakdown' ||
                          type === 'changes'">{{ $t('productionEvents.' + type + '.consequenceA3') }}
                      </div>
                    </div>
                    <custom-button size="small" class="modal-default-button" @click="aOption(); bool = true">{{ $t('productionEvents.optionA') }}</custom-button>
                  </div>
                  <div class="productionEventOptionContainer">
                    <div class="productionEventOptionHeader">{{$t('productionEvents.optionB')}}</div>
                    <div class="productionEventOptionDescription">{{ $t('productionEvents.' + type + '.optionB') }}</div>
                    <div class="productionEventOptionResults">
                      <div class="productionEventOptionResultsElement">{{ $t('productionEvents.' + type + '.consequenceB1') }}</div>
                      <div class="productionEventOptionResultsElement" v-if="type === 'budgetForCostumes' || type === 'equipment' ||
                          type === 'budget' || type === 'breakdown' || type === 'directorLeaves' ||
                          type === 'changes' || type === 'injured'">
                        {{ $t('productionEvents.' + type + '.consequenceB2') }}
                      </div>
                      <div class="productionEventOptionResultsElement" v-if="type === 'directorLeaves'">{{ $t('productionEvents.' + type + '.consequenceB3') }}</div>
                    </div>
                    <custom-button size="small" class="modal-default-button" @click="bOption(); bool = true">{{ $t('productionEvents.optionB') }}</custom-button>
                  </div>
                </div>

                <div v-if="weeks">
                  <div>{{$t('productionEvents.specify')}}</div>
                  <input type="range" min="0" max="10" step="1" v-model="durWeeks">
                  <div>{{durWeeks}}</div>
                </div>

                <button v-if="weeks" class="modal-default-button" @click="check()">{{$t('productionEvents.check')}}</button>

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
  name: "prod-event-modal",
  components: {CustomButton, BackgroundTile},

  data() {
    return {
      weeks: false,
      date: false,
      bool: false,
      durWeeks: 0,
      dirRating: this.$store.state.currentMovie._preProduction.hiredDirector.rating,
      type: this.$store.state.currentCalendarEvent.type,
    }
  },

  methods: {
    aOption() {
      switch (this.type) {
        case "weather":
          this.$store.state.currentMovie._preProduction.budget.set *= 1.1
            this.$emit('close')
            this.completeEvent();
          this.$store.state.currentMovie._production.happenedEvents.push("weather")
          break
        case "castMember":
          this.$store.state.currentMovie._preProduction.hype *= 0.85
          this.calcDireMorale(true)
          this.completeEvent();
          this.$router.push({name: "actorSection"})
          this.$store.state.currentMovie._production.happenedEvents.push("castMember")
          break
        case "budgetForCostumes":
          this.$store.state.currentMovie._preProduction.budget.costume *= 1.1
          this.calcDireMorale(true)
          this.crewMoraleGoes(1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("budgetForCostumes")
          break
        case "equipment":
          this.$store.state.currentMovie._preProduction.budget.cinematography *= 1.1
          this.calcDireMorale(true)
          this.crewMoraleGoes(1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("equipment")
          break
        case "budget":
          this.$store.state.currentMovie._preProduction.budget.production *= 1.1
          this.calcDireMorale(true)
          this.crewMoraleGoes(1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("budget")
          break
        case "breakdown":
          this.$store.state.currentMovie._preProduction.budget.set *= 1.1
          this.calcDireMorale(true)
          this.crewMoraleGoes(1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("breakdown")
          break
        case "duration":
          this.calcDireMorale(true)
          this.weeks = true
          this.crewMoraleGoes(1)
          this.completeEvent();
          this.$store.state.currentMovie._production.happenedEvents.push("duration")
          break
        case "directorLeaves":
          this.calcDireMorale(true)
          this.$store.state.currentMovie._preProduction.budget.directorSalary *= 1.25
          this.$emit('close')
          this.completeEvent();
          this.$store.state.currentMovie._production.happenedEvents.push("directorLeaves")
          break
        case "changes":
          this.calcDireMorale(true)
          this.crewMoraleGoes(1)
          this.$store.state.currentMovie._preProduction.budget.problemBudget += this.$store.state.currentMovie._preProduction.getTotalBudget() * 0.1
          this.$emit('close')
          this.completeEvent();
          this.$store.state.currentMovie._production.happenedEvents.push("changes")
          break
        case "injured":
          this.$store.state.currentMovie._preProduction.hype *= 0.85
          this.completeEvent();
          this.$router.push({name: "actorSection"})
          this.$store.state.currentMovie._production.happenedEvents.push("injured")
          break;
        default:
          break;
      }
    },

    bOption() {
      switch (this.type) {
        case "weather":
          this.$store.state.currentMovie._preProduction.productionLength += 4
          this.$store.state.currentMovie._preProduction.calcReleaseDateAgain()
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("weather")
          break
        case "castMember":
          this.calcDireMorale(false)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("castMember")
          break
        case "budgetForCostumes":
          this.calcDireMorale(false)
          this.crewMoraleGoes(-1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("budgetForCostumes")
          break
        case "equipment":
          this.calcDireMorale(false)
          this.crewMoraleGoes(-1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("equipment")
          break
        case "budget":
          this.calcDireMorale(false)
          this.crewMoraleGoes(-1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("budget")
          break
        case "breakdown":
          this.calcDireMorale(false)
          this.crewMoraleGoes(-1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("breakdown")
          break
        case "duration":
          this.calcDireMorale(false)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("duration")
          break
        case "directorLeaves":
          this.$store.state.currentMovie._preProduction.hype *= 0.75
          this.crewMoraleGoes(-1)
          this.completeEvent();
          this.$router.push({name: "directorSection"})
          this.$store.state.currentMovie._production.happenedEvents.push("directorLeaves")
          break
        case "changes":
          this.calcDireMorale(false)
          this.crewMoraleGoes(-1)
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("changes")
          break
        case "injured":
          this.$store.state.currentMovie._preProduction.hype *= 0.90
          if (this.$store.state.currentMovie._production.haltedStartDate === null) this.$store.state.currentMovie._production.haltedStartDate = this.$store.state.currentDate
          this.$store.state.currentMovie._production.haltedDuration += 4
          this.completeEvent();
          this.$emit('close')
          this.$store.state.currentMovie._production.happenedEvents.push("injured")
          break
      }
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

    check() {
      this.$store.state.currentMovie._preProduction.productionLength += this.durWeeks
      if (this.type === 'duration') {
        this.$store.getters.getCurrentMovie._preProduction.releaseDate =
            new Date(this.$store.getters.getCurrentMovie._preProduction.releaseDate.getFullYear(),
                this.$store.getters.getCurrentMovie._preProduction.releaseDate.getMonth(),
                this.$store.getters.getCurrentMovie._preProduction.releaseDate + (this.durWeeks * 7))
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

    completeEvent(){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].id === currentCalendarEvent.id){
          allCalendarEvents[i].completed = true;
        }
      }
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

.productionEventProblemContainer {
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  margin: 10px 0 10px 0;
  padding: 10px;
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.productionEventActionHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-bottom: 0.25em;
}

.productionEventActionContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  margin: 10px 0 10px 0;
  padding: 15px;
}

.productionEventOptionContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  width: 50%;
}

.productionEventOptionHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 20px;
}

.productionEventOptionDescription {
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.productionEventOptionResults {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
}

.productionEventOptionResultsElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  font-size: 15px;
}
</style>