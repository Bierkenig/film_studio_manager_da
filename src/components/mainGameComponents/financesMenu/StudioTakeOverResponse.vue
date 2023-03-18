<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper" @click="$emit('close')">
        <div class="modal-container" @click.stop="">
          <div class="modal-body">
            <slot name="body">
              <background-tile :title="$t('buyAStudio.response') + ' - ' + studio.name">
                <div class="studioTakeoverInfoContainer">
                  <div class="studioTakeoverInfoElement">
                    <div>{{$t('buyAStudio.popularity')}}</div>
                    <div>{{studio.popularity}}</div>
                  </div>
                  <div class="studioTakeoverInfoElement">
                    <div>{{$t('buyAStudio.offer')}}</div>
                    <div>$ {{roundBudget((Math.round(offer)))}}</div>
                  </div>
                </div>
                <div class="studioTakeoverButtonBox">
                  <custom-button size="small" @clicked="accept(offer, studio)" :disabled="disabled">{{$t('buyAStudio.accept')}}</custom-button>
                  <custom-button size="small" @clicked="this.closeModal">{{$t('buyAStudio.deny')}}</custom-button>
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

import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import Earnings from "@/classes/Earnings";
import FinancialHistoryEntry from "@/classes/FinancialHistoryEntry";

export default {
  name: "StudioTakeOverResponse",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      studio: this.$store.getters.getCurrentCalendarEvent.studio,
      offer: 0,
      disabled: false
    }
  },

  methods: {
    accept(amount, studio) {
      //decrease balance
      this.$store.commit('subtractBalance', amount)

      this.$store.commit('addEarnings', new Earnings(-amount, this.$store.getters.getCurrentDate,'StudioTakeover'))

      this.$store.commit('addFinancialHistoryEntry', new FinancialHistoryEntry("event1", "desc1", studio.name, this.$store.getters.getCurrentDate))


      //transfer movies
      this.$store.getters.getAllMovies.forEach((movie) => {
        if (studio.id === movie.owner.id) {
          this.$store.commit('addFinishedMovie', movie)
          this.$store.commit('addAllMovie', this.$store.getters.getAllMovies.filter(el => el.owner.id !== studio.id))
        }
      })

      this.$store.getters.getMoviesFromOtherStudios.forEach((movie) => {
        if (studio.id === movie.owner.id) {
          this.$store.commit('addFinishedMovie', movie)
          this.$store.state.moviesFromOtherStudios = this.$store.state.moviesFromOtherStudios.filter(el => el.id !== studio.id)
        }
      })
      this.closeModal();
    },

    closeModal() {
      let allCalendarEvents = this.$store.getters.getCalendarEvents;
      let currentCalendarEvent = this.$store.getters.getCurrentCalendarEvent;
      for (let i = 0; i < allCalendarEvents.length; i++) {
        if (allCalendarEvents[i].id === currentCalendarEvent.id) {
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
  },

  mounted() {
    this.$store.getters.getAllMovies.forEach((el) => {
      if (el.owner.id === this.studio.id) {
        this.offer += el._release.totalEarnings
      }
    })

    this.$store.getters.getMoviesFromOtherStudios.forEach(el => {
      if (el.owner.id === this.studio.id) {
        this.offer += el._release.totalEarnings
      }
    })

    if (this.$store.getters.getStudio.budget <= this.offer) {
      this.disabled = true
    }

    if (this.studio.popularity < 50) {
      this.offer *= 1.15
    } else if (this.studio.popularity >= 50 && this.studio.popularity < 75) {
      this.offer *= 1.25
    } else if (this.studio.popularity >= 75) {
      this.offer *= 1.35
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

.studioTakeoverInfoContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0 10px 0;
}

.studioTakeoverInfoElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;
  font-size: 15px;
}

.studioTakeoverButtonBox {
  display: flex;
  flex-direction: row;
  gap: 15px;
}
</style>