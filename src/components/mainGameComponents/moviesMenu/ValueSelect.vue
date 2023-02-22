<template>
  <div class="typeSelectPagesNavBarMainDiv">
    <div v-for="i in valueArray.length" :key="i" class="typeSelectPagesNavElement">
      <input v-if="typeOfValues === 'Scope' || typeOfValues === 'Tone' || typeOfValues === 'SpecialEffects' || typeOfValues === 'ScreenplayType'"
             :id="'typeSelectPage' + typeOfValues + i"
             :value="valueArray[i-1]"
             v-model="selectedType"
             type="radio"
             class="typeSelectPageRadioButton"
             @change="sendValue"
      />
      <input v-else
             :id="'typeSelectPage' + typeOfValues + i"
             :value="numberArray[i-1]"
             v-model="selectedType"
             type="radio"
             class="typeSelectPageRadioButton"
             @change="sendValue"
      />
      <label :for="'typeSelectPage' + typeOfValues + i" :id="'typeSelectPageLabel' + typeOfValues + i" class="typeSelectPageRadioButtonLabel">
        {{ $t(valueArray[i-1].toLowerCase()) }}
      </label>
    </div>
  </div>
</template>

<script>
import soundeffectMixin from "@/mixins/soundeffectMixin";

export default {
  name: "TypeSelect",
  mixins: [soundeffectMixin('button','click'),soundeffectMixin('img','click')],

  props: {
    type: String,
    valueArray: Array,
    typeOfValues: String,
  },

  data(){
    return {
      selectedType: this.type,
      numberArray: [1,2,3,4,5],
      ageRatingScala: {1: 'G / +3', 2: 'PG / +7', 3: 'PG-13 / +13', 4: 'R / +16', 5: 'NC-17 / +18'},
    }
  },

  mounted() {
    if(this.type === 'G / +3' || this.type === 'PG / +7' || this.type === 'PG-13 / +13' || this.type === 'R / +16' ||
        this.type === 'NC-17 / +18') {
      this.selectedType = Object.keys(this.ageRatingScala).find(key => this.ageRatingScala[key] === this.type);
    }
  },

  methods: {
    sendValue(){
      this.$emit('sendValue', this.selectedType)
    }
  }
}
</script>

<style scoped>
.typeSelectPagesNavBarMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: var(--fsm-max-border-radius);
  background-color: var(--fsm-dark-blue-3);
  margin-bottom: var(--fsm-l-border-radius);
}

.typeSelectPagesNavElement {
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  justify-content: center;
}

.typeSelectPageRadioButton {
  display: none;
}

.typeSelectPageRadioButtonLabel {
  flex-grow: 1;
  font-size: 15px;
  font-weight: var(--fsm-fw-medium);
  text-align: center;
  padding: 0.25em;
  color: var(--fsm-white);
  border-radius: var(--fsm-max-border-radius);
  transition: background-color 0.5s, color 0.5s;
}

.typeSelectPageRadioButton:checked + .typeSelectPageRadioButtonLabel {
  background-color: var(--fsm-pink-1);
  background-image: v-bind('selectedGradientBG');
  color: var(--fsm-dark-blue-2);
}
</style>