<template>
  <div>
    <div>
      <div>{{$t('hireDirectorSection.hire')}}</div>
      <div v-for="(el, index) in directors" :key="index">
        {{el._first_name}} / {{el._last_name}} / {{el.age}} / {{el.rating}} / {{el.salary}}
        <button @click="showNegotiation(el)">{{$t('hireDirectorSection.negotiate')}}</button>
      </div>
    </div>
    <div v-if="show">
      <div>{{$t('hireDirectorSection.salary')}}</div>
      <input type="range" :min="this.salaryRange.min" :max="this.salaryRange.max" :step="this.salaryRange.step" v-model="salary">
      <div>{{salary}}</div>
      <input type="range" min="0" max="100" step="25" v-model="this.directorControlFromUser">
      <div>{{directorControlFromUser}}</div>
      <button @click="checkDirector(); show2 = true" :disabled="directorDecision === true">{{$t('hireDirectorSection.offer')}}</button>
    </div>
    <div v-if="show2">{{currentDir._first_name}} {{currentDir._last_name}}{{$t('hireDirectorSection.decision')}}: {{directorDecision ? "yes" : "no"}}</div>
    <div v-if="this.directorDecision === false && show2">{{$t('hireDirectorSection.think')}}</div>
    <!-- TODO Continue button -->
    <button v-if="directorDecision === true" @click="this.$router.push({})">{{$t('buyScreenplaySection.continue')}}</button>
  </div>
</template>

<script>
export default {
  name: "directorSection",

  data() {
    return {
      directors: this.$store.getters.getAllDirectors,
      show: false,
      show2: false,
      salary: 0,
      salaryRange: {
        min: 0,
        max: 1,
        step: 1,
        rating: 0
      },
      currentDir: null,
      directorControlFromUser: 0,
      directorControl: 0,
      directorDecision: false
    }
  },

  methods: {
    showNegotiation(el) {
      this.show = true
      this.currentDir = el
      //set range input
      this.salaryRange.rating = el.rating
      this.salaryRange.min = this.$store.getters.getAllDirectorSalary[el.rating - 5 - 1]
      this.salaryRange.max = this.$store.getters.getAllDirectorSalary[el.rating + 5 - 1]
      this.salaryRange.step = 1

      //set director
      this.directorControl = (el.popularity + el.experience + el.rating) / 3
      console.log(this.directorControl)
    },
    checkDirector() {
      if (this.directorControlFromUser <= 50) {
        if(this.directorControl <= 50) {
          this.directorDecision = true
        } else if (this.salary > this.salaryRange.max * 0.6) {
          let random = Math.round(Math.random() * 10)
          this.directorDecision = (random > 3)
        } else {
          this.directorDecision = false
        }
      } else if (this.directorControlFromUser > 50 && this.directorControlFromUser <= 75) {
        if (this.directorControl > 50 && this.directorControl <= 75) {
          this.directorDecision = true
        } else if (this.salary > this.salaryRange.max * 0.6) {
          let random = Math.round(Math.random() * 100)
          this.directorDecision = (random <= 50)
        } else {
          this.directorDecision = false
        }
      } else {
        if (this.directorControl > 75) {
          this.directorDecision = true
        } else if (this.salary > this.salaryRange.max * 0.6) {
          let random = Math.round(Math.random() * 100)
          this.directorDecision = (random < 25)
        } else {
          this.directorDecision = false
        }
      }
      this.directorDecision !== true ? this.currentDir._no++ : ""
      if (this.currentDir._no === 3) {
        this.show = false
        this.show2 = false
      }
    },
  },
}
</script>

<style scoped>

</style>