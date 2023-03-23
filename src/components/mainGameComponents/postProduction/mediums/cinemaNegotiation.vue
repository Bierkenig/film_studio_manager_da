<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <background-tile title="Cinema Negotiation">
                <div>
                  <div class="cinemaNegotiationDurationContainer">
                    <div>
                      Specify release duration in weeks
                    </div>
                    <div class="cinemaNegotiationDurationSlider">
                      {{ releaseWeeks }}
                      <input v-model="releaseWeeks" class="slide" type="range" :min="2" :max="54" :step="1">
                    </div>
                  </div>
                  <div class="cinemaNegotiationHeader">Percentage Take</div>
                  <div class="cinemaNegotiationPercentageContainer">
                    <div class="cinemaNegotiationPercentageElement">
                      <div class="cinemaNegotiationPercentageHeader">Studio</div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Opening Week</div>
                        <div>{{Math.floor(openingWeekShareStudio*100)}}%</div>
                      </div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Opening Week Level</div>
                        <div>{{openingLevel}}/6</div>
                      </div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Remaining Weeks</div>
                        <div>{{Math.floor(remainingWeeksShareStudio * 100)}}%</div>
                      </div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Remaining Weeks Level</div>
                        <div>{{remainingLevel}}/6</div>
                      </div>
                    </div>
                    <div class="cinemaNegotiationPercentageElement">
                      <div class="cinemaNegotiationPercentageHeader">Cinema</div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Opening Week</div>
                        <div>{{Math.floor(openingWeekShareCinema*100)}}%</div>
                      </div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Opening Week Level</div>
                        <div>{{openingLevel}}/6</div>
                      </div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Remaining Weeks</div>
                        <div>{{Math.floor(remainingWeeksShareCinema * 100)}}%</div>
                      </div>
                      <div class="cinemaNegotiationPercentageInnerBox">
                        <div>Remaining Weeks Level</div>
                        <div>{{remainingLevel}}/6</div>
                      </div>
                    </div>
                  </div>
                  <div class="cinemaNegotiationHeader">Negotiation</div>
                  <div class="cinemaNegotiationPercentageContainer">
                    <div class="cinemaNegotiationPercentageElement">
                      <div>
                        You can negotiate a better opening week ratio, but you have to give up ratio for the remaining weeks.
                      </div>
                      <custom-button size="small" @clicked="upgrade('opening')" :disabled="upgradedOpening">Upgrade Opening Week</custom-button>
                    </div>
                    <div class="cinemaNegotiationPercentageElement">
                      <div>
                        You can negotiate a better ratio for the remaining weeks, but you have to give up ratio for the opening week.
                      </div>
                      <custom-button size="small" @clicked="upgrade('remaining')" :disabled="upgradedRemaining">Upgrade Remaining Weeks</custom-button>
                    </div>
                  </div>
                  <div class="cinemaNegotiationButtonBox">
                    <custom-button size="small" v-if="upgradedRemaining || upgradedOpening" @clicked="resetUpgrades">Reset</custom-button>
                    <custom-button size="small" v-if="!upgradedRemaining && !upgradedOpening" @clicked="finish">No Negotiation</custom-button>
                    <custom-button size="small" v-if="upgradedRemaining || upgradedOpening" @clicked="finish">Continue</custom-button>
                  </div>
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

