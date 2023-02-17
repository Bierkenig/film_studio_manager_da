<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <h2>{{$t('afterReleaseWithCinema.details')}}</h2>
              <div>
                <div>{{$t('afterReleaseWithCinema.criticsRating')}}: {{release.criticsFormula}}</div>
                <div>{{$t('afterReleaseWithCinema.audienceRating')}}: {{release.audienceFormula}}</div>
                <div>{{$t('afterReleaseWithCinema.release')}}: {{release.popularityFormula}}</div>
                <div>{{$t('afterReleaseWithCinema.open')}}: {{release.openingEarnings}}</div>
              </div>
              <button @click="closeModal">{{$t('afterReleaseWithCinema.close')}}</button>
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

export default {
  name: "afterReleaseWithCinemaRun",

  data() {
    return {
      release: this.$store.getters.getCurrentMovie._release
    }
  },

  methods: {
    closeModal(){
      this.$store.commit('addEarnings', new Earnings(this.$store.getters.getCurrentMovie._release.openingWeekGross, this.$store.getters.getCurrentDate))
      this.$store.getters.getCurrentMovie._earnings(new Earnings(this.$store.getters.getCurrentMovie._release.openingWeekGross, this.$store.getters.getCurrentDate))

      let endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + 21)
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