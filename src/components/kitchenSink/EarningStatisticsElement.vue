<template>
  <div class="earningStatisticsElementMainDiv">
    <div class="earningStatisticsElementHead">
      <div class="earningStatisticsElementHeadElements">
        <info-circle :text="listNumber" size="30px" alternative-style/>
        <div class="earningStatisticsElementMovieTitle">
          {{movieTitle}}
        </div>
      </div>
      <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false" @click="openButtonClicked"/>
    </div>
    <div class="earningStatisticsElementInfo">
      <div class="earningStatisticsElementInfoBox">
        <div class="earningStatisticsElementInfoBoxText">Opening</div>
        <div class="earningStatisticsElementInfoBoxText">{{ opening }}</div>
      </div>
      <div class="earningStatisticsElementInfoBox earningStatisticsElementMiddleInfoBox">
        <div class="earningStatisticsElementInfoBoxText">Total</div>
        <div class="earningStatisticsElementInfoBoxText">{{ total }}</div>
      </div>
      <div class="earningStatisticsElementInfoBox">
        <div class="earningStatisticsElementInfoBoxText">Studio</div>
        <div class="earningStatisticsElementInfoBoxText">{{ studio }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import InfoCircle from "@/components/kitchenSink/InfoCircle";
export default {
  name: "earningStatisticsElement",
  components: {InfoCircle, IconButton},
  props: {
    listNumber: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
    opening: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    studio: {
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
.earningStatisticsElementMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 90px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.earningStatisticsElementHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}

.earningStatisticsElementHeadElements {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.earningStatisticsElementMovieTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-left: 10px;
}

.earningStatisticsElementInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}

.earningStatisticsElementInfoBox {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  height: 30px;
  flex-basis: 0;
  flex-grow: 1;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  padding: 0 10px 0 10px;
}

.earningStatisticsElementMiddleInfoBox {
  margin: 0 5px 0 5px;
}

.earningStatisticsElementInfoBoxText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
}
</style>