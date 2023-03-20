<template>
  <div id="actorsSectionMainDiv">
    <div class="actorsSectionColumn" id="actorSectionLeft">
      <actor-list :actors="allActors" @send-person="recieveActor"/>
    </div>
    <div class="actorSectionColumn" id="actorSectionRight">
      <actor-details :person="currentActor"/>
      <background-tile v-if="negotiate && (spots.main !== 0 || spots.minor !== 0 || spots.support !== 0 || spots.cameo !== 0)"
                       :title="$t('actorSection.salary')" id="actorSectionNegotiation">
        <div id="actorSectionNegotiationOffer">
          <div>$ {{ roundBudget(proposedSalary) }}</div>
          <div>
            <input type="range" :min="this.salary.min" :max="this.salary.max" step="1" v-model="proposedSalary">
          </div>
        </div>
        <div id="actorsSectionRoleTypes">
          <input type="radio" class="actorsSectionRoleTypeRadio" id="main" :value="$t('main')" v-model="radio"
                 :disabled="!spots.main >= 1">
          <label class="actorsSectionRoleTypeLabel" for="main">{{ $t('main') }} ({{ spots.main }})</label>
          <input type="radio" class="actorsSectionRoleTypeRadio" id="minor" value="Minor" v-model="radio"
                 :disabled="!spots.minor >= 1">
          <label class="actorsSectionRoleTypeLabel" for="minor">Minor ({{ spots.minor }})</label>
          <input type="radio" class="actorsSectionRoleTypeRadio" id="support" :value="$t('support')" v-model="radio"
                 :disabled="!spots.support >= 1">
          <label class="actorsSectionRoleTypeLabel" for="support">{{ $t('support') }} ({{ spots.support }})</label>
          <input type="radio" class="actorsSectionRoleTypeRadio" id="cameo" value="Cameo" v-model="radio"
                 :disabled="!spots.cameo >= 1">
          <label class="actorsSectionRoleTypeLabel" for="cameo">Cameo ({{ spots.cameo }})</label>
        </div>
        <custom-button @clicked="sendOffer(); sendOfferBool = true" :disabled="radio === null || actorDecision === true">{{ $t('actorSection.offer') }}</custom-button>
        <info-line v-if="sendOfferBool">
          {{ currentActor._first_name }}
          {{ currentActor._last_name }}{{ $t('actorSection.decision') }}
          {{ actorDecision ? $t('actorSection.yes') : $t('actorSection.no') }}
        </info-line>
        <custom-button v-if="sendOfferBool" @click="saveActors()" :disabled="!actorDecision || radio === null">
          {{ $t('actorSection.add') }}
        </custom-button>
        <info-line v-if="cant">{{ $t('actorSection.cant') }}</info-line>
      </background-tile>
      <custom-button v-if="this.$store.getters.getCurrentCalendarEvent === null || this.$router.options.history.state.back === '/budgetSection'" @clicked="finishPreProd()" :disabled="finish">
        {{ $t('actorSection.continue') }}
      </custom-button>
      <custom-button v-if="this.$store.getters.getCurrentCalendarEvent !== null && this.$router.options.history.state.back !== '/budgetSection'" @clicked="gotToHome()" :disabled="finish">
        {{ $t('recastActor') }}
      </custom-button>
    </div>
  </div>
</template>

