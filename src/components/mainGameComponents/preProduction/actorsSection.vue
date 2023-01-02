<template>
  <div>
    <h3>{{$t('actorSection.hire')}}</h3>
    <div v-for="(el, index) in allActors" :key="index">
      <avatar-element :svg-code="el._avatar"></avatar-element>
      {{el._first_name}} | {{el._last_name}} | {{el._age}} | {{el._gender}} | {{el._nationality}} | {{el._ethnicity}} | {{el._depth}} | {{el._rating}} | {{el._salary}}
      <button @click="negotiateContract(el)">{{$t('actorSection.negotiate')}}</button>
    </div>
    <div v-if="negotiate">
      <div>{{$t('actorSection.salary')}}{{this.currentActor._first_name}} {{this.currentActor._last_name}}</div>
      <input :min="this.salary.min" :max="this.salary.max" step="1" v-model="proposedSalary">
      <div>{{proposedSalary}}</div>
      <div>
        <input type="radio" :value="$t('main')" v-model="radio">
        <input type="radio" value="minor" v-model="radio">
        <input type="radio" :value="$t('support')" v-model="radio">
        <input type="radio" value="cameo" v-model="radio">
      </div>
      <button @click="sendOffer(); sendOfferBool = true">{{$t('actorSection.offer')}}</button>
      <div v-if="sendOfferBool">{{currentActor._first_name}} {{currentActor._last_name}}{{$t('actorSection.decision')}}: {{actorDecision ? $t('actorSection.yes') : $t('actorSection.no')}}</div>
      <button v-if="actorDecision" @click="saveActors()">{{$t('actorSection.continue')}}</button>
    </div>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
export default {
  name: "actorsSection",
  components: {AvatarElement},
  data() {
    return {
      allActors: this.$store.state.getAllActors(),
      currentActor: null,
      salaryLevel: 0,
      negotiate: false,
      salary: {
        min: 0,
        max: 0,
      },
      proposedSalary: this.salary.min,
      index: 0,
      sendOfferBool: false,
      actorDecision: false,
      radio: ""
    }
  },

  methods: {
    negotiateContract(actor) {
      this.currentActor = actor
      this.salaryLevel = (this.currentActor._depth * 35 + this.currentActor._experience * 25 + this.currentActor._popularity * 40) / 100

      //calc min & max
      this.index = this.$store.state.allDirectorSalary.indexOf(this.currentActor._salary)
      this.salary.min = this.$store.state.allDirectorSalary[this.index - 2]
      this.salary.max = this.$store.state.allDirectorSalary[this.index + 2]

      //set negotiate true
      this.negotiate = true
    },

    sendOffer() {
      let salValue = this.calcSalValue(this.proposedSalary)
      if (salValue === this.currentActor._salary) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.actorDecision = true
          else if (random === 1) this.actorDecision = false
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) this.actorDecision = true
          else if (random === 3) this.actorDecision = false
        } else if (this.salaryLevel <= 50) {
          this.actorDecision = true
        }
      } else if (this.$store.state.allDirectorSalary[this.index-1] === salValue || this.$store.state.allDirectorSalary[this.index+1] === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) this.actorDecision = false
          else if (random === 3) this.actorDecision = true
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.actorDecision = true
          else if (random === 1) this.actorDecision = false
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) this.actorDecision = true
          else if (random === 3) this.actorDecision = false
        }
      } else if (this.$store.state.allDirectorSalary[this.index-2] === salValue || this.$store.state.allDirectorSalary[this.index+2] === salValue) {
        if (this.salaryLevel > 75) {
          const random = Math.round(Math.random() * 8)
          this.actorDecision = random === 7;
        } else if (this.salaryLevel <= 75 && this.salaryLevel > 50) {
          const random = Math.round(Math.random() * 4)
          if (random === 0 || random === 1 || random === 2) this.actorDecision = false
          else if (random === 3) this.actorDecision = true
        } else if (this.salaryLevel <= 50) {
          const random = Math.round(Math.random() * 2)
          if (random === 0) this.actorDecision = true
          else if (random === 1) this.actorDecision = false
        }
      }
    },

    calcSalValue(salValue) {
      return this.$store.state.allDirectorSalary.sort((a, b) => {
        a = Math.abs(a - salValue);
        b = Math.abs(b - salValue);

        return a < b ? -1 : (a > b ? 1 : 0);
      });
    },

    saveActors() {
      switch (this.radio) {
        case "main" || "Hauptdarsteller":
          this.$store.state.preProduction.screenplay.actors.main.push(this.currentActor)
          break
        case "minor":
          this.$store.state.preProduction.screenplay.actors.minor.push(this.currentActor)
          break
        case "support" || "Nebendarsteller":
          this.$store.state.preProduction.screenplay.actors.support.push(this.currentActor)
          break
        case "cameo":
          this.$store.state.preProduction.screenplay.actors.cameo.push(this.currentActor)
          break
      }

      this.$router.push({name: "home"})
    },
  }
}
</script>

<style scoped>

</style>