export default {
  name: "cinemaNegotiation",
  components: {CustomButton, BackgroundTile},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      releaseWeeks: 2,
      popularity: this.$store.getters.getCurrentMovie._owner.popularity,
      openingWeekShareStudio: 0,
      openingWeekShareCinema: 0,
      remainingWeeksShareStudio: 0,
      remainingWeeksShareCinema: 0,
      openingLevel: 0,
      remainingLevel: 0,
      upgradedOpening: false,
      upgradedRemaining: false

    }
  },
  mounted() {
    if (this.popularity < 25) {
      this.openingWeekShareCinema = 0.6
      this.openingWeekShareStudio = 0.4

      this.remainingWeeksShareCinema = 0.6
      this.remainingWeeksShareStudio = 0.4

      this.openingLevel = 1
      this.remainingLevel = 1
    } else if (this.popularity > 25 && this.popularity < 50) {
      this.openingWeekShareCinema = 0.55
      this.openingWeekShareStudio = 0.45

      this.remainingWeeksShareCinema = 0.55
      this.remainingWeeksShareStudio = 0.45

      this.openingLevel = 2
      this.remainingLevel = 2
    } else if (this.popularity > 50 && this.popularity < 75) {
      this.openingWeekShareCinema = 0.5
      this.openingWeekShareStudio = 0.5

      this.remainingWeeksShareCinema = 0.5
      this.remainingWeeksShareStudio = 0.5

      this.openingLevel = 3
      this.remainingLevel = 3
    } else if (this.popularity > 75 && this.popularity < 85) {
      this.openingWeekShareCinema = 0.45
      this.openingWeekShareStudio = 0.55

      this.remainingWeeksShareCinema = 0.45
      this.remainingWeeksShareStudio = 0.55

      this.openingLevel = 4
      this.remainingLevel = 4
    } else if (this.popularity > 85) {
      this.openingWeekShareCinema = 0.4
      this.openingWeekShareStudio = 0.6

      this.remainingWeeksShareCinema = 0.4
      this.remainingWeeksShareStudio = 0.6

      this.openingLevel = 5
      this.remainingLevel = 5
    }
  },

  methods: {
    roundBudget(labelValue){
      if(this.$store.getters.getCurrentLanguage === 'en'){
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                    : Math.abs(Number(labelValue));
      } else {
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " Mrd"
            // Six Zeroes for Millions
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " Mio"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " T"

                    : Math.abs(Number(labelValue));
      }
    },
    upgrade(type) {
      if (type === 'opening') {
        if (!this.upgradedRemaining) {
          this.openingLevel++
          this.openingWeekShareStudio += 0.05
          this.openingWeekShareCinema -= 0.05

          this.remainingLevel--
          this.remainingWeeksShareStudio -= 0.05
          this.remainingWeeksShareCinema += 0.05

          this.upgradedOpening = true
        } else {
          this.openingLevel += 2
          this.openingWeekShareStudio += 0.1
          this.openingWeekShareCinema -= 0.1

          this.remainingLevel -= 2
          this.remainingWeeksShareStudio -= 0.1
          this.remainingWeeksShareCinema += 0.1

          this.upgradedOpening = true
          this.upgradedRemaining = false
        }
      } else if (type === 'remaining') {
        if (!this.upgradedOpening) {
          this.openingLevel--
          this.openingWeekShareStudio -= 0.05
          this.openingWeekShareCinema += 0.05

          this.remainingLevel++
          this.remainingWeeksShareStudio += 0.05
          this.remainingWeeksShareCinema -= 0.05


          this.upgradedRemaining = true
        } else {
          this.openingLevel -= 2
          this.openingWeekShareStudio -= 0.1
          this.openingWeekShareCinema += 0.1

          this.remainingLevel += 2
          this.remainingWeeksShareStudio += 0.1
          this.remainingWeeksShareCinema -= 0.1

          this.upgradedRemaining = true
          this.upgradedOpening = false
        }
      }
    },

    resetUpgrades(){
      if(this.upgradedRemaining === true){
        this.openingLevel++
        this.remainingLevel--
        this.openingWeekShareStudio += 0.05
        this.openingWeekShareCinema -= 0.05

        this.remainingWeeksShareStudio -= 0.05
        this.remainingWeeksShareCinema += 0.05
        this.upgradedRemaining = false
      }else if(this.upgradedOpening === true){
        this.openingLevel--
        this.remainingLevel++
        this.openingWeekShareStudio -= 0.05
        this.openingWeekShareCinema += 0.05

        this.remainingWeeksShareStudio += 0.05
        this.remainingWeeksShareCinema -= 0.05

        this.upgradedOpening = false
      }
    },

    finish(){
      this.$store.getters.getCurrentMovie._postProduction.releaseWeeks = this.releaseWeeks;

      this.$store.getters.getCurrentMovie._postProduction.openingLevel = this.openingLevel
      this.$store.getters.getCurrentMovie._postProduction.remainingLevel = this.remainingLevel

      this.$store.getters.getCurrentMovie._postProduction.openingWeekShareStudio = this.openingWeekShareStudio
      this.$store.getters.getCurrentMovie._postProduction.openingWeekShareCinema = this.openingWeekShareCinema

      this.$store.getters.getCurrentMovie._postProduction.remainingWeeksShareStudio = this.remainingWeeksShareStudio
      this.$store.getters.getCurrentMovie._postProduction.remainingWeeksShareCinema = this.remainingWeeksShareCinema

      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.slide {
  max-height: 10px
}

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
  width: 550px;
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

input[type='range'] {
  background-color: var(--fsm-dark-blue-2);
}

.cinemaNegotiationDurationContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  font-size: 15px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}

.cinemaNegotiationDurationSlider {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.cinemaNegotiationHeader {
  color: var(--fsm-pink-1);
  font-weight: var(--fsm-fw-bold);
  font-size: 28px;
  margin-bottom: 0.25em;
  margin-top: 5px;
}

.cinemaNegotiationPercentageContainer {
  display: flex;
  flex-direction: row;
  gap: 15px;
  padding: 10px;
  font-size: 15px;
  margin-top: 5px;
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
}

.cinemaNegotiationPercentageElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 10px;
  width: 50%;
}

.cinemaNegotiationPercentageHeader {
  text-align: center;
  font-size: 18px;
  font-weight: var(--fsm-fw-bold);
}

.cinemaNegotiationPercentageInnerBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
}

.cinemaNegotiationButtonBox {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  gap: 15px;
}
</style>