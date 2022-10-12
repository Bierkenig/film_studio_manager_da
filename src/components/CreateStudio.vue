<template>
  <div id="createStudioMainDiv">
    <div id="createStudioSubDiv">
      <div id="createStudioBackground">
        <div id="createStudioBox">
          <div id="createStudioHeading">
            Create Studio
          </div>
          <input id="createStudioName" v-model="name" type="text" placeholder="Example Studio Name" />
          <div id="radioBox">
            <div id="budgetHint">
              Budget
            </div>
            <div>
              <input id="hard" v-model="budget" type="radio" class="radioButton" value="25000000" />
              <label for="hard" class="labelRadio">hard - $ 25 M</label>
            </div>
            <div>
              <input id="medium" v-model="budget" type="radio" class="radioButton" value="100000000" />
              <label for="medium" class="labelRadio">normal - $ 100 M</label>
            </div>
            <div>
              <input id="easy" v-model="budget" type="radio" class="radioButton" value="500000000" />
              <label for="easy" class="labelRadio">easy - $ 500 M</label>
            </div>
          </div>
          <div id="chooseLogoBox">
            <div v-for="(img,index) in this.logoImages" :key="index">
              <input v-model="chosenLogo" type="radio" class="logoRadioButton" :value="img.imgSource">
              <img :src="img.imgSource" :alt="'Logo' + index" style="width: 50px; height: 50px">
            </div>
          </div>
          <router-link :to="{ name: 'mainMenu' }">
            <button id="startButton" class="buttonStyle" :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null" @click="startGame">Start A New Game</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Studio} from "@/classes/Studio";

export default {
  name: "CreateStudio",

  data() {
    return {
      name: '',
      budget: "100000000",
      logoImages: [
        {
          imgSource: [require("../assets/logo.png")],
          index: 1
        },
        {
          imgSource: [require("../assets/Logo-v2.png")],
          index: 2
        }
      ],
      chosenLogo: null
    }
  },
  methods: {
    startGame() {
      this.$store.commit('createStudio', {studio: new Studio(this.name), budget: parseInt(this.budget), logo: this.chosenLogo});
    },
  },
}
</script>

<style scoped>

</style>