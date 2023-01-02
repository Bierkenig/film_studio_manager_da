<template>
  <div id="createScreenplayMainDiv">
    <div id="createScreenplaySubDiv">
      <div>
        <icon-button
            v-if="this.$router.options.history.state.back !== '/screenplaySummary'"
            id="createScreenplayBackButton"
            icon="simple-arrow-left"
            size="medium"
            :dark="true"
            :bg-gradient="true"
            :icon-gradient="false"
            :shadow="false"
            @click="goBack()"/>
      </div>
      <div class="createScreenplayBackground">
        <div class="verticalScroll">
          <div>
            <h2 class="createScreenplayHeading">
              {{ $t('general') }}
            </h2>
            <div class="createScreenplayBox">
              <div class="createScreenplayBoxInnerElement">
                <div>
                  <label id="createScreenplayNameLabel" for="createScreenplayName">{{ $t('newsData.movie') }} Name</label>
                  <input id="createScreenplayName" v-model="title" type="text" :placeholder="$t('screenplay') + ' ' + $t('newsData.title')" />
                </div>
                <div>
                  <label id="createScreenplayDescriptionLabel" for="createScreenplayDescription">{{ $t('description') }}</label>
                  <input id="createScreenplayDescription" v-model="desc" type="text" :placeholder="$t('screenplay') + ' ' + $t('description')" />
                </div>
                <div id="radioBox">
                  <div id="typeHint">
                    Type
                  </div>
                  <value-select id="typeSelectElement" :type="type" :value-array="['Animation','Feature','Indie']" type-of-values="ScreenplayType" @send-value="setSelectedType"/>
                </div>
              </div>
            </div>
          </div>
          <div class="createScreenplaySubcontainer">
            <h2 class="createScreenplayHeading">
              Story
            </h2>
            <div class="createScreenplayBox">
              <div class="createScreenplayBoxInnerElement">
                <div id="radioBox">
                  <div id="typeHint">
                    Genre
                  </div>
                  <div id="createScreenplayGenreSelect">
                    <select
                        class="createScreenplaySelect"
                        id="createScreenplayGenre"
                        v-model="genre"
                    >
                      <option :value="null" disabled selected hidden>Genre</option>
                      <option value="Action">Action</option>
                      <option value="Adventure">{{ $t('adventure') }}</option>
                      <option value="Biography">{{ $t('biography') }}</option>
                      <option value="Comedy">{{ $t('comedy') }}</option>
                      <option value="Crime">{{ $t('crime') }}</option>
                      <option value="Documentary">{{ $t('documentary') }}</option>
                      <option value="Drama">Drama</option>
                      <option value="Erotic">{{ $t('erotic') }}</option>
                      <option value="Family">{{ $t('family') }}</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="History">{{ $t('history') }}</option>
                      <option value="Horror">Horror</option>
                      <option value="Musical">Musical</option>
                      <option value="Mystery">{{ $t('mystery') }}</option>
                      <option value="Romance">{{ $t('romance') }}</option>
                      <option value="ScienceFiction">Sci-Fi</option>
                      <option value="Sport">Sport</option>
                      <option value="Thriller">Thriller</option>
                      <option value="War">{{ $t('war') }}</option>
                      <option value="Western">Western</option>
                    </select>
                    <select
                        class="createScreenplaySelect"
                        id="createScreenplaySubgenre"
                        :disabled="!this.genre"
                        v-model="subgenre"
                    >
                      <option :value="null" disabled selected hidden>Subgenre</option>
                      <option value="Action" :disabled="this.genre === 'Action'">Action</option>
                      <option value="Adventure" :disabled="this.genre === 'Adventure'">{{ $t('adventure') }}</option>
                      <option value="Biography" :disabled="this.genre === 'Biography'">{{ $t('biography') }}</option>
                      <option value="Comedy" :disabled="this.genre === 'Comedy'">{{ $t('comedy') }}</option>
                      <option value="Crime" :disabled="this.genre === 'Crime'">{{ $t('crime') }}</option>
                      <option value="Documentary" :disabled="this.genre === 'Documentary'">{{ $t('documentary') }}</option>
                      <option value="Drama" :disabled="this.genre === 'Drama'">Drama</option>
                      <option value="Erotic" :disabled="this.genre === 'Erotic'">{{ $t('erotic') }}</option>
                      <option value="Family" :disabled="this.genre === 'Family'">{{ $t('family') }}</option>
                      <option value="Fantasy" :disabled="this.genre === 'Fantasy'">Fantasy</option>
                      <option value="History" :disabled="this.genre === 'History'">{{ $t('history') }}</option>
                      <option value="Horror" :disabled="this.genre === 'Horror'">Horror</option>
                      <option value="Musical" :disabled="this.genre === 'Musical'">Musical</option>
                      <option value="Mystery" :disabled="this.genre === 'Mystery'">{{ $t('mystery') }}</option>
                      <option value="Romance" :disabled="this.genre === 'Romance'">{{ $t('romance') }}</option>
                      <option value="ScienceFiction" :disabled="this.genre === 'Science-Fiction'">Sci-Fi</option>
                      <option value="Sport" :disabled="this.genre === 'Sport'">Sport</option>
                      <option value="Thriller" :disabled="this.genre === 'Thriller'">Thriller</option>
                      <option value="War" :disabled="this.genre === 'War'">{{ $t('war') }}</option>
                      <option value="Western" :disabled="this.genre === 'Western'">Western</option>
                    </select>
                  </div>
                </div>
                <div id="radioBox">
                  <div id="typeHint">
                    {{ $t('topics') }}
                  </div>
                  <div id="createScreenplayTopicsSelect">
                    <select
                        class="createScreenplaySelect"
                        v-for="index in 3"
                        :key="index"
                        :id="'topic' + index"
                        :disabled="disableSelect(index)"
                        v-model="topics[index-1]"
                    >
                      <option :value="undefined" disabled selected hidden>{{ $t('topic') }} {{ index }}</option>
                      <option
                          v-for="(it,ind) in this.allTopics"
                          :key="ind"
                          :value="it"
                          :disabled="disableTopic(it,index)">{{ it }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="createScreenplaySubcontainer">
            <h2 class="createScreenplayHeading">
              Details
            </h2>
            <div class="createScreenplayBox">
              <div class="createScreenplayBoxInnerElement">
                <div id="scopeBox">
                  <div id="scopeHint">
                    {{ $t('scope') }}
                  </div>
                  <value-select id="scopeSelectElement" :type="selectedScope" :value-array="['Little','Small','Normal','Large','Epic']" type-of-values="Scope" @send-value="setSelectedScope"/>
                </div>
                <div id="toneBox">
                  <div id="toneHint">
                    {{ $t('tone') }}
                  </div>
                  <value-select id="toneSelectElement" :type="selectedTone" :value-array="['Depressing','Dark','Realistic','Upbeat','Lighthearted']" type-of-values="Tone" @send-value="setSelectedTone"/>
                </div>
                <div id="specialEffectsBox">
                  <div id="specialEffectsHint">
                    {{ $t('useOfSpecialEffects') }}
                  </div>
                  <value-select id="specialEffectsSelectElement" :type="selectedSpecialEffects" :value-array="['None','Some','Medium','Lots','Spectacle']" type-of-values="SpecialEffects" @send-value="setSelectedSpecialEffects"/>
                </div>
              </div>
            </div>
          </div>
          <div class="createScreenplaySubcontainer">
            <h2 class="createScreenplayHeading">
              {{ $t('ageRating') }}
            </h2>
            <div class="createScreenplayBox">
              <div class="createScreenplayBoxInnerElement">
                <div id="violenceBox">
                  <div id="violenceHint">
                    {{ $t('violence') }}
                  </div>
                  <value-select id="violenceSelectElement" :type="selectedViolence" :value-array="['None','Mild','Intensive','Graphical','Realistic']" type-of-values="Violence" @send-value="setSelectedViolence"/>
                </div>
                <div id="cursingBox">
                  <div id="cursingHint">
                    {{ $t('cursing') }}
                  </div>
                  <value-select id="cursingSelectElement" :type="selectedCursing" :value-array="['None','Mild','Strong','Crude','Offensive']" type-of-values="Cursing" @send-value="setSelectedCursing"/>
                </div>
                <div id="loveScenesEffectsBox">
                  <div id="loveScenesEffectsHint">
                    {{ $t('loveScenes') }}
                  </div>
                  <value-select id="loveScenesSelectElement" :type="selectedLoveScenes" :value-array="['None','Suitable','Passionate','Steamy','Explicit']" type-of-values="LoveScenes" @send-value="setSelectedLoveScenes"/>
                </div>
              </div>
            </div>
          </div>
          <div class="createScreenplaySubcontainer">
            <h2 class="createScreenplayHeading">
              {{ $t('character') }}
            </h2>
            <div class="createScreenplayBox">
              <div class="createScreenplayBoxInnerElement">
                <div id="characterBox">
                  <div id="createScreenplayCharacterLeftSection">
                    <div id="createScreenplayCharacterLeftSectionInnerBox">
                      <div id="createScreenplayCharacterLeftSectionInnerBoxElements" class="verticalScroll">
                        <div class="createScreenplayCharacterElement" v-for="(it, index) in this.$store.getters.getCurrentScreenplay.roles.main" :key="index">
                          <div>{{ it.name }}</div>
                          <div>{{ $t('main') }}</div>
                        </div>
                        <div class="createScreenplayCharacterElement" v-for="(it, index) in this.$store.getters.getCurrentScreenplay.roles.support" :key="index">
                          <div>{{ it.name }}</div>
                          <div>{{ $t('support') }}</div>
                        </div>
                        <div class="createScreenplayCharacterElement" v-for="(it, index) in this.$store.getters.getCurrentScreenplay.roles.minor" :key="index">
                          <div>{{ it.name }}</div>
                          <div>Minor</div>
                        </div>
                        <div class="createScreenplayCharacterElement" v-for="(it, index) in this.$store.getters.getCurrentScreenplay.roles.cameo" :key="index">
                          <div>{{ it.name }}</div>
                          <div>Cameo</div>
                        </div>
                        <div class="createScreenplayCharacterElement" v-for="(it, index) in this.$store.getters.getCurrentScreenplay.roles.voiceOver" :key="index">
                          <div>{{ it.name }}</div>
                          <div>{{ $t('voiceOver') }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="createScreenplayCharacterRightSection">
                    <input id="createScreenplayCharacterName" v-model="characterName" :placeholder="$t('character') + ' Name'" />
                    <input id="createScreenplayCharacterAge" type="number" v-model="characterAge" :placeholder="$t('character') + $t('age')" min="1" max="99" />
                    <select
                        class="createScreenplaySelect"
                        id="createScreenplayCharacterGender"
                        v-model="characterGender"
                    >
                      <option :value="null" disabled selected hidden>{{ $t('gender') }}</option>
                      <option value="male">{{ $t('male') }}</option>
                      <option value="female">{{ $t('female') }}</option>
                      <option value="diverse">{{ $t('diverse') }}</option>
                    </select>
                    <select
                        class="createScreenplaySelect"
                        id="createScreenplayCharacterRole"
                        v-model="characterRole"
                    >
                      <option :value="null" disabled selected hidden>{{ $t('castAs') }}</option>
                      <option value="main" :disabled="numberOfMainCharacters === 3">{{ $t('main') }}</option>
                      <option value="support" :disabled="numberOfSupportCharacters === 3">{{ $t('support') }}</option>
                      <option value="minor" :disabled="numberOfMinorCharacters === 3">Minor</option>
                      <option value="cameo" :disabled="numberOfCameoCharacters === 3">Cameo</option>
                      <option value="voiceOver" :disabled="numberOfVoiceOverCharacters === 3">{{ $t('voiceOver') }}</option>
                    </select>
                  </div>
                </div>
                <custom-button
                    id="createScreenplayCharacterAddButton"
                    :dark="false"
                    size="small"
                    :disabled="characterName === '' || characterGender === null || characterRole === null"
                    @clicked="saveCharacter">{{ $t('add') }}</custom-button>
              </div>
            </div>
          </div>
          <custom-button
              id="createScreenplayContinueButton"
              :dark="false"
              size="medium"
              :disabled="!genre || !title || !desc || !type || topics[0] === undefined
            || !selectedScope || !selectedTone || !selectedSpecialEffects || !selectedViolence
            || !selectedCursing || !selectedLoveScenes || numberOfMainCharacters === 0 ||
            numberOfSupportCharacters === 0 || numberOfMinorCharacters === 0"
              @clicked="continueCreateScreenplay">{{ $t('continue')}}</custom-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton.vue";
import ValueSelect from "@/components/mainGameComponents/moviesMenu/ValueSelect.vue";
import {Character} from "@/classes/Character";
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "NewCreateScreenplay",
  components: {CustomButton, ValueSelect, IconButton},

  data(){
    return {
      title: this.$store.getters.getCurrentScreenplay.title,
      desc: this.$store.getters.getCurrentScreenplay.description,
      type: this.$store.getters.getCurrentScreenplay.type,

      genre: this.$store.getters.getCurrentScreenplay.genre,
      subgenre: this.$store.getters.getCurrentScreenplay.subgenre,
      topics: [this.$store.getters.getCurrentScreenplay.topics.firstTopic,
        this.$store.getters.getCurrentScreenplay.topics.secondTopic,
        this.$store.getters.getCurrentScreenplay.topics.thirdTopic],
      allTopics: this.$store.getters.getAllTopics,

      selectedScope: this.$store.getters.getCurrentScreenplay.details.scope,
      selectedTone: this.$store.getters.getCurrentScreenplay.details.tone,
      selectedSpecialEffects: this.$store.getters.getCurrentScreenplay.details.specialEffects,

      selectedViolence: this.$store.getters.getCurrentScreenplay.ageRatingDetails.violence,
      selectedCursing: this.$store.getters.getCurrentScreenplay.ageRatingDetails.cursing,
      selectedLoveScenes: this.$store.getters.getCurrentScreenplay.ageRatingDetails.loveScenes,
      ageRatingScala: {1: 'G / +3', 2: 'PG / +7', 3: 'PG-13 / +13', 4: 'R / +16', 5: 'NC-17 / +18'},

      screenplayLength: this.$store.getters.getCurrentScreenplay.length,
      minScreenplayLength: null,

      characterName: '',
      characterGender: null,
      characterAge: 1,
      characterRole: null,

      numberOfMainCharacters: this.$store.getters.getCurrentScreenplay.roles.main.length,
      numberOfSupportCharacters: this.$store.getters.getCurrentScreenplay.roles.support.length,
      numberOfMinorCharacters: this.$store.getters.getCurrentScreenplay.roles.minor.length,
      numberOfCameoCharacters: this.$store.getters.getCurrentScreenplay.roles.cameo.length,
      numberOfVoiceOverCharacters: this.$store.getters.getCurrentScreenplay.roles.voiceOver.length,
    }
  },

  mounted(){
    this.selectedViolence = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.$store.getters.getCurrentScreenplay.ageRatingDetails.violence);
    this.selectedCursing = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.$store.getters.getCurrentScreenplay.ageRatingDetails.cursing);
    this.selectedLoveScenes = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.$store.getters.getCurrentScreenplay.ageRatingDetails.loveScenes);

    if(this.$store.getters.getCurrentScreenplay.getType() === 'Feature'){
      this.minScreenplayLength = 60;
    } else {
      this.minScreenplayLength = 40;
    }
  },

  methods: {
    continueCreateScreenplay(){
      this.$store.getters.getCurrentScreenplay.title = this.title;
      this.$store.getters.getCurrentScreenplay.type = this.type;
      this.$store.getters.getCurrentScreenplay.description = this.desc;
      this.$store.getters.getCurrentScreenplay.genre = this.genre;
      this.$store.getters.getCurrentScreenplay.subgenre = this.subgenre;
      this.$store.getters.getCurrentScreenplay.topics.firstTopic = this.topics[0];
      this.$store.getters.getCurrentScreenplay.topics.secondTopic = this.topics[1];
      this.$store.getters.getCurrentScreenplay.topics.thirdTopic = this.topics[2];
      this.$store.getters.getCurrentScreenplay.franchise = this.$store.getters.getCurrentFranchise;
      this.$store.getters.getCurrentScreenplay.setScope(this.selectedScope);
      this.$store.getters.getCurrentScreenplay.setTone(this.selectedTone);
      this.$store.getters.getCurrentScreenplay.setSpecialEffects(this.selectedSpecialEffects);
      this.$store.getters.getCurrentScreenplay.setViolence(this.ageRatingScala[this.selectedViolence]);
      this.$store.getters.getCurrentScreenplay.setCursing(this.ageRatingScala[this.selectedCursing]);
      this.$store.getters.getCurrentScreenplay.setLoveScenes(this.ageRatingScala[this.selectedLoveScenes]);
      this.$store.getters.getCurrentScreenplay.setAgeRating(this.ageRatingScala[Math.max(this.selectedViolence, this.selectedCursing, this.selectedLoveScenes)]);

      console.log(this.$store.getters.getCurrentScreenplay);
      this.$router.push({name: 'screenplayPlot'});
    },

    goBack(){
      this.$router.push({name: 'movies'})
    },

    setSelectedType(value){
      this.type = value;
    },

    setSelectedScope(value){
      this.selectedScope = value;
    },

    setSelectedTone(value){
      this.selectedTone = value;
    },

    setSelectedSpecialEffects(value){
      this.selectedSpecialEffects = value;
    },

    setSelectedViolence(value){
      this.selectedViolence = value;
    },

    setSelectedCursing(value){
      this.selectedCursing = value;
    },

    setSelectedLoveScenes(value){
      this.selectedLoveScenes = value;
    },

    disableTopic(value, index){
      if(index === 2){
        return value === this.topics[0];
      } else if(index === 3){
        return value === this.topics[0] || value === this.topics[1];
      }
    },

    disableSelect(index){
      if((index === 2 || index === 3) && this.topics[0] === null){
        return true;
      } else if(index === 3 && this.topics[1] === null){
        return true;
      } else {
        return false;
      }
    },

    saveCharacter(){
      if (this.characterRole === 'main'){
        this.numberOfMainCharacters++;
        this.$store.commit('addCurrentScreenplayMainCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.characterRole === 'support'){
        this.numberOfSupportCharacters++;
        this.$store.commit('addCurrentScreenplaySupportCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.characterRole === 'minor'){
        this.numberOfMinorCharacters++;
        this.$store.commit('addCurrentScreenplayMinorCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.characterRole === 'cameo'){
        this.numberOfCameoCharacters++;
        this.$store.commit('addCurrentScreenplayCameoCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      } else if (this.characterRole === 'voiceOver'){
        this.numberOfVoiceOverCharacters++;
        this.$store.commit('addCurrentScreenplayVoiceOverCharacter',new Character(this.characterName,this.characterGender, this.characterAge));
      }
      this.characterRole = null;
      this.characterName = '';
      this.characterAge = 1;
      this.characterGender = null
    },
  }
}
</script>

<style scoped>
/*Main Div Design*/
#createScreenplayMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/*Header Design*/
.createScreenplayHeading {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

.createScreenplaySubcontainer {
  margin-top: 15px;
}

/*Background Design*/
.createScreenplayBackground {
  display: flex;
  flex-direction: column;
  gap: 15px;

  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  width: 600px;
  height: 650px;
  padding: 10px 20px 10px 20px;
}

/*Back Button Design*/
#createScreenplayBackButton {
  position: absolute;
  float: left;
  left: 100px;
  top: 20px;
}

/*General Settings Box Design*/
.createScreenplayBox {
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  margin-top: 10px;
  padding-bottom: 0.5px;
}

.createScreenplayBoxInnerElement {
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
}

#createScreenplayName, #createScreenplayDescription, #createScreenplayCharacterName,
#createScreenplayCharacterAge {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  border-style: none;
  height: 30px;
  width: 97%;
  margin-top: 10px;
  padding-left: 10px;
  margin-bottom: 20px;
}

#createScreenplayName:focus, #createScreenplayDescription:focus,
#createScreenplayCharacterName:focus, #createScreenplayCharacterAge:focus{
  outline: none;
}

#typeSelectElement, #scopeSelectElement, #toneSelectElement, #specialEffectsSelectElement,
#violenceSelectElement, #cursingSelectElement, #loveScenesSelectElement{
  margin-top: 10px;
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

/* Story Settings Box Design */
/* Genre Select*/
#createScreenplayGenreSelect {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-bottom: 15px;
}

