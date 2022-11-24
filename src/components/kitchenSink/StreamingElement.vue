<template>
  <div class="streamingElementMainDiv">
    <div class="streamingElementInfo">
      <div class="streamingElementHeading">
        <div class="streamingElementTitle">
          {{movieTitle}}
        </div>
        <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false" @click="openButtonClicked"/>
      </div>
      <div class="streamingElementInfoElements">
        <div class="streamingElementInfoElement">
          <info-circle class="streamingElementInfoCircle" :text="popularity" data-title="Age Rating"/>
          <div class="streamingElementInfoDesc">
            Popularity
          </div>
        </div>
        <div class="streamingElementMoreInfo">
          <div class="streamingElementOwnerInfo">
            <div class="streamingElementOwnerLabel">
              Owner
            </div>
            <div class="streamingElementOwnerName">
              {{ owner }}
            </div>
          </div>
          <div class="streamingElementContractInfo">
            <div class="streamingElementContractLabel">
              Contract
            </div>
            <div class="streamingElementContractValue">
              {{ contract }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import InfoCircle from "@/components/kitchenSink/InfoCircle";

export default {
  name: "StreamingElement",
  components: {InfoCircle, IconButton},
  data() {
    return {
      contractColor: 'var(--fsm-white)',
    }
  },
  props: {
    movieTitle: {
      type: String,
      required: true,
    },
    popularity: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    contract: {
      type: String,
      required: true,
    },
    contractCritical: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openButtonClicked() {
      this.$emit('open-clicked');
    },
  },
  mounted() {
    if (this.contractCritical) {
      this.contractColor = 'var(--fsm-pink-1)';
    }
  },
}
</script>

<style scoped>
.streamingElementMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  height: 130px;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.streamingElementInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.streamingElementHeading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.streamingElementTitle {
  flex-grow: 1;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.streamingElementInfoElements {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.streamingElementInfoElement {
  text-align: center;
  width: fit-content;
}

.streamingElementInfoCircle {
  margin: 10px;
}

.streamingElementInfoDesc {
  font-size: 12px;
  font-weight: var(--fsm-fw-regular);
}

.streamingElementMoreInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.streamingElementOwnerInfo, .streamingElementContractInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  margin: 10px 0 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  box-sizing: border-box;
}

.streamingElementOwnerLabel, .streamingElementContractLabel, .streamingElementOwnerName, .streamingElementContractValue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
}

.streamingElementContractValue {
  color: v-bind('contractColor');
}
</style>