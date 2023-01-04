<template>
  <div class="earningElementMainDiv">
    <div class="earningElementInfo">
      <div class="earningElementMovieTitle">
        {{movieTitle}}
      </div>
      <div class="earningElementEarnings">
        {{movieEarnings}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EarningElement",
  props: {
    movieTitle: {
      type: String,
      required: true,
    },
    movieEarnings: {
      type: String,
      required: true,
    },
  },
  methods: {
    openButtonClicked() {
      this.$emit('open-clicked');
    },
  },
}
</script>

<style scoped>
.earningElementMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  height: 50px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-s-border-radius);
  width: 100%;
}

.earningElementInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 16px;
}

.earningElementMovieTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: var(--fsm-fw-regular);
}

.earningElementEarnings {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: var(--fsm-fw-regular);
}
</style>