.createScreenplaySelect {
  margin-top: 10px;
  font-size: 15px;
  padding: 0.25em;
  width: 30%;
  border-radius: 10px;
  position: relative;
  background-color: #252D3E;
  display: inline-block;
  visibility: visible;
  border-style: none;
  outline: none;
}

/* Topics Select*/
#createScreenplayTopicsSelect {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-bottom: 15px;
}

/* Character Box Desing */
#createScreenplayCharacterGender,
#createScreenplayCharacterName,
#createScreenplayCharacterAge {
  margin-top: 0 !important;
}

#createScreenplayCharacterGender,
#createScreenplayCharacterRole {
  width: 70%;
}

#characterBox {
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  gap: 15px;
}

#createScreenplayCharacterRightSection {
  display: flex;
  flex-direction: column;
  width: 50%;
}

#createScreenplayCharacterLeftSection {
  width: 50%;
}

#createScreenplayCharacterLeftSectionInnerBox {
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-m-border-radius);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
  gap: 10px;
}

#createScreenplayCharacterLeftSectionInnerBoxElements {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 160px;
  width: 90%;
}

#createScreenplayCharacterAddButton {
  margin-bottom: 15px;
  margin-top: 15px;
}

#createScreenplayContinueButton {
  position: absolute;
  float: right;
  right: 100px;
  bottom: 20px;
  width: 15%;
}

#createScreenplayCharacterAddButton:disabled,
#createScreenplayContinueButton:disabled,
#createScreenplayContinueButton[disabled]
#createScreenplayCharacterAddButton[disabled]{
  background-color: var(--fsm-white);
  color: var(--fsm-dark-blue-1);
}

.createScreenplayCharacterElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px 5px 10px;
  width: 85%;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
}

option:disabled,
option[disabled]{
  color: #848891;
  border-radius: var(--fsm-s-border-radius);
}
</style>