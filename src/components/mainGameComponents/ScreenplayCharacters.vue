<template>
  <div id="charactersDetailsDiv">
    <div id="characterDetailsVertical">
      <div id="castedCharacterDetails">
        <div id="castedCharacterDetailsHeading">Casting Information</div>
        <div id="castedCharacterDetailsData">
          <div id="castedCharacterDetailsMainCharacters">
            <div id="castedCharacterDetailsMainCharactersHint">Main</div>
            <div id="castedCharacterDetailsMainCharactersValue">{{ numberOfMainCharacters }}/5 - (between 1 and 5)</div>
          </div>
          <div id="castedCharacterDetailSupportCharacters">
            <div id="castedCharacterDetailSupportCharactersHint">Support</div>
            <div id="castedCharacterDetailSupportCharactersValue">{{ numberOfSupportCharacters }}/5 - (between 1 and 5)</div>
          </div>
          <div id="castedCharacterDetailsMinorCharacters">
            <div id="castedCharacterDetailsMinorCharactersHint">Minor</div>
            <div id="castedCharacterDetailsMinorCharactersValue">{{ numberOfMinorCharacters }}/5 - (between 1 and 5)</div>
          </div>
          <div id="castedCharacterDetailsCameoCharacters">
            <div id="castedCharacterDetailsCameoCharactersHint">Minor</div>
            <div id="castedCharacterDetailsCameoCharactersValue">{{ numberOfCameoCharacters }}/5 - (between 0 and 5)</div>
          </div>
          <div id="castedCharacterDetailsVoiceOverCharacters">
            <div id="castedCharacterDetailsVoiceOverCharactersHint">Minor</div>
            <div id="castedCharacterDetailsVoiceOverCharactersValue">{{ numberOfVoiceOverCharacters }}/5 - (between 0 and 5)</div>
          </div>
        </div>
        <button id="CharacterDetailsContinueButton" class="buttonStyle" :disabled="numberOfMainCharacters === 0 || numberOfSupportCharacters === 0 || numberOfMinorCharacters === 0" @click="continueCreateMovie">Continue</button>
      </div>
      <div id="characterDetails">
        <div>
          <input id="characterName" v-model="characterName" placeholder="Character Name" />
          <select
              id="characterGender"
              onfocus="this.size=5;"
              onblur="this.size=1;"
              onchange="this.size=1; this.blur();"
              @change="selectGender($event)"
          >
            <option value="" disabled selected hidden>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="diverse">Diverse</option>
          </select>
          <input id="characterAge" type="number" v-model="characterAge" placeholder="Character Age" min="1" max="99" />
        </div>
        <div id="characterDetailsRoleTypes">
          <div id="characterDetailsRoleTypesHint">Cast As</div>
          <div id="characterDetailsRoleTypesInput">
            <div id="characterDetailsRoleMain">
              <input id="characterDetailsRoleMainInput" v-model="radio" type="radio" class="radioButton" value="main" :disabled="numberOfMainCharacters === 5" />
              <label for="characterDetailsRoleMainInput" class="characterDetailsRoleTypesLabel">Main</label>
            </div>
            <div id="characterDetailsRoleSupport">
              <input id="characterDetailsRoleSupportInput" v-model="radio" type="radio" class="radioButton" value="support" :disabled="numberOfSupportCharacters === 5" />
              <label for="characterDetailsRoleSupportInput" class="characterDetailsRoleTypesLabel">Support</label>
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
              <label for="characterDetailsRoleVoiceOverInput" class="characterDetailsRoleTypesLabel">Voice Over</label>
            </div>
          </div>
        </div>
        <button id="characterDetailsSaveButton" class="buttonStyle" :disabled="radio === null || !characterGender || !characterName || !characterAge" @click="saveCharacter">Save Character</button>
      </div>
    </div>
  </div>
</template>

<script>
import {Character} from "@/classes/Character";

export default {
  name: "ScreenplayCharacters",

  data(){
    return {
      numberOfMainCharacters: 0,
      numberOfSupportCharacters: 0,
      numberOfMinorCharacters: 0,
      numberOfCameoCharacters: 0,
      numberOfVoiceOverCharacters: 0,
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
      console.log(this.$store.getters.getCurrentScreenplay)
    },

    selectGender(event){
      this.characterGender = event.target.value;
    },

    continueCreateMovie(){
      this.$router.push({name: 'movies'});
    }
  }
}
</script>

<style scoped>

</style>