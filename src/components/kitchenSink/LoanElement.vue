<template>
  <div class="loanElement">
    <div class="loanElementText">
      <div class="loanElementTitle">
        {{ title }}
      </div>
      <div class="loanElementDescription">
        {{ description }}
      </div>
    </div>
    <div class="loanElementButton">
      <custom-button :disabled="buttonDisabled" @click="buttonClicked">{{ buttonText }}</custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from "@/components/kitchenSink/CustomButton.vue";

export default {
  name: "loanElement",
  components: {CustomButton},
  data() {
    return {
      incomingColor: 'var(--fsm-light-green)',
      outgoingColor: 'var(--fsm-pink-1)',
      accumulatedColor: 'var(--fsm-pink-1)',
      whiteColor: 'var(--fsm-white)',
      greenColor: 'var(--fsm-light-green)',
      redColor: 'var(--fsm-pink-1)',
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    buttonClicked() {
      this.$emit('button-clicked');
    },
  },
}
</script>

<style scoped>
.loanElement {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  padding: 10px 20px 10px 20px;
  box-sizing: border-box;
}

.loanElementText {
  flex-grow: 2;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
}

.loanElementTitle {
  font-size: 18px;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-white);
}

.loanElementDescription {
  font-size: 12px;
  font-weight: var(--fsm-fw-regular);
  color: var(--fsm-grey-font-color);
}

.loanElementButton {
  flex-grow: 1;
  flex-basis: 0;
}
</style>