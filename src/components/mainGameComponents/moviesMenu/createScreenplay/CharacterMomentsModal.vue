<template>
  <div>
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
              <fieldset>
                <legend>{{ $t('characterMoments') }}</legend>
                <div>
                  <select
                      id="characterOne"
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
                      onfocus="this.size=5;"
                      onblur="this.size=1;"
                      onchange="this.size=1; this.blur();"
                      @change="selectMoment($event)"
                  >
                    <option value="" disabled selected hidden>{{ $t('moment') }}</option>
                    <option :value="$t('dies')">{{ $t('dies') }}</option>
                    <option :value="$t('kills')">{{ $t('kills') }}</option>
                    <option :value="$t('defies')">{{ $t('defies') }}</option>
                    <option :value="$t('losesTo')">{{ $t('losesTo') }}</option>
                    <option :value="$t('escapes')">{{ $t('escapes') }}</option>
                    <option :value="$t('isCaptured')">{{ $t('isCaptured') }}</option>
                    <option :value="$t('runsAway')">{{ $t('runsAway') }}</option>
                    <option :value="$t('isOnAMission')">{{ $t('isOnAMission') }}</option>
                    <option :value="$t('completesTheMission')">{{ $t('completesTheMission') }}</option>
                    <option :value="$t('losesSomeoneImportant')">{{ $t('losesSomeoneImportant') }}</option>
                    <option :value="$t('isAlive')">{{ $t('isAlive') }}</option>
                    <option :value="$t('helps')">{{ $t('helps') }}</option>
                    <option :value="$t('sendsOnAMission')">{{ $t('sendsOnAMission') }}</option>
                    <option :value="$t('fights')">{{ $t('fights') }}</option>
                    <option :value="$t('letsGo')">{{ $t('letsGo') }}</option>
                    <option :value="$t('fallsInLoveWith')">{{ $t('fallsInLoveWith') }}</option>
                  </select>
                  <select
                      id="characterTwo"
                      onfocus="this.size=5;"
                      onblur="this.size=1;"
                      onchange="this.size=1; this.blur();"
                      :disabled="selectedMoment === $t('dies') || selectedMoment === $t('escapes') || selectedMoment === $t('isCaptured') ||
                                  selectedMoment === $t('runsAway') || selectedMoment === $t('isOnAMission') || selectedMoment === $t('completesTheMission') ||
                                  selectedMoment === $t('losesSomeoneImportant') || selectedMoment === $t('isAlive')"
                      @change="selectCharacterTwo($event)"
                  >
                    <option value="" disabled selected hidden>{{ $t('character') }} 2</option>
                    <option
                        v-for="(item, index) in this.allCharacters"
                        :key="index"
                        :value="item.name"
                        :disabled="selectedCharacterOne === index">{{ item.name }}</option>
                  </select>
                </div>
                <select
                    id="act"
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
              </fieldset>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                {{ $t('close') }}
              </button>
              <button class="modal-default-button" @click="sendCharacterMoments"
                      :disabled="selectedCharacterOne == null || !selectedMoment || !selectedAct || ((selectedMoment === $t('kills')
                                  || selectedMoment === $t('defies') || selectedMoment === $t('losesTo') || selectedMoment === $t('helps')
                                  || selectedMoment === $t('sendsOnAMission') || selectedMoment === $t('fights')
                                  || selectedMoment === $t('letsGo') || selectedMoment === $t('fallsInLoveWith')) && !selectedCharacterTwo)">
                {{ $t('save') }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "CharacterMomentsModal",

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
      console.log(this.selectedCharacterOne);
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
        this.selectedCharacterTwo = '';
      }

      if(this.selectedCharacterTwo === ''){
        this.realMessage += this.selectedMoment;
      } else if(this.selectedMoment === 'lets ... go'){
        this.realMessage += 'lets ' + this.selectedCharacterTwo + ' go';
      } else if(this.selectedMoment === 'lasst ... gehen'){
        this.realMessage += 'lasst ' + this.selectedCharacterTwo + ' gehen';
      } else if(this.selectedMoment === 'sends ... on a mission'){
        this.realMessage += 'sends ' + this.selectedCharacterTwo + ' on a mission';
      } else if(this.selectedMoment === 'schickt ... auf eine Mission'){
        this.realMessage += 'schickt ' + this.selectedCharacterTwo + ' auf eine Mission';
      } else if(this.selectedMoment === 'fordert ... heraus'){
        this.realMessage += 'fordert ' + this.selectedCharacterTwo + ' heraus';
      } else {
        this.realMessage += this.selectedMoment + ' ' + this.selectedCharacterTwo;
      }

      this.$emit('sendCharacterMoments',this.realMessage, this.selectedAct);
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
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
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

</style>