<template>
  <select class="customSelectMain">
    <option selected disabled>{{ placeholder }}</option>
    <option
        v-for="(option, i) in options"
        :key="i"
        class="customSelectOption"
    >
      {{ option }}
    </option>
  </select>
</template>

<script>
export default {
  name: "CustomSelect",
  data() {
    return {
      svgBG: '<svg x="0px" y="0px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#E4E4E4" d="m 45.2,15.4 -4,-4 L 24,28.5 6.9,11.4 2.8,15.4 24,36.6 Z" /></svg>',
      selectBG: 'none',
    }
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
  },
  methods: {
    setBG() {
      this.selectBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgBG) + '")';
    },
  },
  mounted() {
    this.setBG();
  }
}
</script>

<style scoped>
select {
  appearance: none;
  background-color: var(--fsm-dark-blue-4);
  background-image: v-bind('selectBG');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  background-size: 15px;
  background-origin: content-box;
  border: none;
  border-radius: var(--fsm-s-border-radius);
  padding: 0 15px 0 15px;
  margin: 0;
  width: 100%;
  font-family: inherit;
  cursor: inherit;
  line-height: inherit;
  outline: none;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
  height: 30px;
  box-sizing: content-box;
}
</style>