<script>
import store from "@/services/store";
import ActorList from "@/components/mainGameComponents/preProduction/ActorList.vue";
import ActorDetails from "@/components/mainGameComponents/preProduction/ActorDetails.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import InfoLine from "@/components/kitchenSink/InfoLine.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "actorsSection",
  components: {InfoLine, CustomButton, BackgroundTile, ActorDetails, ActorList},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      allActors: [],
      currentActor: null,
      salaryLevel: 0,
      negotiate: false,
      salary: {
        min: 0,
        max: 0,
      },
      proposedSalary: 0,
      sendOfferBool: false,
      actorDecision: false,
      allSalaries: [],
      radio: null,
      disabled: false,
      perfectSalary: 0,
      perfectSalary1: 0,
      spots: null,
      cant: false,
      finish: true,
    }
  },

  methods: {
    negotiateContract(actor) {
      this.currentActor._no = 0
      this.currentActor = actor
      this.salaryLevel = Math.round((this.currentActor._talent * 35 + this.currentActor._experience * 25 + this.currentActor._popularity * 40) / 100)

      //calc min & max
      this.salary.min = this.allSalaries[(this.salaryLevel - 3)]
      this.perfectSalary = this.allSalaries[(this.salaryLevel - 1)]
      this.perfectSalary1 = this.allSalaries[(this.salaryLevel - 2)]
      this.salary.max = this.allSalaries[(this.salaryLevel + 1)]

      //set negotiate true
      this.sendOfferBool = false
      this.negotiate = true
      this.proposedSalary = this.salary.min
    },

    roundBudget(labelValue) {
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

    sendOffer() {
      let salValue = (Object.values(this.calcSalValue(this.proposedSalary))[0]);
      if (salValue === this.perfectSalary) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 3)
          if (random === 0) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          this.actorDecision = true
        }
      } else if (this.perfectSalary1 === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) {
            this.actorDecision = false
            this.currentActor._no += 1
          } else this.actorDecision = true
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        }
      } else if (this.salary.min === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 8)
          this.actorDecision = random === 7;
          if (!this.actorDecision) this.currentActor._no += 1
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) {
            this.actorDecision = false
            this.currentActor._no += 1
          } else this.actorDecision = true
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random())
          if (random === 0) this.actorDecision = true
          else {
            this.actorDecision = false
            this.currentActor._no += 1
          }
        }
      } else if (salValue > this.perfectSalary) {
        this.actorDecision = true
      }

      if (this.currentActor._no === 3) {
        const index = this.allActors.indexOf(this.currentActor)
        this.allActors.splice(index, 1)
        this.disabled = false
        this.currentActor._no = 0
        this.currentActor = this.allActors[0]
      }
    },

    calcSalValue(salValue) {
      return [...this.allSalaries].sort((a, b) => {
        a = Math.abs(a - salValue);
        b = Math.abs(b - salValue);

        return a < b ? -1 : (a > b ? 1 : 0);
      });
    },

    saveActors() {
      if (this.actorDecision && this.radio !== null) {
        if (this.currentActor._workingOnProjects < 3) {
          this.currentActor._workingOnProjects++
        } else {
          this.cant = true
          this.sendOfferBool = true
          return
        }
        switch (this.radio) {
          case "Main":
            this.currentActor.salary += parseInt(this.proposedSalary)
            this.$store.state.currentMovie._preProduction.screenplay.actors.main.push(this.currentActor)
            this.removeActor()
            break
          case "Hauptdarsteller":
            this.currentActor.salary += parseInt(this.proposedSalary)
            this.$store.state.currentMovie._preProduction.screenplay.actors.main.push(this.currentActor)
            this.removeActor()
            break
          case "Minor":
            this.currentActor.salary += parseInt(this.proposedSalary)
            this.$store.state.currentMovie._preProduction.screenplay.actors.minor.push(this.currentActor)
            this.removeActor()
            break
          case "Support":
            this.currentActor.salary += parseInt(this.proposedSalary)
            this.$store.state.currentMovie._preProduction.screenplay.actors.support.push(this.currentActor)
            this.removeActor()
            break
          case "Nebendarsteller":
            this.currentActor.salary += parseInt(this.proposedSalary)
            this.$store.state.currentMovie._preProduction.screenplay.actors.support.push(this.currentActor)
            this.removeActor()
            break
          case "Cameo":
            this.currentActor.salary += parseInt(this.proposedSalary)
            this.$store.state.currentMovie._preProduction.screenplay.actors.cameo.push(this.currentActor)
            this.removeActor()
            break
        }

        this.spots = this.$store.getters.getCurrentMovie._preProduction.screenplay.getSpots()
        if (this.spots.main === 0 && this.spots.minor === 0
            && this.spots.cameo === 0 && this.spots.support === 0) {
          this.finish = false
          this.disabled = true
        } else {
          this.disabled = false
        }
        this.$store.state.currentMovie._preProduction.budget.actorSalary += parseInt(this.proposedSalary)
        this.negotiate = false
        this.currentActor._no = 0
        this.currentActor = null
        this.salary.min = 0
        this.salary.max = 0
        this.radio = null
        this.proposedSalary = 0
        this.actorDecision = false
      }
      this.radio = null;
      this.actorDecision = false;
    },

    removeActor() {
      this.allActors = this.allActors.filter((el) =>
          el.id !== this.currentActor.id
      )
    },

    finishPreProd() {
      if (!this.finish) {
        this.$store.getters.getCurrentMovie._preProduction.startDate = this.$store.getters.getCurrentDate
        let endDate = new Date(store.getters.getCurrentDate.getFullYear(), store.getters.getCurrentDate.getMonth(),
            store.getters.getCurrentDate.getDate() + (this.$store.getters.getCurrentMovie._preProduction.preProductionLength * 7) + 1)
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
          type: 'preProductionFinished',
          completed: false,
        })
        this.$store.commit('addInProductionMovie', this.$store.getters.getCurrentMovie);

        this.$store.getters.getCurrentMovie._preProduction.hype = this.$store.getters.getCurrentMovie._preProduction.createTotal();

        this.$router.push({name: "movies"})
      }
    },

    gotToHome() {
      if (!this.finish) {
        this.$router.push({name: "home"})
      }
    },

    recieveActor(actor) {
      this.radio = null;
      this.currentActor = actor;
      this.negotiate = true;
      this.negotiateContract(actor);
    },
  },

  mounted() {
    this.allActors = this.$store.getters.getAllActors
    let ids = []
    if (this.$store.getters.getCurrentCalendarEvent !== null) {
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.main.forEach(el => {
        ids.push(el.id)
      })
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.minor.forEach(el => {
        ids.push(el.id)
      })
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.support.forEach(el => {
        ids.push(el.id)
      })
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.cameo.forEach(el => {
        ids.push(el.id)
      })
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.main = this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.main.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.actor.id)
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.minor = this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.minor.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.actor.id)
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.support = this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.support.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.actor.id)
      this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.cameo = this.$store.getters.getCurrentMovie._preProduction.screenplay.actors.cameo.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.actor.id)
      if(this.$router.options.history.state.back !== '/budgetSection'){
        this.$store.getters.getCurrentCalendarEvent.actor._workingOnProjects--
      }
      this.$store.getters.getCurrentMovie._preProduction.budget.actorSalary -= this.$store.getters.getCurrentCalendarEvent.actor.salary
      this.allActors = this.allActors.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.actor.id)
      this.allActors = this.allActors.filter(el => !ids.includes(el.id))
    }
    this.allSalaries = this.$store.getters.getDirectorAndActorSalaries
    this.spots = this.$store.getters.getCurrentMovie._preProduction.screenplay.getSpots()

    if (this.spots.main === 0 && this.spots.minor === 0
        && this.spots.cameo === 0 && this.spots.support === 0) {
      this.finish = false
      this.disabled = true
    }
  }
}
</script>

<style scoped>
#actorsSectionMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}

#actorSectionRight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

#actorSectionNegotiation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

#actorSectionNegotiationOffer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#actorsSectionRoleTypes {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: var(--fsm-max-border-radius);
  background-color: var(--fsm-dark-blue-4);
}

.actorsSectionRoleTypeRadio {
  display: none;
}

.actorsSectionRoleTypeLabel {
  flex-grow: 1;
  font-size: 15px;
  font-weight: var(--fsm-fw-medium);
  text-align: center;
  padding: 0.25em;
  color: var(--fsm-white);
  border-radius: var(--fsm-max-border-radius);
  transition: background-color 0.5s, color 0.5s;
}

.actorsSectionRoleTypeRadio:checked + .actorsSectionRoleTypeLabel {
  background-color: var(--fsm-pink-1);
  background-image: v-bind('selectedGradientBG');
  color: var(--fsm-dark-blue-2);
}
</style>