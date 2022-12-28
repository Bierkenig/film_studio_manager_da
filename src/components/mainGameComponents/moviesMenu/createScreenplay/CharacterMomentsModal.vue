<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
              <h2 class="characterMomentHeader">{{ $t('characterMoments') }}</h2>
              <div id="characterMomentPersonDiv">
                <select
                    id="characterOne"
                    class="characterMomentSelect"
                    onfocus="this.size=5;"
                    onblur="this.size=1;"
                    onchange="this.size=1; this.blur();"
                    @change="selectCharacterOne($event)"
                >
                  <option value="" disabled selected hidden>{{ $t('character') }} 1</option>
                  <option
                      v-for="(item, index) in this.allCharacters"
                      :key="index"
                      :value="index">{{ item.name }}</option>
                </select>
                <select
                    id="characterMoment"
                    class="characterMomentSelect"
                    onfocus="this.size=5;"
                    onblur="this.size=1;"
                    onchange="this.size=1; this.blur();"
                    @change="selectMoment($event)"
                >
                  <option value="" disabled selected hidden>{{ $t('moment') }}</option>
                  <option value="dies">{{ $t('dies') }}</option>
                  <option value="kills">{{ $t('kills') }}</option>
                  <option value="defies">{{ $t('defies') }}</option>
                  <option value="losesTo">{{ $t('losesTo') }}</option>
                  <option value="escapes">{{ $t('escapes') }}</option>
                  <option value="isCaptured">{{ $t('isCaptured') }}</option>
                  <option value="runsAway">{{ $t('runsAway') }}</option>
                  <option value="isOnAMission">{{ $t('isOnAMission') }}</option>
                  <option value="completesTheMission">{{ $t('completesTheMission') }}</option>
                  <option value="losesSomeoneImportant">{{ $t('losesSomeoneImportant') }}</option>
                  <option value="isAlive">{{ $t('isAlive') }}</option>
                  <option value="helps">{{ $t('helps') }}</option>
                  <option value="sendsOnAMission">{{ $t('sendsOnAMission') }}</option>
                  <option value="fights">{{ $t('fights') }}</option>
                  <option value="letsGo">{{ $t('letsGo') }}</option>
                  <option value="fallsInLoveWith">{{ $t('fallsInLoveWith') }}</option>
                </select>
                <select
                    id="characterTwo"
                    class="characterMomentSelect"
                    onfocus="this.size=5;"
                    onblur="this.size=1;"
                    onchange="this.size=1; this.blur();"
                    :disabled="selectedMoment === 'dies' || selectedMoment === 'escapes' || selectedMoment === 'isCaptured' ||
                                selectedMoment === 'runsAway' || selectedMoment === 'isOnAMission' || selectedMoment === 'completesTheMission' ||
                                selectedMoment === 'losesSomeoneImportant' || selectedMoment === 'isAlive'"
                    @change="selectCharacterTwo($event)"
                >
                  <option value="" disabled selected hidden>{{ $t('character') }} 2</option>
                  <option
                      v-for="(item, index) in this.allCharacters"
                      :key="index"
                      :value="index"
                      :disabled="selectedCharacterOne === index">{{ item.name }}</option>
                </select>
              </div>
              <select
                  id="act"
                  class="characterMomentSelect"
                  onfocus="this.size=5;"
                  onblur="this.size=1;"
                  onchange="this.size=1; this.blur();"
                  @change="selectAct($event)"
              >
                <option value="" disabled selected hidden>{{ $t('acts') }}</option>
                <option :value="1">{{ $t('act1') }}</option>
                <option :value="2">{{ $t('act2') }}</option>
                <option :value="3">{{ $t('act3') }}</option>
              </select>
            </slot>
          </div>

          <div class="modal-footer characterMomentFooter">
            <slot name="footer">
              <custom-button
                  class="modal-default-button"
                  :dark="false"
                  size="small"
                  :disabled="selectedCharacterOne == null || !selectedMoment || !selectedAct || ((selectedMoment === 'kills'
                                  || selectedMoment === 'defies' || selectedMoment === 'losesTo' || selectedMoment === 'helps'
                                  || selectedMoment === 'sendsOnAMission' || selectedMoment === 'fights'
                                  || selectedMoment === 'letsGo' || selectedMoment === 'fallsInLoveWith') && !selectedCharacterTwo)"
                  @clicked="sendCharacterMoments">{{ $t('save') }}</custom-button>
              <custom-button
                  class="modal-default-button"
                  :dark="false"
                  size="small"
                  @clicked="$emit('close')">{{ $t('close') }}</custom-button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "CharacterMomentsModal",
  components: {CustomButton},

  data(){
    return {
      selectedCharacterOne: null,
      selectedCharacterTwo: null,
      selectedMoment: null,
      selectedAct: null,
      realMessage: '',
      allCharacters: [],
    }
  },

  mounted() {
    let roles = this.$store.getters.getCurrentScreenplay.getRoles();

    Object.keys(roles).forEach(key => {
      if(roles[key].length !== 0)
      roles[key].forEach(this.getCharactersOfCurrentScreenplay);
    });
  },

  methods: {
    selectCharacterOne(event){
      this.selectedCharacterOne = parseInt(event.target.value);
      this.realMessage = this.allCharacters[event.target.value].name + ' ';
    },

    selectCharacterTwo(event){
      this.selectedCharacterTwo = event.target.value;
    },

    selectMoment(event){
      this.selectedMoment = event.target.value;
    },

    selectAct(event){
      this.selectedAct = event.target.value;
    },

    sendCharacterMoments(){
      if(document.getElementById('characterTwo').disabled){
        this.$emit('sendCharacterMoments',[this.allCharacters[this.selectedCharacterOne].name, this.selectedMoment, ''], this.selectedAct);
      } else {
        this.$emit('sendCharacterMoments',[this.allCharacters[this.selectedCharacterOne].name, this.selectedMoment, this.allCharacters[this.selectedCharacterTwo].name], this.selectedAct);
      }
      this.$emit('close');
    },

    getCharactersOfCurrentScreenplay(item){
      this.allCharacters.push(item)
    }
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 5px 30px 20px 30px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.characterMomentSelect {
  margin-top: 10px;
  font-size: 15px;
  padding: 0.25em;
  width: 30%;
  border-radius: 10px;
  position: relative;
  background-color: var(--fsm-dark-blue-4);
  display: inline-block;
  visibility: visible;
  border-style: none;
  outline: none;
}

.characterMomentFooter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px
}

.characterMomentHeader {
  font-weight: var(--fsm-fw-bold) !important;
  color: var(--fsm-pink-1) !important;
}

#characterMomentPersonDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}

option:disabled,
option[disabled]{
  color: #848891;
  border-radius: var(--fsm-s-border-radius);
}

.modal-default-button:disabled,
.modal-default-button[disabled] {
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

#act {
  width: 100%;
}
</style>