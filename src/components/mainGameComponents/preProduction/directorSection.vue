<template>
  <div>
    <div>{{$t('hireDirectorSection.hire')}}</div>
    <div v-for="(el, index) in allDirectors" :key="index">
      <avatar-element :svg-code="el._avatar"/>
      {{el._first_name}} | {{el._last_name}} | {{el._age}} | {{el._gender}} | {{el._nationality}} | {{el._ethnicity}} | {{el._craft}} | {{el._rating}} | {{el._salary}}
      <button @click="calcSalary(el)" :disabled="disabled">{{$t('hireDirectorSection.negotiate')}}</button>
    </div>

    <div v-if="showNegotiation">
      <div>
        <div>{{$t('hireDirectorSection.salary')}} {{this.currentDirector._first_name}} {{this.currentDirector._last_name}}</div>
        <input type="range" v-model="selectedSalary" :min="salaryRange.min" :max="salaryRange.max" :step="salaryRange.step">
        <div>{{selectedSalary}}</div>
      </div>

      <button v-if="decision !== true" @click="calcDirectorsDecision(); decision2 = true">{{$t('hireDirectorSection.offer')}}</button>

      <div v-if="decision2">{{decision ? this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + $t('hireDirectorSection.accepted') : this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + $t('hireDirectorSection.rejected')}}</div>

      <div v-if="decision === false && this.currentDirector._no !== 3 && decision2">{{$t('hireDirectorSection.think')}}</div>

      <div v-if="this.currentDirector._no === 3">{{this.currentDirector._first_name}} {{this.currentDirector._last_name}}{{$t('hireDirectorSection.declined')}}</div>

      <button @click="goToDuration()" :disabled="!decision">{{$t('buyScreenplaySection.continue')}}</button>
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
      allDirectors: this.$store.getters.getAllDirectors,
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
    }
  },

  methods: {
    calcSalary(director) {
      this.currentDirector = director;
      this.showNegotiation = true;
      this.salaryLevel = Math.round((this.currentDirector._talent * 35 + this.currentDirector._experience * 25 + this.currentDirector._popularity * 40) / 100)
      this.salaryRange.min = this.$store.state.allDirectorSalary[this.salaryLevel - 1 - 2]
      this.perfectSalary = this.$store.state.allDirectorSalary[this.salaryLevel - 1]
      console.log(this.perfectSalary)
      this.perfectSalary1 = this.$store.state.allDirectorSalary[this.salaryLevel - 1 - 1]
      console.log(this.perfectSalary1)
      console.log(this.salaryRange.min)
      this.salaryRange.max = this.$store.state.allDirectorSalary[this.salaryLevel - 1 + 2]
      this.disabled = true
      this.selectedSalary = this.salaryRange.min
    },

    calcDirectorsDecision() {
      let salValue = (Object.values(this.calcSalValue(this.selectedSalary))[0]);
      console.log(this.salaryLevel)
      if (salValue === this.perfectSalary) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random())
          if (random === 0) this.decision = true
          else if (random === 1) {
            this.decision = false
            this.currentDirector._no += 1
          }
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) this.decision = true
          else if (random === 3) {
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
          const random = Math.round(Math.random())
          if (random === 0) this.decision = true
          else if (random === 1) {
            this.decision = false
            this.currentDirector._no += 1
          }
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 3)
          if (random === 0 || random === 1 || random === 2) this.decision = true
          else if (random === 3) {
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
          else if (random === 3) this.decision = true
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random())
          console.log(random)
          if (random === 0) this.decision = true
          else if (random === 1) {
            this.decision = false
            this.currentDirector._no += 1
          }
        }
      } else if (salValue > this.perfectSalary) {
        this.decision = true
      }

      console.log(this.currentDirector._no)
      if (this.currentDirector._no === 3) {
        const index = this.allDirectors.indexOf(this.currentDirector)
        console.log("index: " + index)
        this.allDirectors.splice(index, 1)
        this.disabled = false
        this.currentDirector = null
        this.salaryRange.min = 0
        this.salaryRange.max = 0
        this.selectedSalary = 0
      }
    },

    calcSalValue(salValue) {
      return this.$store.state.allDirectorSalary.sort((a, b) => {
        a = Math.abs(a - salValue);
        b = Math.abs(b - salValue);

        return a < b ? -1 : (a > b ? 1 : 0);
      });
    },

    goToDuration() {
      this.$store.state.currentMovie._preProduction.hiredDirector = this.currentDirector
      this.$store.state.currentMovie._preProduction.budget.directorSalary = this.selectedSalary
      this.$router.push({name: 'durationSection'})
    }
  },
}
</script>

<style scoped>

</style>