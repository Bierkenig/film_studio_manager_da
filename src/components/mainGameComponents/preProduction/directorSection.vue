<template>
  <div id="directorSectionMainDiv">
    <div class="directorSectionColumn" id="directorSectionLeft">
      <director-list :directors="allDirectors" @send-person="recieveDirector"/>
    </div>
    <div class="directorSectionColumn" id="directorSectionRight">
      <director-details :person="currentDirector"/>
      <background-tile v-if="showNegotiation" :title="$t('hireDirectorSection.offerHeading')" id="directorSectionNegotiation">
        <info-line v-if="decision2">
          {{decision ? this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + $t('hireDirectorSection.accepted') : this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + $t('hireDirectorSection.rejected') }}
        </info-line>
        <info-line v-if="decision === false && this.currentDirector._no !== 3 && decision2">
          {{ $t('hireDirectorSection.think') }}
        </info-line>
        <div v-if="!decision" id="directorSectionNegotiationOffer">
          <div>$ {{ roundBudget(selectedSalary) }}</div>
          <div>
            <input type="range" v-model="selectedSalary" :min="salaryRange.min" :max="salaryRange.max"
                   :step="salaryRange.step">
          </div>
        </div>
        <custom-button :disabled="decision" @click="calcDirectorsDecision(); decision2 = true">
          {{ $t('hireDirectorSection.offer') }}
        </custom-button>
      </background-tile>
      <info-line v-if="directorDeclined">
        {{ $t('hireDirectorSection.declined') }}
      </info-line>
      <custom-button v-if="this.$store.getters.getCurrentCalendarEvent === null || this.$router.options.history.state.back === '/screenplaySection' || this.$router.options.history.state.back === '/screenplayInformation'" :disabled="!decision" @click="goToDuration()">
        {{ $t('buyScreenplaySection.continue') }}
      </custom-button>
      <custom-button v-if="this.$store.getters.getCurrentCalendarEvent !== null && this.$router.options.history.state.back !== '/screenplaySection' && this.$router.options.history.state.back !== '/screenplayInformation'" :disabled="!decision" @click="gotToHome()">
        {{ $t('buyScreenplaySection.continue') }}
      </custom-button>
    </div>
  </div>
</template>

<script>
import DirectorList from "@/components/mainGameComponents/preProduction/DirectorList.vue";
import DirectorDetails from "@/components/mainGameComponents/preProduction/DirectorDetails.vue";
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";
import InfoLine from "@/components/kitchenSink/InfoLine.vue";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "directorSection",
  components: {InfoLine, CustomButton, BackgroundTile, DirectorDetails, DirectorList},
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data() {
    return {
      allDirectors: null,
      showNegotiation: false,
      currentDirector: null,
      salaryRange: {
        min: 0,
        max: 1,
        step: 1
      },
      selectedSalary: 0,
      decision: false,
      decision2: false,
      disabled: false,
      salaryLevel: 0,
      perfectSalary: 0,
      perfectSalary1: 0,
      allSalaries: [],
      recast: null,
      directorDeclined: false,
    }
  },

  methods: {
    calcSalary(director) {
      this.currentDirector = director;
      this.showNegotiation = true;
      this.salaryLevel = Math.round((this.currentDirector._talent * 35 + this.currentDirector._experience * 25 + this.currentDirector._popularity * 40) / 100)
      this.salaryRange.min = this.allSalaries[this.salaryLevel - 1 - 2]
      this.perfectSalary = this.allSalaries[this.salaryLevel - 1]

      this.perfectSalary1 = this.allSalaries[this.salaryLevel - 1 - 1]

      this.salaryRange.max = this.allSalaries[this.salaryLevel - 1 + 2]
      this.disabled = true
      this.selectedSalary = this.salaryRange.min
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

    calcDirectorsDecision() {
      let salValue = (Object.values(this.calcSalValue(this.selectedSalary))[0]);
      if (salValue === this.perfectSalary) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 3)
          if (random === 0) this.decision = true
          else {
            this.decision = false
            this.currentDirector._no += 1
          }
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1) this.decision = true
          else {
            this.decision = false
            this.currentDirector._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          this.decision = true
        }
      } else if (this.perfectSalary1 === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) {
            this.decision = false
            this.currentDirector._no += 1
          } else if (random === 3) this.decision = true
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.decision = true
          else {
            this.decision = false
            this.currentDirector._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1) this.decision = true
          else {
            this.decision = false
            this.currentDirector._no += 1
          }
        }
      } else if (this.salaryRange.min === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 7)
          this.decision = random === 7;
          if (!this.decision) this.currentDirector._no += 1
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) {
            this.decision = false
            this.currentDirector._no += 1
          }
          else this.decision = true
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random())
          if (random === 0) this.decision = true
          else {
            this.decision = false
            this.currentDirector._no += 1
          }
        }
      } else if (salValue > this.perfectSalary) {
        this.decision = true
      }

      if (this.currentDirector._no === 3) {
        const index = this.allDirectors.indexOf(this.currentDirector)
        this.allDirectors.splice(index, 1)
        this.disabled = false
        this.currentDirector = null
        this.salaryRange.min = 0
        this.salaryRange.max = 0
        this.selectedSalary = 0
        this.showNegotiation = false;
        this.directorDeclined = true;
      }
    },

    calcSalValue(salValue) {
      return [...this.allSalaries].sort((a, b) => {
        a = Math.abs(a - salValue);
        b = Math.abs(b - salValue);

        return a < b ? -1 : (a > b ? 1 : 0);
      });
    },

    goToDuration() {
      if (this.decision) {
        this.$store.state.currentMovie._preProduction.hiredDirector = this.currentDirector
        this.$store.state.currentMovie._preProduction.budget.directorSalary = parseInt(this.selectedSalary)
        this.$store.state.currentMovie._preProduction.hiredDirector._workingOnProjects++
        this.$router.push({name: 'durationSection'})
      }
    },

    gotToHome() {
      this.$store.state.currentMovie._preProduction.hiredDirector = this.currentDirector
      this.$store.state.currentMovie._preProduction.budget.directorSalary = parseInt(this.selectedSalary)
      this.$store.state.currentMovie._preProduction.hiredDirector._workingOnProjects++
      this.$router.push({name: 'home'})
    },

    recieveDirector(director) {
      if (!this.decision) {
        this.decision2 = false;
        this.directorDeclined = false;
        this.calcSalary(director);
        this.selectedSalary = this.salaryRange.min
        this.currentDirector = director;
      }
    },
  },

  mounted() {
    this.allDirectors = this.$store.getters.getAllDirectors
    if (this.$store.getters.getCurrentCalendarEvent !== null &&
        (this.$router.options.history.state.back !== '/screenplaySection' && this.$router.options.history.state.back !== '/screenplayInformation')) {
      this.allDirectors = this.allDirectors.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.director.id)
      this.$store.getters.getCurrentCalendarEvent.director._workingOnProjects--;
    }
    this.allSalaries = this.$store.getters.getDirectorAndActorSalaries
  }
}
</script>

<style scoped>
#directorSectionMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 100vh;
}

#directorSectionRight {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

#directorSectionNegotiation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

#directorSectionNegotiationOffer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>