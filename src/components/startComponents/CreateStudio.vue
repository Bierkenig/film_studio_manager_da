<template>
  <div id="createStudioMainDiv">
    <div id="createStudioSubDiv">
      <div>
        <icon-button
            id="createStudioBackButton"
            size="medium"
            :dark="true"
            :bg-gradient="true"
            :icon-gradient="false"
            :shadow="false"
            @click="goBack()"/>
      </div>
      <div class="createStudioBackground">
        <h1 class="createStudioHeading">
          {{ $t('createStudioHeader') }}
        </h1>
        <div class="createStudioBox">
          <div class="createStudioBoxInnerElement">
            <label id="createStudioNameLabel" for="createStudioName">Studio Name</label>
            <input id="createStudioName" v-model="name" type="text" placeholder='Studio Name' />
            <div id="radioBox">
              <div id="budgetHint">
                Studio Budget
              </div>
              <budget-select id="budgetSelectElement" @send-budget-value="setSelectedBudget"/>
            </div>
            <div id="chooseLogoBox">
              <div id="logoHint">
                Studio Logo
              </div>
              <div class="selectLogoElement">
                <div v-for="i in 10" :key="i">
                  <icon-button
                      class="availableIconsElements"
                      size="small"
                      :dark="true"
                      :bg-gradient="true"
                      :icon-gradient="false"
                      :shadow="false"
                      :invertTheme="iconSelected[i-1]"
                      @click="selectIcon(i)"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 class="createStudioHeading" id="createStudioModificationHeading">
          {{ $t('modifications') }}
        </h1>
        <div class="createStudioBox">
          <div class="createStudioBoxInnerElement" id="createStudioBoxModificationInformation">
            <div id="createStudioBoxText">{{ $t('modificationsMsg') }}</div>
          </div>
          <div class="createStudioBoxDatabaseSelection">
            <div>
              <input id="currentDatabase" class="databaseRadioButton" type="radio" v-model="databaseType" value="current">
              <label for="currentDatabase" id="currentDatabaseLabel" class="databaseLabel">{{ $t('modified') }}</label>
            </div>

            <div>
              <input id="defaultDatabase" class="databaseRadioButton" type="radio" v-model="databaseType" value="default">
              <label for="defaultDatabase" id="defaultDatabaseLabel" class="databaseLabel">{{ $t('default') }}</label>
            </div>
          </div>
        </div>
        <custom-button
            id="createStudioContinueButton"
            :dark="false"
            size="medium"
            :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null || databaseType === ''"
            @clicked="startGame">{{ $t('createStudioButton') }}</custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import {Studio} from "@/classes/Studio";
import soundeffectMixin from "@/mixins/soundeffectMixin";
import IconButton from "@/components/kitchenSink/IconButton";
import CustomButton from "@/components/kitchenSink/CustomButton";
import BudgetSelect from "@/components/startComponents/BudgetSelect";

export default {
  name: "CreateStudio",
  components: {BudgetSelect, CustomButton, IconButton},
  mixins: [soundeffectMixin('button','click')],

  data() {
    return {
      name: '',
      budget: "250000000",
      chosenLogo: null,
      databaseType: "default",
      iconSelected: [false,false,false,false,false,false,false,false,false,false],
      icon: ['placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder']//['action','comedy','musical','movies','home','calendar','adventure','alchemy','animal','award']
    }
  },
  methods: {
    startGame() {
      this.$store.commit('createStudio', {studio: new Studio(1,this.name,"2023",parseInt(this.budget),0), logo: this.chosenLogo});
      this.$store.getters.getFinishedMovies[0]._owner = this.$store.getters.getStudio;
      this.$router.push({name: 'home'})
    },

    test(){
      console.log(this.budget)
    },

    goBack(){
      this.$router.push({name: 'SelectSlotWindow'})
    },

    setSelectedBudget(value){
      this.budget = value;
      console.log(value)
    },

    selectIcon(index){
      for (let i = 0; i < this.iconSelected.length; i++) {
        if(i === (index - 1)){
          this.iconSelected[index - 1] = true;
        } else {
          this.iconSelected[i] = false;
        }
      }
      this.chosenLogo = this.icon[index - 1];
    }
  },
}
</script>

<style scoped>
#createStudioMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.createStudioHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.createStudioBackground {
  display: flex;
  flex-direction: column;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 350px;
  padding: 10px 20px 10px 20px;
}

.createStudioBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  margin-top: 10px;
}

#createStudioBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

.createStudioBoxInnerElement {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
}

#createStudioName {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  height: 30px;
  width: 80%;
  margin-top: 10px;
  padding-left: 10px;
  margin-bottom: 20px;
}

#createStudioName:focus {
  outline: none;
}

#createStudioModificationHeading {
  margin-top: 10px !important;
}

#createStudioBoxModificationInformation {
  padding-top: 10px !important;
}

#createStudioBoxText {
  color: #848891;
}

#createStudioContinueButton {
  margin-top: 20px;
  margin-bottom: 10px;
}

#budgetSelectElement {
  margin-top: 10px;
}

.selectLogoElement {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  position: relative;
  width: 70%;
  gap: 15px;
  margin-bottom: 20px;
}
.availableIconsElements {
  margin-top: 10px;
  flex: 0 1 calc(20% - 8px);
}

.createStudioBoxDatabaseSelection {
  margin-top: 10px;
  margin-left: 16px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.databaseLabel {
  margin-left: 10px;
  font-size: 14px;
}

input[type='radio']:after {
  top: -2px;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  position: relative;
  background-color: #1C222F;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 5px solid #252D3E;
}

input[type='radio']:checked:after {
  top: -2px;
  left: -3px;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  position: relative;
  background-color: #FF3A4D;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 5px solid #252D3E;
}
</style>