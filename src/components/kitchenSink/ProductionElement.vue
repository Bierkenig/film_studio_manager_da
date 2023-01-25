<template>
  <div class="productionElementMainDiv">
    <div class="productionElementHead">
      <div class="productionElementMovieTitle">
        {{movieTitle}}
      </div>
      <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false" @click="openButtonClicked"/>
    </div>
    <div class="productionElementInfo">
      <div class="productionElementInfoBox">
        <div class="productionElementInfoBoxText">{{ $t('productionElement.release') }}</div>
        <div class="productionElementInfoBoxText">{{releaseDate}}</div>
      </div>
      <div class="productionElementInfoBox productionElementMiddleInfoBox">
        <div class="productionElementInfoBoxText">{{ $t('productionElement.status') }}</div>
        <div class="productionElementInfoBoxText">{{status}}</div>
      </div>
      <div class="productionElementInfoBox">
        <div class="productionElementInfoBoxText">{{ $t('productionElement.timeLeft') }}</div>
        <div class="productionElementInfoBoxText">{{timeLeft}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
export default {
  name: "ProductionElement",
  components: {IconButton},
  props: {
    movieTitle: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    timeLeft: {
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
.productionElementMainDiv {
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

.productionElementHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}

.productionElementMovieTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
}

.productionElementInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
}

.productionElementInfoBox {
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

.productionElementMiddleInfoBox {
  margin: 0 5px 0 5px;
}

.productionElementInfoBoxText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
}
</style>