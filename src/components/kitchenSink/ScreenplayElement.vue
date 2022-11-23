<template>
  <div class="screenplayElementMainDiv">
    <div class="screenplayElementImage"/>
    <div class="screenplayElementInfo">
      <div class="screenplayElementHeading">
        <div class="screenplayElementTitle">
          {{screenplayTitle}}
        </div>
        <icon-button icon="open" size="small" :dark="false" :bg-gradient="false" :icon-gradient="false" :shadow="false"/>
      </div>
      <div class="screenplayElementInfoElements">
        <div class="screenplayElementInfoElement">
          <info-circle class="screenplayElementInfoCircle" :icon="genreIcon" :data-title="genre"/>
          <div class="screenplayElementInfoDesc">
            Genre
          </div>
        </div>
        <div class="screenplayElementInfoElement">
          <info-circle class="screenplayElementInfoCircle" :text="age" data-title="Age Rating"/>
          <div class="screenplayElementInfoDesc">
            Age
          </div>
        </div>
        <div class="screenplayElementMoreInfo">
          <div class="screenplayElementQualityInfo">
            <div class="screenplayElementQualityLabel">
              Quality
            </div>
            <div class="screenplayElementQualityValueContainer">
              <input class="screenplayElementQualityValue" type="range" min="1" max="100" step="1" :value="quality" disabled>
            </div>
          </div>
          <div class="screenplayElementWriterInfo">
            <div class="screenplayElementWriterLabel">
              Writer
            </div>
            <div class="screenplayElementWriterName">
              {{ writer }}
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
  name: "ScreenplayElement",
  components: {InfoCircle, IconButton},
  data() {
    return {
      svgBG: '',
    }
  },
  props: {
    svgCode: String,
    screenplayTitle: {
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
    quality: {
      type: Number,
      required: true,
      validator(value) {
        return (value >= 1 && value <= 100);
      }
    },
    writer: {
      type: String,
      required: true,
    },
  },
  methods: {
    setSVG() {
      this.svgBG = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(this.svgCode) + '")';
    },
  },
  mounted() {
    this.setSVG();
  },
}
</script>

<style scoped>
.screenplayElementMainDiv {
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

.screenplayElementImage {
  height: 100%;
  border-radius: var(--fsm-s-border-radius);
  margin-right: 10px;
  flex-basis: 80px;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: var(--fsm-dark-blue-3);
  background-image: v-bind('svgBG');
  background-size: 80px;
  background-position: center;
  background-repeat: no-repeat;
}

.screenplayElementInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.screenplayElementHeading {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 10px;
}

.screenplayElementTitle {
  flex-grow: 1;
  font-size: 22px;
  font-weight: var(--fsm-fw-regular);
  margin-right: 10px;
}

.screenplayElementInfoElements {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.screenplayElementInfoElement {
  text-align: center;
  width: fit-content;
}

.screenplayElementInfoCircle {
  margin: 10px;
}

.screenplayElementInfoDesc {
  font-size: 12px;
  font-weight: var(--fsm-fw-regular);
}

.screenplayElementMoreInfo {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.screenplayElementQualityInfo, .screenplayElementWriterInfo {
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

.screenplayElementQualityLabel, .screenplayElementWriterLabel, .screenplayElementWriterName {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  font-weight: var(--fsm-fw-regular);
}

.screenplayElementQualityValueContainer {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
}

.screenplayElementQualityValue {
  width: 100%;
}
</style>