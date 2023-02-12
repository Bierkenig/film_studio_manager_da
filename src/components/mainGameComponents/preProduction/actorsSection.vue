<template>
  <div>
    <h3>{{ $t('actorSection.hire') }}</h3>
    <div v-for="(el, index) in allActors" :key="index">
      <avatar-element :svg-code="el._avatar"/>
      {{ el._first_name }} | {{ el._last_name }} | {{ el._age }} | {{ el._gender }} | {{ el._nationality }} |
      {{ el._ethnicity }} | {{ el._talent }} | {{ el._rating }}
      <button @click="negotiateContract(el); disabled = true" :disabled="disabled">{{ $t('actorSection.negotiate') }}</button>
    </div>
    <div v-if="negotiate">
      <div>{{ $t('actorSection.salary') }}{{ this.currentActor._first_name }} {{ this.currentActor._last_name }}</div>
      <input type="range" :min="this.salary.min" :max="this.salary.max" step="1" v-model="proposedSalary">
      <div>$ {{ proposedSalary }}</div>
      <div>
        <input type="radio" id="main" :value="$t('main')" v-model="radio" :disabled="!spots.main >= 1">
        <label for="main">{{$t('main')}}</label>
        <div>{{spots.main}}</div>
        <input type="radio" id="minor" value="Minor" v-model="radio" :disabled="!spots.minor >= 1">
        <label for="minor">Minor</label>
        <div>{{spots.minor}}</div>
        <input type="radio" id="support" :value="$t('support')" v-model="radio" :disabled="!spots.support >= 1">
        <label for="support">{{$t('support')}}</label>
        <div>{{spots.support}}</div>
        <input type="radio" id="cameo" value="Cameo" v-model="radio" :disabled="!spots.cameo >= 1">
        <label for="cameo">Cameo</label>
        <div>{{spots.cameo}}</div>
      </div>
      <button @click="sendOffer(); sendOfferBool = true">{{ $t('actorSection.offer') }}</button>
      <div v-if="sendOfferBool">{{ currentActor._first_name }}
        {{ currentActor._last_name }}{{ $t('actorSection.decision') }}
        {{ actorDecision ? $t('actorSection.yes') :  $t('actorSection.no') }}
      </div>
      <button v-if="sendOfferBool" @click="saveActors()" :disabled="!actorDecision || radio === null">{{$t('actorSection.add')}}</button><br/>
      <div v-if="cant">{{$t('actorSection.cant')}}</div>
    </div>
    <button @click="finishPreProd()" :disabled="finish">{{ $t('actorSection.continue') }}</button>
  </div>
</template>

<script>
import AvatarElement from "@/components/kitchenSink/AvatarElement";
import store from "@/services/store";

export default {
  name: "actorsSection",
  components: {AvatarElement},
  data() {
    return {
      allActors: this.$store.getters.getAllActors,
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
      spots: this.$store.getters.getCurrentMovie._preProduction.screenplay.getSpots(),
      cant: false,
      finish: true
    }
  },

  methods: {
    negotiateContract(actor) {
      this.currentActor = actor
      this.salaryLevel = Math.round((this.currentActor._talent * 35 + this.currentActor._experience * 25 + this.currentActor._popularity * 40) / 100)

      //calc min & max
      console.log(this.salaryLevel)
      console.log(this.allSalaries)
      console.log(this.allSalaries[this.salaryLevel])
      this.salary.min = this.allSalaries[(this.salaryLevel - 3)]
      console.log(this.salary.min)
      this.perfectSalary = this.allSalaries[(this.salaryLevel - 1)]
      this.perfectSalary1 = this.allSalaries[(this.salaryLevel -2)]
      this.salary.max = this.allSalaries[(this.salaryLevel +1)]
      console.log(this.salary.max)

      //set negotiate true
      this.sendOfferBool = false
      this.negotiate = true
      this.proposedSalary = this.salary.min
    },

    sendOffer() {
      console.log(this.radio)
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
          }
          else this.actorDecision = true
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

      console.log(this.currentActor._no)
      if (this.currentActor._no === 3) {
        const index = this.allActors.indexOf(this.currentActor)
        this.allActors.splice(index, 1)
        this.disabled = false
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
      if (this.currentActor._workingOnProjects < 3) {
        this.currentActor._workingOnProjects++
      } else {
        this.cant = true
        this.sendOfferBool = true
        return
      }
      switch (this.radio) {
        case "Main" || "Hauptdarsteller":
          this.$store.state.currentMovie._preProduction.screenplay.actors.main.push(this.currentActor)
          this.removeActor()
          break
        case "Minor":
          this.$store.state.currentMovie._preProduction.screenplay.actors.minor.push(this.currentActor)
          this.removeActor()
          break
        case "Support" || "Nebendarsteller":
          this.$store.state.currentMovie._preProduction.screenplay.actors.support.push(this.currentActor)
          this.removeActor()
          break
        case "Cameo":
          this.$store.state.currentMovie._preProduction.screenplay.actors.cameo.push(this.currentActor)
          this.removeActor()
          break
      }

      this.spots = this.$store.getters.getCurrentMovie._preProduction.screenplay.getSpots()
      if (this.spots.main === 0 && this.spots.minor === 0
          && this.spots.cameo === 0 && this.spots.support === 0) {
        this.finish = false
      }
      this.$store.state.currentMovie._preProduction.budget.actorSalary += this.proposedSalary
      this.negotiate = false
      this.disabled = false
      this.currentActor = null
      this.salary.min = 0
      this.salary.max = 0
      this.radio = null
      this.proposedSalary = 0
    },

    removeActor() {
      this.allActors = this.allActors.filter((el) =>
        el.id !== this.currentActor.id
      )
    },

    finishPreProd() {
      console.log(this.$store.state.currentMovie)
      this.$store.getters.getCurrentMovie._preProduction.startDate = this.$store.getters.getCurrentDate
      let endDate = new Date(store.getters.getCurrentDate.getFullYear(),  store.getters.getCurrentDate.getMonth(),
          store.getters.getCurrentDate.getDate() + (this.$store.getters.getCurrentMovie._preProduction.preProductionLength * 7))
      let newDate = new Date(endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate() + 1)
      store.commit('addCalendarEvents', {
        id: store.getters.getNextEventId,
        movie: this.$store.getters.getCurrentMovie._preProduction.screenplay.title,
        studio: "",
        start: endDate.toISOString().split('T')[0],
        end: newDate.toISOString().split('T')[0],
        type: 'preProductionFinished',
        completed: false,
      })
      this.$store.commit('addInProductionMovie', this.$store.getters.getCurrentMovie);
      console.log(this.$store.getters.getInProductionMovies)

      //set current movie null
      this.$router.push({name: "movies"})
    },
  },

  mounted() {
    this.allSalaries = this.$store.getters.getDirectorAndActorSalaries
  }
}
</script>

<style scoped>

</style>