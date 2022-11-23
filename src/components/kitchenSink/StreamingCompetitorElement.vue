<template>
  <div class="streamingCompetitorElementMainDiv">
    <div class="streamingCompetitorElementInfo">
      <div class="streamingCompetitorElementHeading">
        <div class="streamingCompetitorElementTitle">
          {{ streamingService }}
        </div>
      </div>
      <div class="streamingCompetitorElementInfoElements">
        <div class="streamingCompetitorElementMoreInfo">
          <div class="streamingCompetitorElementOwnerInfo">
            <div class="streamingCompetitorElementOwnerLabel">
              Owner
            </div>
            <div class="streamingCompetitorElementOwnerName">
              {{ owner }}
            </div>
          </div>
          <div class="streamingCompetitorElementContractInfo">
            <div class="streamingCompetitorElementContractLabel">
              Subscribers
            </div>
            <div class="streamingCompetitorElementContractValue">
              {{ subscribers }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StreamingCompetitorElement",
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
    owner: {
      type: String,
      required: true,
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
  height: 130px;
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

.streamingCompetitorElementOwnerInfo, .streamingCompetitorElementContractInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  margin: 10px 0 0 0;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
  box-sizing: border-box;
}

.streamingCompetitorElementOwnerLabel, .streamingCompetitorElementContractLabel,
.streamingCompetitorElementOwnerName, .streamingCompetitorElementContractValue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
}
</style>