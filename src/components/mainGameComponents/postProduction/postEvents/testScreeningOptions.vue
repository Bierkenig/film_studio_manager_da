<template>
  <div class="testScreeningOptionsMainDiv">
    <background-tile class="testScreeningOptionsBackground" title="Test Screening Options">
      <div class="testScreeningOptionsGridContainer verticalScroll">
        <div class="testScreeningOptionsContainerElement" v-if="typeEditing === true">
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionA")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.editing.optionA")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanEditingOption === 1" @clicked="choseOptionA('editing')">Choose</custom-button>
          </div>
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionB")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.editing.optionB")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanEditingOption === 2" @clicked="choseOptionB('editing')">Choose</custom-button>
          </div>
        </div>
        <div class="testScreeningOptionsContainerElement" v-if="typeSound === true">
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionA")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.sound.optionA")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanSoundOption === 1" @clicked="choseOptionA('sound')">Choose</custom-button>
          </div>
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionB")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.sound.optionB")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanSoundOption === 2" @clicked="choseOptionB('sound')">Choose</custom-button>
          </div>
        </div>
        <div class="testScreeningOptionsContainerElement" v-if="typeVFX === true">
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionA")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.vfx.optionA")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanVFXOption === 1" @clicked="choseOptionA('vfx')">Choose</custom-button>
          </div>
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionB")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.vfx.optionB")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanVFXOption === 2" @clicked="choseOptionB('vfx')">Choose</custom-button>
          </div>
        </div>
        <div class="testScreeningOptionsContainerElement" v-if="typeActing === true">
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionA")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.acting.optionA")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanActingOption === 1" @clicked="choseOptionA('acting')">Choose</custom-button>
          </div>
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionB")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.acting.optionB")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanActingOption === 2" @clicked="choseOptionB('acting')">Choose</custom-button>
          </div>
        </div>
        <div class="testScreeningOptionsContainerElement" v-if="typeStory === true">
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionA")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.story.optionA")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanStoryOption === 1" @clicked="choseOptionA('story')">Choose</custom-button>
          </div>
          <div class="testScreeningOptionsOptionElement">
            <div class="testScreeningOptionsOptionHeader">{{$t("postProductionEvents.testScreening.optionB")}}</div>
            <div class="testScreeningOptionsOptionDescription">{{$t("postProductionEvents.testScreening.story.optionB")}}</div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsConsequence">Consequence</div>
              <div>Lorem Ipsum</div>
            </div>
            <div class="testScreeningOptionsOptionDetails">
              <div class="testScreeningOptionsBenefit">Benefit</div>
              <div>Lorem Ipsum</div>
            </div>
            <custom-button size="small" :disabled="booleanStoryOption === 2" @clicked="choseOptionB('story')">Choose</custom-button>
          </div>
        </div>
      </div>

      <custom-button size="small" class="buttonStyle" @clicked="continueToResult" :disabled="!typeActing || !typeEditing || !typeVFX || !typeSound || !typeStory">Continue</custom-button><!--:disabled="!typeActing || !typeEditing || !typeVFX || !typeSound || !typeStory"-->
    </background-tile>
  </div>
</template>

<script>
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "testScreeningOptions",
  components: {CustomButton, BackgroundTile},

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
            this.actingConsequence.value = this.$store.getters.getCurrentMovie._preProduction.getTotalBudget() * (this.percentageWholeBudget/100);
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
            this.storyConsequence.value = this.$store.getters.getCurrentMovie._preProduction.getTotalBudget() * (this.percentageWholeBudget/100);
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
        this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(this.actingConsequence.addedWeeks , this.$store.getters.getCurrentMovie._preProduction.releaseDate )

      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }

      //TODO add weeks
      if(this.booleanStoryOption === 1){
        this.$store.getters.getCurrentMovie._preProduction.budget.problemBudget *= this.storyConsequence.value;
        this.$store.getters.getCurrentMovie._preProduction.hype *= 0.85
        this.$store.getters.getCurrentMovie._preProduction.releaseDate = this.addWeeks(this.storyConsequence.addedWeeks , this.$store.getters.getCurrentMovie._preProduction.releaseDate )

      }
      else if(this.booleanEditingOption === 2){
        this.$store.state.currentMovie._preProduction.hiredDirector.dirMorale.calcDireMorale(false)
      }
      this.$router.push({ name: 'testScreeningResults', params: { addedWeeks: this.addedWeeks, editingBudgetIncrease: JSON.stringify(this.editingBudgetIncrease), soundBudgetIncrease: JSON.stringify(this.soundBudgetIncrease), vfxBudgetIncrease: JSON.stringify(this.vfxBudgetIncrease), actingConsequence: JSON.stringify(this.actingConsequence), storyConsequence: JSON.stringify(this.storyConsequence), flags: (this.booleanEditingOption) + (this.booleanSoundOption * 3) + (this.booleanVFXOption * 9) + (this.booleanActingOption * 27) + (this.booleanStoryOption * 81)}})
    },

    addWeeks(weeks, startDate) {
      startDate.setDate(startDate.getDate() + 7 * weeks);
      return startDate;
    },
  }
}
</script>

<style scoped>
.testScreeningOptionsMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.testScreeningOptionsBackground {
  width: 1300px;
}

.testScreeningOptionsGridContainer {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  padding: 10px;

  margin-top: 15px;
  margin-bottom: 15px;
  height: 400px;
}

.testScreeningOptionsContainerElement {
  background-color: var(--fsm-dark-blue-5);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;

  display: flex;
  flex-direction: row;
  gap: 15px;
}

.testScreeningOptionsOptionElement {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  padding: 15px;
  width: 50%;
  font-size: 15px;
}

.testScreeningOptionsOptionHeader {
  font-weight: var(--fsm-fw-bold);
  font-size: 20px;
}

.testScreeningOptionsOptionDescription {
  font-size: 15px;
  color: var(--fsm-grey-font-color)
}

.testScreeningOptionsOptionDetails {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  padding: 7px;
}

.testScreeningOptionsConsequence {
  color: #FF3A4D;
}

.testScreeningOptionsBenefit {
  color: #46FF54;
}
</style>