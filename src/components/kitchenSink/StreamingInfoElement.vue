<template>
  <div class="streamingInfoElementMainDiv">
    <div class="streamingInfoElementHead">
      <div class="streamingInfoElementHeading">
        <custom-icon class="streamingInfoElementIcon" :icon="icon" size="40px" theme="red"/>
        <div class="streamingInfoElementTitle">
          {{ streamingInfoTitle }}
        </div>
      </div>
    </div>
    <div class="streamingInfoElementInfo">
      <div class="streamingInfoElementInfoElements">
        <div class="streamingInfoElementPopularityInfoBox">
          <div class="streamingInfoElementPopularityInfo">
            <div class="streamingInfoElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" :shadow="true"/>
            </div>
            <div class="streamingInfoElementPopularityLabel">
              Popularity
            </div>
          </div>
          <div class="streamingInfoElementPopularityValueContainer">
            <input class="streamingInfoElementPopularityValue" type="range" min="1" max="100" step="1"
                   :value="popularity" disabled>
          </div>
        </div>
      </div>
      <div class="streamingInfoElementInfoElements">
        <div class="streamingInfoElementPriceInfoBox">
          <div class="streamingInfoElementPriceInfo">
            <div class="streamingInfoElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" :shadow="true"/>
            </div>
            <div class="streamingInfoElementPriceLabel">
              Subscribers
            </div>
          </div>
          <div class="streamingInfoElementPriceValue">
            {{ subscribers }}
          </div>
        </div>
      </div>
      <div class="streamingInfoElementInfoElements">
        <div class="streamingInfoElementPriceInfoBox">
          <div class="streamingInfoElementPriceInfo">
            <div class="streamingInfoElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" :shadow="true"/>
            </div>
            <div class="streamingInfoElementPriceLabel">
              Revenue
            </div>
          </div>
          <div class="streamingInfoElementPriceValue">
            {{ revenue }}
          </div>
        </div>
      </div>
      <div class="streamingInfoElementInfoElements streamingInfoElementInfoElementsLast">
        <div class="streamingInfoElementPriceInfoBox">
          <div class="streamingInfoElementPriceInfo">
            <div class="streamingInfoElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" :shadow="true"/>
            </div>
            <div class="streamingInfoElementPriceLabel">
              Price
            </div>
          </div>
          <div class="streamingInfoElementPriceValueContainer">
            <div class="streamingInfoElementPriceButtons">
              <icon-button icon="minus" size="extraSmall" :dark="false" :shadow="false" @click="changePrice(false)"/>
            </div>
            <div class="streamingInfoElementPriceValue">
              $ {{ (Math.round(price * 100) / 100).toFixed(2) }}
            </div>
            <div class="streamingInfoElementPriceButtons">
              <icon-button icon="plus" size="extraSmall" :dark="false" :shadow="false" @click="changePrice(true)"/>
            </div>
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
  name: "StreamingInfoElement",
  components: {CustomIcon, IconButton},
  data() {
    return {
      price: this.initialPrice,
      priceStep: 0.5,
    }
  },
  props: {
    icon: String,
    streamingInfoTitle: {
      type: String,
      required: true,
    },
    popularity: {
      type: Number,
      required: true,
    },
    subscribers: {
      type: String,
      required: true,
    },
    revenue: {
      type: String,
      required: true,
    },
    initialPrice: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePrice(up) {
      if (up && this.price + this.priceStep < 100.5) {
        this.price += this.priceStep;
      } else if (!up && this.price - this.priceStep > 0.5) {
        this.price -= this.priceStep;
      }
      this.$store.getters.getOwnStreamingService._price = this.price;
      console.log(this.$store.getters.getOwnStreamingService)
    },
  },
}
</script>

<style scoped>
.streamingInfoElementMainDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.streamingInfoElementHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.streamingInfoElementHeading {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}

.streamingInfoElementInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.streamingInfoElementIcon {
  margin: 15px 20px 15px 10px;
}

.streamingInfoElementTitle {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
}

.streamingInfoElementInfoElements {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
}

.streamingInfoElementInfoElementsLast {
  margin-bottom: 0;
}

.streamingInfoElementPriceInfoBox, .streamingInfoElementPopularityInfoBox {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  height: 40px;
}

.streamingInfoElementPriceInfo, .streamingInfoElementPopularityInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.streamingInfoElementInfoBoxIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
}

.streamingInfoElementPriceLabel, .streamingInfoElementPriceValue, .streamingInfoElementPopularityLabel, .streamingInfoElementPopularityValueContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}

.streamingInfoElementPopularityValueContainer {
  flex-grow: 1;
}

.streamingInfoElementPopularityValue {
  margin-left: 20px;
}

.streamingInfoElementPriceValueContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.streamingInfoElementPriceButtons {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.streamingInfoElementPriceValue {
  margin: 0 10px 0 10px;
}
</style>