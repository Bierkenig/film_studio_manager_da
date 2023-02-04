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
        <background-tile :title="$t('createStudioHeader')">
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
          <h2 class="createStudioHeading" id="createStudioModificationHeading">
            {{ $t('modifications') }}
          </h2>
          <div class="createStudioBox">
            <div class="createStudioBoxInnerElement" id="createStudioBoxModificationInformation">
              <div id="createStudioBoxText">{{ $t('modificationsMsg') }}</div>
            </div>
            <div class="createStudioOutsideBoxDatabaseSelection">
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
              <div v-if="databaseType === 'current'">
                <select
                    id="createStudioDatabaseSelect"
                    v-model="databaseVersion"
                >
                  <option :value="null" disabled selected hidden>Database Number</option>
                  <option :value="1">Database 1</option>
                  <option :value="2">Database 2</option>
                  <option :value="3">Database 3</option>
                </select>
              </div>
            </div>

          </div>
          <custom-button
              id="createStudioContinueButton"
              :dark="false"
              size="medium"
              :disabled="name === '' || name === 'NO STUDIO' || chosenLogo === null || databaseType === '' || (databaseType === 'current' && databaseVersion === null)"
              @clicked="startGame">{{ $t('createStudioButton') }}</custom-button>
        </background-tile>
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
import BackgroundTile from "@/components/kitchenSink/BackgroundTile.vue";

export default {
  name: "CreateStudio",
  components: {BackgroundTile, BudgetSelect, CustomButton, IconButton},
  mixins: [soundeffectMixin('button','click')],

  data() {
    return {
      name: '',
      budget: "250000000",
      databaseVersion: null,
      chosenLogo: null,
      databaseType: "default",
      iconSelected: [false,false,false,false,false,false,false,false,false,false],
      icon: ['placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder','placeholder']//['action','comedy','musical','movies','home','calendar','adventure','alchemy','animal','award']
    }
  },
  methods: {
    startGame() {
      this.$store.commit('resetState')
      this.$store.state.dbFetcher.clear()
      this.$store.state.dbFetcher.fetch()
      if(this.databaseType === 'current'){
        window.ipcRenderer.send('changeDBPath', "./.data/database/fsm_custom" + this.databaseVersion +".db")
      }
      this.$store.commit('createStudio', {studio: new Studio(1,this.name,"2023",parseInt(this.budget),1), logo: this.chosenLogo});
      this.$store.commit('createStudio', {studio: new Studio(1,this.name,"2023",parseInt(this.budget),0), logo: this.chosenLogo});
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
  width: 400px;
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
  width: 70%;
  gap: 15px;
  padding-bottom: 15px;
}
.availableIconsElements {
  margin-top: 10px;
  flex: 0 1 calc(20% - 8px);
}

.createStudioOutsideBoxDatabaseSelection {
  display: flex;
  flex-direction: column;
  gap: 10px
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

#createStudioDatabaseSelect {
  margin-bottom: 15px;
  margin-left: 16px;
  font-size: 15px;
  padding: 0.25em;
  width: 50%;
  border-radius: 10px;
  position: relative;
  background-color: #252D3E;
  display: inline-block;
  visibility: visible;
  border-style: none;
  outline: none;
}
</style>