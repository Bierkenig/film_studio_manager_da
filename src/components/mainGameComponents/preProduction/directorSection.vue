<template>
  <div>
    <div>{{$t('hireDirectorSection.hire')}}</div>
    <div v-for="(el, index) in allDirectors" :key="index">
      <avatar-element :svg-code="el._avatar"/>
      {{el._first_name}} | {{el._last_name}} | {{el._age}} | {{el._gender}} | {{el._nationality}} | {{el._ethnicity}} | {{el._talent}} | {{el._rating}} | {{el._salary}}
      <button @click="calcSalary(el)" :disabled="disabled">{{$t('hireDirectorSection.negotiate')}}</button>
    </div>

    <div v-if="showNegotiation">
      <div>
        <div>{{$t('hireDirectorSection.salary')}} {{this.currentDirector._first_name}} {{this.currentDirector._last_name}}</div>
        <input type="range" v-model="selectedSalary" :min="salaryRange.min" :max="salaryRange.max" :step="salaryRange.step">
        <div>$ {{roundBudget(selectedSalary)}}</div>
      </div>

      <button v-if="decision !== true" @click="calcDirectorsDecision(); decision2 = true">{{$t('hireDirectorSection.offer')}}</button>

      <div v-if="decision2">{{decision ? this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + $t('hireDirectorSection.accepted') : this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + $t('hireDirectorSection.rejected')}}</div>

      <div v-if="decision === false && this.currentDirector._no !== 3 && decision2">{{$t('hireDirectorSection.think')}}</div>

      <div v-if="this.currentDirector._no === 3">{{this.currentDirector._first_name}} {{this.currentDirector._last_name}}{{$t('hireDirectorSection.declined')}}</div>

      <button v-if="recast === null" @click="goToDuration()" :disabled="!decision">{{$t('buyScreenplaySection.continue')}}</button>
      <button v-if="recast !== null" @click="this.$router.push({name: 'home'})" :disabled="!decision">{{$t('buyScreenplaySection.continue')}}</button>
    </div>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
export default {
  name: "directorSection",
  components: {AvatarElement},
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
      recast: null
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
      this.$store.state.currentMovie._preProduction.hiredDirector = this.currentDirector
      this.$store.state.currentMovie._preProduction.budget.directorSalary = parseInt(this.selectedSalary)
      this.$store.state.currentMovie._preProduction.hiredDirector._workingOnProjects++
      this.$router.push({name: 'durationSection'})
    },

    gotToHome() {
      this.$store.state.currentMovie._preProduction.hiredDirector = this.currentDirector
      this.$store.state.currentMovie._preProduction.budget.directorSalary = parseInt(this.selectedSalary)
      this.$store.state.currentMovie._preProduction.hiredDirector._workingOnProjects++
      this.$router.push({name: 'home'})
    }
  },

  mounted() {
    this.allDirectors = this.$store.getters.getAllDirectors
    if (this.$store.getters.getCurrentCalendarEvent !== null) {
      this.allDirectors = this.allDirectors.filter(el => el.id !== this.$store.getters.getCurrentCalendarEvent.director.id)
    }
    this.allSalaries = this.$store.getters.getDirectorAndActorSalaries
  }
}
</script>

<style scoped>

</style>