<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile title="Problem">
                <div class="postProductionEventProblemContainer">{{ $t('postproductionEvents.' + type + '.problem') }}
                  (In the movie "{{ this.$store.getters.getCurrentCalendarEvent.movie }}")
                </div>
                <div class="postProductionEventActionHeader">Actions</div>
                <div class="postProductionEventActionContainer">
                  <div class="postProductionEventOptionContainer">
                    <div class="postProductionEventOptionHeader">{{$t('postproductionEvents.optionA')}}</div>
                    <div class="postProductionEventOptionDescription">{{ $t('postproductionEvents.' + type + '.optionA') }}</div>
                    <div class="postProductionEventOptionResults">
                      <div class="postProductionEventOptionResultsElement">{{ $t('postproductionEvents.' + type + '.consequenceA1') }}</div>
                      <div class="postProductionEventOptionResultsElement" v-if="type === 'deadline' || type === 'reshooting'">
                        {{ $t('postproductionEvents.' + type + '.consequenceA2') }}
                      </div>
                      <div class="postProductionEventOptionResultsElement" v-if="type === 'deadline'">
                        {{ $t('postproductionEvents.' + type + '.consequenceA3') }}
                      </div>
                    </div>
                    <custom-button size="small" class="modal-default-button" @clicked="aOption(); bool = true">{{ $t('postproductionEvents.optionA') }}</custom-button>

                  </div>
                  <div class="postProductionEventOptionContainer">
                    <div class="postProductionEventOptionHeader">{{$t('postproductionEvents.optionB')}}</div>
                    <div class="postProductionEventOptionDescription">{{ $t('postproductionEvents.' + type + '.optionB') }}</div>
                    <div class="postProductionEventOptionResults">
                      <div class="postProductionEventOptionResultsElement">{{ $t('postproductionEvents.' + type + '.consequenceB1') }}</div>
                    </div>
                    <custom-button size="small" class="modal-default-button" @clicked="bOption(); bool = true">{{ $t('postproductionEvents.optionB') }}</custom-button>
                  </div>
                </div>
              </background-tile>

              <div v-if="weeks">
                <div>{{$t('productionEvents.specify')}}</div>
                <input type="range" min="0" max="10" step="1" v-model="durWeeks">
                <div>{{durWeeks}}</div>
              </div>

              <button v-if="weeks" class="modal-default-button" @click="check()">{{$t('productionEvents.check')}}</button>

              <div v-if="date">
                <div>{{$t('productionEvents.date')}}</div>
                <input type="date" v-model="releaseDate">
              </div>

              <button v-if="weeks || date || bool" class="modal-default-button" @click="closeWindow()">{{$t('productionEvents.close')}}</button>
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
  name: "post-prod-modal",
  components: {CustomButton, BackgroundTile},

  data() {
    return {
      weeks: false,
      date: false,
      bool: false,
      durWeeks: 0,
      releaseDate: null,
      dirRating: this.$store.state.currentMovie._preProduction.hiredDirector.rating,
      type: this.$store.state.currentPostProdEventType,
      wholeBudget: this.$store.getters.getCurrentMovie._preProduction.getTotalBudget(),
      screenplayScope: this.$store.state.currentMovie?._preProduction.screenplay.details.scope,

    }
  },

  methods: {
    aOption() {
      //this.$store.state.currentMovie._preProduction.productionLength += 4
      //this.$store.state.currentMovie._preProduction.calcReleaseDateAgain()
      //die länge der post erhöhen
      //die Methode calcReleaseDateAgain() aufrufen
      switch (this.type) {
        case "sound":
          this.$store.state.currentMovie._preProduction.budget.sound *= 1.2
          this.completeEvent()
          this.$store.state.currentMovie._postProduction.happenedEvents.push("sound")
          break
        case "postProductionProblem":
          //TODO hype abziehen wenn releasedate drüber
          if(this.screenplayScope === 'Little'){
            this.durWeeks += 1;
          }
          else if(this.screenplayScope === 'Small'){
            this.durWeeks += 2;
          }
          else if(this.screenplayScope === 'Normal'){
            this.durWeeks += 4;
          }
          else if(this.screenplayScope === 'Large'){
            this.durWeeks += 6;
          }
          else if(this.screenplayScope === 'Epic'){
            this.durWeeks += 8;
          }
          //this.$store.state.currentMovie._preProduction.hype *= 0.85

          this.check()
          this.completeEvent()
          this.$store.state.currentMovie._postProduction.happenedEvents.push("postProductionProblem")

          break
        case "visualEffects":
          this.$store.state.currentMovie._preProduction.budget.vfx *= 1.2
          this.completeEvent()
          this.$store.state.currentMovie._postProduction.happenedEvents.push("visualEffects")
          break
        case "visualQuality":
          this.$store.state.currentMovie._preProduction.budget.editing *= 1.2
          this.completeEvent()
          this.$store.state.currentMovie._postProduction.happenedEvents.push("visualQuality")
          break
        case "reshooting":
          //TODO hype abziehen wenn releasedate drüber
          this.wholeBudget = this.$store.getters.getCurrentMovie._preProduction.getTotalBudget() * 1.2
          if(this.screenplayScope === 'Little'){
            this.durWeeks += 2;
          }
          else if(this.screenplayScope === 'Small'){
            this.durWeeks += 4;
          }
          else if(this.screenplayScope === 'Normal'){
            this.durWeeks += 6;
          }
          else if(this.screenplayScope === 'Large'){
            this.durWeeks += 8;
          }
          else if(this.screenplayScope === 'Epic'){
            this.durWeeks += 10;
          }
          this.check()
          this.completeEvent()
          this.$store.state.currentMovie._postProduction.happenedEvents.push("reshooting")

          break
      }
    },

    bOption() {
      switch (this.type) {
        case "sound":
          this.calcDireMorale(false)
          this.$store.state.currentMovie._postProduction.happenedEvents.push("sound")
          this.completeEvent()
          break
        case "postProductionProblem":
          this.calcDireMorale(false)
          this.$store.state.currentMovie._postProduction.happenedEvents.push("postProductionProblem")
          this.completeEvent()
          break
        case "visualEffects":
          this.calcDireMorale(false)
          this.$store.state.currentMovie._postProduction.happenedEvents.push("visualEffects")
          this.completeEvent()
          break
        case "visualQuality":
          this.calcDireMorale(false)
          this.$store.state.currentMovie._postProduction.happenedEvents.push("visualQuality")
          this.completeEvent()
          break
        case "reshooting":
          this.calcDireMorale(false)
          this.$store.state.currentMovie._postProduction.happenedEvents.push("reshooting")
          this.completeEvent()
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
      //TODO releaseDate
      this.$store.state.currentMovie._preProduction.postProductionLength += this.durWeeks

      let reshootingStartDate = this.$store.getters.getCurrentDate;
      let reshootingEndDate = new Date(reshootingStartDate.getFullYear(), reshootingStartDate.getMonth(),
          reshootingStartDate.getDate() + (this.durWeeks * 7));

      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].movie === currentCalendarEvent.movie && (allCalendarEvents[i].type === 'postProductionFinished' || allCalendarEvents[i].type === 'beforeRelease')){
          let splittedDate = currentCalendarEvent.start.split('-');
          let dateOfEvent = new Date(splittedDate[0], splittedDate[1], splittedDate[2]);
          if(reshootingEndDate.getTime() > dateOfEvent.getTime()){
            let newEndDate = new Date(reshootingEndDate.getFullYear(), reshootingEndDate.getMonth(),
              reshootingEndDate.getDate() + 1)
            allCalendarEvents[i].start = reshootingEndDate.toISOString().split('T')[0];
            allCalendarEvents[i].end = newEndDate.toISOString().split('T')[0];
          }
        }
      }

      if (this.type === 'duration') {
        if(this.$store.state.currentMovie._preProduction.startDate.getDate() + 7 * this.$store.state.currentMovie._preProduction.productionLength === this.$store.state.currentMovie._preProduction.releaseDate) {
          this.releaseDate = this.$store.state.currentMovie._preProduction.startDate.getDate() + 7 * this.$store.state.currentMovie._preProduction.postProductionLength
          this.date = true
        } else {
          this.$emit('close')
        }
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

    closeWindow() {
      if(this.type === 'duration') {
        this.$store.state.currentMovie._preProduction.releaseDate = this.releaseDate
      }
      this.$emit('close')
    },

    completeEvent(){
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].id === currentCalendarEvent.id){
          allCalendarEvents[i].completed = true;
        }
      }

      this.$emit('close')
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

.postProductionEventProblemContainer {
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  margin: 10px 0 10px 0;
  padding: 10px;
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.postProductionEventActionHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-bottom: 0.25em;
}

.postProductionEventActionContainer {
  display: flex;
  flex-direction: row;
  gap: 20px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  margin: 10px 0 10px 0;
  padding: 15px;
}

.postProductionEventOptionContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  width: 50%;
}

.postProductionEventOptionHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 20px;
}

.postProductionEventOptionDescription {
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.postProductionEventOptionResults {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1;
}

.postProductionEventOptionResultsElement {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  font-size: 15px;
}
</style>