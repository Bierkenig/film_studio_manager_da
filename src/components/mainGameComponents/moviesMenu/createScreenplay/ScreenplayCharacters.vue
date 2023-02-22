<template>
  <div id="charactersDetailsDiv">
    <div id="characterDetailsVertical">
      <div id="castedCharacterDetails">
        <div id="castedCharacterDetailsHeading">{{ $t('character') }} Information</div>
        <div id="castedCharacterDetailsData">
          <div id="castedCharacterDetailsMainCharacters">
            <div id="castedCharacterDetailsMainCharactersHint">{{ $t('main') }}</div>
            <div id="castedCharacterDetailsMainCharactersValue">{{ numberOfMainCharacters }}/5 - ({{ $t('between15') }})</div>
          </div>
          <div id="castedCharacterDetailSupportCharacters">
            <div id="castedCharacterDetailSupportCharactersHint">{{ $t('support') }}</div>
            <div id="castedCharacterDetailSupportCharactersValue">{{ numberOfSupportCharacters }}/5 - ({{ $t('between15') }})</div>
          </div>
          <div id="castedCharacterDetailsMinorCharacters">
            <div id="castedCharacterDetailsMinorCharactersHint">Minor</div>
            <div id="castedCharacterDetailsMinorCharactersValue">{{ numberOfMinorCharacters }}/5 - ({{ $t('between15') }})</div>
          </div>
          <div id="castedCharacterDetailsCameoCharacters">
            <div id="castedCharacterDetailsCameoCharactersHint">Cameo</div>
            <div id="castedCharacterDetailsCameoCharactersValue">{{ numberOfCameoCharacters }}/5 - ({{ $t('between05') }})</div>
          </div>
          <div id="castedCharacterDetailsVoiceOverCharacters">
            <div id="castedCharacterDetailsVoiceOverCharactersHint">{{ $t('voiceOver') }}</div>
            <div id="castedCharacterDetailsVoiceOverCharactersValue">{{ numberOfVoiceOverCharacters }}/5 - ({{ $t('between05') }})</div>
          </div>
        </div>
        <button v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus" id="CharacterDetailsBackButton" class="buttonStyle" @click="goBack">{{ $t('back') }}</button>
        <button id="CharacterDetailsContinueButton" class="buttonStyle" :disabled="numberOfMainCharacters === 0 || numberOfSupportCharacters === 0 || numberOfMinorCharacters === 0" @click="continueCreateMovie">{{ $t('continue') }}</button>
      </div>
      <div id="characterDetails">
        <div>
          <input id="characterName" v-model="characterName" :placeholder="$t('character') + ' Name'" />
          <select
              id="characterGender"
              onfocus="this.size=5;"
              onblur="this.size=1;"
              onchange="this.size=1; this.blur();"
              v-model="characterGender"
          >
            <option :value="null" disabled selected hidden>{{ $t('gender') }}</option>
            <option value="male">{{ $t('male') }}</option>
            <option value="female">{{ $t('female') }}</option>
            <option value="diverse">{{ $t('diverse') }}</option>
          </select>
          <input id="characterAge" type="number" v-model="characterAge" :placeholder="$t('character') + $t('age')" min="1" max="99" />
        </div>
        <div id="characterDetailsRoleTypes">
          <div id="characterDetailsRoleTypesHint">{{ $t('castAs') }}</div>
          <div id="characterDetailsRoleTypesInput">
            <div id="characterDetailsRoleMain">
              <input id="characterDetailsRoleMainInput" v-model="radio" type="radio" class="radioButton" value="main" :disabled="numberOfMainCharacters === 5" />
              <label for="characterDetailsRoleMainInput" class="characterDetailsRoleTypesLabel">{{ $t('main') }}</label>
            </div>
            <div id="characterDetailsRoleSupport">
              <input id="characterDetailsRoleSupportInput" v-model="radio" type="radio" class="radioButton" value="support" :disabled="numberOfSupportCharacters === 5" />
              <label for="characterDetailsRoleSupportInput" class="characterDetailsRoleTypesLabel">{{ $t('support') }}</label>
            </div>
            <div id="characterDetailsRoleMinor">
              <input id="characterDetailsRoleMinorInput" v-model="radio" type="radio" class="radioButton" value="minor" :disabled="numberOfMinorCharacters === 5" />
              <label for="characterDetailsRoleMinorInput" class="characterDetailsRoleTypesLabel">Minor</label>
            </div>
            <div id="characterDetailsRoleCameo">
              <input id="characterDetailsRoleCameoInput" v-model="radio" type="radio" class="radioButton" value="cameo" :disabled="numberOfCameoCharacters === 5" />
              <label for="characterDetailsRoleCameoInput" class="characterDetailsRoleTypesLabel">Cameo</label>
            </div>
            <div id="characterDetailsRoleVoiceOver">
              <input id="characterDetailsRoleVoiceOverInput" v-model="radio" type="radio" class="radioButton" value="voiceOver" :disabled="numberOfVoiceOverCharacters === 5" />
              <label for="characterDetailsRoleVoiceOverInput" class="characterDetailsRoleTypesLabel">{{ $t('voiceOver') }}</label>
            </div>
          </div>
        </div>
        <button id="characterDetailsSaveButton" class="buttonStyle" :disabled="radio === null || !characterGender || !characterName || !characterAge" @click="saveCharacter">{{ $t('saveCharacter') }}</button>
      </div>
      <div>
        {{ this.$store.getters.getCurrentScreenplay.roles }}
      </div>
    </div>
  </div>
</template>

<script>
import {Character} from "@/classes/Character";
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "ScreenplayCharacters",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data(){
    return {
      numberOfMainCharacters: this.$store.getters.getCurrentScreenplay.roles.main.length,
      numberOfSupportCharacters: this.$store.getters.getCurrentScreenplay.roles.support.length,
      numberOfMinorCharacters: this.$store.getters.getCurrentScreenplay.roles.minor.length,
      numberOfCameoCharacters: this.$store.getters.getCurrentScreenplay.roles.cameo.length,
      numberOfVoiceOverCharacters: this.$store.getters.getCurrentScreenplay.roles.voiceOver.length,
      characterName: '',
      characterGender: null,
      characterAge: 1,
      radio: null,
    }
  },

  methods: {
    saveCharacter(){
      if (this.radio === 'main'){
        this.numberOfMainCharacters++;
        this.$store.commit('addCurrentScreenplayMainCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.radio === 'support'){
        this.numberOfSupportCharacters++;
        this.$store.commit('addCurrentScreenplaySupportCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.radio === 'minor'){
        this.numberOfMinorCharacters++;
        this.$store.commit('addCurrentScreenplayMinorCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.radio === 'cameo'){
        this.numberOfCameoCharacters++;
        this.$store.commit('addCurrentScreenplayCameoCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.radio === 'voiceOver'){
        this.numberOfVoiceOverCharacters++;
        this.$store.commit('addCurrentScreenplayVoiceOverCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      }
      this.radio = null;
      this.characterName = '';
      this.characterAge = 1;
      this.characterGender = null
    },

    continueCreateMovie(){
      this.$router.push({name: 'screenplayPlot'});
    },

    goBack(){
      this.$router.push({name: 'createScreenplay'})
    }
  }
}
</script>

<style scoped>

</style>