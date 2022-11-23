<template>
  <div>
    <div>{{$t('hireDirectorSection.hire')}}</div>
    <!-- TODO add avatar-->
    <div v-for="(el, index) in allDirectors" :key="index">
      {{el._first_name}} | {{el._last_name}} | {{el._age}} | {{el._gender}} | {{el._nationality}} | {{el._ethnicity}} | {{el._craft}} | {{el._rating}} | {{el._salary}}
      <button @click="calcSalary(el)">{{$t('hireDirectorSection.negotiate')}}</button>
    </div>

    <div v-if="showNegotiation">
      <div>
        <div>{{$t('hireDirectorSection.salary')}} {{this.currentDirector._first_name}} {{this.currentDirector._last_name}}</div>
        <input type="range" v-model="selectedSalary" :min="salaryRange.min" :max="salaryRange.max" :step="salaryRange.step">
      </div>

      <div>
        <div>{{$t('hireDirectorSection.control')}}</div>
        <input type="range" min="1" max="100" step="1" v-model="selectedControl">
      </div>

      <button v-if="decision !== true" @click="calcDirectorsDecision(); decision2 = true">{{$t('hireDirectorSection.offer')}}</button>

      <div v-if="decision2">{{decision ? this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + "Yes" : this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + "No"}}</div>

      <div v-if="decision === false && this.currentDirector._no !== 3 && decision2">{{$t('hireDirectorSection.think')}}</div>

      <div v-if="this.currentDirector._no === 3">{{this.currentDirector._first_name}} {{this.currentDirector._last_name}}{{$t('hireDirectorSection.declined')}}</div>

      <button :disabled="!decision" @click="this.$router.push({name: 'durationSection'})">{{$t('buyScreenplaySection.continue')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "directorSection",

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
      selectedControl: 0,
      decision: false,
      decision2: false,
    }
  },

  methods: {
    calcSalary(director) {
      this.currentDirector = director;
      this.showNegotiation = true;
      this.directorsControl = this.currentDirector._popularity + this.currentDirector._experience + this.currentDirector._rating / 3
      this.salaryRange.min = this.$store.state.allDirectorSalary[director._rating - 1 - 5]
      this.salaryRange.max = this.$store.state.allDirectorSalary[director._rating - 1 + 5]
    },

    calcDirectorsDecision() {
      const random = Math.round(Math.random() * 10)
      if (this.selectedControl <= 50 && this.directorsControl <= 50) {
        this.decision = true
      } else if (this.selectedControl <= 50 && this.directorsControl > 50 && this.directorsControl <= 75) {
        if (this.selectedSalary > this.salaryRange.max * 0.8) this.decision = true
        else this.decision = random > 7
        if (!this.decision) this.currentDirector._no++;
      } else if (this.selectedControl <= 50 && this.directorsControl > 75) {
        if (this.selectedSalary > this.salaryRange.max * 0.8) this.decision = true
        else this.decision = random > 9
        if (!this.decision) this.currentDirector._no++;
      } else if (this.selectedControl > 50 && this.selectedControl <= 75 && this.directorsControl > 75) {
        if (this.selectedSalary > this.salaryRange.max * 0.8) this.decision = true
        else this.decision = random > 7
        if (!this.decision) this.currentDirector._no++;
      } else {
        this.decision = true
      }
      if (this.currentDirector._no === 3) {
        const index = this.allDirectors.indexOf(this.currentDirector)
        this.allDirectors.splice(index, 1)
      }
      this.decision2 = false;
    }
  },
}
</script>

<style scoped>

</style>