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
    <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
export default {
  name: "EarningElement",
  components: {IconButton},
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
  margin-right: 10px;
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