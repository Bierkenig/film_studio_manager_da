<template>
  <div>
    <div>{{$t('hireDirectorSection.hire')}}</div>
    <div v-for="(el, index) in allDirectors" :key="index">
      <avatar-element :svg-code="el._avatar"/>
      {{el._first_name}} | {{el._last_name}} | {{el._age}} | {{el._gender}} | {{el._nationality}} | {{el._ethnicity}} | {{el._craft}} | {{el._rating}} | {{el._salary}}
      <button @click="calcSalary(el)">{{$t('hireDirectorSection.negotiate')}}</button>
    </div>

    <div v-if="showNegotiation">
      <div>
        <div>{{$t('hireDirectorSection.salary')}} {{this.currentDirector._first_name}} {{this.currentDirector._last_name}}</div>
        <input type="range" v-model="selectedSalary" :min="salaryRange.min" :max="salaryRange.max" :step="salaryRange.step">
        <div>{{selectedSalary}}</div>
      </div>

      <button v-if="decision !== true" @click="calcDirectorsDecision(); decision2 = true">{{$t('hireDirectorSection.offer')}}</button>

      <div v-if="decision2">{{decision ? this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + "Yes" : this.currentDirector._first_name + " " + this.currentDirector._last_name + $t('hireDirectorSection.decision') + "No"}}</div>

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
    }
  },

  mounted() {
    this.selectedSalary = this.salaryRange.min
  },

  methods: {
    calcSalary(director) {
      this.currentDirector = director;
      this.showNegotiation = true;
      this.directorsControl = (this.currentDirector._popularity + this.currentDirector._experience + this.currentDirector._rating) / 3
      this.salaryRange.min = this.$store.state.allDirectorSalary[director._rating - 1 - 3]
      this.salaryRange.max = this.$store.state.allDirectorSalary[director._rating - 1 + 3]
    },

    calcDirectorsDecision() {
      if (this.directorsControl <= 50) {
        this.decision = this.selectedSalary >= this.salaryRange.max * 0.3;
      } else if (this.directorsControl > 50 && this.directorsControl < 75) {
        this.decision = this.selectedSalary >= this.salaryRange.max * 0.625;
      } else if (this.directorsControl >= 75) {
        this.decision = this.selectedSalary >= this.salaryRange.max * 0.75;
      }

      if (this.currentDirector._no === 3) {
        const index = this.allDirectors.indexOf(this.currentDirector)
        this.allDirectors.splice(index, 1)
      }
    }
  },
}
</script>

<style scoped>

</style>