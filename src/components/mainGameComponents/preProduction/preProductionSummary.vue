<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('summaries.preProduction.title')">
                <div class="preProductionSummaryResults">
                  <div>Of the movie "{{ this.$store.getters.getCurrentCalendarEvent.movie }}"</div>
                  <div class="preProductionSummaryProgressContainer">
                    <div class="preProductionSummarySmallHeader">{{$t('summaries.preProduction.progress')}}</div>
                    <div class="preProductionSummaryProgressBar">
                      <div>{{percent}}%</div>
                      <input type="range"
                             :min="0"
                             :max="maxWeeks"
                             :step="1"
                             v-model="currentWeeks" disabled>
                    </div>
                  </div>
                  <div class="preProductionSummaryHappenedEventsContainer">
                    <div class="preProductionSummarySmallHeader">{{$t('summaries.preProduction.events')}}</div>
                    <div v-if="happenedEvents.length !== 0">
                      <div v-for="(el, index) in happenedEvents" :key="index">
                        {{$t('preProductionEvents.' + el + ".problem")}}
                      </div>
                    </div>
                  </div>
                </div>
                <custom-button size="small" @clicked="closeSummary">{{$t('summaries.preProduction.close')}}</custom-button>
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
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "preProductionSummary",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      happenedEvents: [],
      maxWeeks: this.$store.getters.getCurrentMovie._preProduction.preProductionLength +
          this.$store.getters.getCurrentMovie._preProduction.productionLength +
          this.$store.getters.getCurrentMovie._preProduction.postProductionLength,
      currentWeeks: this.$store.getters.getCurrentMovie._preProduction.preProductionLength,
      percent: 0,
    }
  },

  mounted() {
    this.happenedEvents = this.$store.getters.getCurrentMovie._preProduction.happenedEvents

    this.$store.getters.getCurrentMovie._preProduction.outgoings = this.$store.getters.getCurrentMovie._preProduction.getTotalBudget();

    this.percent = Math.round((this.currentWeeks * 100) / this.maxWeeks)
  },

  methods: {
    closeSummary(){
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

.preProductionSummaryResults {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 15px;
}

.preProductionSummaryProgressContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 7px 5px 7px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.preProductionSummaryHappenedEventsContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 7px 5px 7px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.preProductionSummaryProgressBar {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.preProductionSummarySmallHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 18px;
}

input[type='range']{
  height: 10px;
}
</style>