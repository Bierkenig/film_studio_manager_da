<template>
  <div class="typeSelectPagesNavBarMainDiv">
    <div v-for="i in valueArray.length" :key="i" class="typeSelectPagesNavElement">
      <input :id="'typeSelectPage' + typeOfValues + i"
             :value="valueArray[i-1]"
             v-model="selectedType"
             type="radio"
             class="typeSelectPageRadioButton"
             @change="sendValue"
      />
      <label :for="'typeSelectPage' + typeOfValues + i" :id="'typeSelectPageLabel' + typeOfValues + i" class="typeSelectPageRadioButtonLabel">
        {{ valueArray[i-1] }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "TypeSelect",

  props: {
    type: String,
    valueArray: Array,
    typeOfValues: String,
  },

  data(){
    return {
      selectedType: this.type,
    }
  },

  mounted() {
    console.log(this.type);
    console.log(this.valueArray);
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