<template>
  <div class="budgetSelectPagesNavBarMainDiv">
    <div v-for="i in 4" :key="i" class="budgetSelectPagesNavElement">
      <input :id="'budgetSelectPage' + i"
             :value="budgetValues[i-1]"
             v-model="budget"
             type="radio"
             class="budgetSelectPageRadioButton"
             @change="sendBudgetValue"
      />
      <label v-if="$i18next.language === 'en'" :for="'budgetSelectPage' + i" :id="'budgetSelectPageLabel' + i" class="budgetSelectPageRadioButtonLabel">
        {{ budgetLabelsEn[i-1] }}
      </label>
      <label v-else :for="'budgetSelectPage' + i" :id="'budgetSelectPageLabel' + i" class="budgetSelectPageRadioButtonLabel">
        {{ budgetLabelsDe[i-1] }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "BudgetSelect",

  data(){
    return {
      budget: "250000000",
      budgetValues: ["50000000","250000000", "1000000000", '9000000000000000000000000000000000000000'],
      budgetLabelsEn: ["50 Million", "250 Million", "1 Billion", 'ꝏ'],
      budgetLabelsDe: ["50 Millionen", "250 Millionen", "1 Milliarde", 'ꝏ'],
    }
  },

  methods: {
    sendBudgetValue(){
      this.$emit('sendBudgetValue', this.budget)
    }
  }
}
</script>

<style scoped>
.budgetSelectPagesNavBarMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: var(--fsm-max-border-radius);
  background-color: var(--fsm-dark-blue-3);
  margin-bottom: var(--fsm-l-border-radius);
}

.budgetSelectPagesNavElement {
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  justify-content: center;
}

.budgetSelectPageRadioButton {
  display: none;
}

.budgetSelectPageRadioButtonLabel {
  flex-grow: 1;
  font-size: 15px;
  font-weight: var(--fsm-fw-medium);
  text-align: center;
  padding: 0.25em;
  color: var(--fsm-white);
  border-radius: var(--fsm-max-border-radius);
  transition: background-color 0.5s, color 0.5s;
}

.budgetSelectPageRadioButton:checked + .budgetSelectPageRadioButtonLabel {
  background-color: var(--fsm-pink-1);
  background-image: v-bind('selectedGradientBG');
  color: var(--fsm-dark-blue-2);
}
</style>