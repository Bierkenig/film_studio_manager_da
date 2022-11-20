<template>
  <div>
    <div>{{$t('actorSection.hire')}}</div>
    <select v-model="select" @change="sortActors">
      <option value="name">{{$t('actorSection.name')}}</option>
      <option value="availability">{{$t('actorSection.availability')}}</option>
    </select>
    <div v-for="(el, index) in actors" :key="index">
      {{el._first_name}} / {{el._last_name}} / {{el._age}} / {{el._gender}} / {{el._rating}} / {{el._salary}}
      <button @click="show = true; currentActor = el">{{$t('hireDirectorSection.negotiate')}}</button>
    </div>
    <div v-if="show">
      <div>{{$t('actorSection.salary')}}{{currentActor._first_name}} {{currentActor._last_name}}</div>
      <input type="range" :min="swiper.min" :max="swiper.max" :step="swiper.step" v-model="selectedSalary">
      <div>{{$t('actorSection.role')}}</div>
      <input type="radio" name="role" value="main" v-model="selectedRole">
      <input type="radio" name="role" value="support" v-model="selectedRole">
      <input type="radio" name="role" value="minor" v-model="selectedRole">
      <input type="radio" name="role" value="cameo" v-model="selectedRole">
      <input type="radio" name="role" value="voiceOver" v-model="selectedRole">
      <div>{{$t('actorSection.selected')}}</div>
      <div>{{$t('actorSection.salary2')}}{{selectedSalary}}</div>
      <div>{{$t('actorSection.role2')}}{{selectedRole}}</div>
      <!-- TODO Director Smiley-->
      <div></div>
      <button @click="checkActor">{{$t('actorSection.hire2')}}</button>
      <div>{{this.currentActor._first_name}} {{this.currentActor._last_name}}{{$t('actorSection.decision')}}{{actorDecision ? "Yes" : "No"}}</div>
      <!-- TODO Popup modal glaub ich kann man nur stylen-->
      <transition v-if="last">
        <div>{{$t('actorSection.smiley')}}</div>
      </transition>
      <button @click="lastCheck">{{$t('buyScreenplaySection.continue')}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "actorsSection",

  data() {
    return {
      actors: this.$store.getters.getAllActors,
      currentScreenplay: this.$store.getters.getCurrentScreenplay,
      show: false,
      select: "",
      currentActor: null,
      currentDirectorControl: this.calcDirectorControl(this.$store.state.preProduction.hiredDirector),
      swiper: {
        min: this.$store.getters.getAllDirectorSalary[this.currentActor.rating - 5 - 1],
        max: this.$store.getters.getAllDirectorSalary[this.currentActor.rating + 5 - 1],
        step: 1,
      },
      selectedSalary: 0,
      selectedRole: "",
      actorDecision: false,
      smiley: null,
      last: false,
    }
  },

  methods: {
    calcDirectorControl(el) {
      return Math.round((el.popularity + el.experience + el.rating) / 3)
    },

    setSmiley() {
      const random = Math.round(Math.random() * 10)
      if (this.currentDirectorControl <= 50) {
        if (random <= 7) this.smiley = null; // TODO set green smiley
      } else if (this.currentDirectorControl <= 75 && this.currentDirectorControl > 50) {
        if (random > 2 && random <= 6) this.smiley = null //TODO set yellow smiley
        else if (random > 6) this.smiley = null //TODO set green Smiley
        else this.smiley = null //TODO set red Smiley
      } else {
        if (random <= 6) this.smiley = null // TODO set red smiley
        else this.smiley = null //TODO set yellow smiley
      }
    },

    sortActors() {
      switch (this.select) {
        case "name":
          this.actors.sort((a,b) => {
            return a._last_name.localeCompare(b._last_name)
          })
          break
        case "availability":
          this.actors.sort((a,b) => {
            return a.notAvailable - b.notAvailable
          })
          break
      }
    },

    checkActor() {
      if (this.currentActor.notAvailable > 3) {
        const random = Math.round(Math.random() * 10)
        this.actorDecision = random > 6;
        if (!this.actorDecision) this.currentActor._no = 3
        this.show = false
      } else {
        if (this.selectedSalary < this.swiper.max * 0.6) this.actorDecision = Math.round(Math.random() * 10) > 7;
        if (!this.actorDecision) this.currentActor._no++
        if (this.currentActor._no === 3) this.show = false
      }
      if(this.actorDecision) this.hireActor();
    },

    hireActor() {
      switch (this.selectedRole) {
        case "main":
          this.currentScreenplay.addMainCharacter(this.currentActor)
          break
        case "minor":
          this.currentScreenplay.addMinorCharacter(this.currentActor)
          break
        case "support":
          this.currentScreenplay.addSupportCharacter(this.currentActor)
          break
        case "cameo":
          this.currentScreenplay.addCameoCharacter(this.currentActor)
          break
        case "voiceOver":
          this.currentScreenplay.addVoiceOverCharacter(this.currentActor)
          break
      }
      this.currentActor.notAvailable++;
    },

    lastCheck() {
      if (this.smiley === "yellow" || this.smiley === "red") this.last = true
    }
  }
}
</script>

<style scoped>

</style>