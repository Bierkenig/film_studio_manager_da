<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <h3>{{ $t('postproductionEvents.' + type + '.problem') }}</h3>
              <div>{{$t('postproductionEvents.optionA')}}</div>
              <div>{{ $t('postproductionEvents.' + type + '.optionA') }}</div>
              <ul>
                <li>{{ $t('postproductionEvents.' + type + '.consequenceA1') }}</li>
                <li v-if="type === 'deadline' || type === 'reshooting'">
                  {{ $t('postproductionEvents.' + type + '.consequenceA2') }}
                </li>
                <li v-if="type === 'deadline'">
                  {{ $t('postproductionEvents.' + type + '.consequenceA3') }}
                </li>
              </ul>
              <div>{{$t('postproductionEvents.optionB')}}</div>
              <div>{{ $t('postproductionEvents.' + type + '.optionB') }}</div>
              <ul>
                <li>{{ $t('postproductionEvents.' + type + '.consequenceB1') }}</li>
              </ul>

              <button class="modal-default-button" @click="bOption(); bool = true">{{ $t('postproductionEvents.optionB') }}</button>
              <button class="modal-default-button" @click="aOption(); bool = true">{{ $t('postproductionEvents.optionA') }}</button>

              <div v-if="weeks">
                <div>{{$t('productionEvents.specify')}}</div>
                <input type="range" min="0" max="10" step="1" v-model="durWeeks">
                <div>{{durWeeks}}</div>
              </div>

              <button v-if="weeks" class="modal-default-button" @click="check()">{{$t('productionEvents.check')}}</button>

              <div v-if="date">
                <div>{{$t('productionEvents.date')}}</div>
                <input type="date" v-model="releaseDate">
              </div>

              <button v-if="weeks || date || bool" class="modal-default-button" @click="closeWindow()">{{$t('productionEvents.close')}}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "post-prod-modal",

  data() {
    return {
      weeks: false,
      date: false,
      bool: false,
      durWeeks: 0,
      releaseDate: null,
      dirRating: this.$store.state.currentMovie._preProduction.hiredDirector.rating,
      type: this.$store.state.currentPostProdEventType,
      wholeBudget: this.$store.getters.getCurrentMovie._preProduction.getWholeBudget()
    }
  },

  methods: {
    aOption() {
      switch (this.type) {
        case "sound":
          this.$store.state.currentMovie._preProduction.budget.sound *= 1.2
          this.$emit('close')
          break
        case "postProductionProblem":
          this.$store.state.currentMovie._preProduction.hype *= 0.85
          this.calcDireMorale(true)
          this.$router.push({name: "actorSection"})
          break
        case "visualEffects":
          this.$store.state.currentMovie._preProduction.budget.vfx *= 1.2
          this.$emit('close')
          break
        case "visualQuality":
          this.$store.state.currentMovie._preProduction.budget.editing *= 1.2
          this.$emit('close')
          break
        case "reshooting":
          //TODO nicht fertig
          //this.wholeBudget = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * 1.1
          this.calcDireMorale(true)
          this.crewMoraleGoes(1)
          this.$emit('close')
          break
      }
    },

    bOption() {
      switch (this.type) {
        case "sound":
          this.$store.state.currentMovie._production.haltedStartDate = this.$store.state.currentDate
          this.$store.state.currentMovie._production.haltedDuration += 4
          this.$store.state.currentMovie._production.calcHaltedEndDate()
          break
        case "postProductionProblem":
          this.calcDireMorale(false)
          break
        case "visualEffects":
          this.calcDireMorale(false)
          break
        case "visualQuality":
          this.calcDireMorale(false)
          break
        case "reshooting":
          this.calcDireMorale(false)
          break
      }
    },

    calcDireMorale(trueFalse) {
      if (this.dirRating > 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 3
      } else if (this.dirRating > 50 && this.dirRating <= 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 2
      } else if (this.dirRating <= 50) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 1
      }
    },

    check() {
      //TODO releaseDate
      this.$store.state.currentMovie._preProduction.productionLength += this.durWeeks
      if (this.type === 'duration') {
        if(this.$store.state.currentMovie._preProduction.startDate.getDate() + 7 * this.$store.state.currentMovie._preProduction.productionLength === this.$store.state.currentMovie._preProduction.releaseDate) {
          this.releaseDate = this.$store.state.currentMovie._preProduction.startDate.getDate() + 7 * this.$store.state.currentMovie._preProduction.productionLength
          this.date = true
        } else {
          this.$emit('close')
        }
      }
    },

    crewMoraleGoes(up) {
      this.$store.state.currentMovie._preProduction.screenplay.actors.main.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.currentMovie._preProduction.screenplay.actors.minor.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.currentMovie._preProduction.screenplay.actors.support.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.currentMovie._preProduction.screenplay.actors.cameo.forEach((el) => {
        el.actorMorale += up
      })
    },

    closeWindow() {
      if(this.type === 'duration') {
        this.$store.state.currentMovie._preProduction.releaseDate = this.releaseDate
      }
      this.$emit('close')
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