<template>
  <div>
    <div>
      <div>{{$t('hireDirectorSection.hire')}}</div>
      <div v-for="(el, index) in directors" :key="index">
        {{el.getFullName}} / {{el.age}} / {{el.rating}}
        <button @click="showNegotiation(el)">{{$t('hireDirectorSection.negotiate')}}</button>
      </div>
    </div>
    <div v-if="show">
      <div>{{$t('hireDirectorSection.salary')}}</div>
      <input type="range" :min="this.salaryRange.min" :max="this.salaryRange.max" :step="this.salaryRange.step" v-model="salary">
      <div>{{salary}}</div>
      <input type="range" min="1" max="100" step="25" v-model="this.directorControlFromUser">
      <div>{{salary}}</div>
      <button @click="checkDirector; show2 = true">{{$t('hireDirectorSection.offer')}}</button>
    </div>
    <div v-if="show2">{{currentDir.getFullName}}{{$t('hireDirectorSection.decision')}}: {{directorDecision === true ? "yes" : "no"}}</div>
    <div v-if="show2">{{$t('hireDirectorSection.think')}}</div>
  </div>
</template>

<script>
export default {
  name: "directorSection",

  data() {
    return {
      directors: [],
      show: false,
      show2: false,
      salary: 0,
      round: 1,
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
      this.salaryRange.min = el.rating - 5
      this.salaryRange.max = el.rating + 5
      this.salaryRange.step = 1

      //set director
      this.directorControl = (el.popularity + el.experience + el.rating) / 3
    },
    checkDirector() {
      if (this.directorControlFromUser <= 50) {
        if(this.directorControl <= 50) {
          this.directorDecision = true
        } else {
          let random = Math.round(Math.random() * 10)
          this.directorDecision = (random <= 3)
        }
      } else if (this.directorControlFromUser > 50 && this.directorControlFromUser <= 75) {
        if (this.directorControl > 50 && this.directorControl <= 75) {
          this.directorDecision = true
        } else {
          let random = Math.round(Math.random() * 100)
          this.directorDecision = (random <= 50)
        }
      } else {
        if (this.directorControl > 75) {
          this.directorDecision = true
        } else {
          let random = Math.round(Math.random() * 100)
          this.directorDecision = (random > 25)
        }
      }
      this.directorDecision !== true ? this.currentDir.noCounter() : ""
      if (this.currentDir.no === 3) this.currentDir = null
    },

    /*calcSalary(points) {

    }*/
  },

  mounted() {
    this.directors = this.$store.getters.getAllDirectors
  }
}
</script>

<style scoped>

</style>