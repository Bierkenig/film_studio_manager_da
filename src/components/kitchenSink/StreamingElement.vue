<template>
  <div class="streamingElementMainDiv">
    <div class="streamingElementHead">
      <div class="streamingElementHeading">
        <div class="streamingElementImage"/>
        <div class="streamingElementTitle">
          {{ streamingTitle }}
        </div>
      </div>
      <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"
                   @click="openButtonClicked"/>
    </div>
    <div class="streamingElementInfo">
      <div class="streamingElementInfoElements1">
        <div class="streamingElementPopularityInfoBox">
          <div class="streamingElementPopularityInfo">
            <div class="streamingElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" icon="popularity" :shadow="true"/>
            </div>
            <div class="streamingElementPopularityLabel">
              {{ $t('streamingElement.popularity') }}
            </div>
          </div>
          <div class="streamingElementPopularityValueContainer">
            <input class="streamingElementPopularityValue" type="range" min="1" max="100" step="1"
                   :value="popularity" disabled>
          </div>
        </div>
      </div>
      <div class="streamingElementInfoElements2">
        <div class="streamingElementContractInfoBox">
          <div class="streamingElementContractInfo">
            <div class="streamingElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" icon="contract" :shadow="true"/>
            </div>
            <div class="streamingElementContractLabel">
              {{ $t('streamingElement.contract') }}
            </div>
          </div>
          <div class="streamingElementContractValue">
            {{ contract }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";

export default {
  name: "StreamingElement",
  components: {CustomIcon, IconButton},
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: String,
    streamingTitle: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
  },
  methods: {
    setSVG() {
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgCode) + '")';
    },
    openButtonClicked() {
      this.$emit('open-clicked');
    },
  },
  mounted() {
    this.setSVG();
  },
}
</script>

<style scoped>
.streamingElementMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: 210px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.streamingElementHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.streamingElementHeading {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.streamingElementImage {
  height: 90px;
  border-radius: var(--fsm-s-border-radius);
  margin-right: 10px;
  flex-basis: 70px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('svgBG');
  background-size: 70px;
  background-position: center;
  background-repeat: no-repeat;
}

.streamingElementInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.streamingElementTitle {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.streamingElementInfoElements1, .streamingElementInfoElements2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
}

.streamingElementInfoElements1 {
  margin-bottom: 10px;
}

.streamingElementContractInfoBox, .streamingElementPopularityInfoBox {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
}

.streamingElementContractInfo, .streamingElementPopularityInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.streamingElementInfoBoxIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
}

.streamingElementContractLabel, .streamingElementContractValue, .streamingElementPopularityLabel, .streamingElementPopularityValueContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}

.streamingElementPopularityValueContainer {
  flex-grow: 1;
}

.streamingElementPopularityValue {
  margin-left: 20px;
}
</style>