<template>
<div v-if="typeEditing === true">
  <div>
    {{$t("postProductionEvents.testScreening.optionA")}}
    {{$t("postProductionEvents.testScreening.editing.optionA")}}
    <br>
    Consequence: Lorem Ipsum
    <br>
    Benefit: Lorem Ipsum
    <br>
    <button @click="choseOptionA('editing')">Choose</button>
    <br>
    <br>
  </div>
  <div>
    {{$t("postProductionEvents.testScreening.optionB")}}
    {{$t("postProductionEvents.testScreening.editing.optionB")}}
    <br>
    Consequence: Lorem Ipsum
    <br>
    Benefit: Lorem Ipsum
    <br>
    <button @click="choseOptionB()">Choose</button>
    <router-link :to="{ name: 'testScreeningResults', params: { addedWeeks: this.test, editingBudgetIncrease: JSON.stringify(this.editingBudgetIncrease), flags: (booleanEditingOption) + (booleanSoundOption * 3) + (booleanVFXOption * 9) + (booleanActingOption * 27) + (booleanStoryOption * 81)}}">
      <button class="buttonStyle">Continue</button>
    </router-link>
  </div>
</div>
  <div v-if="typeSound === true">
    <div>
      {{$t("postProductionEvents.testScreening.optionA")}}
      {{$t("postProductionEvents.testScreening.sound.optionA")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionA('sound')">Choose</button>
      <br>
      <br>
    </div>
    <div>
      {{$t("postProductionEvents.testScreening.optionB")}}
      {{$t("postProductionEvents.testScreening.sound.optionB")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionB()">Choose</button>
    </div>
</div>
  <div v-if="typeVFX === true">
    <div>
      {{$t("postProductionEvents.testScreening.optionA")}}
      {{$t("postProductionEvents.testScreening.vfx.optionA")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionA('vfx')">Choose</button>
      <br>
      <br>
    </div>
    <div>
      {{$t("postProductionEvents.testScreening.optionB")}}
      {{$t("postProductionEvents.testScreening.vfx.optionB")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionB()">Choose</button>
    </div>
  </div>
  <div v-if="typeActing === true">
    <div>
      {{$t("postProductionEvents.testScreening.optionA")}}
      {{$t("postProductionEvents.testScreening.acting.optionA")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionA('acting')">Choose</button>
      <br>
      <br>
    </div>
    <div>
      {{$t("postProductionEvents.testScreening.optionB")}}
      {{$t("postProductionEvents.testScreening.acting.optionB")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionB()">Choose</button>
    </div>
  </div>
  <div v-if="typeStory === true">
    <div>
      {{$t("postProductionEvents.testScreening.optionA")}}
      {{$t("postProductionEvents.testScreening.story.optionA")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionA('story')">Choose</button>
      <br>
      <br>
    </div>
    <div>
      {{$t("postProductionEvents.testScreening.optionB")}}
      {{$t("postProductionEvents.testScreening.story.optionB")}}
      <br>
      Consequence: Lorem Ipsum
      <br>
      Benefit: Lorem Ipsum
      <br>
      <button @click="choseOptionB()">Choose</button>

    </div>
  </div>
</template>

<script>
export default {
  name: "testScreeningOptions",

  props:{

  },
  data(){
    return{
      typeEditing: this.$store.state.type.editing,
      typeSound: this.$store.state.type.sound,
      typeVFX: this.$store.state.type.vfx,
      typeActing: this.$store.state.type.acting,
      typeStory: this.$store.state.type.story,

      dirRating: this.$store.state.currentMovie?._preProduction.hiredDirector.rating,
      screenplayScope: this.$store.state.currentMovie?._preProduction.screenplay.details.scope,
      addedWeeks: 0,
      wholeBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      editingBudgetIncrease: {
        value: 20000,
        percentage: 10,
      },
      soundBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      vfxBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      test: 5,

      // 1 - Option A selected
      // 2 - Option B selected
      // 0 - No Options (positive Feedback)
      booleanEditingOption: 1,
      booleanSoundOption: 0,
      booleanVFXOption: 0,
      booleanActingOption: 0,
      booleanStoryOption: 2,

    }
  },

  methods:{
    choseOptionA(optionType){
        switch(optionType){
          case 'editing':
            this.editingBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.editing * 0.1;
            this.editingBudgetIncrease.precentage = 10;
            this.$store.getters.getCurrentMovie._preProduction.budget.editing *= 1.1;
            break
          case 'sound':
            this.soundBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.sound * 0.1;
            this.soundBudgetIncrease.precentage = 10;
            this.$store.getters.getCurrentMovie._preProduction.budget.sound *= 1.1;
            break
          case 'vfx':
            this.vfxBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.vfx * 0.1;
            this.vfxBudgetIncrease.precentage = 10;
            this.$store.getters.getCurrentMovie._preProduction.budget.vfx *= 1.1;
            break
          case 'acting':
            //TODO Hype -15%
            // eslint-disable-next-line no-case-declarations
            this.wholeBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * 0.05;
            this.wholeBudgetIncrease.percentage += 5;
            this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += this.wholeBudgetIncrease.value;
            if(this.screenplayScope === 'Little'){
              this.addedWeeks += 1;
              // this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),1 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Small'){
              this.addedWeeks += 2;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),2 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Normal'){
              this.addedWeeks += 3;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),3 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Large'){
              this.addedWeeks += 4;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),4 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Epic'){
              this.addedWeeks += 5;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),5 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            break
          case 'story':
            //TODO Hype -15%
            this.wholeBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * 0.1;
            this.wholeBudgetIncrease.percentage += 10;
            this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += this.wholeBudgetIncrease.value;
            if(this.screenplayScope === 'Little'){
              this.addedWeeks += 1;
              // this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),1 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Small'){
              this.addedWeeks += 2;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),2 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Normal'){
              this.addedWeeks += 4;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),3 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Large'){
              this.addedWeeks += 6;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),4 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Epic'){
              this.addedWeeks += 8;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),5 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            break
      }
    },

    choseOptionB(){
      this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
    },

    calcDireMorale(trueFalse) {
      if (this.dirRating > 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 3
      } else if (this.dirRating > 50 && this.dirRating <= 75) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 2
      } else if (this.dirRating <= 50) {
        if (!trueFalse) this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale -= 1
      }
    },

    addWeeks(date, weeks, startDate) {
      date.setDate(startDate.getDate() + 7 * weeks);
      return date;
    },
  }
}
</script>

<style scoped>

</style>