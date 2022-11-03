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
            @change="selectScope($event)"
        >
          <option value="" disabled selected hidden>{{ $t('scope') }}</option>
          <option :value="$t('little')">{{ $t('little') }}</option>
          <option :value="$t('small')">{{ $t('small') }}</option>
          <option value="Normal">Normal</option>
          <option :value="$t('large')">{{ $t('large') }}</option>
          <option :value="$t('epic')">{{ $t('epic') }}</option>
        </select>
        {{ $t('tone') }}
        <select
            id="tone"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            @change="selectTone($event)"
        >
          <option value="" disabled selected hidden>Tone</option>
          <option :value="$t('depressing')">{{ $t('depressing') }}</option>
          <option :value="$t('dark')">{{ $t('dark') }}</option>
          <option :value="$t('realistic')">{{ $t('realistic') }}</option>
          <option :value="$t('upbeat')">{{ $t('upbeat') }}</option>
          <option :value="$t('epic')">{{ $t('epic') }}</option>
        </select>
        {{ $t('useOfSpecialEffects') }}
        <select
            id="specialEffects"
            onfocus="this.size=5;"
            onblur="this.size=1;"
            onchange="this.size=1; this.blur();"
            @change="selectSpecialEffects($event)"
        >
          <option value="" disabled selected hidden>{{ $t('useOfSpecialEffects') }}</option>
          <option :value="$t('none')">{{ $t('none') }}</option>
          <option :value="$t('some')">{{ $t('some') }}</option>
          <option :value="$t('medium')">{{ $t('medium') }}</option>
          <option :value="$t('lots')">{{ $t('lots') }}</option>
          <option :value="$t('spectacle')">{{ $t('spectacle') }}</option>
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
            @change="selectViolence($event)"
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
            @change="selectCursing($event)"
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
            @change="selectLoveScenes($event)"
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
export default {
  name: "ScreenplayDetails",

  data(){
    return {
      selectedScope: null,
      selectedTone: null,
      selectedSpecialEffects: null,
      selectedViolence: null,
      selectedCursing: null,
      selectedLoveScenes: null,
      screenplayLength: null,
      minScreenplayLength: null,
      ageRatingScala: {1: 'G / +3', 2: 'PG / +7', 3: 'PG-13 / +13', 4: 'R / +16', 5: 'NC-17 / +18'}
    }
  },

  mounted(){
    if(this.$store.getters.getCurrentScreenplay.getType() === 'Feature'){
      this.minScreenplayLength = 60;
    } else {
      this.minScreenplayLength = 40;
    }
  },

  methods: {
    selectScope(event) {
      this.selectedScope = event.target.value;
    },

    selectTone(event) {
      this.selectedTone = event.target.value;
    },

    selectSpecialEffects(event){
      this.selectedSpecialEffects = event.target.value;
    },

    selectViolence(event) {
      this.selectedViolence = event.target.value;
    },

    selectCursing(event) {
      this.selectedCursing = event.target.value;
    },

    selectLoveScenes(event){
      this.selectedLoveScenes = event.target.value;
    },

    saveDetails(){
      this.$store.getters.getCurrentScreenplay.setScope(this.selectedScope);
      this.$store.getters.getCurrentScreenplay.setTone(this.selectedTone);
      this.$store.getters.getCurrentScreenplay.setSpecialEffects(this.selectedSpecialEffects);
      this.$store.getters.getCurrentScreenplay.setViolence(this.ageRatingScala[this.selectedViolence]);
      this.$store.getters.getCurrentScreenplay.setCursing(this.ageRatingScala[this.selectedCursing]);
      this.$store.getters.getCurrentScreenplay.setLoveScenes(this.ageRatingScala[this.selectedLoveScenes]);
      this.$store.getters.getCurrentScreenplay.setAgeRating(this.ageRatingScala[Math.max(this.selectedViolence, this.selectedCursing, this.selectedLoveScenes)]);
      this.$store.getters.getCurrentScreenplay.setLength(this.screenplayLength);
    }
  }
}
</script>

<style scoped>

</style>