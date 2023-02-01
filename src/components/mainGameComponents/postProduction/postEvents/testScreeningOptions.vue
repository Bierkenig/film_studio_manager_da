<template>
  <button class="buttonStyle" @click="continueToResult">Continue</button>

  <div v-if="typeEditing === true">
  <div>
    {{$t("postProductionEvents.testScreening.optionA")}}
    {{$t("postProductionEvents.testScreening.editing.optionA")}}
    <br>
    Consequence: Lorem Ipsum
    <br>
    Benefit: Lorem Ipsum
    <br>
    <button v-if="booleanEditingOption !== 1" @click="choseOptionA('editing')">Choose</button>
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
    <button v-if="booleanEditingOption !== 2" @click="choseOptionB('editing')">Choose</button>
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
      <button v-if="booleanSoundOption !== 1" @click="choseOptionA('sound')">Choose</button>
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
      <button v-if="booleanSoundOption !== 2" @click="choseOptionB('sound')">Choose</button>
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
      <button v-if="booleanVFXOption !== 1" @click="choseOptionA('vfx')">Choose</button>
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
      <button v-if="booleanVFXOption !== 2" @click="choseOptionB('vfx')">Choose</button>
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
      <button v-if="booleanActingOption !== 1" @click="choseOptionA('acting')">Choose</button>
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
      <button v-if="booleanActingOption !== 2" @click="choseOptionB('acting')">Choose</button>
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
      <button v-if="booleanStoryOption !== 1" @click="choseOptionA('story')">Choose</button>
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
      <button v-if="booleanStoryOption !== 2" @click="choseOptionB('story')">Choose</button>

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
      actingConsequence: {
        value: 0,
        percentage: 0,
        addedWeeks: 0,
      },
      storyConsequence: {
        value: 0,
        percentage: 0,
        addedWeeks: 0,

      },
      editingBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      soundBudgetIncrease: {
        value: 0,
        percentage: 0,
      },
      vfxBudgetIncrease: {
        value: 0,
        percentage: 0,
      },


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
            this.editingBudgetIncrease.percentage = this.percentageSingleBudget;
            this.booleanEditingOption = 1
            break
          case 'sound':
            this.soundBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.sound * (this.percentageSingleBudget/100);
            this.soundBudgetIncrease.percentage = this.percentageSingleBudget;
            this.booleanSoundOption = 1
            break
          case 'vfx':
            this.vfxBudgetIncrease.value = this.$store.getters.getCurrentMovie._preProduction.budget.vfx * (this.percentageSingleBudget/100);
            this.vfxBudgetIncrease.percentage = this.percentageSingleBudget;
            this.booleanVFXOption = 1
            break
          case 'acting':
            this.actingConsequence.value = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * (this.percentageWholeBudget/100);
            this.actingConsequence.percentage += this.percentageWholeBudget;
            this.booleanActingOption = 1
            //this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += this.wholeBudgetIncrease.value;
            if(this.screenplayScope === 'Little'){
              this.actingConsequence.addedWeeks += 1;
              this.addedWeeks += 1;
              // this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),1 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Small'){
              this.actingConsequence.addedWeeks += 2;
              this.addedWeeks += 2;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),2 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Normal'){
              this.actingConsequence.addedWeeks += 3;
              this.addedWeeks += 3;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),3 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Large'){
              this.actingConsequence.addedWeeks += 4;
              this.addedWeeks += 4;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),4 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Epic'){
              this.actingConsequence.addedWeeks += 5;
              this.addedWeeks += 5;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),5 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            break
          case 'story':
            //TODO Hype -15%
            this.storyConsequence.value = this.$store.getters.getCurrentMovie._preProduction.getWholeBudget() * (this.percentageWholeBudget/100);
            this.storyConsequence.percentage += this.percentageWholeBudget;
            this.booleanStoryOption = 1;
            //this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget += this.storyBudgetIncrease.value;
            if(this.screenplayScope === 'Little'){
              this.storyConsequence.addedWeeks += 1;
              this.addedWeeks += 1;
              // this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),1 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Small'){
              this.storyConsequence.addedWeeks += 2;
              this.addedWeeks += 2;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),2 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Normal'){
              this.storyConsequence.addedWeeks += 4;
              this.addedWeeks += 4;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),3 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Large'){
              this.storyConsequence.addedWeeks += 6;
              this.addedWeeks += 6;
              //this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),4 , this.$store.getters.getCurrentMovie._preProduction.releaseDate )
            }
            else if(this.screenplayScope === 'Epic'){
              this.storyConsequence.addedWeeks += 8;
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
          this.editingBudgetIncrease.value = 0
          this.editingBudgetIncrease.percentage = 0
          break
        case "sound":
          this.booleanSoundOption = 2
          this.soundBudgetIncrease.value = 0
          this.soundBudgetIncrease.percentage = 0
          this.sound
          break
        case "vfx":
          this.booleanVFXOption = 2
          this.vfxBudgetIncrease.value = 0
          this.vfxBudgetIncrease.percentage = 0
          break
        case "acting":
          this.booleanActingOption = 2
          this.actingConsequence.value = 0
          this.actingConsequence.percentage = 0
          this.actingConsequence.addedWeeks = 0
          break
        case "story":
          this.booleanStoryOption = 2
          this.storyConsequence.value = 0
          this.storyConsequence.percentage = 0
          this.storyConsequence.addedWeeks = 0
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
        this.$store.getters.getCurrentMovie._preProduction.budget.editing += this.editingBudgetIncrease.value;
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      if(this.booleanSoundOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.sound += this.soundBudgetIncrease.value;
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      if(this.booleanVFXOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.vfx += this.vfxBudgetIncrease.value;
      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      //TODO add weeks
      if(this.booleanActingOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.acting += this.actingConsequence.value;
        this.$store.getters.getCurrentMovie._preProduction.hype *= 0.85
        this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),this.actingConsequence.addedWeeks , this.$store.getters.getCurrentMovie._preProduction.releaseDate )

      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      //TODO add weeks
      if(this.booleanStoryOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget *= this.storyConsequence.value;
        this.$store.getters.getCurrentMovie._preProduction.hype *= 0.85
        this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(new Date(),this.storyConsequence.addedWeeks , this.$store.getters.getCurrentMovie._preProduction.releaseDate )

      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }
      this.$router.push({ name: 'testScreeningResults', params: { addedWeeks: this.addedWeeks, editingBudgetIncrease: JSON.stringify(this.editingBudgetIncrease), soundBudgetIncrease: JSON.stringify(this.soundBudgetIncrease), vfxBudgetIncrease: JSON.stringify(this.vfxBudgetIncrease), actingConsequence: JSON.stringify(this.actingConsequence), storyConsequence: JSON.stringify(this.storyConsequence), flags: (this.booleanEditingOption) + (this.booleanSoundOption * 3) + (this.booleanVFXOption * 9) + (this.booleanActingOption * 27) + (this.booleanStoryOption * 81)}})
    },

    addWeeks(date, weeks, startDate) {
      startDate.setDate(startDate.getDate() + 7 * weeks);
      return startDate;
    },
  }
}
</script>

<style scoped>

</style>