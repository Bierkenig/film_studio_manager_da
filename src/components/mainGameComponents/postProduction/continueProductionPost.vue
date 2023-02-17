<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('continueProduction.title2')">
                <div>{{$t('continueProduction.qst2')}}</div>
                <div class="continuePostProductionButtonContainer">
                  <custom-button size="small" @clicked="cancelMovie()">{{$t('continueProduction.cancel')}}</custom-button>
                  <custom-button size="small" @clicked="setMovieAgain()">{{$t('continueProduction.continue')}}</custom-button>
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
  name: "continue-post-prod",
  components: {CustomButton, BackgroundTile},

  methods: {
    cancelMovie() {
      const index = this.$store.state.inProductionMovies.indexOf(this.$store.state.currentMovie)
      this.$store.state.inProductionMovies.slice(index, 1)
      this.closeModal();
    },

    setMovieAgain() {
      this.$store.getters.getCurrentMovie._status = 'Post Production'
      this.$store.getters.getCurrentMovie.setPostProduction()
      this.$store.getters.getCurrentMovie._postProduction.postProductionStart = this.$store.getters.getCurrentDate
      let endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + (this.$store.getters.getCurrentMovie._preProduction.postProductionLength * 7))
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
        type: 'postProductionFinished',
        completed: false,
      })

      store.commit('addCalendarEvents', {
        id: store.getters.getNextEventId,
        movie: this.$store.getters.getCurrentMovie._preProduction.screenplay.title,
        studio: null,
        actor: "",
        director: "",
        start: endDate.toISOString().split('T')[0],
        end: newDate.toISOString().split('T')[0],
        type: 'beforeRelease',
        completed: false,
      })

      endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + 28)
      newDate = new Date(endDate.getFullYear(),
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
        type: 'testScreening',
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

.continuePostProductionButtonContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
}
</style>