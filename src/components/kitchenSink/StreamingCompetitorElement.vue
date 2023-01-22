<template>
  <div class="streamingCompetitorElementMainDiv">
    <div class="streamingCompetitorElementInfo">
      <div class="streamingCompetitorElementHeading">
        <div class="streamingCompetitorElementTitle">
          {{ streamingService }}
        </div>
        <custom-icon class="streamingCompetitorElementIcon" :icon="icon" size="40px" :theme="iconTheme"/>
      </div>
      <div class="streamingCompetitorElementInfoElements">
        <div class="streamingCompetitorElementMoreInfo">
          <div class="streamingCompetitorElementSubscribersInfo">
            <div class="streamingCompetitorElementSubscribersLabelContainer">
              <div class="streamingCompetitorElementSubscribersIcon">
                <custom-icon size="16px" theme="light" :shadow="true"/>
              </div>
              <div class="streamingCompetitorElementSubscribersLabel">
                {{ $t('streamingCompetitorElement.subscribers') }}
              </div>
            </div>
            <div class="streamingCompetitorElementSubscribersValue">
              {{ subscribers }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";

export default {
  name: "StreamingCompetitorElement",
  components: {CustomIcon},
  data() {
    return {
      contractColor: 'var(--fsm-white)',
    }
  },
  props: {
    streamingService: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    iconTheme: {
      default: 'red',
      validator(value) {
        return ['red', 'green', 'blue', 'yellow', 'white'].includes(value);
      }
    },
    subscribers: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.streamingCompetitorElementMainDiv {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 10px;
  background-color: var(--fsm-dark-blue-4);
  border-radius: var(--fsm-m-border-radius);
  width: 100%;
}

.streamingCompetitorElementInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.streamingCompetitorElementHeading {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.streamingCompetitorElementTitle {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.streamingCompetitorElementInfoElements {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.streamingCompetitorElementMoreInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.streamingCompetitorElementSubscribersInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 40px;
  padding: 0 10px 0 10px;
  margin-top: 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  box-sizing: border-box;
}

.streamingCompetitorElementSubscribersLabelContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.streamingCompetitorElementSubscribersIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
}

.streamingCompetitorElementSubscribersLabel, .streamingCompetitorElementSubscribersValue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}
</style>