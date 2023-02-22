<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('beforeRelease.details') + ' - ' + movieTitle">
                <div class="beforeReleaseContainer">
                  <div class="beforeReleaseContainerElement">
                    <div class="beforeReleaseContainerHeader">{{$t('beforeRelease.screenplay.msg')}}</div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.screenplay.writer')}}</div>
                      <div>{{screenplay.writer._first_name}} {{screenplay.writer._last_name}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.screenplay.topic1')}}</div>
                      <div>{{screenplay.topics.firstTopic !== null ? screenplay.topics.firstTopic.topicName : $t('beforeRelease.screenplay.error')}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.screenplay.topic2')}}</div>
                      <div>{{screenplay.topics.secondTopic !== null ? screenplay.topics.secondTopic.topicName : $t('beforeRelease.screenplay.error')}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.screenplay.topic3')}}</div>
                      <div>{{screenplay.topics.thirdTopic !== null ? screenplay.topics.thirdTopic.topicName : $t('beforeRelease.screenplay.error')}}</div>
                    </div>
                  </div>
                  <div class="beforeReleaseContainerElement">
                    <div class="beforeReleaseContainerHeader">{{$t('beforeRelease.director.msg')}}</div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.director.name')}}</div>
                      <div>{{director._first_name}} {{director._last_name}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.director.age')}}</div>
                      <div>{{director._age}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.director.gender')}}</div>
                      <div>{{$t(director._gender)}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.director.talent')}}</div>
                      <div>{{director._talent}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.director.pop')}}</div>
                      <div>{{director._popularity}}</div>
                    </div>
                    <div class="beforeReleaseContainerElementBox">
                      <div>{{$t('beforeRelease.director.rating')}}</div>
                      <div>{{director._rating}}</div>
                    </div>
                  </div>
                </div>
                <div class="beforeReleaseContainerOutside">
                  <div class="beforeReleaseContainerOutsideInfo">
                    <div>{{$t('beforeRelease.quality')}}</div>
                    <div>{{this.$store.getters.getCurrentMovie.quality}}</div>
                  </div>
                  <div class="beforeReleaseContainerOutsideInfo">
                    <div>{{$t('beforeRelease.screenplay.current')}}</div>
                    <div>$ {{roundBudget(current)}}</div>
                  </div>
                </div>
                <div>
                  <custom-button size="small" @clicked="changeToCinema">{{$t('beforeRelease.release')}}</custom-button>
                </div>
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
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "before-release",
  components: {CustomButton, BackgroundTile},

  data() {
    return {
      movieTitle: this.$store.getters.getCurrentMovie._preProduction.screenplay.title,
      screenplay: this.$store.getters.getCurrentMovie._preProduction.screenplay,
      director: this.$store.getters.getCurrentMovie._preProduction.hiredDirector,
      current: 0
    }
  },

  methods: {
    changeToCinema() {
      this.$store.getters.getCurrentMovie._status = 'Released'
      this.$store.getters.getCurrentMovie.setRelease();

      let endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + 7)
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
        type: 'afterReleaseWithCinemaRun',
        completed: false,
      })

      //clear from production
      this.$store.commit('removeInProductionMovie', this.$store.getters.getCurrentMovie)

      //add to cinema
      this.$store.commit('addCreatedMovie', this.$store.getters.getCurrentMovie)

      this.closeModal();
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
  },

  mounted() {
    this.current = this.$store.getters.getCurrentMovie._totalOutgoings
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

.beforeReleaseContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

.beforeReleaseContainerElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  width: 50%;
  font-size: 15px;
}

.beforeReleaseContainerHeader {
  text-align: center;
  font-size: 18px;
  font-weight: var(--fsm-fw-bold);
  margin-bottom: 5px;
}

.beforeReleaseContainerElementBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 7px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
}

.beforeReleaseContainerOutside {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.beforeReleaseContainerOutsideInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  font-size: 15px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}
</style>