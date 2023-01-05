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

      <button :disabled="!decision" @click="this.$store.state.currentMovie._preProduction.hiredDirector = this.currentDirector ;this.$router.push({name: 'durationSection'})">{{$t('buyScreenplaySection.continue')}}</button>
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
      directorsControl: null,
      salaryRange: {
        min: 0,
        max: 1,
        step: 1
      },
      selectedSalary: 0,
      decision: false,
      decision2: false,
      disabled: false,
      salaryLevel: 0
    }
  },

  mounted() {
    this.selectedSalary = this.salaryRange.min
  },

  methods: {
    calcSalary(director) {
      this.currentDirector = director;
      this.showNegotiation = true;
      this.salaryLevel = Math.round((this.currentDirector._craft * 35 + this.currentDirector._experience * 25 + this.currentDirector._popularity * 40) / 100)
      this.directorsControl = (this.currentDirector._popularity + this.currentDirector._experience + this.currentDirector._rating) / 3
      this.salaryRange.min = this.$store.state.allDirectorSalary[this.currentDirector._rating - 1 - 2]
      this.salaryRange.max = this.$store.state.allDirectorSalary[this.currentDirector._rating - 1 + 2]
      this.disabled = true
    },

    calcDirectorsDecision() {
      let salValue = (Object.values(this.calcSalValue(this.selectedSalary))[0]).toString();
      console.log(this.salaryLevel)
      console.log(salValue)
      console.log(this.currentDirector._salary)
      if (salValue === this.currentDirector._salary) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.decision = true
          else if (random === 1) this.decision = false; this.currentDirector._no++
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) this.decision = true
          else if (random === 3) this.decision = false; this.currentDirector._no++
        } else if (this.salaryLevel <= 50) {
          this.decision = true
        }
      } else if (this.$store.state.allDirectorSalary[this.index-1] === salValue || this.$store.state.allDirectorSalary[this.index+1] === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) {
            this.decision = false
            this.currentDirector._no++
          } else if (random === 3) this.decision = true
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.decision = true
          else if (random === 1) this.decision = false; this.currentDirector._no++
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) this.decision = true
          else if (random === 3) this.decision = false; this.currentDirector._no++
        }
      } else if (this.$store.state.allDirectorSalary[this.index-2] === salValue || this.$store.state.allDirectorSalary[this.index+2] === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 8)
          this.decision = random === 7;
          if (!this.decision) this.currentDirector._no++
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) {
            this.decision = false
            this.currentDirector._no++
          }
          else if (random === 3) this.decision = true
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.decision = true
          else if (random === 1) this.decision = false; this.currentDirector._no++
        }
      }

      if (this.currentDirector._no === 3) {
        const index = this.allDirectors.indexOf(this.currentDirector)
        this.allDirectors.splice(index, 1)
        this.disabled = false
      }
    },

    calcSalValue(salValue) {
      return this.$store.state.allDirectorSalary.sort((a, b) => {
        a = Math.abs(a - salValue);
        b = Math.abs(b - salValue);

        return a < b ? -1 : (a > b ? 1 : 0);
      });
    },
  },
}
</script>

<style scoped>

</style>