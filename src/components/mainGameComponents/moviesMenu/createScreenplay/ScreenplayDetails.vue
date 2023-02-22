<template>
  <div>
    <div>
      <h3>Details</h3>
      <div>
        {{ $t('scope') }}
        <select
            id="scope"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedScope"
        >
          <option value="" disabled selected hidden>{{ $t('scope') }}</option>
          <option value="little">{{ $t('little') }}</option>
          <option value="small">{{ $t('small') }}</option>
          <option value="Normal">Normal</option>
          <option value="large">{{ $t('large') }}</option>
          <option value="epic">{{ $t('epic') }}</option>
        </select>
        {{ $t('tone') }}
        <select
            id="tone"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedTone"
        >
          <option value="" disabled selected hidden>{{ $t('tone') }}</option>
          <option value="depressing">{{ $t('depressing') }}</option>
          <option value="dark">{{ $t('dark') }}</option>
          <option value="realistic">{{ $t('realistic') }}</option>
          <option value="upbeat">{{ $t('upbeat') }}</option>
          <option value="epic">{{ $t('epic') }}</option>
        </select>
        {{ $t('useOfSpecialEffects') }}
        <select
            id="specialEffects"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedSpecialEffects"
        >
          <option value="" disabled selected hidden>{{ $t('useOfSpecialEffects') }}</option>
          <option value="none">{{ $t('none') }}</option>
          <option value="some">{{ $t('some') }}</option>
          <option value="medium">{{ $t('medium') }}</option>
          <option value="lots">{{ $t('lots') }}</option>
          <option value="spectacle">{{ $t('spectacle') }}</option>
        </select>
      </div>

      <h3>{{ $t('ageRating') }}</h3>
      <div>
        {{ $t('violence') }}
        <select
            id="violence"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedViolence"
          >
            <option value="" disabled selected hidden>{{ $t('violence') }}</option>
            <option :value="1">{{ $t('none') }}</option>
            <option :value="2">Mild</option>
            <option :value="3">{{ $t('intensive') }}</option>
            <option :value="4">{{ $t('graphical') }}</option>
            <option :value="5">{{ $t('realistic') }}</option>
        </select>
        {{ $t('cursing') }}
        <select
            id="cursing"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedCursing"
        >
          <option value="" disabled selected hidden>{{ $t('cursing') }}</option>
          <option :value="1">{{ $t('none') }}</option>
          <option :value="2">Mild</option>
          <option :value="3">{{ $t('strong') }}</option>
          <option :value="4">{{ $t('crude') }}</option>
          <option :value="5">{{ $t('offensive') }}</option>
        </select>
        {{ $t('loveScenes') }}
        <select
            id="loveScenes"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            v-model="selectedLoveScenes"
        >
          <option value="" disabled selected hidden>{{ $t('loveScenes') }}</option>
          <option :value="1">{{ $t('none') }}</option>
          <option :value="2">{{ $t('familyFriendly') }}</option>
          <option :value="3">{{ $t('passionate') }}</option>
          <option :value="4">{{ $t('steamy') }}</option>
          <option :value="5">{{ $t('explicit') }}</option>
        </select>
        <p>{{ $t('overallAgeRating') }}{{ this.ageRatingScala[Math.max(this.selectedViolence, this.selectedCursing, this.selectedLoveScenes)] }}</p>
      </div>

      <h3>{{ $t('screenplayLength') }}</h3>
      <div>
        <p>{{ $t('screenplayLengthMsgPart1') }} {{ this.minScreenplayLength }} {{ $t('screenplayLengthMsgPart2') }}</p>
        <input
            id="screenplayLength"
            type="number"
            v-model="screenplayLength"
            :max="300"
            :min="this.minScreenplayLength"/>
      </div>
    </div>
    <div>
      <button v-if="this.$store.getters.getCurrentScreenplay.rewritingStatus" id="backButton" class="buttonStyle" @click="goBack">{{ $t('back') }}</button>
      <router-link :to="{name: 'hireWriter'}">
        <button
            id="continueButton"
            @click="saveDetails"
            :disabled="!selectedScope || !selectedTone || !selectedSpecialEffects || !selectedViolence
          || !selectedCursing || !selectedLoveScenes || !screenplayLength
          || screenplayLength > 300 || screenplayLength < minScreenplayLength">{{ $t('continue') }}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "ScreenplayDetails",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  data(){
    return {
      selectedScope: this.$store.getters.getCurrentScreenplay.details.scope,
      selectedTone: this.$store.getters.getCurrentScreenplay.details.tone,
      selectedSpecialEffects: this.$store.getters.getCurrentScreenplay.details.specialEffects,
      selectedViolence: '',
      selectedCursing: '',
      selectedLoveScenes: '',
      screenplayLength: this.$store.getters.getCurrentScreenplay.length,
      minScreenplayLength: null,
      ageRatingScala: {1: 'G / +3', 2: 'PG / +7', 3: 'PG-13 / +13', 4: 'R / +16', 5: 'NC-17 / +18'}
    }
  },

  mounted(){
    this.selectedViolence = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.$store.getters.getCurrentScreenplay.ageRatingDetails.violence)
    this.selectedCursing = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.$store.getters.getCurrentScreenplay.ageRatingDetails.cursing)
    this.selectedLoveScenes = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.$store.getters.getCurrentScreenplay.ageRatingDetails.loveScenes)
    if(this.$store.getters.getCurrentScreenplay.getType() === 'Feature'){
      this.minScreenplayLength = 60;
    } else {
      this.minScreenplayLength = 40;
    }
  },

  methods: {
    saveDetails(){
      this.$store.getters.getCurrentScreenplay.setScope(this.selectedScope);
      this.$store.getters.getCurrentScreenplay.setTone(this.selectedTone);
      this.$store.getters.getCurrentScreenplay.setSpecialEffects(this.selectedSpecialEffects);
      this.$store.getters.getCurrentScreenplay.setViolence(this.ageRatingScala[this.selectedViolence]);
      this.$store.getters.getCurrentScreenplay.setCursing(this.ageRatingScala[this.selectedCursing]);
      this.$store.getters.getCurrentScreenplay.setLoveScenes(this.ageRatingScala[this.selectedLoveScenes]);
      this.$store.getters.getCurrentScreenplay.setAgeRating(this.ageRatingScala[Math.max(this.selectedViolence, this.selectedCursing, this.selectedLoveScenes)]);
      this.$store.getters.getCurrentScreenplay.setLength(this.screenplayLength);
    },

    goBack(){
      this.$router.push({name: 'screenplayPlot'})
    }
  }
}
</script>

<style scoped>

</style>