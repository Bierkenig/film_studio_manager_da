<template>
  <div id="ownServiceSection">
    <h2 id="ownServiceSectionHeader">Information</h2>
    <div id="ownServiceSectionInfoContainer">
      <streaming-info-element
          :streaming-info-title="streamingService._name"
          :icon="this.$store.getters.getCurrentLogo"
          :popularity="streamingService._popularity"
          :subscribers="roundBudget(this.streamingService._subscribers)"
          :revenue="this.streamingService._profit.toString()"
          :initial-price="this.streamingService._price"/>
    </div>
  </div>
</template>

<script>
import StreamingInfoElement from "@/components/kitchenSink/StreamingInfoElement.vue";

export default {
  name: "OwnServiceSection",
  components: {StreamingInfoElement},

  data(){
    return {
      streamingService: this.$store.getters.getOwnStreamingService,
    }
  },

  watch: {
    'this.$store.getters.getOwnStreamingService._price': function (){
      console.log(this.$store.getters.getOwnStreamingService._price)
    }
  },

  methods: {
    roundBudget(labelValue){
      return Math.abs(Number(labelValue)) >= 1.0e+9

          ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + " B"
          // Six Zeroes for Millions
          : Math.abs(Number(labelValue)) >= 1.0e+6

              ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + " M"
              // Three Zeroes for Thousands
              : Math.abs(Number(labelValue)) >= 1.0e+3

                  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + " K"

                  : Math.abs(Number(labelValue));
    },
  }
}
</script>

<style scoped>
#ownServiceSection {
  display: flex;
  justify-content: center;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-l-border-radius);
  padding: 15px;
}

#ownServiceSectionHeader {
  margin: 0 !important;
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-pink-1);
}

#ownServiceSectionInfoContainer {
  margin-top: 15px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-l-border-radius);
  padding: 15px;
}

#ownServiceSectionNameContainer {
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
  margin-bottom: 10px;
}

#ownServiceSectionName {
  font-weight: var(--fsm-fw-bold);
  color: var(--fsm-white);
  font-size: 20px;
}

#ownServiceSectionInformation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 15px;
}

.ownServiceSectionInfoElement {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--fsm-s-border-radius);
  background-color: var(--fsm-dark-blue-3);
}

.ownServiceSectionInfoElementLeftSide {
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
}

.ownServiceSectionRangeSlider {
  width: 130px;
  height: 10px;
}

.ownServiceSectionRangeSlider::-webkit-slider-thumb {
  background: linear-gradient(to right, var(--fsm-pink-1) 0%, var(--fsm-pink-1) 50%, var(--fsm-dark-blue-4) 50%, var(--fsm-dark-blue-4) 100%);
}

span {
  width: 80%;
  text-align: center;
  font-weight: var(--fsm-fw-bold);
  cursor: pointer;
}

span.num {
  pointer-events: none;
}

.ownServiceSectionPriceButton {
  font-weight:var(--fsm-fw-bold);
  border-radius: 50%;
  background: var(--fsm-pink-1);
  border-style: none;
}

#minusButton {
  margin-right: 10px;
}

#plusButton {
  margin-left: 10px;
}
</style>