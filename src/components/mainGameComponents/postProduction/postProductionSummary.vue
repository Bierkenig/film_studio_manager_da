<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('summaries.postProduction.title')">
                <div class="postProductionSummaryResults">
                  <div class="postProductionSummaryProgressContainer">
                    <div class="postProductionSummarySmallHeader">{{$t('summaries.postProduction.progress')}}</div>
                    <div class="postProductionSummaryProgressBar">
                      <div>{{percent}}%</div>
                      <input type="range"
                             :min="0"
                             :max="maxWeeks"
                             :step="1"
                             v-model="currentWeeks" disabled>
                    </div>
                  </div>
                  <div class="postProductionSummaryHappenedEventsContainer">
                    <div class="postProductionSummarySmallHeader">{{$t('summaries.postProduction.events')}}</div>
                    <div v-if="happenedEvents.length !== 0">
                      <div v-for="(el, index) in happenedEvents" :key="index">
                        {{$t('postproductionEvents.' + el + ".problem")}}
                      </div>
                    </div>
                  </div>
                </div>
                <custom-button size="small" @clicked="closeSummary">{{$t('summaries.postProduction.close')}}</custom-button>
              </background-tile>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import Earnings from "@/classes/Earnings";

export default {
  name: "postProductionSummary",
  components: {BackgroundTile, CustomButton},

  data() {
    return {
      happenedEvents: [],
      maxWeeks: this.$store.getters.getCurrentMovie._preProduction.preProductionLength +
          this.$store.getters.getCurrentMovie._preProduction.productionLength +
          this.$store.getters.getCurrentMovie._preProduction.postProductionLength,
      currentWeeks: this.$store.getters.getCurrentMovie._preProduction.preProductionLength
          + this.$store.getters.getCurrentMovie._preProduction.productionLength
          + this.$store.getters.getCurrentMovie._preProduction.postProductionLength,
      percent: 0,
    }
  },

  mounted() {
    this.happenedEvents = this.$store.getters.getCurrentMovie._postProduction.happenedEvents

    this.percent = Math.round((this.currentWeeks * 100) / this.maxWeeks)
  },

  methods: {
    closeSummary(){
      this.$store.commit('addEarnings', new Earnings(-this.$store.getters.getCurrentMovie._totalOutgoings, this.$store.getters.getCurrentDate))
      this.$store.getters.getCurrentMovie._earnings.push(new Earnings(-this.$store.getters.getCurrentMovie._totalOutgoings, this.$store.getters.getCurrentDate))

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
  width: 400px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  transition: all 0.3s ease;
}

.modal-body {
  margin: 20px 0;
  text-align: center;
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

.postProductionSummaryResults {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15px;
}

.postProductionSummaryProgressContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 7px 5px 7px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.postProductionSummaryHappenedEventsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 7px 5px 7px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.postProductionSummaryProgressBar {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.postProductionSummarySmallHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 18px;
}

input[type='range']{
  height: 10px;
}
</style>