<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('afterReleaseWithCinema.details')">
                <div class="afterReleaseWithCinemaContainer">
                  <div class="afterReleaseWithCinemaInfoElement">
                    <div>{{$t('afterReleaseWithCinema.criticsRating')}}</div>
                    <div>{{Math.round(release.criticsFormula)}}</div>
                  </div>
                  <div class="afterReleaseWithCinemaInfoElement">
                    <div>{{$t('afterReleaseWithCinema.audienceRating')}}</div>
                    <div>{{Math.round(release.audienceFormula)}}</div>
                  </div>
                  <div class="afterReleaseWithCinemaInfoElement">
                    <div>{{$t('afterReleaseWithCinema.release')}}</div>
                    <div>{{Math.round(release.popularityFormula)}}</div>
                  </div>
                  <div class="afterReleaseWithCinemaInfoElement">
                    <div>{{$t('afterReleaseWithCinema.open')}}</div>
                    <div>{{roundBudget(release.openingEarnings)}}</div>
                  </div>
                </div>
                <custom-button size="small" @clicked="closeModal">{{$t('afterReleaseWithCinema.close')}}</custom-button>
              </background-tile>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import store from "@/services/store";
import Earnings from "@/classes/Earnings";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "afterReleaseWithCinemaRun",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      release: this.$store.getters.getCurrentMovie._release
    }
  },

  methods: {
    closeModal(){
      this.$store.commit('addEarnings', new Earnings(this.$store.getters.getCurrentMovie._release.openingWeekGross, this.$store.getters.getCurrentDate, 'Cinema'))
      this.$store.getters.getCurrentMovie._earnings.push(new Earnings(this.$store.getters.getCurrentMovie._release.openingWeekGross, this.$store.getters.getCurrentDate, 'Cinema'))

      this.$store.getters.getStudio.budget += this.$store.getters.getCurrentMovie._release.openingWeekGross;


      let endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + ((store.getters.getCurrentMovie._postProduction.releaseWeeks - 1) * 7 + 1))
      let newDate = new Date(endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1)
      store.commit('addCalendarEvents', {
        id: store.getters.getNextEventId,
        movie: this.$store.getters.getCurrentMovie._preProduction.screenplay.title,
        studio: null,
        actor: "",
        director: "",
        start: endDate.toISOString().split('T')[0],
        end: newDate.toISOString().split('T')[0],
        type: 'afterRelease',
        completed: false,
      })

      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if(allCalendarEvents[i].id === currentCalendarEvent.id){
          allCalendarEvents[i].completed = true;
        }
      }
      this.$emit('close');
    },

    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
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
  width: 500px;
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

.afterReleaseWithCinemaContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 10px 0;
}

.afterReleaseWithCinemaInfoElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;
  font-size: 15px;
}
</style>