<template>
  <div class="projectElementMainDiv">
    <div class="projectElementHead">
      <div class="projectElementHeading">
        <div class="projectElementImage"/>
        <div class="projectElementTitle">
          {{ projectTitle }}
        </div>
      </div>
      <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"
                   @click="openButtonClicked"/>
    </div>
    <div class="projectElementInfo">
      <div class="projectElementInfoElements1">
        <div class="projectElementReleaseInfoBox">
          <div class="projectElementReleaseInfo">
            <div class="projectElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" :shadow="true"/>
            </div>
            <div class="projectElementReleaseLabel">
              {{ $t('projectElement.release') }}
            </div>
          </div>
          <div class="projectElementReleaseValue">
            {{ release }}
          </div>
        </div>
        <div class="projectElementInfoCircles1">
          <info-circle class="projectElementInfoCircle" :icon="genreIcon" :data-title="genre"/>
        </div>
      </div>
      <div class="projectElementInfoElements2">
        <div class="projectElementEarningsInfoBox">
          <div class="projectElementEarningsInfo">
            <div class="projectElementInfoBoxIcon">
              <custom-icon size="16px" theme="light" :shadow="true"/>
            </div>
            <div class="projectElementEarningsLabel">
              {{ $t('projectElement.status') }}
            </div>
          </div>
          <div class="projectElementEarningsValue">
            {{ status }}
          </div>
        </div>
        <div class="projectElementInfoCircles2">
          <info-circle class="projectElementInfoCircle" :text="age" data-title="Age Rating"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "@/components/kitchenSink/IconButton";
import InfoCircle from "@/components/kitchenSink/InfoCircle";
import CustomIcon from "@/components/kitchenSink/CustomIcon.vue";

export default {
  name: "ProjectElement",
  components: {CustomIcon, InfoCircle, IconButton},
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: String,
    projectTitle: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    genreIcon: {
      type: String,
      required: true,
    },
    release: {
      type: String,
      required: true,
    },
    status: {
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
.projectElementMainDiv {
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

.projectElementHead {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.projectElementHeading {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.projectElementImage {
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

.projectElementInfo {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.projectElementTitle {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.projectElementInfoElements1, .projectElementInfoElements2 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.projectElementInfoElements1 {
  margin-bottom: 10px;
}

.projectElementEarningsInfoBox, .projectElementReleaseInfoBox {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  background-color: var(--fsm-dark-blue-3);
  border-radius: var(--fsm-s-border-radius);
}

.projectElementEarningsInfo, .projectElementReleaseInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.projectElementInfoBoxIcon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 10px;
}

.projectElementEarningsLabel, .projectElementEarningsValue, .projectElementReleaseLabel, .projectElementReleaseValue {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: var(--fsm-fw-regular);
}

.projectElementInfoCircles1, .projectElementInfoCircles2 {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.projectElementInfoCircle {
  margin-left: 10px;
}
</style>