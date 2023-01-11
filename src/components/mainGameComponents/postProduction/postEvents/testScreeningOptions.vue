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
      <button class="buttonStyle" @click="continueToResult">Continue</button>
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

      percentageSingleBudget: 20,
      percentageWholeBudget: 10,
      addedWeeks: 0,
      actingBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      storyBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      editingBudgetIncrease: {
        value: 20000,
        percentage: 20,
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
      booleanEditingOption: 0,
      booleanSoundOption: 0,
      booleanVFXOption: 0,
      booleanActingOption: 0,
      booleanStoryOption: 0,

    }
  },

  methods:{
    choseOptionA(optionType){
        switch(optionType){
          case 'editing':
            this.editingBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.editing * (this.percentageSingleBudget/100);
            this.editingBudgetIncrease.precentage = this.percentageSingleBudget;
            this.booleanEditingOption = 1
            break
          case 'sound':
            this.soundBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.sound * (this.percentageSingleBudget/100);
            this.soundBudgetIncrease.precentage = this.percentageSingleBudget;
            this.booleanSoundOption = 1
            break
          case 'vfx':
            this.vfxBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.vfx * (this.percentageSingleBudget/100);
            this.vfxBudgetIncrease.precentage = this.percentageSingleBudget;
            this.booleanVFXOption = 1
            break
          case 'acting':
            //TODO Hype -15%
            // eslint-disable-next-line no-case-declarations
            this.actingBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * (this.percentageWholeBudget/100);
            this.actingBudgetIncrease.percentage += this.percentageWholeBudget;
            this.booleanActingOption = 1
            //this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += this.wholeBudgetIncrease.value;
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
            this.storyBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * (this.percentageWholeBudget/100);
            this.storyBudgetIncrease.percentage += this.percentageWholeBudget;
            this.booleanStoryOption = 1;
            //this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += this.storyBudgetIncrease.value;
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

    choseOptionB(type){
      switch(type){
        case "editing":
          this.booleanEditingOption = 2
          break
        case "sound":
          this.booleanSoundOption = 2
          break
        case "vfx":
          this.booleanVFXOption = 2
          break
        case "acting":
          this.booleanActingOption = 2
          break
        case "story":
          this.booleanStoryOption = 2
          break
      }
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

    continueToResult() {
      if(this.booleanEditingOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.editing *= (1 + (this.editingBudgetIncrease.percentage/100));
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      if(this.booleanSoundOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.sound *= (1 + (this.soundBudgetIncrease.percentage/100));
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      if(this.booleanVFXOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.vfx *= (1 + (this.vfxBudgetIncrease.percentage/100));
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      if(this.booleanActingOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.acting *= (1 + (this.actingBudgetIncrease.percentage/100));
        this.$store.getters.getCurrentMovie._preProduction.hype *= 0.85
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      if(this.booleanStoryOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.story *= (1 + (this.storyBudgetIncrease.percentage/100));
        this.$store.getters.getCurrentMovie._preProduction.hype *= 0.85
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }
      this.$router.push({ name: 'testScreeningResults', params: { addedWeeks: this.addedWeeks, editingBudgetIncrease: JSON.stringify(this.editingBudgetIncrease), soundBudgetIncrease: JSON.stringify(this.soundBudgetIncrease), vfxBudgetIncrease: JSON.stringify(this.vfxBudgetIncrease), actingBudgetIncrease: JSON.stringify(this.actingBudgetIncrease), storyBudgetIncrease: JSON.stringify(this.storyBudgetIncrease), flags: (this.booleanEditingOption) + (this.booleanSoundOption * 3) + (this.booleanVFXOption * 9) + (this.booleanActingOption * 27) + (this.booleanStoryOption * 81)}})
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