<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <h3>{{ $t('productionEvents.' + type + '.problem') }}</h3>
              <div>{{ $t('productionEvents.' + type + '.optionA') }}</div>
              <ul>
                <li>{{ $t('productionEvents.' + type + '.consequenceA1') }}</li>
                <li v-if="type === 'budgetForCostumes' || type === 'equipment' ||
                          type === 'budget' || type === 'breakdown' || type === 'duration' || type === 'directorLeaves' ||
                          type === 'changes' || type === 'injured'">
                  {{ $t('productionEvents.' + type + '.consequenceA2') }}
                </li>
                <li v-if="type === 'castMember' || type === 'budgetForCostumes' || type === 'equipment' ||
                          type === 'budget' || type === 'breakdown' ||
                          type === 'changes'">{{ $t('productionEvents.' + type + '.consequenceA3') }}
                </li>
              </ul>
              <div>{{ $t('productionEvents.' + type + '.optionB') }}</div>
              <ul>
                <li>{{ $t('productionEvents.' + type + '.consequenceB1') }}</li>
                <li v-if="type === 'budgetForCostumes' || type === 'equipment' ||
                          type === 'budget' || type === 'breakdown' || type === 'directorLeaves' ||
                          type === 'changes' || type === 'injured'">
                  {{ $t('productionEvents.' + type + '.consequenceB2') }}
                </li>
                <li v-if="type === 'directorLeaves'">{{ $t('productionEvents.' + type + '.consequenceB3') }}</li>
              </ul>

              <button class="modal-default-button" @click="aOption()">{{ $t('productionEvents.optionA') }}</button>
              <button class="modal-default-button" @click="bOption()">{{ $t('productionEvents.optionB') }}</button>

              <actors-section v-if="recast"></actors-section>

              <div v-if="weeks">
                <div>{{$t('productionEvents.specify')}}</div>
                <input type="range" min="0" max="10" step="1" v-model="durWeeks">
                <div>{{durWeeks}}</div>
              </div>

              <button v-if="weeks" class="modal-default-button" @click="check()">{{$t('preProduction.check')}}</button>

              <div v-if="date">
                <div>{{$t('productionEvents.date')}}</div>
                <input type="date" v-model="releaseDate">
              </div>

              <button v-if="weeks || recast || date" class="modal-default-button" @click="closeWindow()">{{$t('preProduction.close')}}</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActorsSection from "@/components/mainGameComponents/preProduction/actorsSection";

export default {
  name: "prod-event-modal",
  components: {ActorsSection},
  props: {
    type: String
  },

  data() {
    return {
      recast: false,
      weeks: false,
      date: false,
      durWeeks: 0,
      releaseDate: null,
      dirRating: this.$store.state.preProduction.hiredDirector.rating,
    }
  },

  methods: {
    aOption() {
      switch (this.type) {
        case "weather":
          this.$store.state.preProduction.budget.set *= 1.1
            this.$emit('close')
          break
        case "castMember":
          this.$store.state.preProduction.movie.hype *= 0.85
          this.recast = true
          //TODO directors morale
          this.$store.state.preProduction.hiredDirector.morale += 1
          break
        case "budgetForCostumes":
          this.$store.state.preProduction.budget.costume *= 1.1
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.crewMoraleGoesUp(1)
          this.$emit('close')
          break
        case "equipment":
          this.$store.state.preProduction.budget.cinematography *= 1.1
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.crewMoraleGoesUp(1)
          this.$emit('close')
          break
        case "budget":
          this.$store.state.preProduction.budget.production *= 1.1
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.crewMoraleGoesUp(1)
          this.$emit('close')
          break
        case "breakdown":
          this.$store.state.preProduction.budget.set *= 1.1
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.crewMoraleGoesUp(1)
          this.$emit('close')
          break
        case "duration":
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.weeks = true
          this.crewMoraleGoesUp(1)
          break
        case "directorLeaves":
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.$store.state.preProduction.hiredDirector.salary *= 1.25
          this.$emit('close')
          break
        case "changes":
          this.$store.state.preProduction.hiredDirector.morale += 1
          this.crewMoraleGoesUp(1)
          this.$store.state.preProduction.budget.problemBudget += this.$store.state.preProduction.getWholeBudget() * 0.1
          this.$emit('close')
          break
        case "injured":
          this.$store.state.preProduction.movie.hype *= 0.85
          this.recast = true
          this.$emit('close')
          break
      }
    },

    bOption() {
      switch (this.type) {
        case "weather":

          break
        case "castMember":

          break
        case "budgetForCostumes":

          break
        case "equipment":

          break
        case "budget":

          break
        case "breakdown":

          break
        case "duration":

          break
        case "directorLeaves":

          break
        case "changes":

          break
        case "injured":

          break
      }
    },

    check() {
      //TODO releaseDate
      this.$store.state.preProduction.productionLength += this.durWeeks
      if (this.type === 'duration') {
        if(this.$store.state.preProduction.startDate.getDate() + 7 * this.$store.state.preProduction.productionLength === this.$store.state.preProduction.releaseDate) {
          this.releaseDate = this.$store.state.preProduction.startDate.getDate() + 7 * this.$store.state.preProduction.productionLength
          this.date = true
        } else {
          this.$emit('close')
        }
      }
    },



    crewMoraleGoesUp(up) {
      this.$store.state.preProduction.screenplay.actors.main.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.preProduction.screenplay.actors.minor.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.preProduction.screenplay.actors.support.forEach((el) => {
        el.actorMorale += up
      })
      this.$store.state.preProduction.screenplay.actors.cameo.forEach((el) => {
        el.actorMorale += up
      })
    },

    closeWindow() {
      if(this.type === 'duration') {
        this.$store.state.preProduction.releaseDate = this.releaseDate
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