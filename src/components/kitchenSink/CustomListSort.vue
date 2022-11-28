<template>
  <button class="customButtonMain" @click="changeSort">
    {{possibleSorts[currentSort]}}
  </button>
</template>

<script>
export default {
  name: "CustomListSort",
  data() {
    return {
      possibleSorts: ['Ascending', 'Descending'],
      currentSort: 0,
      svgBG: '<svg x="0px" y="0px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="#E4E4E4" d="M 40.8,16.8 37.7,20 24,6.4 10.4,20 7.1,16.8 24,0 Z m 0,14.4 L 37.7,28 24,41.6 10.4,28 7.1,31.2 24,48 Z" /></svg>',
      buttonBG: 'none',
    }
  },
  methods: {
    changeSort() {
      this.currentSort++;
      if (this.currentSort >= this.possibleSorts.length) {
        this.currentSort = 0;
      }
      this.$emit('sort-changed', this.possibleSorts[this.currentSort]);
    },
    setBG() {
      this.buttonBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgBG) + '")';
    },
  },
  mounted() {
    this.setBG();
  }
}
</script>

<style scoped>
.customButtonMain {
  border: none;
  border-radius: var(--fsm-s-border-radius);
  padding: 0 15px 0 15px;
  width: 100%;
  background-color: var(--fsm-dark-blue-4);
  background-image: v-bind('buttonBG');
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 50%;
  background-size: 15px;
  background-origin: content-box;
  color: var(--fsm-white);
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
  height: 30px;
  text-align: left;
}
</style>