<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('afterRelease.summary')">
                <div class="afterReleaseFranchiseElement">
                  <div>{{$t('afterRelease.qst')}}</div>
                  <div class="afterReleaseFranchiseCreation">
                    <input class="afterReleaseFranchiseName" type="text" v-model="inputFranchise" placeholder="Franchise Name">
                    <custom-button class="afterReleaseFranchiseButton" size="small" @clicked="createFranchise">{{$t('afterRelease.create')}}</custom-button>
                  </div>
                </div>

                <div class="afterReleaseHeader">{{$t('afterRelease.plan')}}</div>

                <div class="afterReleasePlan">
                  <div class="afterReleasePlanElement">
                    <div>{{$t('afterRelease.dvd')}}</div>
                    <div>$ {{roundBudget(release.dvdGross)}}</div>
                  </div>

                  <div class="afterReleasePlanElement">
                    <div>{{$t('afterRelease.cinema')}}</div>
                    <div>$ {{roundBudget(release.cinemaGross)}}</div>
                  </div>
                </div>

                <div v-if="this.$store.getters.getOwnStreamingService !== null">
                  <div>{{$t('afterRelease.streamingList')}}</div>
                  <div v-for="(el, index) in streamMovies" :key="index">
                    {{el._preProduction.screenplay.title}}
                  </div>
                  <div>{{$t('afterRelease.streaming')}}</div>
                </div>

                <custom-button size="small" @clicked="finishMovie()">{{$t('finishMovie')}}</custom-button>
              </background-tile>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {Movie} from "@/classes/Movie";
import Franchises from "@/classes/Franchises";
import Earnings from "@/classes/Earnings";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "after-release",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    movie: Movie
  },

  data() {
    return {
      inputFranchise: "",
      release: this.movie._release,
      streamMovies: this.$store.getters.getBoughtMovieRights
    }
  },

  methods: {
    createFranchise() {
      const id = this.$store.getters.getFranchises.length
      const studio = this.$store.getters.getStudio
      let franchise = new Franchises(id, this.inputFranchise, studio, this.$store.getters.getCurrentDate)
      franchise.addAllMovies(this.movie)
      let check = this.$store.getters.getFranchises.forEach((el) => {
        if (el.name === franchise.name) {
          return true
        }
      })

      if (!check) {
        this.$store.commit('addFranchise', franchise)
      }
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

    finishMovie() {
      //financial Performance + TODO All(Marketing)
      this.$store.getters.getCurrentMovie._status = "Finished"
      this.$store.getters.getCurrentMovie.finishDate = this.$store.getters.getCurrentDate
      this.$store.commit('removeCreatedMovie', this.$store.getters.getCurrentMovie)
      this.$store.commit('addFinishedMovie', this.$store.getters.getCurrentMovie)

      console.log(this.$store.getters.getCurrentMovie._release.continuingEarnings)
      this.$store.commit('addEarnings', new Earnings(this.$store.getters.getCurrentMovie._release.continuingEarnings, this.$store.getters.getCurrentDate))
      this.$store.commit('addEarnings', new Earnings(this.$store.getters.getCurrentMovie._release.cinemaGross, this.$store.getters.getCurrentDate))
      this.$store.commit('addEarnings', new Earnings(this.$store.getters.getCurrentMovie._release.dvdGross, this.$store.getters.getCurrentDate))

      this.$store.getters.getStudio.budget += this.$store.getters.getCurrentMovie._release.continuingEarnings;
      this.$store.getters.getStudio.budget += this.$store.getters.getCurrentMovie._release.cinemaGross;
      this.$store.getters.getStudio.budget += this.$store.getters.getCurrentMovie._release.dvdGross;

      this.$store.getters.getCurrentMovie._earnings.push(new Earnings(this.$store.getters.getCurrentMovie._release.continuingEarnings, this.$store.getters.getCurrentDate))
      this.$store.getters.getCurrentMovie._earnings.push(new Earnings(this.$store.getters.getCurrentMovie._release.cinemaGross, this.$store.getters.getCurrentDate))
      this.$store.getters.getCurrentMovie._earnings.push(new Earnings(this.$store.getters.getCurrentMovie._release.dvdGross, this.$store.getters.getCurrentDate))
      this.closeModal();
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
    },

    currencyFormatDE(num) {
      return (
          num
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      ) // use . as a separator
    }
  },

  mounted() {
    this.$store.commit('addBoughtMovieRights', this.movie)
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
  width: 450px;
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

.afterReleaseFranchiseElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  font-size: 15px;
}

.afterReleaseFranchiseCreation {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.afterReleaseFranchiseButton {
  width: 40%;
}

.afterReleaseFranchiseName {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  flex: 1;
  padding: 10px;
}

.afterReleaseHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 22px;
  margin-bottom: 0.25em;
  margin-top: 10px;
}

.afterReleasePlanElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;
  font-size: 15px;
}

.afterReleasePlan {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>