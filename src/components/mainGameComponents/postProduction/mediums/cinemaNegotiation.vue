<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <div>
                <div>
                  Specify release duration in weeks:
                  <input v-model="releaseWeeks" class="slide" type="range" :min="2" :max="54" :step="1">
                  {{ releaseWeeks }}
                </div>
                <div>
                  Studio Popularity: {{ popularity }}
                  <br>
                  Percentage Take:
                  <br>
                  Studio (Opening Week): {{Math.floor(openingWeekShareStudio*100)}}% Level: {{openingLevel}}/6
                  <br>
                  Studio (Remaining Weeks): {{Math.floor(remainingWeeksShareStudio * 100)}}% Level: {{remainingLevel}}/6
                  <br>
                  Cinema (Opening Week): {{Math.floor(openingWeekShareCinema*100)}}% Level: {{openingLevel}}/6
                  <br>
                  Cinema (Remaining Weeks): {{Math.floor(remainingWeeksShareCinema * 100)}}% Level: {{remainingLevel}}/6
                </div>
                <br>
                You can negotiate a better opening week ratio, but you have to give up ratio for the remaining weeks
                <br>
                <button @click="upgrade('opening')" :disabled="upgradedOpening">Upgrade Opening Week</button>
                <br>
                You can negotiate a better ratio for the remaining weeks, but you have to give up ratio for the opening week
                <br>
                <button @click="upgrade('remaining')" :disabled="upgradedRemaining">Upgrade Remaining Weeks</button>
                <br>
                <button v-show="upgradedRemaining || upgradedOpening" @click="resetUpgrades">Reset</button>
                <br>
                <button @click="finish">No Negotiation</button>
                <br>
                <button @click="finish">Continue</button>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cinemaNegotiation",

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
  width: 400px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
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
</style>