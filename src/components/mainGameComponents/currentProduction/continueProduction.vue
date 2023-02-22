<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('continueProduction.title')">
                <div>{{$t('continueProduction.qst')}}</div>
                <div class="continueProductionButtonContainer">
                  <custom-button size="small" @clicked="cancelMovie()">{{$t('continueProduction.cancel')}}</custom-button>
                  <custom-button size="small" @clicked="movieOnGoing()">{{$t('continueProduction.continue')}}</custom-button>
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
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "continue-prod",
  components: {BackgroundTile, CustomButton},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  methods: {
    cancelMovie() {
      const index = this.$store.state.inProductionMovies.indexOf(this.$store.state.currentMovie)
      this.$store.state.inProductionMovies.slice(index, 1)
      this.$store.state.currentMovie = null
      this.$store.state.summaries.preProductionClose = true
      this.closeModal();
    },

    movieOnGoing() {
      this.$store.getters.getCurrentMovie._status = 'Production'
      this.$store.getters.getCurrentMovie.setProduction()
      this.$store.getters.getCurrentMovie._production.startDate = this.$store.getters.getCurrentDate
      let endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + (this.$store.getters.getCurrentMovie._preProduction.productionLength * 7) + 1)
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
        type: 'productionFinished',
        completed: false,
      })
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
    }
  },
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

.continueProductionButtonContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
}
</style>