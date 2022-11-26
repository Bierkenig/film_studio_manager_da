<template>
  <div>
    <div>{{ $t('actorSection.hire') }}</div>

    <div v-for="(el, index) in allActors" :key="index">
      {{ el._first_name }} | {{ el._last_name }} | {{ el._age }} | {{ el._gender }} | {{ el._nationality }} |
      {{ el._ethnicity }} | {{ el._depth }} | {{ el._rating }} | {{ el._salary }}
      <button @click="currentActor = el; setSalary(); offer = false">{{ $t('actorSection.negotiate') }}</button>
    </div>

    <div v-if="currentActor !== null">
      <div>{{ $t('actorSection.salary') }}{{ this.currentActor._first_name }} {{ this.currentActor._last_name }}</div>
      <input type="range" :min="actorSalaryRange.min" :max="actorSalaryRange.max" :step="actorSalaryRange.step"
             v-model="actorSalaryRange.selectedSalary">

      <input type="radio" value="main" id="main" v-model="radio">
      <label for="main">Main</label>
      <input type="radio" value="minor" id="minor" v-model="radio">
      <label for="minor">Minor</label>
      <input type="radio" value="support" id="support" v-model="radio">
      <label for="support">Support</label>
      <input type="radio" value="cameo" id="cameo" v-model="radio">
      <label for="cameo">Cameo</label>
      <input type="radio" value="voiceOver" id="voiceOver" v-model="radio">
      <label for="voiceOver">Voice Over</label>

      <button @click="checkActor(); offer = true; this.$store.state.preProduction.mood = Math.round(Math.random() * 2) + 1">{{ $t('actorSection.offer') }}</button>
      <div v-if="offer">
        {{
          actorDecision ? currentActor._first_name + " " + currentActor._last_name + $t('actorSection.decision') + "Yes" : currentActor._first_name + " " + currentActor._last_name + $t('actorSection.decision') + "No"
        }}
      </div>
      <div v-if="!actorDecision && offer">{{ $t('actorSection.readjust') }}</div>

      <div v-if="actorDecision">{{ $t('actorSection.spots') }}
        {{ spotsLeft !== 0 ? spotsLeft : $t('actorSection.no') }}
        {{ $t('actorSection.spots2') }}
        {{ radio }}
        {{ $t('actorSection.spots3') }}
      </div>

      <div>{{$t('actorSection.mood')}}</div>
      <smiley-director></smiley-director>

      <actor-modal v-if="modalTrue">
        <template v-slot:header>
          <h3>custom header</h3>
        </template>
      </actor-modal>

      <button v-if="actorDecision" @click="lastCheck" :disabled="!actorDecision">
        {{ $t('actorSection.continue') }}
      </button>
    </div>

  </div>
</template>

<script>
import SmileyDirector from "@/components/mainGameComponents/preProduction/SmileyDirector";
import ActorModal from "@/components/mainGameComponents/preProduction/modals/actor-modal";
export default {
  name: "actorsSection",
  components: {ActorModal, SmileyDirector},
  data() {
    return {
      allActors: this.$store.getters.getAllActors,
      currentActor: null,
      actorSalaryRange: {
        min: 0,
        max: 1,
        step: 1,
        selectedSalary: 0,
      },
      actorDecision: false,
      radio: "",
      offer: false,
      spotsLeft: "",
      modalTrue: false
    }
  },

  methods: {
    setSalary() {
      this.actorSalaryRange.min = this.$store.state.allDirectorSalary[this.currentActor._rating - 5 - 1];
      this.actorSalaryRange.max = this.$store.state.allDirectorSalary[this.currentActor._rating + 5 - 1];
    },

    checkActor() {
      const random = Math.round(Math.random() * 10)
      if (this.currentActor.notAvailable > 3) {
        this.actorDecision = random > 8
        if (this.actorDecision) this.setActors()
        if (this.currentActor.notAvailable >= 5) this.actorDecision = false
      } else if (this.currentActor.notAvailable <= 2 && this.actorSalaryRange.selectedSalary > this.actorSalaryRange.max * 0.7) {
        this.actorDecision = true
        this.setActors()
      }
    },

    setActors() {
      let main = this.$store.state.preProduction.currentScreenplay.roles.main.length - this.$store.state.preProduction.currentScreenplay.actors.main.length - 1;
      let minor = this.$store.state.preProduction.currentScreenplay.roles.minor.length - this.$store.state.preProduction.currentScreenplay.actors.minor.length - 1;
      let support = this.$store.state.preProduction.currentScreenplay.roles.support.length - this.$store.state.preProduction.currentScreenplay.actors.support.length - 1;
      let cameo = this.$store.state.preProduction.currentScreenplay.roles.cameo.length - this.$store.state.preProduction.currentScreenplay.actors.cameo.length - 1;
      let voiceOver = this.$store.state.preProduction.currentScreenplay.roles.voiceOver.length - this.$store.state.preProduction.currentScreenplay.actors.voiceOver.length - 1;
      switch (this.radio) {
        case "main":
          console.log(this.$store.state.preProduction.currentScreenplay.actors.main.length)
          console.log(this.$store.state.preProduction.currentScreenplay.roles.main.length)
          if (this.$store.state.preProduction.currentScreenplay.actors.main.length < this.$store.state.preProduction.currentScreenplay.roles.main.length) {
            this.$store.state.preProduction.currentScreenplay.actors.main.push(this.currentActor)
            const index = this.allActors.indexOf(this.currentActor)
            this.allActors.splice(index, 1)
            this.spotsLeft = main
          }
          break
        case
        "minor":
          if (this.$store.state.preProduction.currentScreenplay.actors.minor.length < this.$store.state.preProduction.currentScreenplay.roles.minor.length) {
            this.$store.state.preProduction.currentScreenplay.actors.minor.push(this.currentActor)
            const index = this.allActors.indexOf(this.currentActor)
            this.allActors.splice(index, 1)
            this.spotsLeft = minor
          }
          break
        case
        "support":
          if (this.$store.state.preProduction.currentScreenplay.actors.support.length < this.$store.state.preProduction.currentScreenplay.roles.support.length) {
            this.$store.state.preProduction.currentScreenplay.actors.support.push(this.currentActor)
            const index = this.allActors.indexOf(this.currentActor)
            this.allActors.splice(index, 1)
            this.spotsLeft = support
          }
          break
        case
        "cameo":
          if (this.$store.state.preProduction.currentScreenplay.actors.cameo.length < this.$store.state.preProduction.currentScreenplay.roles.cameo.length) {
            this.$store.state.preProduction.currentScreenplay.actors.cameo.push(this.currentActor)
            const index = this.allActors.indexOf(this.currentActor)
            this.allActors.splice(index, 1)
            this.spotsLeft = cameo
          }
          break
        case
        "voiceOver":
          if (this.$store.state.preProduction.currentScreenplay.actors.voiceOver.length < this.$store.state.preProduction.currentScreenplay.roles.voiceOver.length) {
            this.$store.state.preProduction.currentScreenplay.actors.voiceOver.push(this.currentActor)
            const index = this.allActors.indexOf(this.currentActor)
            this.allActors.splice(index, 1)
            this.spotsLeft = voiceOver
          }
          break
      }
    },

    lastCheck() {
      let mood = this.$store.state.preProduction.mood
      if (mood === 2 || mood === 3) {
        this.modalTrue = true
      }
    }
  }
}
</script>

<style scoped>

</style>